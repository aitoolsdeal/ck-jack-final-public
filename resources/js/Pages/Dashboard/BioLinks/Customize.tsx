import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Dashboard from '@/layouts/dashboard/layout';
import { cssToJsxStyle, jsxStyle, stringToCss } from '@/lib/utils';
import { LinkProps, PageProps, SocialLinkProps, ThemeProps } from '@/types';
import { Head } from '@inertiajs/react';
import { ReactNode, useEffect, useRef } from 'react';
import AddBlocks from './Partials/AddBlocks';
import AddSocialLinks from './Partials/AddSocialLinks';
import CustomThemeCreate from './Partials/CustomThemeCreate';
import LinkBlocks from './Partials/LinkBlocks';
import LinkPreview from './Partials/LinkPreview';
import LinkProfile from './Partials/LinkProfile';
import LinkThemes from './Partials/LinkThemes';

interface Props extends PageProps {
    link: LinkProps;
    themes: ThemeProps[];
    itemLastPosition: number;
    socialLinks: SocialLinkProps[];
}

const Customize = (props: Props) => {
    const { link, themes, itemLastPosition } = props;

    const blockRaf = useRef<any>();
    const settingRaf = useRef<any>();

    const refHandler = (type: string) => {
        if (blockRaf.current && settingRaf.current) {
            if (type === 'block') {
                blockRaf.current.classList.add('active');
            } else {
                blockRaf.current.classList.remove('active');
            }
            if (type === 'setting') {
                settingRaf.current.classList.add('active');
            } else {
                settingRaf.current.classList.remove('active');
            }
        }
    };

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
            parsedStyle.backgroundImage = `url(/${bg_image})`;
        }
        buttonStyle = jsxStyle(stringToCss(button_style));
    }

    useEffect(() => {
        if (link.custom_theme && link.custom_theme_active) {
            const theme = link.custom_theme;
            parsedStyle = cssToJsxStyle(link.custom_theme.background);
            parsedStyle.color = link.custom_theme.text_color;
            parsedStyle.fontFamily = link.custom_theme.font_family;

            buttonStyle = {
                color: theme.btn_text_color,
                borderRadius: theme.btn_radius,
                background: theme.btn_transparent
                    ? theme.btn_transparent
                    : theme.btn_bg_color,
            };
        } else {
            const {
                background,
                text_color,
                font_family,
                bg_image,
                button_style,
            } = link.theme;
            parsedStyle = cssToJsxStyle(background);
            parsedStyle.color = text_color;
            parsedStyle.fontFamily = font_family;
            if (bg_image) {
                parsedStyle.backgroundImage = `url(/${bg_image})`;
            }
            buttonStyle = jsxStyle(stringToCss(button_style));
        }
    }, [link]);

    return (
        <>
            <Head title="Bio Links" />
            <div className="lg:grid lg:grid-cols-12 lg:gap-12">
                <div className="w-full lg:col-span-7">
                    <Tabs defaultValue="settings">
                        <div className="mb-7 flex items-center justify-between">
                            <TabsList>
                                <TabsTrigger value="settings">
                                    Settings
                                </TabsTrigger>
                                <TabsTrigger value="blocks">Blocks</TabsTrigger>
                            </TabsList>
                            <div className="flex items-center">
                                <a href={`/${link.url_name}`} target="_blank">
                                    <Button className="mr-3 rounded-md bg-white px-3 py-2 text-base font-medium capitalize text-gray-800 shadow-sm shadow-white/20 hover:bg-white active:bg-white active:opacity-[0.85] md:px-4">
                                        <span className="hidden md:block">
                                            Preview
                                        </span>
                                        <span className="block md:hidden">
                                            W
                                        </span>
                                    </Button>
                                </a>

                                <AddBlocks
                                    link={link}
                                    itemPosition={itemLastPosition}
                                />
                            </div>
                        </div>

                        <TabsContent value="settings" className="space-y-7">
                            <LinkProfile link={link} />
                            <AddSocialLinks link={link} />
                            <LinkThemes link={link} themes={themes} />
                            {link.custom_theme_id && (
                                <CustomThemeCreate link={link} />
                            )}
                        </TabsContent>
                        <TabsContent value="blocks">
                            <LinkBlocks link={link} />
                        </TabsContent>
                    </Tabs>
                </div>

                <div className="relative col-span-12 hidden lg:col-span-5 lg:block">
                    <div
                        style={parsedStyle}
                        className="h-[calc(100vh-150px)] overflow-y-auto rounded-3xl border-[8px] border-gray-800 bg-cover bg-center object-contain lg:fixed lg:w-[300px] xl:w-[360px] 2xl:w-[400px]"
                    >
                        <LinkPreview link={link} buttonStyle={buttonStyle} />
                    </div>
                </div>
            </div>
        </>
    );
};

Customize.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Customize;
