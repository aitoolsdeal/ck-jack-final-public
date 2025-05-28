import debounce from '@/lib/debounce';
import queryValue from '@/lib/query-value';
import { PageProps, PaginationProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Search } from 'lucide-react';
import NProgress from 'nprogress';
import { ReactNode, useEffect, useRef } from 'react';
import TablePageSize from './table-page-size';

interface Props {
    data: PaginationProps;
    title: string;
    Icon?: ReactNode;
    component?: ReactNode;
    globalSearch: boolean;
    tablePageSizes: number[];
    searchPath?: string;
    exportPath?: string;
}

const TableNav = (props: Props) => {
    const {
        Icon,
        data,
        title,
        component,
        globalSearch,
        tablePageSizes,
        searchPath,
        exportPath,
    } = props;
    const page = usePage();
    const searchRef = useRef<HTMLInputElement>(null);
    const { auth } = page.props as PageProps;

    const searchHandler = debounce(async (e: any) => {
        const query = e.target.value;
        router.on('start', () => NProgress.remove());
        router.on('finish', () => NProgress.remove());

        router.get(
            `${searchPath}?page=1&per_page=${data.per_page}&search=${query}`,
        );
    }, 300);

    useEffect(() => {
        if (queryValue('search', page.url) && searchRef.current) {
            searchRef.current.focus();
        }
    }, [props]);

    return (
        <div className="items-center justify-between p-5 sm:p-7 md:flex">
            <div className="flex items-center gap-5">
                {Icon && (
                    <div className="bg-primary-25 flex h-10 w-10 items-center justify-center rounded-md">
                        {Icon}
                    </div>
                )}
                {title && (
                    <p className="mb-4 text-lg font-semibold text-gray-900 md:mb-0">
                        {title}
                    </p>
                )}
            </div>
            <div className="flex items-center justify-end">
                {globalSearch && (
                    <div className="relative w-full md:max-w-[260px]">
                        <input
                            type="text"
                            ref={searchRef}
                            placeholder="Search"
                            onChange={searchHandler}
                            className="h-10 w-full rounded-md border border-gray-200 py-[15px] pl-12 pr-4 text-sm font-normal text-gray-500 focus:border-primary focus:outline-0 focus:ring-0"
                            defaultValue={queryValue('search', page.url) ?? ''}
                        />
                        <Search className="absolute left-4 top-3 z-10 h-4 w-4 text-gray-700" />
                    </div>
                )}

                <TablePageSize
                    pageData={data}
                    dropdownList={tablePageSizes}
                    className="ml-3"
                />

                {/* {auth.user.role === "admin" && exportPath && (
                    <TableDataExport route={exportPath} />
                )} */}

                {component && component}
            </div>
        </div>
    );
};

export default TableNav;
