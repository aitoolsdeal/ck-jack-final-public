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
import { LinkProps, PageProps } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { ChevronsLeft } from 'lucide-react';
import { nanoid } from 'nanoid';
import {
    ChangeEvent,
    FormEventHandler,
    Fragment,
    useCallback,
    useState,
} from 'react';

type BlockItem = {
    id: string;
    title: string;
    type: string;
    content: string;
    access: boolean;
};

interface Props {
    link: LinkProps;
    itemPosition: number;
}

const headings = [
    { key: 'H1', value: 'h1' },
    { key: 'H2', value: 'h2' },
    { key: 'H3', value: 'h3' },
    { key: 'H4', value: 'h4' },
    { key: 'H5', value: 'h5' },
    { key: 'H6', value: 'h6' },
];

const blockItems: BlockItem[] = [
    {
        id: nanoid(),
        title: 'Link',
        type: 'linkItem',
        content: 'Link',
        access: false,
    },
    {
        id: nanoid(),
        title: 'Heading',
        type: 'headingItem',
        content: 'Text',
        access: false,
    },
    {
        id: nanoid(),
        title: 'Paragraph',
        type: 'paragraphItem',
        content: 'Text',
        access: false,
    },
    {
        id: nanoid(),
        title: 'Image',
        type: 'imageItem',
        content: 'Image',
        access: false,
    },
    {
        id: nanoid(),
        title: 'SoundCloud',
        type: 'soundCloudItem',
        content: 'Embed',
        access: false,
    },
    {
        id: nanoid(),
        title: 'YouTube',
        type: 'youTubeItem',
        content: 'Embed',
        access: false,
    },
    {
        id: nanoid(),
        title: 'Spotify',
        type: 'spotifyItem',
        content: 'Embed',
        access: false,
    },
    {
        id: nanoid(),
        title: 'Vimeo',
        type: 'vimeoItem',
        content: 'Embed',
        access: false,
    },
    {
        id: nanoid(),
        title: 'TikTok',
        type: 'tiktokItem',
        content: 'Embed',
        access: false,
    },
];

