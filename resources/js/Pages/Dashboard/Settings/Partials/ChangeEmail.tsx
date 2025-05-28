import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

const ChangeEmail = () => {
    const { props } = usePage<PageProps>();
    const { email } = props.auth.user.data;

    const { data, setData, post, errors, clearErrors } = useForm({
        current_email: email,
        new_email: '',
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();
        post(route('settings.change-email'));
    };

    return (
        <div>
            <div className="border-b border-b-gray-200 px-7 pb-4 pt-7">
                <p className="text18 font-bold text-gray-900">Change Email</p>
            </div>
            <form onSubmit={submit} className="px-7 py-8">
                <div>
                    <Input
                        required
                        type="email"
                        name="current_email"
                        value={data.current_email}
                        placeholder="Enter your current email"
                        onChange={onHandleChange}
                    />

                    <InputError
                        message={errors.current_email}
                        className="mt-2"
                    />
                </div>

                <div className="py-5">
                    <Input
                        required
                        type="email"
                        name="new_email"
                        value={data.new_email}
                        placeholder="Enter your new email"
                        onChange={onHandleChange}
                    />

                    <InputError message={errors.new_email} className="mt-2" />
                </div>

                <Button type="submit" className="h-9">
                    Get Email Change Link
                </Button>
            </form>
        </div>
    );
};

export default ChangeEmail;
