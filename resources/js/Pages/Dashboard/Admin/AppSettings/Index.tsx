import Breadcrumb from '@/components/breadcrumb';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Dashboard from '@/layouts/dashboard/layout';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Check, Settings, X } from 'lucide-react';
import { nanoid } from 'nanoid';
import { ReactNode } from 'react';

interface Props extends PageProps {
    smtpStatus: boolean;
    stripeStatus: boolean;
    googleAuthStatus: boolean;
}

const AppSettings = (props: Props) => {
    const settings = [
        {
            id: nanoid(),
            title: 'Global Settings',
            slug: 'global',
            route: route('app-settings.show'),
            status: true,
            active_description: 'Application global setup is completed.',
            deactive_description: 'Application global setup is not completed.',
        },
        {
            id: nanoid(),
            title: 'SMTP Settings',
            slug: 'smtp',
            route: route('app-settings.show_smtp'),
            status: props.smtpStatus,
            active_description: 'SMTP setup is completed and activated.',
            deactive_description: 'SMTP setup is not completed and activated.',
        },
        {
            id: nanoid(),
            title: 'Auth Settings',
            slug: 'auth',
            route: route('app-settings.show_auth'),
            status: props.googleAuthStatus,
            active_description: 'Google auth setup is completed and activated.',
            deactive_description:
                'Google auth setup is not completed and activated.',
        },
        {
            id: nanoid(),
            title: 'Stripe Settings',
            slug: 'stripe',
            route: route('app-settings.show_stripe'),
            status: props.stripeStatus,
            active_description:
                'Stripe payment setup is completed and activated.',
            deactive_description:
                'Stripe payment setup is not completed and activated.',
        },
    ];

    return (
        <>
            <Head title="App Settings" />

            <div>
                <Breadcrumb Icon={Settings} title="App Settings Status" />

                <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
                    {settings.map(
                        ({
                            id,
                            title,
                            route,
                            status,
                            active_description,
                            deactive_description,
                        }) => (
                            <Card
                                key={id}
                                className={cn(
                                    status ? 'bg-green-50' : 'bg-red-50',
                                )}
                            >
                                <div className="flex items-center justify-between gap-5 border-b border-gray-300 p-6">
                                    <p className="font-semibold md:text-lg">
                                        {title}
                                    </p>

                                    <Button
                                        asChild
                                        size="icon"
                                        variant="secondary"
                                        className="h-8 w-8 rounded-full p-1"
                                    >
                                        <Link href={route}>
                                            <Settings />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="flex items-center justify-between gap-5 p-6">
                                    <p>
                                        {status
                                            ? active_description
                                            : deactive_description}
                                    </p>

                                    {status ? (
                                        <Check className="h-6 w-6 text-green-500" />
                                    ) : (
                                        <X className="h-6 w-6 text-red-500" />
                                    )}
                                </div>
                            </Card>
                        ),
                    )}
                </div>
            </div>

            {/* <div className="mt-12">
                <Breadcrumb Icon={GitCompare} title="App Log Viewer" />

                <div className="grid grid-cols-2 gap-8">
                    <Card className="p-6">
                        <p className="mb-8 text-sm">
                            From this monitor, you will see the overall app
                            errors, warnings, issues, etc for every interaction
                            of your app.
                        </p>

                        <a href="/admin/log-viewer" target="_blank">
                            <Button className="mr-6 py-2 text-base">
                                <span>View Logs Dashboard</span>
                            </Button>
                        </a>
                    </Card>
                </div>
            </div> */}
        </>
    );
};

AppSettings.layout = (page: ReactNode) => <Dashboard children={page} />;

export default AppSettings;
