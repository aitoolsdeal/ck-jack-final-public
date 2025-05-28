import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import ChangeEmail from './Partials/ChangeEmail';
import ChangePassword from './Partials/ChangePassword';
import ForgetPassword from './Partials/ForgetPassword';
import ProfileUpdate from './Partials/ProfileUpdate';

const Settings = () => {
    return (
        <>
            <Head title="Settings" />

            <div className="grid grid-cols-1 items-start gap-7 md:grid-cols-3">
                <ProfileUpdate />

                <Card className="col-span-3 md:col-span-2">
                    <ForgetPassword />
                    <ChangePassword />
                    <ChangeEmail />
                </Card>
            </div>
        </>
    );
};

Settings.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Settings;
