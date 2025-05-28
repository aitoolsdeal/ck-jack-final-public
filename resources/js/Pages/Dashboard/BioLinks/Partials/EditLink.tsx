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
import { LinkProps, PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Props {
    link: LinkProps;
}

const EditLink = (props: Props) => {
    const page = usePage<PageProps>();

    const { link } = props;
    const { app, input } = page.props.translate;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const { put, data, errors, setData } = useForm({
        link_name: link.link_name,
        link_type: 'biolink',
        url_name: link.url_name,
        new_url: false,
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const newUrlHandler = (event: any) => {
        if (event.target.value === link.url_name) {
            setData('new_url', false);
        } else {
            setData('new_url', true);
        }
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        put(route('bio-links.update', { id: link.id }), {
            onSuccess() {
                handleOpen();
            },
        });
    };

    return (
        <>
            <Dialog open={open} onOpenChange={handleOpen}>
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
                        <div className="mb-6 flex items-center justify-between">
                            <p className="text-xl font-medium">
                                {app.update_link}
                            </p>
                        </div>
                        <DialogTitle>
                            <p className="text-xl font-medium">
                                {app.update_link}
                            </p>
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={submit}>
                        <div className="mb-4">
                            <Label>{input.bio_link_name}</Label>

                            <Input
                                type="text"
                                name="link_name"
                                value={data.link_name}
                                onChange={onHandleChange}
                                placeholder={input.bio_link_name_placeholder}
                                required
                            />

                            <InputError message={errors.link_name} />
                        </div>
                        <div className="mb-4">
                            <Label>{input.link_username}</Label>

                            <Input
                                type="text"
                                name="url_name"
                                value={data.url_name}
                                onBlur={newUrlHandler}
                                onChange={onHandleChange}
                                placeholder={input.link_username_placeholder}
                                required
                            />

                            <InputError message={errors.url_name} />
                        </div>

                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={handleOpen}
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
        </>
    );
};

export default EditLink;
