import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

const CreateProject = () => {
    const { props } = usePage<PageProps>();
    const { app, input } = props.translate;
    const [open, setOpen] = useState(false);

    const { data, setData, post, errors, reset, clearErrors } = useForm({
        user_id: props.auth.user.data.id,
        project_name: '',
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = async (e) => {
        clearErrors();
        e.preventDefault();

        post(route('projects.store'), {
            onSuccess() {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button className="rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md">
                    {app.create_project}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium">
                        {app.create_project}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <Label>{input.project_name}</Label>

                        <Input
                            type="text"
                            name="project_name"
                            value={data.project_name}
                            onChange={onHandleChange}
                            placeholder={input.project_name_placeholder}
                            required
                        />

                        <InputError message={errors.project_name} />
                    </div>

                    <div className="mt-4 flex justify-end">
                        <Button
                            onClick={() => setOpen(false)}
                            className="mr-2 py-2 text-base font-medium capitalize"
                        >
                            <span>{app.cancel}</span>
                        </Button>
                        <Button
                            type="submit"
                            className="py-2 text-base font-medium capitalize"
                        >
                            <span>{app.create}</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProject;
