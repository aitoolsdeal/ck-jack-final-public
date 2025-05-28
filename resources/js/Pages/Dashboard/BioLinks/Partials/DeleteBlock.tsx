import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { LinkItemProps } from '@/types';
import { router } from '@inertiajs/react';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';

interface Props {
    block: LinkItemProps;
}

const DeleteBlock = (props: Props) => {
    const { block } = props;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const deleteHandler = async () => {
        router.delete(route('biolink-block.destroy', { id: block.id }));
    };

    return (
        <Dialog>
            <DialogTrigger>
                <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                >
                    <Trash2
                        onClick={handleOpen}
                        className="h-5 w-5 cursor-pointer text-red-500"
                    />
                </Button>
            </DialogTrigger>

            <DialogContent className="p-10">
                <DialogHeader>
                    <DialogTitle className="text-center">
                        Are you sure to delete?
                    </DialogTitle>
                </DialogHeader>

                <div className="mt-10 flex items-center justify-center">
                    <Button
                        onClick={handleOpen}
                        className="mr-6 py-2 text-base font-medium capitalize"
                    >
                        <span>Cancel</span>
                    </Button>
                    <Button
                        variant="destructive"
                        className="py-2 text-base font-medium capitalize"
                        onClick={deleteHandler}
                    >
                        <span>Delete</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DeleteBlock;
