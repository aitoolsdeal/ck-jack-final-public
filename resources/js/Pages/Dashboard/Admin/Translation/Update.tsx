import Breadcrumb from '@/components/breadcrumb';
import Dashboard from '@/layouts/dashboard/layout';
import { Head } from '@inertiajs/react';
import { Languages } from 'lucide-react';
import { ReactNode } from 'react';
import EditAppTranslation from './Partials/EditAppTranslation';
import EditInputTranslation from './Partials/EditInputTranslation';

interface Props {
    appTrans: any;
    inputTrans: any;
    local: string;
}

const Update = ({ appTrans, inputTrans, local }: Props) => {
    return (
        <>
            <Head title={appTrans['add_languages']} />
            <Breadcrumb Icon={Languages} title={appTrans['add_languages']} />

            <EditAppTranslation app={appTrans} local={local} />
            <EditInputTranslation
                app={appTrans}
                input={inputTrans}
                local={local}
            />
        </>
    );
};

Update.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Update;
