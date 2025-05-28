import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import languages from '@/data/languages';
import { PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useState } from 'react';

const AddTranslation = () => {
    const { props } = usePage<PageProps>();
    const { app, input } = props.translate;
    const [open, setOpen] = useState(false);

    const { data, setData, post, clearErrors } = useForm({
        local: 'af',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        post(route('lang.create'), {
            onSuccess() {
                setOpen(false);
            },
        });
    };

    const langs = languages.map((lang) => {
        return { key: lang.name, value: lang.code };
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button>{app.add_languages}</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium">
                        {app.add_languages}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={submit}
                    className="flex h-full flex-col justify-between"
                >
                    <div>
                        <Label>{input.user_status}</Label>

                        <Select
                            name="local"
                            value={data.local}
                            onValueChange={(value) => setData('local', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select language" />
                            </SelectTrigger>
                            <SelectContent className="max-h-[280px]">
                                {langs.map(({ key, value }) => (
                                    <SelectItem key={key} value={value}>
                                        {key}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="mt-10 flex justify-end">
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="mr-2 py-2 text-base font-medium capitalize"
                        >
                            <span>{app.cancel}</span>
                        </Button>
                        <Button
                            type="submit"
                            className="py-2 text-base font-medium capitalize"
                        >
                            <span>{app.save_changes}</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AddTranslation;
