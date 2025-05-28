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
import { Textarea } from '@/components/ui/textarea';
import { useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode, useState } from 'react';

interface Props {
    Icon: ReactNode;
    section: IntroSection;
}

const EditSection = ({ section, Icon }: Props) => {
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState(section.thumbnail);

    const { data, setData, post, errors, clearErrors } = useForm({
        title: section.title,
        description: section.description || '',
        thumbnail: null,
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const onhHandleImageChange = (e: any) => {
        const files = e.target.files;
        if (files && files[0]) {
            setData('thumbnail', files[0]);
            setImageUrl(URL.createObjectURL(files[0]));
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();

        post(route('home-section.update', { id: section.id }), {
            onSuccess() {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{Icon}</DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        Update {section.name} Section
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4 pt-4">
                    <div>
                        <Label>Section Title</Label>

                        <Input
                            required
                            name="title"
                            value={data.title}
                            placeholder="Section Title"
                            onChange={onHandleChange}
                        />

                        <InputError message={errors.title} />
                    </div>

                    {section.description && (
                        <div>
                            <Label>Section Description</Label>

                            <Textarea
                                rows={3}
                                required
                                name="description"
                                placeholder="Section Description"
                                value={data.description}
                                onChange={onHandleChange}
                            />

                            <InputError message={errors.description} />
                        </div>
                    )}

                    {imageUrl && (
                        <div>
                            <Label className="mb-2 mt-3 block">
                                Change Thumbnail
                            </Label>

                            <img alt="" width="100%" src={imageUrl} />

                            <Input
                                type="file"
                                name="thumbnail"
                                onChange={onhHandleImageChange}
                            />

                            <InputError message={errors.thumbnail} />
                        </div>
                    )}

                    <div className="flex shrink-0 flex-wrap items-center justify-end pt-4">
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="mr-2 py-2 text-base font-medium capitalize"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            type="submit"
                            className="py-2 text-base font-medium capitalize"
                        >
                            <span>Save Changes</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditSection;
