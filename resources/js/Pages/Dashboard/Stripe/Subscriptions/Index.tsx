import TableHead from '@/components/table/table-head';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ReactNode, useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import Pagination from '../Partials/Pagination';
import { subscriptionsHead } from '../utils/table-head';
import { timestampFormat } from '../utils/utils';
import Action from './Partials/Action';

interface Props {
    subscriptions: any;
    firstPage: boolean;
}

const Index = ({ subscriptions, firstPage }: Props) => {
    const { props } = usePage<PageProps>();

    if (!subscriptions.data) {
        subscriptions = {
            object: 'list',
            data: [],
            has_more: false,
            url: '',
        };
    }

    const data = useMemo(() => subscriptions.data, [props]);
    const columns = useMemo(() => subscriptionsHead, []);

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
                                                plan,
                                                status,
                                                currency,
                                                cancel_at,
                                                cancel_at_period_end,
                                            }: any = row.original;

                                            const created = timestampFormat(
                                                plan.created,
                                                'hh:mm:ss aa - dd MMMM yyyy',
                                            );
                                            const cancelled = timestampFormat(
                                                cancel_at,
                                                'hh:mm:ss aa - dd MMMM yyyy',
                                            );

                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-7 py-[18px] text-start text-gray-700 last:text-end"
                                                >
                                                    {column.id ===
                                                    'interval' ? (
                                                        <div className="capitalize">
                                                            <span className="w-12 rounded bg-gray-100 px-2 py-0.5 text-sm font-medium">
                                                                {plan.interval}
                                                            </span>
                                                        </div>
                                                    ) : column.id ===
                                                      'amount' ? (
                                                        <div className="uppercase">
                                                            <span className="w-12 rounded bg-gray-100 px-2 py-0.5 text-sm font-medium">
                                                                {currency}{' '}
                                                                {plan.amount /
                                                                    100}
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
                                                      'cancel_at' ? (
                                                        <div className="whitespace-nowrap text-sm">
                                                            {cancel_at_period_end
                                                                ? cancelled
                                                                : 'False'}
                                                        </div>
                                                    ) : column.id ===
                                                      'created' ? (
                                                        <div className="whitespace-nowrap text-sm">
                                                            {created}
                                                        </div>
                                                    ) : column.id ===
                                                      'action' ? (
                                                        <Action
                                                            subscription={
                                                                row.original
                                                            }
                                                        />
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
                    data={subscriptions}
                    firstPage={firstPage}
                    route={route('subscription.index')}
                />
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
