import Breadcrumb from '@/components/breadcrumb';
import Dashboard from '@/layouts/dashboard/layout';
import { jsxStyle, stringToCss } from '@/lib/utils';
import { PageProps, ThemeProps } from '@/types';
import { Head } from '@inertiajs/react';
import { Palette } from 'lucide-react';
import { ReactNode } from 'react';
import ThemeUpdate from './Partials/ThemeUpdate';

interface Props extends PageProps {
    themes: ThemeProps[];
}

const Index = (props: Props) => {
    const { themes } = props;
    const { app } = props.translate;

    return (
        <>
            <Head title={app.manage_themes} />
            <Breadcrumb Icon={Palette} title={app.manage_themes} />

            <div className="grid grid-cols-1 gap-x-6 gap-y-8 md:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-6">
                {themes.map((theme, ind) => {
                    let bgStyle = jsxStyle(stringToCss(theme.background));
                    if (theme.bg_image) {
                        bgStyle.backgroundImage = `url(/${theme.bg_image})`;
                    }
                    let btnStyle = jsxStyle(stringToCss(theme.button_style));

                    return (
                        <div key={ind}>
                            <div
                                className="relative flex h-[220px] cursor-pointer flex-col justify-between rounded-lg border border-gray-300 p-4 py-8 hover:border-blue-500 2xl:h-[260px] 2xl:py-12"
                                style={bgStyle}
                            >
                                <div className="absolute left-2 top-1">
                                    <ThemeUpdate theme={theme} />
                                </div>
                                <span className="absolute right-2 top-2 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs text-blue-500">
                                    {theme.type}
                                </span>
                                {[1, 2, 3, 4].map((item) => (
                                    <button
                                        key={item}
                                        className="h-[30px] w-full"
                                        style={btnStyle}
                                    ></button>
                                ))}
                            </div>
                            <p className="mb-2 mt-1 text-center font-medium">
                                {theme.name}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

Index.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Index;
