import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ComponentType } from 'react';

interface Props {
    title: string;
    onClick: () => void;
    Icon: ComponentType<any>;
    active: boolean;
}

const SidebarNavItem = ({ title, Icon, onClick, active }: Props) => {
    return (
        <Button
            variant="ghost"
            onClick={onClick}
            className={cn(
                'flex w-full items-center text-start text-gray-600 hover:text-primary',
                active ? 'bg-secondary text-primary' : 'text-gray-600',
            )}
        >
            <div className="w-4">
                <Icon className="h-4 w-4 text-inherit" />
            </div>

            <p className="ml-3 w-full whitespace-nowrap text-sm font-medium">
                {title}
            </p>
        </Button>
    );
};

export default SidebarNavItem;
