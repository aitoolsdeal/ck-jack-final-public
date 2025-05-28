import lucide from '@/icons/lucide';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import { useState } from 'react';
import EditSection from './EditSection';
import EditSectionList from './EditSectionList';

type HeaderProps = {
    appSections: IntroSection[];
    customize?: boolean;
};

const Header = () => {
    const { props } = usePage<PageProps<HeaderProps>>();

    const { auth, appSections, customize } = props;
    const [linkname, setLinkname] = useState('');

    // Find header section
    const sections = appSections.find((item) => item.name === 'Header');

    const handleLinkSubmit = () => {
        if (linkname) {
            window.open(
                `/register?linkname=${linkname.toLowerCase()}`,
                '_self',
            );
        }
    };

    if (!sections) return null;

    return (
        <div className="home pt-[100px]">
            <div
                className={`container overflow-hidden pt-8 ${
                    customize ? 'home-edit' : ''
                }`}
            >
                {customize && (
                    <EditSection
                        section={sections}
                        Icon={<Pencil className="h-7 w-7 text-green-500" />}
                    />
                )}

                <div className="mx-auto w-full max-w-[760px] text-center">
                    <div>
                        <h1 className="slogan-text relative text-5xl font-bold md:text-7xl md:leading-[80px]">
                            {sections.title}
                        </h1>

                        {auth.user ? (
                            <Link
                                href="/dashboard/bio-links"
                                className="my-8 inline-block whitespace-nowrap rounded bg-blue-500 px-5 py-2.5 font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] lg:px-8"
                            >
                                Get Another Link
                            </Link>
                        ) : (
                            <div className="mx-auto my-8 flex max-w-[570px] items-center rounded-md border border-blue-500 p-1 pl-6">
                                <span className="input-group-text linkPrefix border-0">
                                    /
                                </span>
                                <input
                                    required
                                    id="linkname"
                                    name="linkname"
                                    placeholder="yourname or linkname"
                                    value={linkname}
                                    onChange={(e) =>
                                        setLinkname(e.target.value)
                                    }
                                    className="w-full border-0 bg-transparent focus:border-0 focus:outline-0 focus:ring-0"
                                />
                                <button
                                    type="button"
                                    onClick={handleLinkSubmit}
                                    className="inline-block whitespace-nowrap rounded bg-blue-500 px-5 py-2.5 font-medium text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 active:opacity-[0.85] lg:px-8"
                                >
                                    Get Your Link
                                </button>
                            </div>
                        )}
                    </div>

                    <div className={cn('relative', customize && 'home-edit')}>
                        {customize && (
                            <EditSectionList
                                section={sections}
                                Icon={
                                    <Pencil className="absolute left-2 top-2 h-5 w-5 text-green-500" />
                                }
                            />
                        )}

                        <div className="mx-auto grid max-w-[360px] grid-cols-2 lg:max-w-[760px] lg:grid-cols-4">
                            {JSON.parse(sections.section_list).map(
                                (list: IntroSectionList, index: number) => {
                                    type IconName = keyof typeof lucide;
                                    const Icon = lucide[list.icon as IconName];

                                    return (
                                        <div
                                            key={index}
                                            className="flex items-center justify-center gap-2"
                                        >
                                            <Icon className="h-4 w-4 text-blue-500" />
                                            <p className="font-medium text-gray-700">
                                                {list.content}
                                            </p>
                                        </div>
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>

                <img
                    width="100%"
                    className="mt-10"
                    src={sections.thumbnail || ''}
                    alt="Thumbnail"
                />
            </div>
        </div>
    );
};

export default Header;
