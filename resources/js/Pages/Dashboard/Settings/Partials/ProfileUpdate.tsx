import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

const ProfileUpdate = () => {
    const { props } = usePage<PageProps>();

    const { name, image } = props.auth.user.data;
    const [imageUrl, setImageUrl] = useState(image);

    const { data, setData, post, errors, clearErrors } = useForm({
        name: name,
        image: null,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();
        post(route('settings.profile'));
    };

    const handleImageChange = (e: any) => {
        const files = e.target.files;
        if (files && files[0]) {
            setData('image', files[0]);
            setImageUrl(URL.createObjectURL(files[0]));
        }
    };

    return (
        <Card className="px-10 py-8 md:px-12 md:py-10">
            <form onSubmit={submit}>
                <div className="flex flex-col items-center text-center">
                    <div className="relative mb-4 h-[100px] w-[100px]">
                        {imageUrl ? (
                            <img
                                alt="item-1"
                                src={imageUrl}
                                className="h-[100px] w-[100px] rounded-full"
                            />
                        ) : (
                            <div className="h-[100px] w-[100px] rounded-full bg-gray-300"></div>
                        )}

                        <label
                            htmlFor="formFileSm"
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                                <Camera className="h-6 w-6 text-gray-500" />
                            </div>
                        </label>
                        <input
                            hidden
                            id="formFileSm"
                            type="file"
                            onChange={handleImageChange}
                        />
                    </div>

                    <small className="text-gray-500">
                        Allowed: JPG, JPEG, PNG, SVG File, Maximum 2MB
                    </small>

                    {errors.image && (
                        <p className="mt-1 text-sm text-red-500">
                            {errors.image}
                        </p>
                    )}
                </div>

                <div className="mb-10 mt-6">
                    <Input
                        required
                        type="name"
                        name="name"
                        value={data.name}
                        placeholder="Write your full name"
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError message={errors.name} className="mt-2" />
                </div>

                <Button type="submit" className="h-9 w-full">
                    Save Changes
                </Button>
            </form>
        </Card>
    );
};

export default ProfileUpdate;
