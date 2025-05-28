import TableHead from '@/components/table/table-head';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { chargesHead } from '@/Pages/Dashboard/Stripe/utils/table-head';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { ReactNode, useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import Pagination from '../Partials/Pagination';

const Index = ({
    charges,
    firstPage,
}: {
    charges: any;
    firstPage: boolean;
}) => {
    const { props } = usePage<PageProps>();

    if (!charges.data) {
        charges = {
            object: 'list',
            data: [],
            has_more: false,
            url: '',
        };
    }

    const data = useMemo(() => charges.data, [props]);
    const columns = useMemo(() => chargesHead, []);

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
                                                amount,
                                                created,
                                                status,
                                                currency,
                                                receipt_url,
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
                                                    {column.id === 'amount' ? (
                                                        <div className="uppercase">
                                                            <span className="w-12 rounded bg-gray-100 px-2 py-0.5 text-sm font-medium">
                                                                {currency}{' '}
                                                                {amount / 100}
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
                                                      'created' ? (
                                                        <div className="whitespace-nowrap text-sm">
                                                            {formattedDate}
                                                        </div>
                                                    ) : column.id ===
                                                      'action' ? (
                                                        <a
                                                            href={receipt_url}
                                                            target="_blank"
                                                        >
                                                            <Button className="h-8 border border-primary bg-transparent px-3 text-primary hover:bg-transparent">
                                                                Receipt
                                                            </Button>
                                                        </a>
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
                    data={charges}
                    firstPage={firstPage}
                    route={route('single-charge.index')}
                />
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
