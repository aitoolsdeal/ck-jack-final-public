import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import ActionWarning from './ActionWarning';

const Action = ({ subscription }: { subscription: any }) => {
    const { id, cancel_at_period_end } = subscription;

    return (
        <div className="flex items-center justify-end gap-3">
            <ActionWarning
                type={cancel_at_period_end ? 'success' : 'warning'}
                route={route('subscription.status')}
                message={
                    cancel_at_period_end
                        ? 'If you resume then this price will be charge after period end'
                        : 'If you cancel it then subscription be close after period end'
                }
                Component={
                    <Button
                        className={cn(
                            'h-8 px-3',
                            cancel_at_period_end
                                ? 'bg-primary hover:bg-primary'
                                : 'bg-orange-500 hover:bg-orange-600',
                        )}
                    >
                        {cancel_at_period_end ? 'Resume' : 'Cancel'}
                    </Button>
                }
                subscription_id={id}
                cancel_at_period_end={cancel_at_period_end}
            />

            <ActionWarning
                type="danger"
                route={route('subscription.status.cancel')}
                message="After cancelled you can't reactive this plan, it will be delete permanently."
                Component={
                    <Button className="h-8 bg-red-500 px-3 hover:bg-red-500">
                        Cancel Now
                    </Button>
                }
                subscription_id={id}
                cancel_at_period_end={cancel_at_period_end}
            />
        </div>
    );
};

export default Action;
