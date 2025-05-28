import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const ForgetPassword = () => {
    const { props } = usePage<PageProps>();
    const { email } = props.auth.user.data;

    const { data, setData, post, errors, clearErrors } = useForm({
        email: email,
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();

        post(route('password.email'));
    };

    return (
        <div>
            <div className="border-b border-b-gray-200 px-7 pb-4 pt-7">
                <p className="text18 font-bold text-gray-900">
                    Forget Password
                </p>
            </div>

            <form onSubmit={submit} className="px-7 py-8">
                <div>
                    <Input
                        required
                        type="email"
                        name="email"
                        value={data.email}
                        placeholder="Enter your email address"
                        onChange={onHandleChange}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <Button type="submit" className="mt-5 h-9">
                    Get Password Reset Link
                </Button>
            </form>
        </div>
    );
};

export default ForgetPassword;
