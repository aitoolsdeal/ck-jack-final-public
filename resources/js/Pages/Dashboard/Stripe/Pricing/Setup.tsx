import Breadcrumb from '@/components/breadcrumb';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardLayout from '@/layouts/dashboard/layout';
import { Head, router, useForm } from '@inertiajs/react';
import { DollarSignIcon } from 'lucide-react';
import { FormEventHandler, ReactNode } from 'react';

interface Props {
    pricing?: PricingPlan;
}

const Setup = ({ pricing }: Props) => {
    const { data, post, put, errors, reset, setData, clearErrors } = useForm({
        active: pricing ? pricing.active : 1,
        type: pricing ? pricing.type : 'paid',
        title: pricing ? pricing.title : '',
        description: pricing ? pricing.description : '',
        stripe_product_id: pricing ? pricing.stripe_product_id : '',
        stripe_product_price_id: pricing ? pricing.stripe_product_price_id : '',
    });

    const pricingInputHandler = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submitPricing: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();

        if (!pricing) {
            post(route('pricing-plans.store'));
        } else {
            put(route('pricing-plans.update', { pricing_plan: pricing.id }));
        }
    };

    const pricingTypeHandler = (value: string) => {
        if (value === 'free') {
            setData({
                ...data,
                stripe_product_id: '',
                stripe_product_price_id: '',
                type: value as 'free' | 'paid',
            });
        } else {
            setData({
                ...data,
                title: '',
                description: '',
                type: value as 'free' | 'paid',
            });
        }
    };

    const actionType = pricing ? 'Update' : 'Create';

    return (
        <>
            <Head title={`Pricing Plan ${actionType}`} />
            <Breadcrumb
                Icon={DollarSignIcon}
                title={`Pricing Plan ${actionType}`}
                Component={
                    <Button
                        onClick={() => router.get(route('pricing-plans.index'))}
                    >
                        Go Back
                    </Button>
                }
            />

            <Tabs value={data.type} onValueChange={pricingTypeHandler}>
                <Card className="!shadow-card-hover mx-auto w-full max-w-[800px]">
                    <form onSubmit={submitPricing} className="space-y-4 p-7">
                        <div className="flex items-center justify-between border-b border-b-gray-200 pb-4">
                            <p className="text18 font-bold text-gray-900">
                                {actionType} Pricing Plan
                            </p>

                            <TabsList>
                                <TabsTrigger value="paid">Paid</TabsTrigger>
                                <TabsTrigger value="free">Free</TabsTrigger>
                            </TabsList>
                        </div>

                        <div>
                            <Label>Active Status</Label>

                            <Select
                                value={`${data.active}`}
                                onValueChange={(value) =>
                                    setData('active', parseInt(value))
                                }
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Pricing active status" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="1">Active</SelectItem>
                                    <SelectItem value="0">Deactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <TabsContent value="paid" className="space-y-4">
                            <div>
                                <Label>Stripe Product Id</Label>

                                <Input
                                    required
                                    type="text"
                                    name="stripe_product_id"
                                    className="my-1"
                                    placeholder="Stripe product id"
                                    value={data.stripe_product_id ?? ''}
                                    onChange={pricingInputHandler}
                                />

                                <InputError
                                    message={errors.stripe_product_id}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label>Stripe Product Price Id</Label>

                                <Input
                                    required
                                    type="text"
                                    name="stripe_product_price_id"
                                    className="my-1"
                                    placeholder="Stripe product price id"
                                    value={data.stripe_product_price_id ?? ''}
                                    onChange={pricingInputHandler}
                                />

                                <InputError
                                    message={errors.stripe_product_price_id}
                                    className="mt-2"
                                />
                            </div>
                        </TabsContent>

                        <TabsContent value="free" className="space-y-4">
                            <div>
                                <Label>Pricing Title</Label>

                                <Input
                                    required
                                    type="text"
                                    name="title"
                                    className="my-1"
                                    placeholder="Free pricing plan title"
                                    value={data.title ?? ''}
                                    onChange={pricingInputHandler}
                                />

                                <InputError
                                    message={errors.title}
                                    className="mt-2"
                                />
                            </div>

                            <div>
                                <Label>Pricing Description</Label>

                                <Input
                                    required
                                    type="text"
                                    name="description"
                                    className="my-1"
                                    placeholder="Free pricing plan description"
                                    value={data.description ?? ''}
                                    onChange={pricingInputHandler}
                                />

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                        </TabsContent>

                        <Button
                            type="submit"
                            className="hover:bg-primary-hover mt-4 bg-primary px-5"
                        >
                            {actionType} Pricing
                        </Button>
                    </form>
                </Card>
            </Tabs>
        </>
    );
};

Setup.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Setup;
