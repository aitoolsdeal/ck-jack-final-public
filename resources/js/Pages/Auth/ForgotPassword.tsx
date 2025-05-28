import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import GuestLayout from '@/layouts/guest-layout';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

const ForgotPassword = () => {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
                Forgot your password? No problem. Just let us know your email
                address and we will email you a password reset link that will
                allow you to choose a new one.
            </div>

            <form onSubmit={submit}>
                <Input
                    required
                    type="email"
                    name="email"
                    className="my-1"
                    value={data.email}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="mt-6 flex items-center justify-end">
                    <Button className="ms-4" disabled={processing}>
                        Email Password Reset Link
                    </Button>
                </div>
            </form>
        </>
    );
};

ForgotPassword.layout = (page: ReactNode) => <GuestLayout children={page} />;

export default ForgotPassword;
