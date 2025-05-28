import { ScrollArea } from '@/components/ui/scroll-area';
import { socialType } from '@/data/socials-links';
import icons from '@/icons';
import { LinkProps, PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { UserCircle } from 'lucide-react';
import { Fragment } from 'react';
import LinkBlock from './LinkBlock';

const LinkPreview = (props: { link: LinkProps; buttonStyle: any }) => {
    const page = usePage();
    const { link, buttonStyle } = props;
    const { app } = page.props as PageProps;

    let socials: socialType[] = [];
    if (link.socials) {
        socials = JSON.parse(link.socials);
    }

    const socialColor = link.social_color ? link.social_color : '#101828';

    return (
        <ScrollArea style={{ height: '100%' }}>
            <div className="flex min-h-[calc(100vh-206px)] flex-col justify-between px-4 py-5">
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
                                    <Fragment key={ind}>
                                        {item.name === 'email' ? (
                                            <a
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
                                                href={
                                                    ('tel:' + item.link) as any
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
                                    </Fragment>
                                );
                            })}
                        </div>
                    )}

                    <div className="space-y-5">
                        {link.items.map((item) => (
                            <LinkBlock
                                key={item.id}
                                item={item}
                                iframeHeight={200}
                                buttonStyle={buttonStyle}
                            />
                        ))}
                    </div>
                </div>

                <img
                    className="mx-auto mt-10 w-10"
                    src={link.branding ?? app.logo}
                    alt=""
                />
            </div>
        </ScrollArea>
    );
};

export default LinkPreview;
