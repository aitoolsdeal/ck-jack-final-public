import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { UserCircle } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const CreateTestimonial = () => {
    const { props } = usePage<PageProps>();
    const { app, input } = props.translate;
    const [open, setOpen] = useState(false);
    const [imageUrl, setImageUrl] = useState<any>();

    const { data, setData, post, errors, reset, clearErrors } = useForm({
        name: '',
        title: '',
        testimonial: '',
        thumbnail: null,
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = async (e) => {
        clearErrors();
        e.preventDefault();

        post(route('testimonials.store'), {
            onSuccess() {
                reset();
                setOpen(false);
                setImageUrl(null);
            },
        });
    };

    const handleImageChange = (e: any) => {
        const files = e.target.files;
        if (files && files[0]) {
            setData('thumbnail', files[0]);
            setImageUrl(URL.createObjectURL(files[0]));
        }
    };

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger>
                    <Button>{app.create_testimonials}</Button>
                </DialogTrigger>

                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-medium">
                            {app.create_testimonials}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={submit}>
                        <div className="mb-4 flex flex-col items-center">
                            {imageUrl ? (
                                <Avatar className="h-[120px] w-[120px]">
                                    <AvatarImage
                                        src={imageUrl}
                                        alt="linkdrop"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            ) : (
                                <UserCircle className="text-blue-gray-500 h-[120px] w-[120px]" />
                            )}
                            <div className="mt-4 flex items-center">
                                <label
                                    htmlFor="formFileSm"
                                    className="whitespace-nowrap border border-gray-700 bg-gray-100 px-2.5 py-1.5 text-sm font-medium text-gray-900"
                                >
                                    Choose Photo
                                </label>
                                <input
                                    hidden
                                    type="file"
                                    onChange={handleImageChange}
                                    id="formFileSm"
                                />
                            </div>
                            <small className="py-4 text-gray-500">
                                JPG, JPEG, PNG, SVG File, Maximum 2MB
                            </small>
                            {errors.thumbnail && (
                                <p className="text-sm text-red-500">
                                    {errors.thumbnail}
                                </p>
                            )}
                        </div>

                        <div className="mb-4">
                            <Label>{input.name}</Label>

                            <Input
                                type="text"
                                name="name"
                                value={data.name}
                                onChange={onHandleChange}
                                placeholder={input.full_name_placeholder}
                                required
                            />

                            <InputError message={errors.name} />
                        </div>
                        <div className="mb-4">
                            <Label>{input.description}</Label>

                            <Input
                                type="text"
                                name="title"
                                value={data.title}
                                onChange={onHandleChange}
                                placeholder={input.description_placeholder}
                                required
                            />

                            <InputError message={errors.title} />
                        </div>
                        <div className="mb-4">
                            <Label>{input.testimonial}</Label>

                            <Textarea
                                rows={3}
                                cols={10}
                                name="testimonial"
                                value={data.testimonial}
                                onChange={onHandleChange}
                                placeholder={input.testimonial_placeholder}
                                maxLength={180}
                                required
                            />

                            <InputError message={errors.testimonial} />
                        </div>

                        <div className="flex justify-end pt-4">
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
        </>
    );
};

export default CreateTestimonial;
