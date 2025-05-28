import lucide from '@/icons/lucide';
import { PageProps } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Pencil } from 'lucide-react';
import EditSectionList from './EditSectionList';

type HeaderProps = {
    customPages: any[];
    appSections: IntroSection[];
    customize?: boolean;
};

const Footer = () => {
    const { props } = usePage<PageProps<HeaderProps>>();
    const { app, customPages, appSections, customize } = props;

    const followOnSection = appSections.find(
        (item) => item.slug === 'follow_on',
    );
    const addressSection = appSections.find((item) => item.slug === 'address');

    return (
        <section className="overflow-hidden bg-gray-100">
            <div className="container overflow-hidden py-12">
                <div className="grid grid-cols-12 gap-6">
                    <div className="col-span-12 text-center lg:col-span-5 lg:text-start">
                        <div className="flex items-center justify-center lg:justify-start">
                            <img
                                alt=""
                                className="h-9 w-9 rounded-xl md:h-11 md:w-11"
                                src={app.logo}
                            />
                            <h6 className="ms-4 text-xl font-semibold md:text-2xl">
                                {app.name}
                            </h6>
                        </div>
                        <p className="pb-5 pt-4 text-gray-400">
                            {app.description}
                        </p>

                        {followOnSection && (
                            <div>
                                <p className="mb-4 font-medium">
                                    {followOnSection.title}
                                </p>
                                <div className={customize ? 'home-edit' : ''}>
                                    {customize && (
                                        <EditSectionList
                                            section={followOnSection}
                                            Icon={
                                                <Pencil className="h-5 w-5 text-green-500" />
                                            }
                                        />
                                    )}

                                    <div className="flex justify-center lg:justify-start">
                                        {JSON.parse(
                                            followOnSection.section_list,
                                        ).map(
                                            (
                                                list: IntroSectionList,
                                                index: number,
                                            ) => {
                                                type IconName =
                                                    keyof typeof lucide;
                                                const Icon =
                                                    lucide[
                                                        list.icon as IconName
                                                    ];

                                                return (
                                                    <Link
                                                        key={index}
                                                        target="_blank"
                                                        href={list.url || '#'}
                                                    >
                                                        <Icon
                                                            className={`mr-4 h-5 w-5 text-gray-400`}
                                                        />
                                                    </Link>
                                                );
                                            },
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="col-span-12 lg:col-span-1"></div>

                    {addressSection && (
                        <div className="col-span-12 text-center lg:col-span-3 lg:text-start">
                            <p className="my-5 text-lg font-medium">
                                {addressSection.title}
                            </p>
                            <div className={customize ? 'home-edit' : ''}>
                                {customize && (
                                    <EditSectionList
                                        section={addressSection}
                                        Icon={
                                            <Pencil className="h-5 w-5 text-green-500" />
                                        }
                                    />
                                )}

                                <ul className="text-gray-500">
                                    {JSON.parse(
                                        addressSection.section_list,
                                    ).map(
                                        (
                                            list: IntroSectionList,
                                            index: number,
                                        ) => (
                                            <li
                                                key={index}
                                                className="mb-4 last:mb-0"
                                            >
                                                <Link href={list.url || '#'}>
                                                    {list.content}
                                                </Link>
                                            </li>
                                        ),
                                    )}
                                </ul>
                            </div>
                        </div>
                    )}

                    <div className="col-span-12 text-center lg:col-span-3 lg:text-start">
                        <p className="my-5 text-lg font-medium">Company</p>
                        <ul className="text-gray-500">
                            {customPages.length > 0 ? (
                                customPages.map((page) => (
                                    <li
                                        key={page.id}
                                        className="mb-4 last:mb-0"
                                    >
                                        <a href={`/app/${page.route}`}>
                                            {page.name}
                                        </a>
                                    </li>
                                ))
                            ) : (
                                <li className="mb-4 last:mb-0">
                                    Here will show custom created pages from
                                    dashboard
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="mx-auto w-full max-w-[1200px] border-t border-t-gray-200 px-4 py-8 text-center">
                <p className="text-gray-500">{app.copyright}</p>
            </div>
        </section>
    );
};

export default Footer;
