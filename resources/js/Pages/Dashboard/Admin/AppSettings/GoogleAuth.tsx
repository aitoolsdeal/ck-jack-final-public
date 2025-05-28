import Breadcrumb from '@/components/breadcrumb';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/layouts/dashboard/layout';
import { PageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { ChangeEvent, FormEvent, ReactNode } from 'react';
import SettingsHeader from './Partials/SettingsHeader';

interface ExtendedPageProps extends PageProps {
    googleAuthStatus: boolean;
    googleClientID: string | null;
    googleClientSecret: string | null;
    googleRedirectURI: string | null;
}

const Auth = () => {
    const { props } = usePage<ExtendedPageProps>();
    const { app } = props.translate;

    const { data, setData, post, errors, clearErrors, processing } = useForm({
        google_client_id: props.googleClientID || '',
        google_client_secret: props.googleClientSecret || '',
        google_redirect_uri: props.googleRedirectURI || '',
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

        post(route('google-auth.credentials'));
    };

    return (
        <>
            <Head title="Auth Settings" />
            <Breadcrumb Icon={Settings} title="Google Auth Settings" />

            <Card className="mx-auto w-full max-w-[800px]">
                <SettingsHeader
                    status={props.googleAuthStatus}
                    title="Google Auth Credentials"
                    success="Google auth credentials are activated, now Login with Google option will be enabled from the Login page. New users can login/register with Google using their Google account."
                    warning="Without google auth credentials, you will not be able to use OAuth features. When you provide google auth credentials, then Login with Google option will be enable the Login page automatically."
                />

                <form onSubmit={submit} className="p-7">
                    <div className="grid grid-cols-1 gap-7">
                        <div>
                            <Label>Google Client ID</Label>

                            <Input
                                type="text"
                                name="google_client_id"
                                value={data.google_client_id}
                                onChange={onHandleChange}
                                placeholder="Enter your Google Client ID"
                            />

                            <InputError message={errors.google_client_id} />
                        </div>

                        <div>
                            <Label>Google Client Secret</Label>

                            <Input
                                type="text"
                                name="google_client_secret"
                                value={data.google_client_secret}
                                onChange={onHandleChange}
                                placeholder="Enter your Google Client Secret"
                            />

                            <InputError message={errors.google_client_secret} />
                        </div>

                        <div>
                            <Label>Google Redirect URI</Label>
                            <p className="text-xs">
                                Redirect URI should be{' '}
                                <span className="text-yellow-500">
                                    your_domain/login/google/callback
                                </span>
                            </p>

                            <Input
                                type="text"
                                name="google_redirect_uri"
                                value={data.google_redirect_uri}
                                onChange={onHandleChange}
                                placeholder="Enter your Google Redirect URI"
                            />

                            <InputError message={errors.google_redirect_uri} />
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

Auth.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Auth;
