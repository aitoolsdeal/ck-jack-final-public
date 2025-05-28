import Breadcrumb from '@/components/breadcrumb';
import { Button } from '@/components/ui/button';
import DashboardLayout from '@/layouts/dashboard/layout';
import { PageProps } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { DollarSignIcon } from 'lucide-react';
import { ReactNode } from 'react';
import PricingCard from './Partials/PricingCard';

const Index = ({ pricingPlans }: { pricingPlans: PricingPlan[] }) => {
    const { props } = usePage<PageProps>();
    const user = props.auth.user;

    return (
        <>
            <Head title="Pricing Management" />
            <Breadcrumb
                Icon={DollarSignIcon}
                title="Pricing Management"
                Component={
                    user.data.role === 'admin' && (
                        <Button
                            onClick={() =>
                                router.get(route('pricing-plans.create'))
                            }
                        >
                            Create Plan
                        </Button>
                    )
                }
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {pricingPlans.map((pricing) => (
                    <PricingCard key={pricing.id} pricing={pricing} />
                ))}
            </div>
        </>
    );
};

Index.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Index;
