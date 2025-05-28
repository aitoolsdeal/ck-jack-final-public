import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PaginationProps } from '@/types';
import { router } from '@inertiajs/react';
import NProgress from 'nprogress';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';

interface Props {
    className: string;
    paginationInfo: PaginationProps;
}

const TablePagination = (props: Props) => {
    const {
        path,
        per_page,
        current_page,
        last_page,
        first_page_url,
        last_page_url,
        next_page_url,
        prev_page_url,
    } = props.paginationInfo;

    let dropdownList = [];
    if (last_page > 0) {
        for (let i = 1; i <= last_page; i++) {
            dropdownList.push({
                key: `${i}`,
                value: i,
            });
        }
    } else {
        dropdownList.push({
            key: '1',
            value: 1,
        });
    }

    const gotoPage = (e: number) => {
        router.on('start', () => NProgress.remove());
        router.on('finish', () => NProgress.remove());

        router.get(`${path}?page=${e}&per_page=${per_page}`);
    };

    const gotoRoute = (path: string) => {
        router.on('start', () => NProgress.remove());
        router.on('finish', () => NProgress.remove());

        router.get(`${path}&per_page=${per_page}`);
    };

    const menuItem = (e: number) => {
        return `text-center py-1 ${current_page === e && 'bg-primary-50'}`;
    };

    return (
        <div className={`${props.className}`}>
            <div className="mb-4 flex items-center justify-center md:hidden">
                <span className="mr-1">
                    <strong>
                        {current_page} of {last_page}
                    </strong>
                </span>
                <span className="mr-3">| Go to page:</span>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <Button
                            variant="secondary"
                            className="h-8 w-[60px] rounded-md border border-gray-200 text-gray-700 hover:border-primary"
                        >
                            {current_page}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="min-w-[60px]">
                        <ScrollArea className="">
                            {dropdownList.map((item) => (
                                <DropdownMenuItem
                                    key={item.key}
                                    onClick={() => gotoPage(item.value)}
                                    className={menuItem(item.value)}
                                >
                                    {item.value}
                                </DropdownMenuItem>
                            ))}
                        </ScrollArea>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <div className="flex items-center justify-center">
                <Button
                    color="white"
                    disabled={!prev_page_url}
                    onClick={() => gotoRoute(first_page_url as string)}
                    className="h-8 px-2 sm:px-3"
                >
                    {'<<First'}
                </Button>

                <Button
                    color="white"
                    disabled={!prev_page_url}
                    onClick={() => gotoRoute(prev_page_url as string)}
                    className="mx-3 h-8 px-2 sm:px-3"
                >
                    Prev
                </Button>

                <div className="hidden items-center md:flex">
                    <span className="mr-1">
                        Page{' '}
                        <strong>
                            {current_page} of {last_page}
                        </strong>
                    </span>
                    <span className="mr-3">| Go to page:</span>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Button
                                variant="secondary"
                                className="h-8 w-[60px] rounded-md border border-gray-200 text-gray-700 hover:border-primary"
                            >
                                {current_page}
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="min-w-[60px]"
                        >
                            <ScrollArea className="">
                                {dropdownList.map((item) => (
                                    <DropdownMenuItem
                                        key={item.key}
                                        onClick={() => gotoPage(item.value)}
                                        className={menuItem(item.value)}
                                    >
                                        {item.value}
                                    </DropdownMenuItem>
                                ))}
                            </ScrollArea>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>

                <Button
                    color="white"
                    disabled={!next_page_url}
                    onClick={() => gotoRoute(next_page_url as string)}
                    className="mx-3 h-8 px-2 sm:px-3"
                >
                    Next
                </Button>

                <Button
                    color="white"
                    disabled={!next_page_url}
                    onClick={() => gotoRoute(last_page_url as string)}
                    className="h-8 px-2 sm:px-3"
                >
                    {'Last>>'}
                </Button>
            </div>
        </div>
    );
};

export default TablePagination;
