import { cn } from '@/lib/utils';
import { Check, X } from 'lucide-react';

interface Props {
    status: boolean;
    title: string;
    warning: string;
    success: string;
}

const SettingsHeader = ({ status, title, warning, success }: Props) => {
    return (
        <div
            className={cn(
                'flex items-center justify-between gap-6 space-y-1 border-b border-b-gray-200 px-7 pb-4 pt-7',
                status ? 'bg-green-50' : 'bg-red-50',
            )}
        >
            <div>
                <p className="text18 font-bold text-gray-900">{title}</p>

                <p
                    className={cn(
                        'text-xs italic',
                        status ? 'text-green-500' : 'text-red-500',
                    )}
                >
                    {status ? success : warning}
                </p>
            </div>

            <div>
                {status ? (
                    <Check className="h-6 w-6 text-green-500" />
                ) : (
                    <X className="h-6 w-6 text-red-500" />
                )}
            </div>
        </div>
    );
};

export default SettingsHeader;
