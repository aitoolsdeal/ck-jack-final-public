import Breadcrumb from '@/components/breadcrumb';
import InputError from '@/components/input-error';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import DashboardLayout from '@/layouts/dashboard/layout';
import { PageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Settings, UserCircle } from 'lucide-react';
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react';

const Global = () => {
    const { props } = usePage<PageProps>();
    const { app, input } = props.translate;
    const { name, title, logo, description, copyright, banner } = props.app;

    const [logoUrl, setLogoUrl] = useState(logo);
    const [bannerUrl, setBannerUrl] = useState(banner);

    const { data, setData, post, errors, clearErrors, processing } = useForm({
        name,
        title,
        logo: null,
        description,
        copyright,
        banner: null,
    });

    const onHandleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.target as HTMLInputElement;
        setData({
            ...data,
            [target.name]: target.value,
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        post(route('app-settings.update'));
    };

    const handleImageChange = (e: any, filed: 'logo' | 'banner') => {
        const files = e.target.files;
        if (files && files[0]) {
            setData(filed, files[0]);

            if (filed === 'logo') {
                setLogoUrl(URL.createObjectURL(files[0]));
            } else {
                setBannerUrl(URL.createObjectURL(files[0]));
            }
        }
    };

    return (
        <>
            <Head title="Global Settings" />
            <Breadcrumb Icon={Settings} title="App Global Settings" />

            <Card className="mx-auto w-full max-w-[800px]">
                <div className="border-b border-b-gray-200 px-7 pb-4 pt-7">
                    <p className="text18 font-bold text-gray-900">
                        {app.global_settings}
                    </p>
                </div>

                <form onSubmit={submit} className="p-7">
                    <div className="grid grid-cols-1 gap-7">
                        <div>
                            <Label className="mb-1">{input.app_logo}</Label>
                            <div>
                                {logoUrl ? (
                                    <Avatar className="h-[100px] w-[100px]">
                                        <AvatarImage
                                            src={logoUrl}
                                            alt="linkdrop"
                                        />
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                ) : (
                                    <UserCircle className="text-blue-gray-500 h-[100px] w-[100px]" />
                                )}
                                <div className="mt-1 flex items-center">
                                    <label
                                        htmlFor="formFileSm"
                                        className="text12 whitespace-nowrap border border-gray-700 bg-gray-100 px-2.5 py-1.5 font-medium text-gray-900"
                                    >
                                        Choose Photo
                                    </label>
                                    <input
                                        hidden
                                        type="file"
                                        id="formFileSm"
                                        onChange={(e) =>
                                            handleImageChange(e, 'logo')
                                        }
                                    />
                                    <small className="ml-3 text-gray-500">
                                        PNG and Maximum 1MB
                                    </small>
                                </div>
                                {errors.logo && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.logo}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-5">
                            <div>
                                <Label>App Name</Label>

                                <Input
                                    name="name"
                                    value={data.name}
                                    placeholder="App Name"
                                    onChange={onHandleChange}
                                />

                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <Label>{input.app_title}</Label>

                                <Input
                                    required
                                    type="text"
                                    name="title"
                                    value={data.title}
                                    onChange={onHandleChange}
                                    placeholder={input.app_title_placeholder}
                                />

                                <InputError message={errors.title} />
                            </div>
                        </div>

                        <div>
                            <Label>{input.app_copyright}</Label>

                            <Input
                                type="text"
                                name="copyright"
                                value={data.copyright}
                                onChange={onHandleChange}
                                placeholder={input.app_copyright_placeholder}
                                required
                            />

                            <InputError message={errors.copyright} />
                        </div>

                        <div>
                            <Label>{input.app_description}</Label>

                            <Textarea
                                rows={3}
                                cols={10}
                                name="description"
                                value={data.description}
                                onChange={onHandleChange}
                                placeholder={input.app_description_placeholder}
                                required
                            />

                            <InputError message={errors.description} />
                        </div>

                        <div>
                            <Label>App Banner</Label>

                            <div className="relative">
                                <img
                                    className="w-full rounded-md border border-gray-200"
                                    src={bannerUrl}
                                    alt=""
                                />

                                <Button
                                    asChild
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                >
                                    <Label
                                        htmlFor="banner"
                                        className="cursor-pointer"
                                    >
                                        Upload Banner
                                    </Label>
                                </Button>
                                <input
                                    hidden
                                    id="banner"
                                    type="file"
                                    onChange={(e) =>
                                        handleImageChange(e, 'banner')
                                    }
                                />
                            </div>

                            <InputError message={errors.banner} />
                        </div>
                    </div>

                    <div className="mt-7 flex items-center">
                        <Button type="submit" disabled={processing}>
                            {app.save_changes}
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    );
};

Global.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Global;
