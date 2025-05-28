import Breadcrumb from '@/components/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Dashboard from '@/layouts/dashboard/layout';
import { CustomPageProps, PageProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { PanelsTopLeft, Pencil, Trash } from 'lucide-react';
import { ReactNode } from 'react';

interface Props extends PageProps {
    custom_pages: CustomPageProps[];
}

const Index = ({ custom_pages, translate }: Props) => {
    const { app } = translate;

    return (
        <>
            <Head title={app.custom_page} />
            <Breadcrumb Icon={PanelsTopLeft} title={app.custom_page} />

            <Card className="grid grid-cols-1 gap-7 p-7 md:grid-cols-2 lg:grid-cols-3">
                <div className="col-span-1 md:col-span-2 lg:col-span-3">
                    <Link href={route('custom-page.create')}>
                        <Button>{app.create_custom_page}</Button>
                    </Link>
                </div>

                {custom_pages.map((item) => (
                    <Card key={item.id} className="relative rounded-lg p-6">
                        <div className="mb-4">
                            <Link href={route('custom-page.edit', item.id)}>
                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="h-7 w-7 rounded-full text-blue-500"
                                >
                                    <Pencil className="h-4 w-4" />
                                </Button>
                            </Link>

                            <Button
                                size="icon"
                                className="ml-3 h-7 w-7 rounded-full bg-red-50 text-red-500 hover:bg-red-50"
                                onClick={() =>
                                    router.delete(
                                        route('custom-page.destroy', item.id),
                                    )
                                }
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>

                        <p className="text18 mb-1.5 font-medium">{item.name}</p>
                        <small className="text-gray-500 dark:text-gray-300">
                            {item.route}
                        </small>
                    </Card>
                ))}
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Index;
