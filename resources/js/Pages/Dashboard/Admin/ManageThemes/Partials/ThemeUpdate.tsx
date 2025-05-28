import InputError from '@/components/input-error';
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
import { PageProps, ThemeProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

interface Props {
    theme: ThemeProps;
}

const ThemeUpdate = (props: Props) => {
    const page = usePage<PageProps>();
    const { app, input } = page.props.translate;
    const [open, setOpen] = useState(false);
    const handleOpen = () => {
        setOpen((prev) => !prev);
    };

    const { data, setData, put, errors } = useForm({
        type: props.theme.type,
    });

    const submit: FormEventHandler = async (e) => {
        handleOpen();
        e.preventDefault();

        put(route('manage-themes.type', { id: props.theme.id }));
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button
                    size="icon"
                    className="h-7 w-7 rounded-full text-blue-500"
                >
                    <Pencil className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-xl font-medium">
                        {app.update_theme}
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit}>
                    <div className="mb-4">
                        <Label>{input.theme_type}</Label>

                        <Select
                            name="type"
                            value={data.type}
                            onValueChange={(
                                value: 'BASIC' | 'STANDARD' | 'PREMIUM',
                            ) => setData('type', value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Theme Type" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="BASIC">BASIC</SelectItem>
                                <SelectItem value="STANDARD">
                                    STANDARD
                                </SelectItem>
                                <SelectItem value="PREMIUM">PREMIUM</SelectItem>
                            </SelectContent>
                        </Select>

                        <InputError message={errors.type} />
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button
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

export default ThemeUpdate;
