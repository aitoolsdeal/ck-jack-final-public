import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import icons from '@/icons';
import { LinkItemProps } from '@/types';
import { Globe } from 'lucide-react';

interface Props {
    item: LinkItemProps;
    buttonStyle: any;
    iframeHeight: number;
}

const LinkBlock = (props: Props) => {
    const { item, buttonStyle, iframeHeight } = props;
    const Icon = icons[item.item_icon] ? icons[item.item_icon] : Globe;

    return (
        <>
            {item.item_icon === 'Link' ? (
                <a
                    key={item.id}
                    target="_blank"
                    href={item.item_link as any}
                    className="flex items-center justify-between p-4 pr-8 font-medium"
                    style={buttonStyle}
                >
                    <Icon className="h-5 w-5" />
                    <p>{item.item_title}</p>
                    <span></span>
                </a>
            ) : item.item_icon === 'Heading' ? (
                <div className="p-4 text-center font-medium">
                    {item.item_sub_type === 'h1' ? (
                        <h1>{item.item_title}</h1>
                    ) : item.item_sub_type === 'h2' ? (
                        <h2>{item.item_title}</h2>
                    ) : item.item_sub_type === 'h3' ? (
                        <h3>{item.item_title}</h3>
                    ) : item.item_sub_type === 'h4' ? (
                        <h4>{item.item_title}</h4>
                    ) : item.item_sub_type === 'h5' ? (
                        <h5>{item.item_title}</h5>
                    ) : item.item_sub_type === 'h6' ? (
                        <h6>{item.item_title}</h6>
                    ) : null}
                </div>
            ) : (
                <Accordion type="single" collapsible>
                    <AccordionItem
                        value={`item-${item.id}`}
                        className="border-none px-4 py-0.5"
                        style={buttonStyle}
                    >
                        <AccordionTrigger className="text-base hover:no-underline">
                            <div className="flex w-full items-center justify-between">
                                <Icon className="h-5 w-5" />
                                <p>{item.item_title}</p>
                                <span></span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent>
                            {item.item_icon === 'Image' ? (
                                <>
                                    {item.item_link ? (
                                        <a
                                            href={item.item_link}
                                            target="_blank"
                                        >
                                            <img
                                                src={item.content as string}
                                                alt={item.item_title}
                                                className="w-full rounded"
                                            />
                                        </a>
                                    ) : (
                                        <img
                                            src={item.content as string}
                                            alt={item.item_title}
                                            className="w-full rounded"
                                        />
                                    )}
                                </>
                            ) : item.item_icon === 'Paragraph' ? (
                                <p className="text-justify font-normal">
                                    {item.content}
                                </p>
                            ) : null}

                            {item.item_type === 'Embed' && item.item_link && (
                                <>
                                    {item.item_icon === 'TikTok' ? (
                                        <blockquote
                                            cite={item.item_link}
                                            data-video-id={item.item_link
                                                .split('video')
                                                .pop()
                                                ?.slice(1)}
                                            className="tiktok-embed h-auto w-full"
                                        >
                                            <section></section>
                                            <script
                                                async
                                                src="https://www.tiktok.com/embed.js"
                                            ></script>
                                        </blockquote>
                                    ) : (
                                        <iframe
                                            width="100%"
                                            height={iframeHeight}
                                            allowFullScreen
                                            src={item.item_link}
                                            className="rounded"
                                        ></iframe>
                                    )}
                                </>
                            )}
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            )}
        </>
    );
};

export default LinkBlock;
