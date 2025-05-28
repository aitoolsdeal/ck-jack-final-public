import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { socialsLinks } from '@/data/socials-links';
import icons from '@/icons';
import hideProgress from '@/lib/hide-progress';
import { getLink } from '@/lib/utils';
import { LinkProps } from '@/types';
import { router, useForm } from '@inertiajs/react';
import { CirclePlus, PaintBucket } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

// Utility for rendering social icons
const SocialIcon = ({
    item,
    socialColor,
}: {
    item: any;
    socialColor: string;
}) => {
    const Icon = icons[item.icon];
    const href =
        item.name === 'email'
            ? `mailto:${item.link}`
            : item.name === 'telephone' || item.name === 'whatsapp'
              ? `tel:${item.link}`
              : item.link;

    return (
        <a
            href={href}
            className="mx-2"
            target={
                item.name !== 'email' && item.name !== 'telephone'
                    ? '_blank'
                    : undefined
            }
            rel="noopener noreferrer"
        >
            <Icon className="h-7 w-7" style={{ color: socialColor }} />
        </a>
    );
};

// Reusable Input component for social fields
const SocialInput = ({
    name,
    placeholder,
    Icon,
    value,
    onChange,
}: {
    name: string;
    placeholder: string;
    Icon: React.ComponentType<any>;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
    <div className="relative mb-4">
        <Input
            type="text"
            name={name}
            value={value}
            onChange={onChange}
            className="pl-12"
            placeholder={placeholder}
        />
        <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2" />
    </div>
);

const AddSocialLinks = ({ link }: { link: LinkProps }) => {
    const [open, setOpen] = useState(false);
    const socialColor = link.social_color || '#101828';

    const { data, setData, errors } = useForm({
        email: getLink(link, 'email'),
        telephone: getLink(link, 'telephone'),
        telegram: getLink(link, 'telegram'),
        whatsapp: getLink(link, 'whatsapp'),
        facebook: getLink(link, 'facebook'),
        messenger: getLink(link, 'messenger'),
        instagram: getLink(link, 'instagram'),
        twitter: getLink(link, 'twitter'),
        tiktok: getLink(link, 'tiktok'),
        youtube: getLink(link, 'youtube'),
        soundcloud: getLink(link, 'soundcloud'),
        linkedin: getLink(link, 'linkedin'),
        spotify: getLink(link, 'spotify'),
        pinterest: getLink(link, 'pinterest'),
        snapchat: getLink(link, 'snapchat'),
        discord: getLink(link, 'discord'),
        social_color: socialColor,
    });

    const handleChange = (e: any) => {
        setData(e.target.name, e.target.value);
    };

    const submit: FormEventHandler = async (e) => {
        e.preventDefault();
        hideProgress();

        const socials = Object.entries(data).reduce((acc, [key, value]) => {
            const social = socialsLinks.find((item) => item.name === key);
            if (social && value) {
                acc.push({ ...social, link: value });
            }
            return acc;
        }, [] as any[]);

        router.put(
            route('customize.socials', { id: link.id }),
            {
                socials: JSON.stringify(socials),
                social_color: data.social_color,
            },
            {
                onSuccess: () => setOpen(false),
            },
        );
    };

    const socials = link.socials ? JSON.parse(link.socials) : [];

    return (
        <Card className="flex flex-wrap items-center justify-center gap-4 p-6">
            {socials.map((item: any, ind: number) => (
                <SocialIcon key={ind} item={item} socialColor={socialColor} />
            ))}

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                    <CirclePlus className="mx-2 h-8 w-8 cursor-pointer text-blue-500" />
                </DialogTrigger>

                <DialogContent className="max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-medium">
                            Social Links
                        </DialogTitle>
                    </DialogHeader>
                    <form onSubmit={submit}>
                        <p className="text-sm font-medium text-gray-700">
                            Social Icons Color
                        </p>
                        <div className="relative mb-7">
                            <input
                                type="color"
                                value={data.social_color}
                                onChange={(e) =>
                                    setData('social_color', e.target.value)
                                }
                                className="h-[48px] w-full p-0"
                            />
                            <label className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                                <PaintBucket className="h-6 w-6 text-blue-500" />
                            </label>
                        </div>

                        {socialsLinks.map((social) => (
                            <SocialInput
                                key={social.name}
                                name={social.name}
                                placeholder={social.placeholder}
                                Icon={icons[social.icon]}
                                value={(data as any)[social.name] || ''}
                                onChange={handleChange}
                            />
                        ))}

                        <div className="mt-4 flex justify-end">
                            <Button
                                onClick={() => setOpen(false)}
                                className="mr-2 py-2 text-base font-medium capitalize"
                            >
                                Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="py-2 text-base font-medium capitalize"
                            >
                                Save Changes
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </Card>
    );
};

export default AddSocialLinks;
