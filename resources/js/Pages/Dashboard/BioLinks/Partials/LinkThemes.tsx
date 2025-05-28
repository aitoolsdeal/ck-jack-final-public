import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import hideProgress from '@/lib/hide-progress';
import { cn, jsxStyle, stringToCss } from '@/lib/utils';
import { LinkProps, PageProps, ThemeProps } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Camera } from 'lucide-react';
import { ChangeEvent } from 'react';
import ThemeBadge from './ThemeBadge';

interface Props {
    link: LinkProps;
    themes: ThemeProps[];
}

const LinkThemes = ({ link, themes }: Props) => {
    const { props } = usePage();
    const { toast } = useToast();
    const { app, auth } = props as PageProps;
    const { role, pricing_plan } = auth.user.data;

    const activeTheme = (theme: ThemeProps | null) => {
        if (!link.custom_theme_active && theme && theme.id === link.theme.id) {
            return 'outline outline-1 outline-blue-500 !border-blue-500';
        }
    };

    const updateTheme = async (
        theme: ThemeProps,
        linkId: string | number,
    ): Promise<void> => {
        if (role !== 'admin') {
            if (
                pricing_plan?.pricing_features?.themes === 'BASIC' &&
                theme.type !== 'BASIC'
            ) {
                return;
            }

            if (
                pricing_plan?.pricing_features?.themes === 'STANDARD' &&
                theme.type === 'PREMIUM'
            ) {
                return;
            }
        }

        hideProgress();
        router.put(route('customize.update', { id: linkId }), {
            theme_id: theme.id,
        });
    };

    // Custom theme handler
    const { post } = useForm({
        link_id: link.id,
        background: 'background: #30425A;',
        bg_type: 'color',
        bg_color: '#30425A',
        text_color: '#ffffff',
        btn_type: 'rounded',
        btn_transparent: false,
        btn_radius: '30px',
        btn_bg_color: '#ffffff',
        btn_text_color: '#1d2939',
        font_family: 'Inter, sans-serif',
    });

    const customThemeHandler = async (link: LinkProps): Promise<void> => {
        if (role !== 'admin') {
            if (pricing_plan?.type === 'free') {
                return;
            }
        }

        hideProgress();
        if (link.custom_theme_id) {
            router.put(route('custom-theme.active', { id: link.id }));
        } else {
            post(route('custom-theme.store'));
        }
    };

    // link branding handler
    const brandingHandle = async (
        e: ChangeEvent<HTMLInputElement>,
    ): Promise<void> => {
        if (role !== 'admin') {
            if (pricing_plan?.type === 'free') {
                return;
            }
        }

        const files = e.target.files;
        if (files && files[0]) {
            hideProgress();
            const formData: any = new FormData();
            formData.append('branding', files[0]);

            router.post(route('customize.logo', { id: link.id }), formData, {
                onError(e) {
                    toast({
                        variant: 'destructive',
                        description: e.branding,
                    });
                },
            });
        }
    };

    return (
        <Card className="grid grid-cols-2 gap-6 p-6 md:grid-cols-3">
            <div className="col-span-2 md:col-span-3">
                <h6 className="text-xl">Available Themes</h6>
            </div>
            {themes.map((theme, ind) => {
                let bgStyle = jsxStyle(stringToCss(theme.background));
                if (theme.bg_image) {
                    bgStyle.backgroundImage = `url(/${theme.bg_image})`;
                }
                let btnStyle = jsxStyle(stringToCss(theme.button_style));

                return (
                    <div key={ind}>
                        <div className="relative">
                            <div
                                onClick={() => updateTheme(theme, link.id)}
                                className={cn(
                                    'flex h-[220px] cursor-pointer flex-col justify-between rounded-lg border border-gray-300 p-4 py-8 hover:border-blue-500 2xl:h-[260px] 2xl:py-12',
                                    activeTheme(theme),
                                )}
                                style={bgStyle}
                            >
                                {[1, 2, 3, 4].map((item) => (
                                    <button
                                        key={item}
                                        className="h-[30px] w-full"
                                        style={btnStyle}
                                    ></button>
                                ))}
                            </div>
                            <ThemeBadge title={theme.type} theme={theme} />
                        </div>
                        <p className="mb-2 mt-1 text-center font-medium">
                            {theme.name}
                        </p>
                    </div>
                );
            })}

            <div>
                <div className="relative">
                    <div
                        onClick={() => customThemeHandler(link)}
                        className={`flex h-[220px] cursor-pointer items-center rounded-lg border border-gray-300 p-4 py-8 hover:border-blue-500 2xl:h-[260px] 2xl:py-12 ${
                            link.custom_theme_active &&
                            '!border-blue-500 outline outline-1 outline-blue-500'
                        }`}
                    >
                        <p className="text-center font-medium">
                            Create Custom Theme
                        </p>
                    </div>
                    <ThemeBadge title="Pro" />
                </div>
                <p className="mb-2 mt-1 text-center font-medium">
                    Custom Theme
                </p>
            </div>

            <div>
                <div className="relative">
                    <div
                        className={`flex h-[220px] flex-col items-center justify-center rounded-lg border border-gray-300 p-4 py-8 hover:border-blue-500 2xl:h-[260px] 2xl:py-12`}
                    >
                        <img
                            src={link.branding ?? app.logo}
                            className="h-20 w-20 rounded"
                            alt=""
                        />
                        <label
                            htmlFor="linkBranding"
                            className="mt-4 cursor-pointer"
                        >
                            <Camera className="h-7 w-7 text-green-500" />
                        </label>
                        <input
                            hidden
                            type="file"
                            onChange={brandingHandle}
                            id="linkBranding"
                        ></input>
                    </div>
                    <ThemeBadge title="Pro" />
                </div>

                <p className="mb-2 mt-1 text-center font-medium">Change Logo</p>
            </div>
        </Card>
    );
};

export default LinkThemes;
