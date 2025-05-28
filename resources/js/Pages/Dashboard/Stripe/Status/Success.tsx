import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

const Success = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <h6>Congratulations! Payment Successful</h6>

            <Button
                className="mt-6"
                onClick={() => router.get(route('pricing-plans.index'))}
            >
                Back to Dashboard
            </Button>
        </div>
    );
};

export default Success;
