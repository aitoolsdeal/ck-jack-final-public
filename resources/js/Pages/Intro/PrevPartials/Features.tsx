import { Card } from '@/components/ui/card';
import lucide from '@/icons/lucide';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import EditSection from './EditSection';
import EditSectionList from './EditSectionList';

type HeaderProps = {
    appSections: IntroSection[];
    customize?: boolean;
};

const Features = () => {
    const { props } = usePage<PageProps<HeaderProps>>();
    const { appSections, customize } = props;

    const sections = appSections.find((item) => item.slug === 'features');

    if (!sections) return null;

    return (
        <div className="features container overflow-hidden py-20">
            <div className={cn(customize && 'home-edit')}>
                {customize && (
                    <EditSection
                        section={sections}
                        Icon={<Pencil className="h-7 w-7 text-green-500" />}
                    />
                )}

                <h4 className="mb-5 text-center text-2xl font-bold md:text-4xl">
                    Features
                </h4>

                <div className={customize ? 'home-edit' : ''}>
                    {customize && (
                        <EditSectionList
                            section={sections}
                            Icon={<Pencil className="h-5 w-5 text-green-500" />}
                        />
                    )}

                    <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
                        {JSON.parse(sections.section_list).map(
                            (list: IntroSectionList, index: number) => {
                                type IconName = keyof typeof lucide;
                                const Icon = lucide[list.icon as IconName];

                                return (
                                    <Card
                                        key={index}
                                        className="flex flex-col items-center justify-center px-6 py-9"
                                    >
                                        <Icon className="h-8 w-8 text-blue-500" />

                                        <p className="mt-4 font-medium md:text-lg">
                                            {list.content}
                                        </p>
                                    </Card>
                                );
                            },
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Features;
