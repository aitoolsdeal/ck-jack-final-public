import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Edit2Icon } from 'lucide-react';
import ActionWarning from '../../Subscriptions/Partials/ActionWarning';
import PricingFeature from './PricingFeatures';

const PricingCard = ({ pricing }: { pricing: PricingPlan }) => {
    const { props } = usePage<PageProps>();
    const user = props.auth.user;

    const { id, type, title, description, price, product, pricing_features } =
        pricing;

    const plansEdit = route('pricing-plans.edit', { pricing_plan: id });

    return (
        <Card className="relative p-6">
            {user.data.role === 'admin' && (
                <Button
                    size="icon"
                    variant="secondary"
                    onClick={() => router.get(plansEdit)}
                    className="hover:bg-primary-hover absolute right-6 top-6 h-8 w-8 rounded-full bg-primary"
                >
                    <Edit2Icon className="h-4 w-4 text-primary-foreground" />
                </Button>
            )}

            <p className="mb-3 text-sm capitalize">
                {type === 'free' ? type : price.recurring?.interval}
            </p>
            <h4 className="font-bold uppercase text-gray-900">
                {type === 'free' ? (
                    type
                ) : (
                    <>
                        {price.unit_amount / 100}{' '}
                        <span className="text-sm">{price.currency}</span>
                    </>
                )}
            </h4>
            <p className="text18 font-bold text-gray-900">
                {type === 'free' ? title : product.name}
            </p>
            <p className="mt-6 text-sm">
                {type === 'free' ? description : product.description}
            </p>

            <div className="py-6">
                {pricing_features ? (
                    <PricingFeature features={pricing_features} />
                ) : (
                    <p className="text-sm">No features added yet</p>
                )}
            </div>

            {user.data.role === 'admin' ? (
                <Link
                    href={
                        pricing_features
                            ? route('pricing-feature.edit', {
                                  pricing_feature: pricing_features.id,
                              })
                            : route('pricing-feature.create', {
                                  pricing_plan: id,
                              })
                    }
                >
                    <Button
                        onClick={() =>
                            router.get(
                                route('pricing-feature.create', {
                                    pricing_plan: id,
                                }),
                            )
                        }
                        className="w-full rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md"
                    >
                        {pricing_features ? 'Update Features' : 'Add Features'}
                    </Button>
                </Link>
            ) : (
                <>
                    {user.data.pricing_plan_id === id ? (
                        <Button
                            disabled
                            className="w-full rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md"
                        >
                            Subscribed
                        </Button>
                    ) : (
                        <>
                            {price ? (
                                <a
                                    href={
                                        price.recurring
                                            ? route('subscription.checkout', {
                                                  id,
                                              })
                                            : route('single-charge.checkout', {
                                                  id,
                                              })
                                    }
                                >
                                    <Button className="w-full rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md">
                                        Select
                                    </Button>
                                </a>
                            ) : (
                                <>
                                    {user.data.stripe_subscription_id ? (
                                        <ActionWarning
                                            type="danger"
                                            route={route(
                                                'subscription.status.cancel',
                                            )}
                                            message="After selecting basic plan, your current subscription will be delete permanently."
                                            Component={
                                                <Button className="w-full rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md">
                                                    Select
                                                </Button>
                                            }
                                            subscription_id={
                                                user.data.stripe_subscription_id
                                            }
                                            cancel_at_period_end={true}
                                        />
                                    ) : (
                                        <Button
                                            disabled
                                            className="w-full rounded-md px-5 py-2.5 text-sm font-medium capitalize hover:shadow-md"
                                        >
                                            Select
                                        </Button>
                                    )}
                                </>
                            )}
                        </>
                    )}
                </>
            )}
        </Card>
    );
};

export default PricingCard;
