import Breadcrumb from '@/components/breadcrumb';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import DashboardLayout from '@/layouts/dashboard/layout';
import { PageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { ChangeEvent, ReactNode } from 'react';
import SettingsHeader from './Partials/SettingsHeader';

interface ExtendedPageProps extends PageProps {
    smtpStatus: boolean;
    mailHost: string;
    mailPort: string;
    mailEncryption: string;
    mailUsername: string;
    mailPassword: string;
    mailFromAddress: string;
    mailFromName: string;
}

const SMTP = () => {
    const { props } = usePage<ExtendedPageProps>();

    const { data, errors, post, setData, processing } = useForm({
        mail_mailer: 'smtp',
        mail_host: props.mailHost || '',
        mail_port: props.mailPort || '',
        mail_encryption: props.mailEncryption || 'tls',
        mail_username: props.mailUsername || '',
        mail_password: props.mailPassword || '',
        mail_address: props.mailFromAddress || '',
        mail_from_name: props.mailFromName || '',
        admin_email: '',
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

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('app-settings.store_smtp'));
    };

    return (
        <>
            <Head title="SMTP Settings" />
            <Breadcrumb Icon={Settings} title="SMTP Settings" />

            <Card className="mx-auto w-full max-w-[800px]">
                <SettingsHeader
                    status={props.smtpStatus}
                    title="Setup SMTP Settings"
                    success="SMTP credentials are activated, new users can register in your app now."
                    warning="Without SMTP credentials new users will can't register in your app."
                />

                <form onSubmit={submit} className="space-y-6 p-7">
                    <div>
                        <Label>Mail Mailer</Label>

                        <Input type="text" readOnly value={data.mail_mailer} />

                        <InputError message={errors.mail_mailer} />
                    </div>

                    <div>
                        <Label>Mail Host</Label>

                        <Input
                            type="text"
                            name="mail_host"
                            value={data.mail_host}
                            onChange={onHandleChange}
                            placeholder="Mail Host"
                        />

                        <InputError message={errors.mail_host} />
                    </div>

                    <div>
                        <Label>Mail Port</Label>

                        <Input
                            type="text"
                            name="mail_port"
                            value={data.mail_port}
                            onChange={onHandleChange}
                            placeholder="Mail Port"
                        />

                        <InputError message={errors.mail_port} />
                    </div>

                    <div>
                        <Label>Mail Username</Label>

                        <Input
                            type="text"
                            name="mail_username"
                            value={data.mail_username}
                            onChange={onHandleChange}
                            placeholder="Mail Username"
                        />

                        <InputError message={errors.mail_username} />
                    </div>

                    <div>
                        <Label>Mail Password</Label>

                        <Input
                            type="password"
                            name="mail_password"
                            value={data.mail_password}
                            onChange={onHandleChange}
                            placeholder="Mail password"
                        />

                        <InputError message={errors.mail_password} />
                    </div>

                    <div>
                        <Label>Mail Encryption</Label>

                        <Select
                            name="mail_encryption"
                            value={data.mail_encryption}
                            onValueChange={(value) =>
                                setData('mail_encryption', value)
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Mail Encryption" />
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="tls">TLS</SelectItem>
                                <SelectItem value="ssl">SSL</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div>
                        <Label>Mail From Address</Label>

                        <Input
                            type="email"
                            name="mail_address"
                            value={data.mail_address}
                            onChange={onHandleChange}
                            placeholder="Mail From Address"
                        />

                        <InputError message={errors.mail_address} />
                    </div>

                    <div>
                        <Label>Mail From Name</Label>

                        <Input
                            type="text"
                            name="mail_from_name"
                            value={data.mail_from_name}
                            onChange={onHandleChange}
                            placeholder="Mail From Name"
                        />

                        <InputError message={errors.mail_from_name} />
                    </div>

                    <div>
                        <Label>Admin Email (For sending test mail)</Label>

                        <Input
                            type="email"
                            name="admin_email"
                            value={data.admin_email}
                            onChange={onHandleChange}
                            placeholder="Type an admin email for sending test mail"
                        />

                        <InputError message={errors.admin_email} />
                    </div>

                    <div className="mt-7 flex items-center">
                        <Button type="submit" disabled={processing}>
                            Save Changes
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    );
};

SMTP.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default SMTP;
