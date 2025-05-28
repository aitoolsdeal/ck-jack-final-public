import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { soundCloudUrl, spotifyUrl, vimeoUrl, youTubeUrl } from '@/lib/embed';
import { LinkItemProps, PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { ChangeEvent, FormEventHandler, useState } from 'react';

interface Props {
    block: LinkItemProps;
}

const EditBlock = (props: Props) => {
    const { block } = props;
    const page = usePage<PageProps>();
    const { app, input } = page.props.translate;
    const [open, setOpen] = useState(false);

    const { post, data, setData, errors, reset } = useForm({
        link_id: block.link_id,
        item_type: block.item_type,
        item_sub_type: block.item_sub_type,
        item_title: block.item_title,
        item_link: block.item_link,
        item_icon: block.item_icon,
        content: block.content,
        image: null,
    });

    const onHandleChange = (event: any) => {
        setData(event.target.name, event.target.value);
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const files = e.target.files;
        if (files && files[0]) {
            setData('image', files[0] as any);
        }
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        post(route('biolink-block.update', { id: block.id }), {
            onSuccess() {
                setOpen(false);
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button
                    size="icon"
                    variant="secondary"
                    className="rounded-full"
                >
                    <Pencil className="h-5 w-5 cursor-pointer text-blue-500" />
                </Button>
            </DialogTrigger>

            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        <p className="text-xl font-medium">{block.item_icon}</p>
                    </DialogTitle>
                </DialogHeader>

                <form onSubmit={submit}>
                    {block.item_icon === 'Link' ? (
                        <>
                            <div className="mb-4">
                                <Label>{input.link_title}</Label>

                                <Input
                                    type="text"
                                    name="item_title"
                                    value={data.item_title}
                                    onChange={onHandleChange}
                                    placeholder={input.link_title_placeholder}
                                    required
                                />

                                <InputError message={errors.item_title} />
                            </div>
                            <div className="mb-4">
                                <Label>{input.link_url}</Label>

                                <Input
                                    type="url"
                                    name="item_link"
                                    value={data.item_link as any}
                                    onChange={onHandleChange}
                                    placeholder={input.link_url_placeholder}
                                    required
                                />

                                <InputError message={errors.item_link} />
                            </div>
                        </>
                    ) : block.item_icon === 'Heading' ? (
                        <>
                            <div className="relative z-10 mb-4">
                                <Label>{input.heading_type}</Label>

                                <Select value={data.item_sub_type as string}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Heading type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="h1">H1</SelectItem>
                                        <SelectItem value="h2">H2</SelectItem>
                                        <SelectItem value="h3">H3</SelectItem>
                                        <SelectItem value="h4">H4</SelectItem>
                                        <SelectItem value="h5">H5</SelectItem>
                                        <SelectItem value="h6">H6</SelectItem>
                                    </SelectContent>
                                </Select>

                                <InputError message={errors.item_sub_type} />
                            </div>
                            <div className="mb-4">
                                <Label>{input.heading_text}</Label>

                                <Input
                                    type="text"
                                    name="item_title"
                                    value={data.item_title}
                                    onChange={onHandleChange}
                                    placeholder={input.heading_text_placeholder}
                                    required
                                />

                                <InputError message={errors.item_title} />
                            </div>
                        </>
                    ) : block.item_icon === 'Paragraph' ? (
                        <>
                            <div className="mb-4">
                                <Label>{input.title}</Label>

                                <Input
                                    type="text"
                                    name="item_title"
                                    value={data.item_title as any}
                                    onChange={(event: any) => {
                                        setData((prev: any) => ({
                                            ...prev,
                                            item_sub_type: 'paragraph',
                                            item_title: event.target.value,
                                        }));
                                    }}
                                    placeholder={input.title_placeholder}
                                    required
                                />

                                <InputError message={errors.item_title} />
                            </div>
                            <div className="mb-4">
                                <Label>{input.description}</Label>

                                <Textarea
                                    rows={6}
                                    cols={10}
                                    name="content"
                                    value={data.content as any}
                                    onChange={onHandleChange}
                                    placeholder={input.description_placeholder}
                                    required
                                />

                                <InputError message={errors.content} />
                            </div>
                        </>
                    ) : block.item_icon === 'Image' ? (
                        <>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-500">
                                    {input.select_image}
                                </label>
                                <input
                                    type="file"
                                    onChange={handleImageChange}
                                    className="!h-10 !p-0 outline-none focus:outline-none"
                                />
                                {errors.image && (
                                    <p className="mt-1 text-sm text-red-500">
                                        {errors.image}
                                    </p>
                                )}
                            </div>
                            <div className="mb-4">
                                <Label>{input.image_alt}</Label>

                                <Input
                                    type="text"
                                    name="item_title"
                                    value={data.item_title}
                                    onChange={onHandleChange}
                                    placeholder={input.image_alt_placeholder}
                                    required
                                />

                                <InputError message={errors.item_title} />
                            </div>
                            <div className="mb-4">
                                <Label>{input.image_url}</Label>

                                <Input
                                    type="text"
                                    name="item_link"
                                    value={data.item_link as any}
                                    onChange={onHandleChange}
                                    placeholder={input.image_url_placeholder}
                                />

                                <InputError message={errors.item_link} />
                            </div>
                        </>
                    ) : block.item_icon === 'SoundCloud' ? (
                        <div>
                            <p className="mb-3 text-sm text-gray-500">
                                Paste in your Soundcloud URL and we will show it
                                as a playable song on your profile.
                            </p>
                            {/* -------------------------- */}
                            <div className="mb-4">
                                <Label>{input.video_title}</Label>

                                <Input
                                    type="text"
                                    name="item_title"
                                    value={data.item_title}
                                    onChange={onHandleChange}
                                    placeholder={input.video_title_placeholder}
                                    required
                                />

                                <InputError message={errors.item_title} />
                            </div>

                            <div>
                                <Label>{input.sound_cloud_video_url}</Label>

                                <Input
                                    type="url"
                                    name="item_link"
                                    value={data.item_link as any}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        const url = soundCloudUrl(
                                            e.target.value,
                                        );
                                        setData('item_link', url as any);
                                    }}
                                    placeholder={input.video_url_placeholder}
                                    required
                                />

                                <InputError message={errors.item_link} />
                            </div>
                        </div>
                    ) : block.item_icon === 'YouTube' ? (
                        <div>
                            <p className="mb-3 text-sm text-gray-500">
                                Paste in your YouTube video URL and we will show
                                it as a video on your profile.
                            </p>
                            <div className="mb-4">
                                <Label>{input.video_title}</Label>

                                <Input
                                    type="text"
                                    name="item_title"
                                    value={data.item_title}
                                    onChange={onHandleChange}
                                    placeholder={input.video_title_placeholder}
                                    required
                                />

                                <InputError message={errors.item_title} />
                            </div>

                            <div>
                                <Label>{input.youtube_video_url}</Label>

                                <Input
                                    type="url"
                                    name="item_link"
                                    value={data.item_link as any}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        const url = youTubeUrl(e.target.value);
                                        setData('item_link', url as any);
                                    }}
                                    placeholder={input.video_url_placeholder}
                                    required
                                />

                                <InputError message={errors.item_link} />
                            </div>
                        </div>
                    ) : block.item_icon === 'Spotify' ? (
                        <div>
                            <p className="mb-3 text-sm text-gray-500">
                                Paste in your Spotify Song, Album, Show or
                                Episode URL and we will show it as a player on
                                your profile.
                            </p>
                            <div className="mb-4">
                                <Label>{input.video_title}</Label>

                                <Input
                                    type="text"
                                    name="item_title"
                                    value={data.item_title}
                                    onChange={onHandleChange}
                                    placeholder={input.video_title_placeholder}
                                    required
                                />

                                <InputError message={errors.item_title} />
                            </div>

                            <div>
                                <Label>{input.spotify_video_url}</Label>

                                <Input
                                    type="url"
                                    name="item_link"
                                    value={data.item_link as any}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        const url = spotifyUrl(e.target.value);
                                        setData('item_link', url as any);
                                    }}
                                    placeholder={input.video_url_placeholder}
                                    required
                                />

                                <InputError message={errors.item_link} />
                            </div>
                        </div>
                    ) : block.item_icon === 'Vimeo' ? (
                        <div>
                            <p className="mb-3 text-sm text-gray-500">
                                Paste in your Vimeo URL and we will show it as a
                                video on your profile.
                            </p>
                            <div className="mb-4">
                                <Label>{input.video_title}</Label>

                                <Input
                                    type="text"
                                    name="item_title"
                                    value={data.item_title}
                                    onChange={onHandleChange}
                                    placeholder={input.video_title_placeholder}
                                    required
                                />

                                <InputError message={errors.item_title} />
                            </div>

                            <div>
                                <Label>{input.vimeo_video_url}</Label>

                                <Input
                                    type="url"
                                    name="item_link"
                                    value={data.item_link as any}
                                    onChange={(
                                        e: ChangeEvent<HTMLInputElement>,
                                    ) => {
                                        const url = vimeoUrl(e.target.value);
                                        setData('item_link', url as any);
                                    }}
                                    placeholder={input.video_url_placeholder}
                                    required
                                />

                                <InputError message={errors.item_link} />
                            </div>
                        </div>
                    ) : block.item_icon === 'TikTok' ? (
                        <div>
                            <p className="mb-3 text-sm text-gray-500">
                                Paste in your TikTok Video URL and we will show
                                it as a video on your profile.
                            </p>
                            <div className="mb-4">
                                <Label>{input.video_title}</Label>

                                <Input
                                    type="text"
                                    name="item_title"
                                    value={data.item_title}
                                    onChange={onHandleChange}
                                    placeholder={input.video_title_placeholder}
                                    required
                                />

                                <InputError message={errors.item_title} />
                            </div>

                            <div>
                                <Label>{input.tiktok_video_url}</Label>

                                <Input
                                    type="url"
                                    name="item_link"
                                    value={data.item_link as any}
                                    onChange={onHandleChange}
                                    placeholder={input.video_url_placeholder}
                                    required
                                />

                                <InputError message={errors.item_link} />
                            </div>
                        </div>
                    ) : null}

                    <div className="mt-4 flex justify-end">
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

export default EditBlock;
