import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface Props {
    apiPath: string;
    Component: any;
}

const DeleteByInertia = (props: Props) => {
    const { apiPath, Component } = props;
    const [modal, setModal] = useState<boolean>(false);

    const handleOpen = () => {
        setModal((prev) => !prev);
    };

    const deleteHandler = () => {
        router.delete(apiPath, {
            onSuccess: () => {
                setModal(false);
            },
        });
    };

    return (
        <Dialog open={modal} onOpenChange={setModal}>
            <DialogTrigger asChild>{Component}</DialogTrigger>

            <DialogContent className="p-8 sm:max-w-[425px]">
                <h6 className="mb-8 text-center text-xl text-red-500">
                    Are you sure to delete?
                </h6>

                <div className="flex items-center justify-center gap-6">
                    <Button
                        onClick={handleOpen}
                        className="mt-4 border border-red-500 bg-transparent px-5 text-red-500 hover:bg-transparent"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        onClick={deleteHandler}
                        className="hover:bg-primary-hover mt-4 bg-primary px-5"
                    >
                        Submit
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteByInertia;
