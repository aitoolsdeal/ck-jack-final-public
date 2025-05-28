import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import hideProgress from '@/lib/hide-progress';
import { LinkProps } from '@/types';
import { router } from '@inertiajs/react';
import { Camera, PaintBucket } from 'lucide-react';
import { ChangeEvent, Fragment } from 'react';

interface Props {
    link: LinkProps;
}

const CustomThemeCreate = ({ link }: Props) => {
    const { toast } = useToast();
    const customizePath = route('custom-theme.update', {
        id: link.custom_theme_id as string,
    });

    const customThemeBgImage = async (
        e: ChangeEvent<HTMLInputElement>,
    ): Promise<void> => {
        const files = e.target.files;
        if (files && files[0]) {
            hideProgress();
            const formData: any = new FormData();
            formData.append('type', 'bg_image');
            formData.append('link_id', link.id);
            formData.append('bg_image', files[0]);

            router.post(customizePath, formData, {
                onError(errors) {
                    for (const property in errors) {
                        toast({
                            variant: 'destructive',
                            description: errors[property],
                        });
                    }
                },
            });
        }
    };

    const customThemeItem = async (elements: any): Promise<void> => {
        hideProgress();
        const data = { link_id: link.id, ...elements };

        router.post(customizePath, data, {
            onError(errors) {
                for (const property in errors) {
                    toast({
                        variant: 'destructive',
                        description: errors[property],
                    });
                }
            },
        });
    };

    const bgTypeHandler = (type: 'color' | 'image') => {
        const bg =
            type === 'color'
                ? `background-color: ${link.custom_theme?.bg_color}`
                : `background-image: url(${link.custom_theme?.bg_image})`;

        router.post(customizePath, {
            type: 'bg_type',
            link_id: link.id,
            bg_type: type,
            background: bg,
        });
    };

    return (
        <Fragment>
            {link.custom_theme_active && link.custom_theme ? (
                <div className="card mt-7 p-6">
                    <div className="mb-7 grid grid-cols-2 gap-6 md:grid-cols-3">
                        <div className="col-span-2 md:col-span-3">
                            <h6 className="text-xl">Custom Theme</h6>
                        </div>

                        <div>
                            <div className="relative">
                                <label
                                    htmlFor="bgColor"
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                                >
                                    <PaintBucket className="h-10 w-10 text-blue-500" />
                                </label>
                                <input
                                    id="bgColor"
                                    type="color"
                                    defaultValue={link.custom_theme.bg_color}
                                    className={`h-[220px] w-full cursor-pointer rounded-lg border border-gray-300 p-0 outline-0 ring-0 hover:border-blue-500 2xl:h-[260px] ${
                                        link.custom_theme.bg_type === 'color' &&
                                        '!border-blue-500 outline outline-1 outline-blue-500'
                                    }`}
                                    onBlur={(e) =>
                                        customThemeItem({
                                            type: 'bg_color',
                                            bg_color: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <p className="mb-2 mt-1 text-center font-medium">
                                Background Color
                            </p>
                        </div>

                        <div>
                            <div
                                className={`flex h-[220px] items-center justify-center rounded-lg border border-gray-300 bg-cover bg-center object-contain p-4 py-8 hover:border-blue-500 2xl:h-[260px] 2xl:py-12 ${
                                    link.custom_theme.bg_type === 'image' &&
                                    '!border-blue-500 outline outline-1 outline-blue-500'
                                }`}
                                style={{
                                    backgroundImage: link.custom_theme.bg_image
                                        ? `url('${link.custom_theme.bg_image}')`
                                        : '',
                                }}
                            >
                                <label
                                    htmlFor="customThemeBg"
                                    className="cursor-pointer"
                                >
                                    <Camera className="h-7 w-7 text-green-500" />
                                </label>
                                <input
                                    hidden
                                    type="file"
                                    onChange={customThemeBgImage}
                                    id="customThemeBg"
                                ></input>
                            </div>
                            <p className="mb-2 mt-1 text-center font-medium">
                                Background Image
                            </p>
                        </div>

                        <div className="hidden md:block"></div>

                        <div>
                            <div className="relative">
                                <label
                                    htmlFor="textColor"
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                >
                                    <PaintBucket className="h-6 w-6 text-blue-500" />
                                </label>
                                <input
                                    type="color"
                                    id="textColor"
                                    defaultValue={link.custom_theme.text_color}
                                    className="h-[48px] w-full p-0"
                                    onBlur={(e) =>
                                        customThemeItem({
                                            type: 'text_color',
                                            text_color: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <p className="mb-2 mt-1 text-center font-medium">
                                Theme Text Color
                            </p>
                        </div>

                        {link.custom_theme.bg_color &&
                            link.custom_theme.bg_image && (
                                <div>
                                    <div className="flex items-center justify-between rounded border p-1">
                                        <Button
                                            className="w-full"
                                            variant={
                                                link.custom_theme.bg_type ===
                                                'color'
                                                    ? 'secondary'
                                                    : 'ghost'
                                            }
                                            onClick={() =>
                                                bgTypeHandler('color')
                                            }
                                        >
                                            Color
                                        </Button>
                                        <Button
                                            className="w-full"
                                            variant={
                                                link.custom_theme.bg_type ===
                                                'image'
                                                    ? 'secondary'
                                                    : 'ghost'
                                            }
                                            onClick={() =>
                                                bgTypeHandler('image')
                                            }
                                        >
                                            Image
                                        </Button>
                                    </div>
                                    <p className="mb-2 mt-1 text-center font-medium">
                                        Background Type
                                    </p>
                                </div>
                            )}
                    </div>

                    <div className="mb-7 grid grid-cols-2 gap-6 md:grid-cols-3">
                        <div className="col-span-2 md:col-span-3">
                            <h6 className="text-xl">Button Type</h6>
                        </div>

                        {buttonTypes.map((button, ind) => {
                            return (
                                <button
                                    key={ind}
                                    className={`h-10 border border-gray-500 ${
                                        link.custom_theme?.btn_type ===
                                            button.btn_type &&
                                        'outline outline-2 outline-blue-500'
                                    }`}
                                    style={{
                                        backgroundColor: button.btn_color,
                                        borderRadius: button.btn_radius,
                                    }}
                                    onClick={() =>
                                        customThemeItem({
                                            type: 'button',
                                            ...button,
                                        })
                                    }
                                ></button>
                            );
                        })}

                        <div>
                            <div className="relative">
                                <label
                                    htmlFor="buttonBgColor"
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                >
                                    <PaintBucket className="h-6 w-6 text-blue-500" />
                                </label>
                                <input
                                    type="color"
                                    id="buttonBgColor"
                                    className="h-[48px] w-full p-0"
                                    defaultValue={
                                        link.custom_theme.btn_bg_color
                                    }
                                    onBlur={(e) =>
                                        customThemeItem({
                                            type: 'btn_bg_color',
                                            btn_bg_color: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <p className="mb-2 mt-1 text-center font-medium">
                                Button Background
                            </p>
                        </div>

                        <div>
                            <div className="relative">
                                <label
                                    htmlFor="buttonTextColor"
                                    className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                                >
                                    <PaintBucket className="h-6 w-6 text-blue-500" />
                                </label>
                                <input
                                    type="color"
                                    id="buttonTextColor"
                                    className="h-[48px] w-full p-0"
                                    defaultValue={
                                        link.custom_theme.btn_text_color
                                    }
                                    onBlur={(e) =>
                                        customThemeItem({
                                            type: 'btn_text_color',
                                            btn_text_color: e.target.value,
                                        })
                                    }
                                />
                            </div>
                            <p className="mb-2 mt-1 text-center font-medium">
                                Button Text
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
                        <div className="col-span-2 md:col-span-3">
                            <h6 className="text-xl">Font Family</h6>
                        </div>
                        {fontFamily.map((font, ind) => {
                            return (
                                <button
                                    key={ind}
                                    onClick={() =>
                                        customThemeItem({
                                            type: 'font_family',
                                            font_family: font,
                                        })
                                    }
                                    className={`h-10 overflow-x-auto whitespace-nowrap rounded-lg border border-gray-500 ${
                                        link.custom_theme?.font_family ===
                                            font &&
                                        'outline outline-2 outline-blue-500'
                                    }`}
                                    style={{ fontFamily: font }}
                                >
                                    {font}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ) : null}
        </Fragment>
    );
};

const buttonTypes = [
    {
        btn_type: 'rounded',
        btn_color: '#000',
        btn_radius: '30px',
        btn_transparent: false,
    },
    {
        btn_type: 'radius',
        btn_color: '#000',
        btn_radius: '12px',
        btn_transparent: false,
    },
    {
        btn_type: 'rectangle',
        btn_color: '#000',
        btn_radius: '8px',
        btn_transparent: false,
    },
    {
        btn_type: 'rounded-trans',
        btn_color: '#fff',
        btn_radius: '30px',
        btn_transparent: true,
    },
    {
        btn_type: 'radius-trans',
        btn_color: '#fff',
        btn_radius: '12px',
        btn_transparent: true,
    },
    {
        btn_type: 'rectangle-trans',
        btn_color: '#fff',
        btn_radius: '8px',
        btn_transparent: true,
    },
];

const fontFamily = [
    'Inter, sans-serif',
    'MintGrotesk, sans-serif',
    'DM Sans, sans-serif',
    'Bebas Neue, cursive',
    'Poppins, sans-serif',
    'Quicksand, sans-serif',
];

export default CustomThemeCreate;
