import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { CheckCheck, Pencil } from 'lucide-react';
import EditSection from './EditSection';
import EditSectionList from './EditSectionList';

type HeaderProps = {
    appSections: IntroSection[];
    customize?: boolean;
};

const CreateLink = () => {
    const { props } = usePage<PageProps<HeaderProps>>();
    const { appSections, customize } = props;

    const sections = appSections.find((item) => item.slug === 'create_link');

    if (!sections) return null;

    return (
        <div id="create-link" className="container overflow-hidden py-20">
            <div className={customize ? 'home-edit' : ''}>
                {customize && (
                    <EditSection
                        section={sections}
                        Icon={<Pencil className="h-7 w-7 text-green-500" />}
                    />
                )}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    <img
                        className="h-auto w-full pb-5 lg:pb-0"
                        src={sections.thumbnail || ''}
                        alt={sections.title}
                    />

                    <div className="flex flex-col items-start justify-center">
                        <h4 className="text-2xl font-bold md:text-4xl">
                            {sections.title}
                        </h4>
                        <p className="pb-4 pt-6">{sections.description}</p>

                        <div
                            className={`mb-5 ml-0 lg:ml-4 ${customize ? 'home-edit' : ''}`}
                        >
                            {customize && (
                                <EditSectionList
                                    section={sections}
                                    Icon={
                                        <Pencil className="h-5 w-5 text-green-500" />
                                    }
                                />
                            )}

                            <ul>
                                {JSON.parse(sections.section_list).map(
                                    (list: IntroSectionList, index: number) => (
                                        <li
                                            key={index}
                                            className="flex items-center py-2"
                                        >
                                            <CheckCheck className="mr-2 h-6 w-6 text-blue-500" />
                                            {list.content}
                                        </li>
                                    ),
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateLink;
