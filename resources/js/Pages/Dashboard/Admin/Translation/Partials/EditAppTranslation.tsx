import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent } from 'react';

interface Props {
    app: any;
    local: string;
}

const EditAppTranslation = ({ app, local }: Props) => {
    const { data, setData, put } = useForm(app);

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
        put(`/lang/update/${local}/app`);
    };

    return (
        <Card className="mx-auto mb-8 w-full max-w-[800px] p-6">
            <p className="mb-4 border-b border-b-gray-200 pb-2 text-lg font-bold text-gray-900">
                {app.app_translation}
            </p>
            <form onSubmit={submit} className="flex flex-col gap-6">
                {Object.entries(app).map(([key, value]) => {
                    return (
                        <div>
                            <Label>{value as string}</Label>

                            <Input
                                type="text"
                                name={key}
                                placeholder="Translate by your language"
                                onChange={onHandleChange}
                                value={data[key]}
                            />
                        </div>
                    );
                })}

                <Button type="submit">{app.save_changes}</Button>
            </form>
        </Card>
    );
};

export default EditAppTranslation;
