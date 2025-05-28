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
import { PageProps, ProjectProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Props {
    project: ProjectProps;
}

const EditProject = (props: Props) => {
    const page = usePage<PageProps>();
    const { app, input } = page.props.translate;
    const { project } = props;
    const [open, setOpen] = useState(false);

    const { put, data, errors, setData } = useForm({
        project_name: project.project_name,
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        put(route('projects.update', { id: project.id }), {
            onSuccess() {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    className="h-7 w-7 rounded-full bg-blue-50 text-blue-500 hover:bg-blue-50 active:bg-blue-50"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium">
                        Update Project
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
                            <span>{app.save_changes}</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditProject;
