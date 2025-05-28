import TableHead from '@/components/table/table-head';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { invoicesHead } from '@/Pages/Dashboard/Stripe/utils/table-head';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { ReactNode, useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import Pagination from '../Partials/Pagination';

interface Props {
    invoices: any;
    firstPage: boolean;
}

const Index = ({ invoices, firstPage }: Props) => {
    const { props } = usePage<PageProps>();

    if (!invoices.data) {
        invoices = {
            object: 'list',
            data: [],
            has_more: false,
            url: '',
        };
    }

    const data = useMemo(() => invoices.data, [props]);
    const columns = useMemo(() => invoicesHead, []);

    const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <>
            <Head title="Subscriptions" />

            <Card>
                <div className="overflow-x-auto">
                    <table
                        {...getTableProps()}
                        className="w-full min-w-[1000px]"
                    >
                        <thead>
                            <TableHead headerGroups={headerGroups} />
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
                                                total,
                                                status,
                                                created,
                                                currency,
                                                invoice_pdf,
                                                hosted_invoice_url,
                                            }: any = row.original;

                                            const date = new Date(
                                                created * 1000,
                                            );

                                            const formattedDate = format(
                                                date,
                                                'hh:mm:ss aa - dd MMMM yyyy',
                                            );

                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-7 py-[18px] text-start text-gray-700 last:text-end"
                                                >
                                                    {column.id === 'total' ? (
                                                        <div className="uppercase">
                                                            <span className="w-12 rounded bg-gray-100 px-2 py-0.5 text-sm font-medium">
                                                                {currency}{' '}
                                                                {total / 100}
                                                            </span>
                                                        </div>
                                                    ) : column.id ===
                                                      'status' ? (
                                                        <div className="capitalize">
                                                            <span className="w-12 rounded bg-gray-100 px-2 py-0.5 text-sm font-medium">
                                                                {status}
                                                            </span>
                                                        </div>
                                                    ) : column.id ===
                                                      'invoice_type' ? (
                                                        <div className="text-sm font-medium capitalize">
                                                            {invoice_pdf
                                                                ? 'Subscription'
                                                                : 'Single Charge'}
                                                        </div>
                                                    ) : column.id ===
                                                      'created' ? (
                                                        <div className="whitespace-nowrap text-sm">
                                                            {formattedDate}
                                                        </div>
                                                    ) : column.id ===
                                                      'action' ? (
                                                        <div className="flex items-center justify-end gap-3">
                                                            <a
                                                                href={
                                                                    hosted_invoice_url
                                                                }
                                                                target="_blank"
                                                            >
                                                                <Button className="h-8 border border-primary bg-transparent px-3 text-primary hover:bg-transparent">
                                                                    VIew
                                                                </Button>
                                                            </a>
                                                            <a
                                                                href={
                                                                    invoice_pdf
                                                                }
                                                                target="_blank"
                                                            >
                                                                <Button className="h-8 border border-primary bg-transparent px-3 text-primary hover:bg-transparent">
                                                                    Download
                                                                </Button>
                                                            </a>
                                                        </div>
                                                    ) : (
                                                        <span
                                                            className={`text-sm font-medium`}
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

                <Pagination
                    data={invoices}
                    firstPage={firstPage}
                    route={route('invoices.index')}
                />
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
