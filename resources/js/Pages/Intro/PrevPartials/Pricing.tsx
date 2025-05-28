import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

interface Props {
    features: PricingPlanFeature;
}

const PricingFeature = ({ features }: Props) => {
    const { props } = usePage<PageProps>();
    const app = props.translate.app;

    const featureList = [
        `${features.biolinks ?? 'Unlimited'} ${app.biolinks_create}`,
        `${features.biolink_blocks} ${app.biolink_blocks_access}`,
        `${features.shortlinks ?? 'Unlimited'} ${app.shortlinks_create}`,
        `${features.projects ?? 'Unlimited'} ${app.projects_create}`,
        `${features.qrcodes ?? 'Unlimited'} ${app.qrcodes_create}`,
        `${features.themes} ${app.theme_access}`,
        features.custom_theme
            ? app.custom_theme_create_allow
            : app.custom_theme_create_not_allow,
        `${features.support} ${app.hours_support}`,
    ];

    return (
        <>
            {featureList.map((item, ind) => (
                <div
                    key={ind}
                    className="mb-4 flex items-center text-gray-700 last:mb-0"
                >
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <small>{item}</small>
                </div>
            ))}
        </>
    );
};

const Pricing = () => {
    const { props } = usePage<PageProps<{ pricingPlans: PricingPlan[] }>>();
    const { pricingPlans, auth } = props;

    return (
        <div className="pricing container py-20">
            <div className="mx-auto mb-10 max-w-[500px] text-center">
                <h2 className="mb-2 text-2xl font-bold md:text-4xl">
                    Pricing Plans
                </h2>
                <p className="text-sm text-gray-600 md:text-base">
                    Choose and get exactly what you need.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {pricingPlans.map(
                    ({
                        id,
                        type,
                        title,
                        description,
                        price,
                        product,
                        pricing_features,
                    }) => (
                        <Card className="relative">
                            <div className="border-b border-gray-300 p-6">
                                <p className="mb-3 text-sm capitalize">
                                    {type === 'free'
                                        ? type
                                        : price.recurring?.interval}
                                </p>
                                <h4 className="mb-2 text-lg font-bold uppercase text-gray-900 md:text-2xl">
                                    {type === 'free' ? (
                                        type
                                    ) : (
                                        <>
                                            {price.unit_amount / 100}{' '}
                                            <span className="text-sm">
                                                {price.currency}
                                            </span>
                                        </>
                                    )}
                                </h4>
                                <p className="mb-4 text-lg font-semibold text-gray-900">
                                    {type === 'free' ? title : product.name}{' '}
                                    Plan
                                </p>
                                <p className="text-sm">
                                    {type === 'free'
                                        ? description
                                        : product.description}
                                </p>
                            </div>

                            <div className="p-6">
                                {pricing_features ? (
                                    <PricingFeature
                                        features={pricing_features}
                                    />
                                ) : (
                                    <p className="text-sm">
                                        No features added yet
                                    </p>
                                )}

                                {auth.user &&
                                auth.user.data.pricing_plan_id === id ? (
                                    <Button
                                        disabled
                                        className="mt-4 w-full rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md"
                                    >
                                        Subscribed
                                    </Button>
                                ) : (
                                    <Link href={route('pricing-plans.index')}>
                                        <Button className="mt-4 w-full rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md">
                                            Select
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </Card>
                    ),
                )}
            </div>
        </div>
    );
};

export default Pricing;
