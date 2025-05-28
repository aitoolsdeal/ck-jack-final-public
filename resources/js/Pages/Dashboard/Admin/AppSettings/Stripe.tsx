import Breadcrumb from '@/components/breadcrumb';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import DashboardLayout from '@/layouts/dashboard/layout';
import { PageProps } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Settings } from 'lucide-react';
import { ChangeEvent, FormEvent, ReactNode } from 'react';
import SettingsHeader from './Partials/SettingsHeader';

interface ExtendedPageProps extends PageProps {
    stripeStatus: boolean;
    stripeKey: string | null;
    stripeSecret: string | null;
    stripeWebhookSecret: string | null;
}

const Stripe = () => {
    const { props } = usePage<ExtendedPageProps>();
    const { app } = props.translate;

    const { data, setData, post, errors, clearErrors, processing } = useForm({
        stripe_key: props.stripeKey || '',
        stripe_secret: props.stripeSecret || '',
        stripe_webhook_secret: props.stripeWebhookSecret || '',
    });

    const onHandleChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
        const target = event.target as HTMLInputElement;
        setData({
            ...data,
            [target.name]: target.value,
        });
    };

    const submit = (e: FormEvent) => {
        e.preventDefault();
        clearErrors();

        post(route('stripe.credentials'));
    };

    return (
        <>
            <Head title="Stripe Settings" />
            <Breadcrumb Icon={Settings} title="Stripe Payment Settings" />

            <Card className="mx-auto w-full max-w-[800px]">
                <SettingsHeader
                    status={props.stripeStatus}
                    title="Stripe Credentials"
                    success="Stripe credentials are activated, you can use Stripe features for payment system."
                    warning="Without stripe credentials, you will not be able to use Stripe features."
                />

                <form onSubmit={submit} className="p-7">
                    <div className="grid grid-cols-1 gap-7">
                        <div>
                            <Label>Stripe Key</Label>

                            <Input
                                required
                                type="text"
                                name="stripe_key"
                                value={data.stripe_key}
                                onChange={onHandleChange}
                                placeholder="Enter your Stripe Key"
                            />

                            <InputError message={errors.stripe_key} />
                        </div>

                        <div>
                            <Label>Stripe Secret</Label>

                            <Input
                                required
                                type="text"
                                name="stripe_secret"
                                value={data.stripe_secret}
                                onChange={onHandleChange}
                                placeholder="Enter your Stripe Secret"
                            />

                            <InputError message={errors.stripe_secret} />
                        </div>

                        <div>
                            <Label>Stripe Webhook Secret</Label>

                            <Input
                                required
                                type="text"
                                name="stripe_webhook_secret"
                                value={data.stripe_webhook_secret}
                                onChange={onHandleChange}
                                placeholder="Enter your Stripe Webhook Secret"
                            />

                            <InputError
                                message={errors.stripe_webhook_secret}
                            />
                        </div>
                    </div>

                    <div className="mt-7 flex items-center">
                        <Button type="submit" disabled={processing}>
                            {app.save_changes}
                        </Button>
                    </div>
                </form>
            </Card>
        </>
    );
};

Stripe.layout = (page: ReactNode) => <DashboardLayout children={page} />;

export default Stripe;
