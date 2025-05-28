import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import GuestLayout from '@/layouts/guest-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode } from 'react';

const Register = () => {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish() {
                reset('password', 'password_confirmation');
            },
        });
    };

    return (
        <>
            <Head title="Register" />

            <h6 className="mb-10 text-center font-semibold">Register</h6>

            <form onSubmit={submit} className="flex flex-col gap-4">
                <div>
                    <Label>Name</Label>

                    <Input
                        required
                        type="text"
                        name="name"
                        className="my-1"
                        value={data.name}
                        placeholder="Name"
                        onChange={(e) => setData('name', e.target.value)}
                    />

                    <InputError message={errors.name} />
                </div>

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

                    <InputError message={errors.email} />
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

                <div>
                    <Label>Confirm Password</Label>

                    <Input
                        required
                        type="password"
                        name="password_confirmation"
                        className="my-1"
                        value={data.password_confirmation}
                        placeholder="Re-type password"
                        onChange={(e) =>
                            setData('password_confirmation', e.target.value)
                        }
                    />

                    <InputError message={errors.password_confirmation} />
                </div>

                <div className="mt-6 flex items-center justify-end">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-600 underline hover:text-gray-900"
                    >
                        Already registered?
                    </Link>

                    <Button className="ms-4" disabled={processing}>
                        Register
                    </Button>
                </div>
            </form>
        </>
    );
};

Register.layout = (page: ReactNode) => <GuestLayout children={page} />;

export default Register;
