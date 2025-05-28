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

const CreateLink = () => {
    const { props } = usePage<PageProps>();
    const { app, input } = props.translate;
    const [open, setOpen] = useState(false);

    const { data, setData, post, errors, reset, clearErrors } = useForm({
        link_name: '',
        link_slug: '',
        external_url: '',
        link_type: 'shortlink',
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = async (e) => {
        clearErrors();
        e.preventDefault();

        post(route('short-links.store'), {
            onSuccess() {
                reset();
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md">
                    {app['create_link']}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium">
                        {app.create_link}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <Label>{input.short_link_name}</Label>

                        <Input
                            type="text"
                            name="link_name"
                            value={data.link_name}
                            onChange={onHandleChange}
                            placeholder={input.short_link_name_placeholder}
                            required
                        />

                        <InputError message={errors.link_name} />
                    </div>
                    <div className="mb-4">
                        <Label>{input.short_link_slug}</Label>

                        <Input
                            type="text"
                            name="link_slug"
                            value={data.link_slug}
                            onChange={onHandleChange}
                            placeholder={input.short_link_slug_placeholder}
                        />

                        <InputError message={errors.link_slug} />
                    </div>
                    <div className="mb-4">
                        <Label>{input.external_url}</Label>

                        <Input
                            type="url"
                            name="external_url"
                            value={data.external_url}
                            onChange={onHandleChange}
                            placeholder={input.external_url_placeholder}
                            required
                        />

                        <InputError message={errors.external_url} />
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

export default CreateLink;
