import Breadcrumb from '@/components/breadcrumb';
import DeleteByInertia from '@/components/delete-by-inertia';
import LimitWarning from '@/components/limit-warning';
import TableHead from '@/components/table/table-head';
import TableNav from '@/components/table/table-nav';
import TablePagination from '@/components/table/table-pagination';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Dashboard from '@/layouts/dashboard/layout';
import { projectsHead } from '@/lib/table-head';
import { PageProps, PaginationProps, ProjectProps } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { format, parseISO } from 'date-fns';
import { Layers, Trash2 } from 'lucide-react';
import { ReactNode, useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';
import CreateProject from './Partials/CreateProject';
import EditProject from './Partials/EditProject';

interface Props extends PageProps {
    projects: PaginationProps;
    limit: boolean;
    message: string;
}

const Index = (props: Props) => {
    const { app } = props.translate;
    const projects = props.projects;
    const data = useMemo(() => props.projects.data, [props]);
    const columns = useMemo(() => projectsHead, []);

    const { rows, getTableProps, getTableBodyProps, headerGroups, prepareRow } =
        useTable({ columns, data }, useSortBy);

    const stringToDate = (str: string) => {
        const time = format(parseISO(str), 'hh:mm aa');
        const date = format(parseISO(str), 'dd MMM, yyyy');
        return { date, time };
    };

    return (
        <>
            <Head title={app.projects} />
            <Breadcrumb
                Icon={Layers}
                title={app.projects}
                Component={<CreateProject />}
            />
            <LimitWarning limit={props.limit} message={props.message} />

            <Card>
                <TableNav
                    data={projects}
                    globalSearch={true}
                    title={app.projects}
                    tablePageSizes={[10, 15, 20, 25]}
                    searchPath={route('projects.index')}
                    exportPath={route('projects.export')}
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
                                        className="border-b border-border"
                                    >
                                        {row.cells.map((cell) => {
                                            const { row, column } = cell;
                                            const {
                                                id,
                                                qrcodes,
                                                created_at,
                                                project_name,
                                            }: any = row.original;
                                            const { date, time } =
                                                stringToDate(created_at);

                                            return (
                                                <td
                                                    {...cell.getCellProps()}
                                                    className="px-7 py-[18px] text-start text-gray-700 last:text-end"
                                                >
                                                    {column.id === 'name' ? (
                                                        <p className="text-sm font-medium">
                                                            {project_name}
                                                        </p>
                                                    ) : column.id ===
                                                      'qrcodes' ? (
                                                        <p className="text-center font-medium">
                                                            {qrcodes.length}
                                                        </p>
                                                    ) : column.id === 'view' ? (
                                                        <>
                                                            {qrcodes.length >
                                                            0 ? (
                                                                <div className="flex justify-center">
                                                                    <Link
                                                                        href={route(
                                                                            'projects.show',
                                                                            {
                                                                                id,
                                                                            },
                                                                        )}
                                                                        className="flex w-20 items-center justify-center whitespace-nowrap rounded bg-gray-100 py-0.5 text-sm font-medium"
                                                                    >
                                                                        View QR
                                                                    </Link>
                                                                </div>
                                                            ) : (
                                                                <div className="flex justify-center">
                                                                    <span className="flex w-20 items-center justify-center whitespace-nowrap rounded bg-gray-100 py-0.5 text-sm font-medium">
                                                                        Empty
                                                                    </span>
                                                                </div>
                                                            )}
                                                        </>
                                                    ) : column.id ===
                                                      'action' ? (
                                                        <div className="flex items-center justify-end">
                                                            <EditProject
                                                                project={
                                                                    row.original as ProjectProps
                                                                }
                                                            />

                                                            <DeleteByInertia
                                                                apiPath={route(
                                                                    'projects.destroy',
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

                <TablePagination paginationInfo={projects} className="p-7" />
            </Card>
        </>
    );
};

Index.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Index;
