import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { PaginationProps } from '@/types';
import { router } from '@inertiajs/react';
import { ChevronsUpDown } from 'lucide-react';
import NProgress from 'nprogress';

interface Props {
    className?: string;
    pageData: PaginationProps;
    dropdownList: number[];
}

const TablePageSize = (props: Props) => {
    const { pageData, dropdownList, className } = props;
    const { path, per_page, current_page } = pageData;

    const gotoPage = (current: number, size: number) => {
        router.on('start', () => NProgress.remove());
        router.on('finish', () => NProgress.remove());

        router.get(`${path}?page=${current}&per_page=${size}`);
    };

    return (
        <div className={`relative h-10 ${className}`}>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                <ChevronsUpDown className="h-3 w-3 text-gray-700" />
            </span>

            <DropdownMenu>
                <DropdownMenuTrigger>
                    <Button
                        variant="secondary"
                        className="w-[72px] justify-start border border-gray-200 text-gray-700 hover:border-primary"
                    >
                        {per_page}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[72px]">
                    {dropdownList.map((item) => (
                        <DropdownMenuItem
                            key={item}
                            onClick={() => gotoPage(current_page, item)}
                            className={`text-center ${
                                per_page === item && 'bg-gray-100'
                            }`}
                        >
                            {item}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default TablePageSize;