const AddBlocks = (props: Props) => {
    const { link, itemPosition } = props;
    const page = usePage<PageProps>();
    const { app, input } = page.props.translate;

    const [open, setOpen] = useState({ parent: false, child: false });
    const [block, setBlock] = useState({ title: '', type: '', content: '' });

    const handleOpen = (newState: {}) => {
        setOpen((prev) => ({
            ...prev,
            ...newState,
        }));
    };

    const { post, data, setData, errors, reset } = useForm({
        image: null,
        link_id: link.id,
        item_position: itemPosition + 1,
        item_type: '',
        item_sub_type: '',
        item_title: '',
        item_link: null,
        item_icon: '',
        content: null,
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

    const onEmbedChange = (e: ChangeEvent<HTMLInputElement>) => {
        const url = youTubeUrl(e.target.value);
        setData('item_link', url as any);
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();

        post(route('biolink-block.store'), {
            onSuccess() {
                setOpen({ parent: false, child: false });
            },
        });
    };

    const blockAccess =
        page.props.auth.user.data.pricing_plan?.pricing_features
            ?.biolink_blocks || 0;

    if (page.props.auth.user.data.role === 'admin') {
        blockItems.forEach((item) => (item.access = true));
    } else {
        for (let i = 0; i < (blockAccess <= 9 ? blockAccess : 9); i++) {
            const element = blockItems[i];

            element.access = true;
        }
    }

    const blockItemHandler = useCallback((item: BlockItem) => {
        reset();
        setBlock(item);
        handleOpen({ child: true });
        setData((prev: any) => ({
            ...prev,
            item_icon: item.title,
            item_type: item.content,
        }));
    }, []);

    return (
        <Dialog
            open={open.parent}
            onOpenChange={(value) => handleOpen({ parent: value })}
        >
            <DialogTrigger asChild>
                <Button>{app.add_block}</Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        <p className="text-xl font-medium">
                            {app.biolink_blocks}
                        </p>
                    </DialogTitle>
                </DialogHeader>

                {blockItems.map((item) => (
                    <Fragment key={item.id}>
                        {!item.access ? (
                            <div className="relative">
                                <Button
                                    disabled
                                    variant="secondary"
                                    className="h-10 w-full text-base"
                                >
                                    {item.title}
                                </Button>
                                <span className="absolute right-0 top-0 rounded bg-green-100 px-1 text-xs text-green-500">
                                    Pro
                                </span>
                            </div>
                        ) : (
                            <Dialog
                                open={open.child}
                                onOpenChange={(value) =>
                                    handleOpen({ child: value })
                                }
                            >
                                <DialogTrigger>
                                    <Button
                                        variant="secondary"
                                        className="h-10 w-full text-base"
                                        onClick={() => blockItemHandler(item)}
                                    >
                                        {item.title}
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className="flex items-center">
                                            <div
                                                onClick={() => {
                                                    reset();
                                                    handleOpen({
                                                        child: false,
                                                    });
                                                }}
                                                className="flex w-10 cursor-pointer items-center"
                                            >
                                                <ChevronsLeft className="h-6 w-6" />
                                            </div>
                                            <p className="text-xl font-medium">
                                                {app.add_block}
                                            </p>
                                        </DialogTitle>
                                    </DialogHeader>

                                    <form onSubmit={submit}>
                                        {block.type === 'linkItem' ? (
                                            <>
                                                <div className="mb-4">
                                                    <Label>
                                                        {input.link_title}
                                                    </Label>

                                                    <Input
                                                        type="text"
                                                        name="item_title"
                                                        value={data.item_title}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.link_title_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_title
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.link_url}
                                                    </Label>

                                                    <Input
                                                        type="url"
                                                        name="item_link"
                                                        value={
                                                            data.item_link as any
                                                        }
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.link_url_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_link
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : block.type === 'headingItem' ? (
                                            <>
                                                <div className="relative z-10 mb-4">
                                                    <Label>
                                                        {input.heading_type}
                                                    </Label>

                                                    <Select
                                                        name="item_sub_type"
                                                        value={
                                                            data.item_sub_type ??
                                                            'h1'
                                                        }
                                                        onValueChange={(
                                                            value,
                                                        ) =>
                                                            setData(
                                                                'item_sub_type',
                                                                value,
                                                            )
                                                        }
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select heading" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {headings.map(
                                                                ({
                                                                    key,
                                                                    value,
                                                                }) => (
                                                                    <SelectItem
                                                                        key={
                                                                            key
                                                                        }
                                                                        value={
                                                                            value
                                                                        }
                                                                    >
                                                                        {key}
                                                                    </SelectItem>
                                                                ),
                                                            )}
                                                        </SelectContent>
                                                    </Select>

                                                    <InputError
                                                        message={
                                                            errors.item_sub_type
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.heading_text}
                                                    </Label>

                                                    <Input
                                                        type="text"
                                                        name="item_title"
                                                        value={data.item_title}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.heading_text_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_title
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : block.type === 'paragraphItem' ? (
                                            <>
                                                <div className="mb-4">
                                                    <Label>{input.title}</Label>

                                                    <Input
                                                        type="text"
                                                        name="item_title"
                                                        value={
                                                            data.item_title as any
                                                        }
                                                        onChange={(
                                                            event: any,
                                                        ) => {
                                                            setData(
                                                                (
                                                                    prev: any,
                                                                ) => ({
                                                                    ...prev,
                                                                    item_sub_type:
                                                                        'paragraph',
                                                                    item_title:
                                                                        event
                                                                            .target
                                                                            .value,
                                                                }),
                                                            );
                                                        }}
                                                        placeholder={
                                                            input.title_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_title
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.description}
                                                    </Label>

                                                    <Textarea
                                                        rows={6}
                                                        cols={10}
                                                        name="content"
                                                        value={
                                                            data.content as any
                                                        }
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.description_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={errors.content}
                                                    />
                                                </div>
                                            </>
                                        ) : block.type === 'imageItem' ? (
                                            <>
                                                <div className="mb-4">
                                                    <label className="mb-2 block text-sm font-medium text-gray-500"></label>
                                                    <Label>
                                                        {input.select_image}
                                                    </Label>

                                                    <Input
                                                        type="file"
                                                        onChange={
                                                            handleImageChange
                                                        }
                                                        className="cursor-pointer px-1"
                                                    />

                                                    {errors.image && (
                                                        <p className="mt-1 text-sm text-red-500"></p>
                                                    )}

                                                    <InputError
                                                        message={errors.image}
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.image_alt}
                                                    </Label>

                                                    <Input
                                                        type="text"
                                                        name="item_title"
                                                        value={data.item_title}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.image_alt_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_title
                                                        }
                                                    />
                                                </div>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.image_url}
                                                    </Label>

                                                    <Input
                                                        type="text"
                                                        name="item_link"
                                                        value={
                                                            data.item_link as any
                                                        }
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.image_url_placeholder
                                                        }
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_link
                                                        }
                                                    />
                                                </div>
                                            </>
                                        ) : block.type === 'soundCloudItem' ? (
                                            <div>
                                                <p className="mb-3 text-sm text-gray-500">
                                                    Paste in your Soundcloud URL
                                                    it will show as a playable
                                                    song on your profile.
                                                </p>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.video_title}
                                                    </Label>

                                                    <Input
                                                        type="text"
                                                        name="item_title"
                                                        value={data.item_title}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.video_title_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_title
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <Label>
                                                        {
                                                            input.sound_cloud_video_url
                                                        }
                                                    </Label>

                                                    <Input
                                                        type="url"
                                                        name="item_link"
                                                        value={
                                                            data.item_link as any
                                                        }
                                                        onChange={(
                                                            e: ChangeEvent<HTMLInputElement>,
                                                        ) => {
                                                            const url =
                                                                soundCloudUrl(
                                                                    e.target
                                                                        .value,
                                                                );
                                                            setData(
                                                                'item_link',
                                                                url as any,
                                                            );
                                                        }}
                                                        placeholder={
                                                            input.video_url_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_link
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ) : block.type === 'youTubeItem' ? (
                                            <div>
                                                <p className="mb-3 text-sm text-gray-500">
                                                    Paste in your YouTube video
                                                    URL it will show as a video
                                                    on your profile.
                                                </p>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.video_title}
                                                    </Label>

                                                    <Input
                                                        type="text"
                                                        name="item_title"
                                                        value={data.item_title}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.video_title_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_title
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <Label>
                                                        {
                                                            input.youtube_video_url
                                                        }
                                                    </Label>

                                                    <Input
                                                        type="url"
                                                        name="item_link"
                                                        value={
                                                            data.item_link as any
                                                        }
                                                        onChange={(
                                                            e: ChangeEvent<HTMLInputElement>,
                                                        ) => {
                                                            const url =
                                                                youTubeUrl(
                                                                    e.target
                                                                        .value,
                                                                );
                                                            setData(
                                                                'item_link',
                                                                url as any,
                                                            );
                                                        }}
                                                        placeholder={
                                                            input.video_url_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_link
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ) : block.type === 'spotifyItem' ? (
                                            <div>
                                                <p className="mb-3 text-sm text-gray-500">
                                                    Paste in your Spotify Song,
                                                    Album, Show or Episode URL
                                                    and we will show it as a
                                                    player on your profile.
                                                </p>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.video_title}
                                                    </Label>

                                                    <Input
                                                        type="text"
                                                        name="item_title"
                                                        value={data.item_title}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.video_title_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_title
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <Label>
                                                        {
                                                            input.spotify_video_url
                                                        }
                                                    </Label>

                                                    <Input
                                                        type="url"
                                                        name="item_link"
                                                        value={
                                                            data.item_link as any
                                                        }
                                                        onChange={(
                                                            e: ChangeEvent<HTMLInputElement>,
                                                        ) => {
                                                            const url =
                                                                spotifyUrl(
                                                                    e.target
                                                                        .value,
                                                                );
                                                            setData(
                                                                'item_link',
                                                                url as any,
                                                            );
                                                        }}
                                                        placeholder={
                                                            input.video_url_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_link
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ) : block.type === 'vimeoItem' ? (
                                            <div>
                                                <p className="mb-3 text-sm text-gray-500">
                                                    Paste in your Vimeo URL it
                                                    will show as a video on your
                                                    profile.
                                                </p>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.video_title}
                                                    </Label>

                                                    <Input
                                                        type="text"
                                                        name="item_title"
                                                        value={data.item_title}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.video_title_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_title
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <Label>
                                                        {input.vimeo_video_url}
                                                    </Label>

                                                    <Input
                                                        type="url"
                                                        name="item_link"
                                                        value={
                                                            data.item_link as any
                                                        }
                                                        onChange={(
                                                            e: ChangeEvent<HTMLInputElement>,
                                                        ) => {
                                                            const url =
                                                                vimeoUrl(
                                                                    e.target
                                                                        .value,
                                                                );
                                                            setData(
                                                                'item_link',
                                                                url as any,
                                                            );
                                                        }}
                                                        placeholder={
                                                            input.video_url_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_link
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ) : block.type === 'tiktokItem' ? (
                                            <div>
                                                <p className="mb-3 text-sm text-gray-500">
                                                    Paste in your TikTok Video
                                                    URL it will show as a video
                                                    on your profile.
                                                </p>

                                                <div className="mb-4">
                                                    <Label>
                                                        {input.video_title}
                                                    </Label>

                                                    <Input
                                                        type="text"
                                                        name="item_title"
                                                        value={data.item_title}
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.video_title_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_title
                                                        }
                                                    />
                                                </div>

                                                <div>
                                                    <Label>
                                                        {input.tiktok_video_url}
                                                    </Label>

                                                    <Input
                                                        type="url"
                                                        name="item_link"
                                                        value={
                                                            data.item_link as any
                                                        }
                                                        onChange={
                                                            onHandleChange
                                                        }
                                                        placeholder={
                                                            input.video_url_placeholder
                                                        }
                                                        required
                                                    />

                                                    <InputError
                                                        message={
                                                            errors.item_link
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        ) : null}

                                        <div className="mt-4 flex justify-end">
                                            <Button
                                                onClick={() =>
                                                    handleOpen({ child: false })
                                                }
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
                        )}
                    </Fragment>
                ))}
            </DialogContent>
        </Dialog>
    );
};

export default AddBlocks;
