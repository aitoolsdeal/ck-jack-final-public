import { Button } from '@/components/ui/button';
import { router } from '@inertiajs/react';

const Cancel = () => {
    return (
        <div className="flex h-screen w-full flex-col items-center justify-center">
            <h2>Oppss! Payment Canceled</h2>

            <Button onClick={() => router.get('/dashboard')} className="mt-6">
                Back to Pricing
            </Button>
        </div>
    );
};

export default Cancel;
