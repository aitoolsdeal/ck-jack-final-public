import Breadcrumb from '@/components/breadcrumb';
import DeleteByInertia from '@/components/delete-by-inertia';
import LimitWarning from '@/components/limit-warning';
import TableHead from '@/components/table/table-head';
import TableNav from '@/components/table/table-nav';
import TablePagination from '@/components/table/table-pagination';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { bioLinksHead } from '@/lib/table-head';
import { LinkProps, PageProps, PaginationProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ChartLine, Link as LinkIcon, Trash2 } from 'lucide-react';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { QRCode } from 'react-qrcode-logo';
import { useSortBy, useTable } from 'react-table';
import CreateLink from './Partials/CreateLink';
import EditLink from './Partials/EditLink';

interface Props extends PageProps {
    links: PaginationProps;
    limit: boolean;
    message: string;
}

const Index = (props: Props) => {
    const { user } = props.auth;
    const { app } = props.translate;
    const qrCodeRef: any = useRef(null);
    const data = useMemo(() => props.links.data, [props]);
    const columns = useMemo(() => bioLinksHead, []);
    const [copied, setCopied] = useState<number | null>(null);
    const [createQR, setCreateQR] = useState({
        link_id: null,
        link_url: null,
    });

    const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } =
        useTable({ columns, data }, useSortBy);

    useEffect(() => {
        if (copied) {
            setTimeout(() => {
                setCopied(null);
            }, 1000);
        }
    }, [copied]);

    useEffect(() => {
        if (createQR.link_id && createQR.link_url) {
            const qrCode = qrCodeRef.current.canvasRef.current.toDataURL();

            if (qrCode) {
                router.post(route('qrcodes.store'), {
                    user_id: user.data.id,
                    img_data: qrCode,
                    qr_type: 'link_qr',
                    link_id: createQR.link_id,
                    content: `${props.ziggy.url}/${createQR.link_url}`,
                });
            }

            setTimeout(
                () =>
                    setCreateQR({
                        link_id: null,
                        link_url: null,
                    }),
                500,
            );
        }
    }, [createQR]);

    return (
        <>
            <Head title={app['bio_links']} />
            <Breadcrumb
                Icon={LinkIcon}
                title={app['bio_links']}
                Component={<CreateLink />}
            />
            <LimitWarning limit={props.limit} message={props.message} />

            {createQR.link_id && createQR.link_url && (
                <div className="invisible absolute">
                    <QRCode
                        ref={qrCodeRef}
                        value={`${props.ziggy.url}/${createQR.link_url}`}
                    />
                </div>
            )}

            <Card>
                <TableNav
                    data={props.links}
                    globalSearch={true}
                    tablePageSizes={[10, 15, 20, 25]}
                    searchPath={route('bio-links.index')}
                    exportPath={route('bio-links.export')}
                    title={app['bio_links']}
                />

                <div className="overflow-x-auto">
                    <table
                        {...getTableProps()}
                        className="w-full min-w-[1000px]"
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
                                                url_name,
                                                visit,
                                                qrcode,
                                            }: any = row.original;

                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-7 py-[18px] text-start last:text-end"
                                                >
                                                    {column.id ===
                                                    'customize' ? (
                                                        <div className="text-center">
                                                            <Link
                                                                href={route(
                                                                    'customize.show',
                                                                    {
                                                                        id,
                                                                    },
                                                                )}
                                                                className="rounded-md bg-blue-50 px-2 py-1 text-sm font-medium text-blue-500 hover:bg-blue-50 active:bg-blue-50"
                                                            >
                                                                Customize
                                                            </Link>
                                                        </div>
                                                    ) : column.id ===
                                                      'visit' ? (
                                                        <div className="text-center">
                                                            <a
                                                                target="_blank"
                                                                href={`/${url_name}`}
                                                                className="rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-500 hover:bg-green-50 active:bg-green-50"
                                                            >
                                                                Visit Link
                                                            </a>
                                                        </div>
                                                    ) : column.id === 'view' ? (
                                                        <div className="flex justify-center">
                                                            <Link
                                                                href={route(
                                                                    'link.analytics',
                                                                    {
                                                                        id,
                                                                        date: 'today',
                                                                    },
                                                                )}
                                                                className="flex w-12 items-center justify-center rounded bg-gray-100 py-0.5 text-sm"
                                                            >
                                                                <ChartLine className="text-gray-700" />
                                                                <span className="ml-1">
                                                                    {visit
                                                                        ? visit.count
                                                                        : 0}
                                                                </span>
                                                            </Link>
                                                        </div>
                                                    ) : column.id ===
                                                      'qrcode' ? (
                                                        <div className="flex justify-center">
                                                            {qrcode ? (
                                                                <img
                                                                    className="h-10 w-10 rounded-sm"
                                                                    src={
                                                                        qrcode.img_data
                                                                    }
                                                                    alt=""
                                                                />
                                                            ) : (
                                                                <Button
                                                                    variant="secondary"
                                                                    onClick={() =>
                                                                        setCreateQR(
                                                                            {
                                                                                link_id:
                                                                                    id,
                                                                                link_url:
                                                                                    url_name,
                                                                            },
                                                                        )
                                                                    }
                                                                    className="h-7 px-2"
                                                                >
                                                                    Create QR
                                                                </Button>
                                                            )}
                                                        </div>
                                                    ) : column.id === 'copy' ? (
                                                        <div className="flex justify-center">
                                                            <CopyToClipboard
                                                                text={`${props.ziggy.url}/${url_name}`}
                                                                onCopy={() =>
                                                                    setCopied(
                                                                        id,
                                                                    )
                                                                }
                                                            >
                                                                <Button
                                                                    variant="secondary"
                                                                    className="h-7 px-2"
                                                                >
                                                                    {copied ===
                                                                    id
                                                                        ? 'Copied'
                                                                        : 'Copy'}
                                                                </Button>
                                                            </CopyToClipboard>
                                                        </div>
                                                    ) : column.id ===
                                                      'action' ? (
                                                        <div className="flex items-center justify-end">
                                                            <EditLink
                                                                link={
                                                                    row.original as LinkProps
                                                                }
                                                            />

                                                            <DeleteByInertia
                                                                apiPath={route(
                                                                    'bio-links.destroy',
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
                                                        <span
                                                            className={`text-sm text-gray-700 ${
                                                                column.id ===
                                                                    'name' &&
                                                                'font-bold'
                                                            }`}
                                                        >
                                                            {cell.render(
                                                                'Cell',
                                                            )}
                                                        </span>
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

                <TablePagination paginationInfo={props.links} className="p-7" />
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
