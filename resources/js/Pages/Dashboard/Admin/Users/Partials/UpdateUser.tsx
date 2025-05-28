import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UserProps } from '@/types';
import { useForm } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const UpdateUser = (props: { user: UserProps }) => {
    const { user } = props;
    const [modal, setModal] = useState<boolean>(false);

    const { data, put, setData } = useForm({
        status: user.status,
    });

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        put(route('users.update', { id: user.id }), {
            onSuccess() {
                setModal(false);
            },
        });
    };

    return (
        <>
            <Dialog open={modal} onOpenChange={setModal}>
                <DialogTrigger asChild>
                    <Button
                        size="icon"
                        color="white"
                        variant="secondary"
                        onClick={() => setModal(false)}
                        className="bg-primary-50 hover:bg-primary-50 active:bg-primary-50 h-7 w-7 rounded-full text-primary"
                    >
                        <Pencil className="h-4 w-4" />
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create Pricing Plan</DialogTitle>
                    </DialogHeader>

                    <form
                        onSubmit={submit}
                        className="mt-6 flex flex-col gap-4"
                    >
                        <Select
                            defaultValue={`${data.status}`}
                            onValueChange={(e) => setData('status', e)}
                        >
                            <SelectTrigger className="my-1">
                                <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectItem value="1">Active</SelectItem>
                                    <SelectItem value="0">Deactive</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Button
                            type="submit"
                            className="hover:bg-primary-hover mt-4 bg-primary px-5"
                        >
                            Save Changes
                        </Button>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default UpdateUser;
