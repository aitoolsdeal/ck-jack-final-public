import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';
import { PageProps } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

interface Props extends PageProps {
    googleLogIn: boolean;
}

const Login = (props: Props) => {
    const { googleLogIn } = props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish() {
                reset('password');
            },
        });
    };

    return (
        <>
            <Head title="Log in" />

            <h6 className="mb-10 text-center font-semibold">Login</h6>

            <form onSubmit={submit} className="flex flex-col gap-4">
                <div>
                    <Label>Email</Label>

                    <Input
                        required
                        type="email"
                        name="email"
                        className="my-1"
                        value={data.email}
                        placeholder="Email"
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div>
                    <Label>Password</Label>

                    <Input
                        required
                        type="password"
                        name="password"
                        className="my-1"
                        value={data.password}
                        placeholder="Password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} />
                </div>

                <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <Checkbox
                            id="remember"
                            name="remember"
                            defaultChecked={data.remember}
                            onChange={(e: any) =>
                                setData('remember', e.target.checked)
                            }
                        />

                        <Label htmlFor="remember" className="cursor-pointer">
                            Remember me
                        </Label>
                    </div>

                    <Link
                        href={route('password.request')}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Forgot your password?
                    </Link>
                </div>

                <div className="mt-6 flex items-center justify-end">
                    <Link
                        href={route('register')}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Don't have account?
                    </Link>

                    <Button className="ms-4" disabled={processing}>
                        Log in
                    </Button>
                </div>

                {googleLogIn && (
                    <div className="mt-2 flex items-center justify-end border-t border-t-slate-300 pt-6">
                        <a type="button" className="w-full" href="auth/google">
                            <Button type="button" className="w-full">
                                Continue With Google
                            </Button>
                        </a>
                    </div>
                )}
            </form>
        </>
    );
};

Login.layout = (page: ReactNode) => <GuestLayout children={page} />;

export default Login;
