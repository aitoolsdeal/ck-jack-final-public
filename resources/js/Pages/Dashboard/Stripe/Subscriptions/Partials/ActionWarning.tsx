import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTrigger,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { router } from '@inertiajs/react';
import { ReactNode, useState } from 'react';

interface Props {
    type: 'success' | 'warning' | 'danger';
    route: string;
    message: string;
    Component: ReactNode;
    subscription_id: string;
    cancel_at_period_end: boolean;
}

const ActionWarning = (props: Props) => {
    const {
        type,
        route,
        message,
        Component,
        subscription_id,
        cancel_at_period_end,
    } = props;

    const [modal, setModal] = useState<boolean>(false);

    const statusHandler = () => {
        router.post(
            route,
            {
                id: subscription_id,
                cancel_at_period_end,
            },
            {
                onSuccess: () => {
                    setModal(false);
                },
            },
        );
    };

    return (
        <Dialog open={modal} onOpenChange={setModal}>
            <DialogTrigger asChild>{Component}</DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader
                    className={cn(
                        'rounded-md px-4 py-3',
                        type === 'warning'
                            ? 'bg-orange-100'
                            : type === 'danger'
                              ? 'bg-red-200'
                              : 'bg-primary-100',
                    )}
                >
                    <p className="text-center">{message}</p>
                </DialogHeader>

                <div className="flex items-center justify-center gap-6">
                    <Button
                        type="button"
                        onClick={statusHandler}
                        className="hover:bg-primary-hover mt-4 bg-primary px-5"
                    >
                        Submit
                    </Button>

                    <Button
                        type="button"
                        onClick={() => setModal(false)}
                        className="mt-4 border border-red-500 bg-transparent px-5 text-red-500 hover:bg-transparent"
                    >
                        Cancel
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ActionWarning;
