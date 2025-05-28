import Breadcrumb from '@/components/breadcrumb';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import formats from '@/data/editor-formats';
import Dashboard from '@/layouts/dashboard/layout';
import { CustomPageProps, PageProps } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { PanelsTopLeft } from 'lucide-react';
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import CustomToolbar from './Partials/CustomToolbar';
window.katex = katex;

interface Props extends PageProps {
    custom_page: CustomPageProps;
}

const Update = ({ custom_page, translate }: Props) => {
    const { app, input } = translate;
    const [validRoute, setValidRoute] = useState(true);
    const modules = { toolbar: { container: '#toolbar' } };

    const { data, setData, put, errors, clearErrors } = useForm({
        name: custom_page.name ?? '',
        route: custom_page.route ?? '',
        content: custom_page.content ?? '',
    });

    const onHandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        if (name === 'route') {
            setData(name, value);

            if (value.length > 0) {
                // Input validation for characters and hyphen
                const regex = /^[a-z]+(-[a-z]+)*$/;
                const isValidInput = regex.test(value);

                setValidRoute(isValidInput);
            } else {
                setValidRoute(true);
            }
        } else {
            setData(name as 'name' | 'content', value);
        }
    };

    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validRoute) {
            clearErrors();
            put(route('custom-page.update', custom_page.id));
        }
    };

    return (
        <>
            <Head title={app.update_custom_page} />
            <Breadcrumb Icon={PanelsTopLeft} title={app.update_custom_page} />

            <Card className="mx-auto w-full max-w-[1200px]">
                <div className="border-b border-b-gray-200 px-7 pb-4 pt-7">
                    <p className="text18 font-bold text-gray-900">
                        {app.update_custom_page}
                    </p>
                </div>
                <form onSubmit={submit} className="p-7">
                    <div className="mb-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
                        <div>
                            <Label>{input.full_name}</Label>

                            <Input
                                type="text"
                                name="name"
                                value={data.name}
                                placeholder={input.full_name_placeholder}
                                onChange={onHandleChange}
                                required
                            />

                            <InputError message={errors.name} />
                        </div>

                        <div>
                            <Label>{input.page_route}</Label>

                            <Input
                                type="text"
                                name="route"
                                value={data.route}
                                placeholder={input.page_route_placeholder}
                                onChange={onHandleChange}
                                required
                            />

                            <InputError
                                message={
                                    (errors.route ?? !validRoute)
                                        ? 'Route should be characters and you can use hyphen(-) for separation'
                                        : ''
                                }
                            />
                        </div>
                    </div>

                    <div>
                        <small className="mb-1 flex w-full items-center whitespace-nowrap font-medium text-gray-500">
                            <span className="mr-1">{input.page_content}</span>
                            <span className="block text-red-500">*</span>
                        </small>
                        <div className="rounded-md border border-gray-300">
                            <CustomToolbar />
                            <ReactQuill
                                modules={modules}
                                formats={formats}
                                value={data.content}
                                onChange={(html) => setData('content', html)}
                                className="page-create border-0"
                            />
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={!validRoute}
                        className="mt-10"
                    >
                        {app.update_custom_page}
                    </Button>
                </form>
            </Card>
        </>
    );
};

Update.layout = (page: React.ReactNode) => <Dashboard children={page} />;

export default Update;
