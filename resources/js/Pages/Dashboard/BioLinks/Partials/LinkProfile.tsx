import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { LinkProps } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { Camera, UserCircle } from 'lucide-react';
import NProgress from 'nprogress';
import { ChangeEvent, FormEventHandler, useState } from 'react';

interface Props {
    link: LinkProps;
}

const LinkProfile = (props: Props) => {
    const { link } = props;
    const { thumbnail, link_name, short_bio } = link;
    const [imageUrl, setImageUrl] = useState(thumbnail);

    const { post, data, errors, setData } = useForm({
        thumbnail: null,
        link_name: link_name || '',
        short_bio: short_bio || '',
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        if (files && files[0]) {
            setData('thumbnail', files[0] as any);
            setImageUrl(URL.createObjectURL(files[0]));
        }
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        router.on('start', () => NProgress.remove());
        router.on('finish', () => NProgress.remove());

        post(route('customize.store', { id: link.id }));
    };

    return (
        <Card>
            <form
                onSubmit={submit}
                encType="multipart/form-data"
                className="card mb-7 p-6"
            >
                <div className="mb-6 flex flex-col items-center gap-6 md:flex-row">
                    <div className="flex w-full max-w-[120px] items-center justify-center">
                        <div className="relative">
                            {imageUrl ? (
                                <img
                                    src={imageUrl}
                                    alt="linkdrop"
                                    className="h-[120px] w-[120px] rounded-full object-cover"
                                />
                            ) : (
                                <UserCircle className="h-[120px] w-[120px]" />
                            )}

                            <label
                                htmlFor="linkProfile"
                                className="absolute right-1.5 top-1.5 cursor-pointer"
                            >
                                <Camera className="h-7 w-7 text-green-500" />
                            </label>

                            <input
                                hidden
                                type="file"
                                name="thumbnail"
                                onChange={handleImageChange}
                                id="linkProfile"
                            ></input>
                        </div>

                        {errors.thumbnail && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.thumbnail}
                            </p>
                        )}
                    </div>
                    <div className="w-full">
                        <div className="mb-4">
                            <Label>Link Name</Label>

                            <Input
                                type="text"
                                name="link_name"
                                value={data.link_name}
                                onChange={onHandleChange}
                                required
                            />

                            <InputError message={errors.link_name} />
                        </div>

                        <div>
                            <Label>Short Bio</Label>

                            <Textarea
                                rows={4}
                                cols={3}
                                name="short_bio"
                                value={data.short_bio}
                                onChange={onHandleChange}
                                maxLength={200}
                            />

                            <InputError message={errors.short_bio} />
                        </div>
                    </div>
                </div>

                <Button
                    type="submit"
                    className="w-full py-2 text-base font-medium capitalize hover:shadow-md"
                >
                    Save Changes
                </Button>
            </form>
        </Card>
    );
};

export default LinkProfile;
