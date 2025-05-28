import TableHead from '@/components/table/table-head';
import TableNav from '@/components/table/table-nav';
import TablePagination from '@/components/table/table-pagination';
import { Card } from '@/components/ui/card';
import DashboardLayout from '@/layouts/dashboard/layout';
import { usersHead } from '@/Pages/Dashboard/Stripe/utils/table-head';
import { PageProps, PaginationProps, UserProps } from '@/types';
import { Head } from '@inertiajs/react';
import { UserCircle, Users } from 'lucide-react';
import { ReactNode, useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import UpdateUser from './Partials/UpdateUser';

interface Props extends PageProps {
    users: PaginationProps;
}

const Index = (props: Props) => {
    const data = useMemo(() => props.users.data, [props]);
    const columns = useMemo(() => usersHead, []);

    const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } =
        useTable({ columns, data }, useSortBy);

    return (
        <>
            <Head title="Dashboard" />

            <Card className="!shadow-card-hover border-none">
                <TableNav
                    data={props.users}
                    title="User List"
                    globalSearch={true}
                    tablePageSizes={[10, 15, 20, 25]}
                    searchPath={route('users.index')}
                    Icon={<Users className="h-6 w-6 text-primary" />}
                    // exportPath={route('users.export')}
                />

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
                                            const { image, status }: any =
                                                row.original;

                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-7 py-[18px] text-start text-gray-700 last:text-end"
                                                >
                                                    {column.id === 'photo' ? (
                                                        <>
                                                            {image ? (
                                                                <img
                                                                    src={image}
                                                                    className="h-10 w-10 rounded-full"
                                                                ></img>
                                                            ) : (
                                                                <UserCircle className="h-10 w-10 text-gray-600" />
                                                            )}
                                                        </>
                                                    ) : column.id ===
                                                      'status' ? (
                                                        <div className="">
                                                            <span className="w-12 rounded bg-gray-100 px-2 py-0.5 text-sm font-medium">
                                                                {Boolean(status)
                                                                    ? 'Active'
                                                                    : 'Deactive'}
                                                            </span>
                                                        </div>
                                                    ) : column.id ===
                                                      'action' ? (
                                                        <div className="flex items-center justify-end">
                                                            <UpdateUser
                                                                user={
                                                                    row.original as UserProps
                                                                }
                                                            />
                                                        </div>
                                                    ) : (
                                                        <span className="text-sm font-medium capitalize">
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

                <TablePagination
                    paginationInfo={props.users}
                    className="p-5 sm:p-7"
                />
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
