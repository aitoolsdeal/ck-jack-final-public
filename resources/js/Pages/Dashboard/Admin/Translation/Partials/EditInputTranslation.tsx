import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { ChangeEvent, FormEvent } from 'react';

interface Props {
    app: any;
    input: any;
    local: string;
}

const EditInputTranslation = ({ app, input, local }: Props) => {
    const { data, setData, put } = useForm(input);

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
        put(`/lang/update/${local}/input`);
    };

    return (
        <Card className="mx-auto w-full max-w-[800px] p-6">
            <p className="mb-4 border-b border-b-gray-200 pb-2 text-lg font-bold text-gray-900">
                {app.input_translation}
            </p>
            <form onSubmit={submit} className="flex flex-col gap-6">
                {Object.entries(input).map(([key, value]) => {
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

export default EditInputTranslation;
