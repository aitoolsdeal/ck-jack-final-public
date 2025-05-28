import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const ChangePassword = () => {
    const { data, setData, post, errors, clearErrors } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();
        post(route('password.change'));
    };

    return (
        <div>
            <div className="border-b border-b-gray-200 px-7 pb-4 pt-7">
                <p className="text18 font-bold text-gray-900">
                    Change Password
                </p>
            </div>
            <form onSubmit={submit} className="flex flex-col gap-5 px-7 py-8">
                <div>
                    <Input
                        required
                        type="password"
                        name="current_password"
                        value={data.current_password}
                        placeholder="Enter your current password"
                        onChange={onHandleChange}
                    />

                    <InputError
                        message={errors.current_password}
                        className="mt-2"
                    />
                </div>

                <div>
                    <Input
                        required
                        type="password"
                        name="password"
                        value={data.password}
                        placeholder="Enter your new password"
                        onChange={onHandleChange}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <Input
                        required
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        placeholder="Rewrite your new password"
                        onChange={onHandleChange}
                    />
                </div>

                <div>
                    <Button type="submit" className="h-9">
                        Change Password
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default ChangePassword;
