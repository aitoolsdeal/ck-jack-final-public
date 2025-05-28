import { ScrollArea } from '@/components/ui/scroll-area';
import { socialType } from '@/data/socials-links';
import icons from '@/icons';
import { cssToJsxStyle, jsxStyle, stringToCss } from '@/lib/utils';
import { LinkProps, PageProps } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { UserCircle } from 'lucide-react';
import LinkBlock from './Partials/LinkBlock';

const Show = (props: { link: LinkProps }) => {
    const { link } = props;
    const page = usePage<PageProps>();
    const { app } = page.props;

    let parsedStyle: any;
    let buttonStyle: any = new Object();

    if (link.custom_theme && link.custom_theme_active) {
        const theme = link.custom_theme;
        parsedStyle = cssToJsxStyle(theme.background);
        parsedStyle.color = theme.text_color;
        parsedStyle.fontFamily = theme.font_family;

        buttonStyle = {
            color: theme.btn_text_color,
            borderRadius: theme.btn_radius,
            background: theme.btn_transparent
                ? theme.btn_transparent
                : theme.btn_bg_color,
        };
    } else {
        const { background, text_color, font_family, bg_image, button_style } =
            link.theme;

        parsedStyle = cssToJsxStyle(background);
        parsedStyle.color = text_color;
        parsedStyle.fontFamily = font_family;
        if (bg_image) {
            parsedStyle.backgroundImage = `url(${bg_image})`;
        }
        buttonStyle = jsxStyle(stringToCss(button_style));
    }

    let socials: socialType[] = [];
    if (link.socials) {
        socials = JSON.parse(link.socials);
    }

    const socialColor = link.social_color ? link.social_color : '#101828';

    return (
        <div style={parsedStyle} className="bg-cover bg-center object-contain">
            <Head title="Bio Links" />

            <ScrollArea className="h-screen">
                <div className="mx-auto flex h-full w-full max-w-[700px] flex-col justify-between px-4 py-5">
                    <div>
                        <div className="flex flex-col items-center">
                            {link.thumbnail ? (
                                <img
                                    className="h-[100px] w-[100px] rounded-full object-cover"
                                    src={link.thumbnail}
                                    alt="linkdrop"
                                />
                            ) : (
                                <UserCircle className="h-[100px] w-[100px] text-gray-700" />
                            )}

                            <p className="mt-2 text-xl font-medium">
                                {link.link_name}
                            </p>
                            <p className="mb-4 mt-2 text-justify font-medium">
                                {link.short_bio}
                            </p>
                        </div>

                        {socials.length > 0 && (
                            <div className="mb-8 mt-2 flex flex-wrap items-center justify-center gap-4">
                                {socials.map((item, ind) => {
                                    const Icon = icons[item.icon];

                                    return (
                                        <>
                                            {item.name === 'email' ? (
                                                <a
                                                    key={ind}
                                                    href={
                                                        ('mailto:' +
                                                            item.link) as any
                                                    }
                                                    className="mx-2"
                                                >
                                                    <Icon
                                                        className="h-6 w-6"
                                                        style={{
                                                            color: socialColor,
                                                        }}
                                                    />
                                                </a>
                                            ) : item.name === 'telephone' ||
                                              item.name === 'whatsapp' ? (
                                                <a
                                                    key={ind}
                                                    href={
                                                        ('tel:' +
                                                            item.link) as any
                                                    }
                                                    className="mx-2"
                                                >
                                                    <Icon
                                                        className="h-6 w-6"
                                                        style={{
                                                            color: socialColor,
                                                        }}
                                                    />
                                                </a>
                                            ) : (
                                                <a
                                                    key={ind}
                                                    target="_blank"
                                                    href={item.link as any}
                                                    className="mx-2"
                                                >
                                                    <Icon
                                                        className="h-6 w-6"
                                                        style={{
                                                            color: socialColor,
                                                        }}
                                                    />
                                                </a>
                                            )}
                                        </>
                                    );
                                })}
                            </div>
                        )}

                        <div className="space-y-5">
                            {link.items.map((item, ind) => (
                                <LinkBlock
                                    key={ind}
                                    item={item}
                                    iframeHeight={400}
                                    buttonStyle={buttonStyle}
                                />
                            ))}
                        </div>
                    </div>

                    <img
                        alt=""
                        src={link.branding ?? app.logo}
                        className="mx-auto mt-10 w-10"
                    />
                </div>
            </ScrollArea>
        </div>
    );
};

export default Show;
