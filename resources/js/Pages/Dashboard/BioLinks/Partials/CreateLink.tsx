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
import { FormEventHandler, useEffect, useState } from 'react';

const CreateLink = () => {
    const { props } = usePage<PageProps>();
    const { app, input } = props.translate;
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const { data, setData, post, errors, reset, wasSuccessful, clearErrors } =
        useForm({
            link_name: '',
            link_type: 'biolink',
            url_name: '',
        });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = async (e) => {
        clearErrors();
        e.preventDefault();
        post(route('bio-links.store'));
    };

    useEffect(() => {
        if (wasSuccessful) {
            reset();
            handleOpen();
        }
    }, [wasSuccessful]);

    return (
        <Dialog open={open} onOpenChange={handleOpen}>
            <DialogTrigger asChild>
                <Button className="rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md">
                    {app['create_link']}
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <p className="text-xl font-medium">
                            {app['create_link']}
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
                            <span>{app['cancel']}</span>
                        </Button>
                        <Button
                            type="submit"
                            className="py-2 text-base font-medium capitalize"
                        >
                            <span>{app['save_changes']}</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default CreateLink;
