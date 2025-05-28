import { ChevronsDown } from 'lucide-react';

interface Props {
    className?: string;
    centerHead?: boolean;
    justifyHead?: boolean;
    headerGroups: any[];
}

const TableHead = (props: Props) => {
    const { className, centerHead, justifyHead, headerGroups } = props;
    let headStyle = 'text-start last:text-end';
    if (centerHead) {
        headStyle = 'text-center';
    }
    if (justifyHead) {
        headStyle = 'text-center first:text-start last:text-end';
    }

    return (
        <>
            {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column: any) => (
                        <th
                            {...column.getHeaderProps(
                                column.getSortByToggleProps(),
                            )}
                            className={`bg-gray-50 px-7 py-4 text-sm font-bold text-gray-500 ${headStyle} ${className}`}
                        >
                            <span className="relative whitespace-nowrap pr-4">
                                {column.render('Header')}
                                <ChevronsDown className="absolute right-0 top-1/2 ml-1 h-3 w-3 -translate-y-1/2 transform" />
                            </span>
                        </th>
                    ))}
                </tr>
            ))}
        </>
    );
};

export default TableHead;
