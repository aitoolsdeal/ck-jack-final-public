import Breadcrumb from '@/components/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import languages from '@/data/languages';
import Dashboard from '@/layouts/dashboard/layout';
import { PageProps } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
import { Languages, Pencil } from 'lucide-react';
import { ReactNode } from 'react';
import AddTranslation from './Partials/AddTranslation';

const Index = () => {
    const { props } = usePage<PageProps>();
    const { app } = props.translate;

    const langs = props.translate.langs.map((item: any) => {
        const lang = languages.find((lang) => lang.code === item.code);
        return { ...lang, active: item.active };
    });

    const enLang = langs.find((lang: any) => lang.code === 'en');

    return (
        <>
            <Head title={app.translation} />
            <Breadcrumb
                Icon={Languages}
                title={app.translation}
                Component={<AddTranslation />}
            />

            <Card className="mx-auto w-full max-w-[1000px] p-6">
                <p className="mb-4 border-b border-b-gray-200 pb-2 text-lg font-bold text-gray-900">
                    {app.available_languages}
                </p>

                <div className="flex flex-col gap-5">
                    {enLang && (
                        <div
                            key={enLang.code}
                            className="mb-5 flex items-center justify-between rounded-md border border-gray-300 p-5"
                        >
                            <h6 className="text-xl">{enLang.name}</h6>

                            <div className="flex items-center">
                                <span className="mr-4 rounded-full bg-blue-50 px-2 py-0.5 text-sm font-medium">
                                    {app.default}
                                </span>
                                <Link
                                    href={route('translation.edit', {
                                        id: enLang.code as string,
                                    })}
                                >
                                    <Button
                                        size="icon"
                                        variant="secondary"
                                        className="mr-3 h-7 w-7 rounded-full text-blue-500"
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                </Link>
                                <Switch checked name={enLang.code as string} />
                            </div>
                        </div>
                    )}

                    {langs.map(
                        (lang) =>
                            lang &&
                            lang.code !== 'en' && (
                                <div
                                    key={lang.code}
                                    className="flex items-center justify-between rounded-md border border-gray-300 p-5"
                                >
                                    <h6 className="text-xl">{lang.name}</h6>

                                    <div className="flex items-center">
                                        <Link
                                            href={route('translation.edit', {
                                                id: lang.code as string,
                                            })}
                                        >
                                            <Button
                                                size="icon"
                                                variant="secondary"
                                                className="mr-3 h-7 w-7 rounded-full text-blue-500"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                        </Link>

                                        <Switch
                                            name={lang.code as string}
                                            onCheckedChange={() =>
                                                router.put(
                                                    route(
                                                        'lang.status',
                                                        lang.code,
                                                    ),
                                                )
                                            }
                                            defaultChecked={lang.active}
                                        />
                                    </div>
                                </div>
                            ),
                    )}
                </div>
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Index;
