import Breadcrumb from '@/components/breadcrumb';
import DeleteByInertia from '@/components/delete-by-inertia';
import { Button } from '@/components/ui/button';
import Dashboard from '@/layouts/dashboard/layout';
import { ProjectProps } from '@/types';
import { Head } from '@inertiajs/react';
import { QrCode, Trash2 } from 'lucide-react';
import { ReactNode } from 'react';
import QRCodeDownloader from './Partials/QRCodeDownloader';

interface Props {
    project: ProjectProps;
}

const QRCodes = ({ project }: Props) => {
    return (
        <>
            <Head title={project.project_name} />
            <Breadcrumb Icon={QrCode} title={project.project_name} />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {project.qrcodes.map((qrcode) => (
                    <div
                        key={qrcode.id}
                        className="card relative overflow-hidden rounded-md"
                    >
                        <div className="absolute right-3 top-3">
                            <QRCodeDownloader imageBlogData={qrcode.img_data} />
                            <DeleteByInertia
                                apiPath={route('qrcodes.destroy', {
                                    id: qrcode.id,
                                })}
                                Component={
                                    <Button
                                        size="icon"
                                        className="ml-3 h-7 w-7 rounded-full bg-red-50 text-red-500 hover:bg-red-50 active:bg-red-50"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </div>
                        <img src={qrcode.img_data} alt="" className="w-full" />
                    </div>
                ))}
            </div>
        </>
    );
};

QRCodes.layout = (page: ReactNode) => <Dashboard children={page} />;

export default QRCodes;
