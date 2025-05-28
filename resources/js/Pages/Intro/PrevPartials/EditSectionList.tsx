import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { router, useForm } from '@inertiajs/react';
import { FormEventHandler, ReactNode, useState } from 'react';

interface Props {
    Icon: ReactNode;
    section: IntroSection;
}

const EditSectionList = ({ Icon, section }: Props) => {
    const [open, setOpen] = useState(false);

    const defaultData: any = {};
    const listItems = JSON.parse(section.section_list) as IntroSectionList[];

    listItems.map(({ url, icon, content }, ind) => {
        defaultData['url' + ind] = url || '';
        defaultData['icon' + ind] = icon || '';
        defaultData['content' + ind] = content || '';
    });

    const { data, setData, post, clearErrors } = useForm(defaultData);

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();

        const result: any[] = [];
        const entries = Object.entries(data);

        // Group properties by their index
        const grouped = entries.reduce<Record<string, Partial<any>>>(
            (acc, [key, value]) => {
                const match = key.match(/\d+/);
                if (!match) return acc;

                const index = match[0];
                if (!acc[index]) acc[index] = {};

                const cleanedKey = key.replace(/\d+/, '');
                acc[index][cleanedKey as string] = value || null;

                return acc;
            },
            {},
        );

        // Convert the grouped object to an array
        for (const key in grouped) {
            const item = grouped[key];
            if (
                item.url !== undefined &&
                item.icon !== undefined &&
                item.content !== undefined
            ) {
                result.push(item as any);
            }
        }

        router.put(
            route('home-section.list', { id: section.id }),
            { section_list: JSON.stringify(result) },
            {
                onSuccess() {
                    setOpen(false);
                },
            },
        );
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{Icon}</DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-lg font-medium">
                        Update {section.name} Section List
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit} className="space-y-4 pt-4">
                    {listItems.map((item, index) => (
                        <div key={index} className="text-start">
                            {item.content && item.url && (
                                <>
                                    <div className="flex items-center overflow-hidden rounded-md text-sm">
                                        <span className="max-w-[86px] bg-gray-100 px-3 py-2">
                                            Content
                                        </span>

                                        <Input
                                            required
                                            name={`content${index}`}
                                            value={data[`content${index}`]}
                                            onChange={onHandleChange}
                                            className="rounded-l-none"
                                        />
                                    </div>

                                    <div className="flex items-center overflow-hidden rounded-md text-sm">
                                        <span className="h-9 max-w-[86px] border border-r-0 border-gray-200 bg-gray-100 px-3 py-2">
                                            Link Url
                                        </span>

                                        <Input
                                            required
                                            name={`url${index}`}
                                            value={data[`url${index}`]}
                                            onChange={onHandleChange}
                                            className="rounded-l-none"
                                        />
                                    </div>
                                </>
                            )}

                            {!item.content && item.url && (
                                <div className="flex items-center overflow-hidden rounded-md text-sm">
                                    <span className="h-9 w-full max-w-[86px] border border-r-0 border-gray-200 bg-gray-100 px-3 py-2">
                                        Link Url
                                    </span>

                                    <Input
                                        required
                                        name={`url${index}`}
                                        value={data[`url${index}`]}
                                        onChange={onHandleChange}
                                        className="rounded-l-none"
                                    />
                                </div>
                            )}

                            {!item.url && item.content && (
                                <div className="flex items-center overflow-hidden rounded-md text-sm">
                                    <span className="h-9 max-w-[86px] border border-r-0 border-gray-200 bg-gray-100 px-3 py-2">
                                        Content
                                    </span>

                                    <Input
                                        required
                                        name={`content${index}`}
                                        value={data[`content${index}`]}
                                        onChange={onHandleChange}
                                        className="rounded-l-none"
                                    />
                                </div>
                            )}
                        </div>
                    ))}

                    <div className="flex shrink-0 flex-wrap items-center justify-end pt-4">
                        <Button
                            type="button"
                            onClick={() => setOpen(false)}
                            className="mr-2 py-2 text-base font-medium capitalize"
                        >
                            <span>Cancel</span>
                        </Button>
                        <Button
                            type="submit"
                            className="py-2 text-base font-medium capitalize"
                        >
                            <span>Save Changes</span>
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EditSectionList;
