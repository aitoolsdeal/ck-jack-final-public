import Breadcrumb from '@/components/breadcrumb';
import DeleteByInertia from '@/components/delete-by-inertia';
import LimitWarning from '@/components/limit-warning';
import TableHead from '@/components/table/table-head';
import TableNav from '@/components/table/table-nav';
import TablePagination from '@/components/table/table-pagination';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { shortLinksHead } from '@/lib/table-head';
import { LinkProps, PageProps, PaginationProps } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { ChartLine, LinkIcon, Trash2 } from 'lucide-react';
import { ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
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
    const data = useMemo(() => props.links.data, [props]);
    const columns = useMemo(() => shortLinksHead, []);
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

    const qrCodeRef: any = useRef(null);
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
            <Head title="Short Links" />
            <Breadcrumb
                Icon={LinkIcon}
                title={app.short_links}
                Component={<CreateLink />}
            />
            <LimitWarning limit={props.limit} message={props.message} />

            {createQR && (
                <div className="invisible absolute">
                    <QRCode
                        ref={qrCodeRef}
                        value={`${props.ziggy.url}/${createQR}`}
                    />
                </div>
            )}

            <Card>
                <TableNav
                    data={props.links}
                    globalSearch={true}
                    tablePageSizes={[10, 15, 20, 25]}
                    searchPath={route('short-links.index')}
                    exportPath={route('short-links.export')}
                    title={app.short_links}
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
                                                qrcode,
                                                visit,
                                                url_name,
                                                link_name,
                                            }: any = row.original;

                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-7 py-[18px] text-start last:text-end"
                                                >
                                                    {column.id === 'url' ? (
                                                        <a
                                                            target="_blank"
                                                            href={`${props.ziggy.url}/${url_name}`}
                                                            className="text-sm font-medium underline"
                                                        >
                                                            {`${props.ziggy.url}/${url_name}`}
                                                        </a>
                                                    ) : column.id === 'name' ? (
                                                        <p className="text-center text-sm font-medium">
                                                            {link_name}
                                                        </p>
                                                    ) : column.id === 'view' ? (
                                                        <div className="flex justify-center">
                                                            <Link
                                                                href={route(
                                                                    'link.analytics',
                                                                    {
                                                                        id,
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
                                                                    'short-links.destroy',
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
                                                    ) : null}
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
