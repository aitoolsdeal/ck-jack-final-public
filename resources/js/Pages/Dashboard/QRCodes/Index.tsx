import Breadcrumb from '@/components/breadcrumb';
import DeleteByInertia from '@/components/delete-by-inertia';
import LimitWarning from '@/components/limit-warning';
import TableHead from '@/components/table/table-head';
import TableNav from '@/components/table/table-nav';
import TablePagination from '@/components/table/table-pagination';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Dashboard from '@/layouts/dashboard/layout';
import { qrCodesHead } from '@/lib/table-head';
import { pageChange } from '@/lib/utils';
import { PageProps, PaginationProps } from '@/types';
import { Head, router } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { QrCode, Trash2 } from 'lucide-react';
import { ReactNode, useEffect, useMemo, useState } from 'react';
import { useSortBy, useTable } from 'react-table';
import QRCodeDownloader2 from './Partials/QRCodeDownloader2';

interface Props extends PageProps {
    qrcodes: PaginationProps;
    limit: boolean;
    message: string;
}

const Index = (props: Props) => {
    const { app } = props.translate;
    const [qrcodes, setQRcodes] = useState(props.qrcodes);
    const data = useMemo(() => qrcodes.data, [qrcodes]);
    const columns = useMemo(() => qrCodesHead, []);

    const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } =
        useTable({ columns, data }, useSortBy);

    const stringToDate = (str: string) => {
        const time = format(parseISO(str), 'hh:mm aa');
        const date = format(parseISO(str), 'dd MMM, yyyy');
        return { date, time };
    };

    useEffect(() => {
        const change = pageChange(props.qrcodes, qrcodes);
        if (change) {
            setQRcodes(props.qrcodes);
        }
    }, [props]);

    return (
        <>
            <Head title={app.qr_codes} />
            <Breadcrumb
                Icon={QrCode}
                title={app.qr_codes}
                Component={
                    <Button
                        onClick={() => router.get(route('qrcodes.create'))}
                        className="rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md"
                    >
                        {app.create_qr_code}
                    </Button>
                }
            />
            <LimitWarning limit={props.limit} message={props.message} />

            <Card>
                <TableNav
                    data={qrcodes}
                    globalSearch={false}
                    tablePageSizes={[10, 15, 20, 25]}
                    title={app.qr_codes}
                />

                <div className="overflow-x-auto">
                    <table
                        {...getTableProps()}
                        className="w-full min-w-[800px]"
                    >
                        <thead>
                            <TableHead
                                justifyHead
                                headerGroups={headerGroups}
                            />
                        </thead>
                        <tbody {...getTableBodyProps()}>
                            {rows.map((row) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        {...row.getRowProps()}
                                        className="border-b border-gray-200 dark:border-neutral-500"
                                    >
                                        {row.cells.map((cell) => {
                                            const { row, column } = cell;
                                            const {
                                                id,
                                                link,
                                                link_id,
                                                project,
                                                img_data,
                                                project_id,
                                                created_at,
                                            }: any = row.original;
                                            const { date, time } =
                                                stringToDate(created_at);

                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-7 py-[18px] text-start font-medium text-gray-700 last:text-end"
                                                >
                                                    {column.id === 'qrcode' ? (
                                                        <img
                                                            src={img_data}
                                                            className="h-10 w-10"
                                                            alt=""
                                                        />
                                                    ) : column.id ===
                                                      'project' ? (
                                                        <p className="flex justify-center text-sm">
                                                            {project &&
                                                            project_id ? (
                                                                project.project_name
                                                            ) : (
                                                                <span>
                                                                    empty
                                                                </span>
                                                            )}
                                                        </p>
                                                    ) : column.id === 'link' ? (
                                                        <p className="text-center text-sm">
                                                            {link && link_id
                                                                ? link.link_name
                                                                : 'empty'}
                                                        </p>
                                                    ) : column.id ===
                                                      'action' ? (
                                                        <div className="flex items-center justify-end">
                                                            <QRCodeDownloader2
                                                                imageBlogData={
                                                                    img_data
                                                                }
                                                            />
                                                            <DeleteByInertia
                                                                apiPath={route(
                                                                    'qrcodes.destroy',
                                                                    { id },
                                                                )}
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
                                                    ) : (
                                                        column.id ===
                                                            'created' && (
                                                            <p className="text-center text-sm">
                                                                <span className="font-medium">
                                                                    {date}
                                                                </span>
                                                                <br />
                                                                <span className="text-xs">
                                                                    {time}
                                                                </span>
                                                            </p>
                                                        )
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                <TablePagination paginationInfo={qrcodes} className="p-7" />
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Index;
