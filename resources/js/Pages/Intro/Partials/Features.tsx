import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import { nanoid } from 'nanoid';

const Features = () => {
    const features = [
        {
            id: nanoid(),
            slug: 'bio-link',
            title: 'Bio Link Generator',
            description:
                "LinkDrop is more than just a link shortener. We've built a suite of powerful features that gives you marketing superpowers.",
        },
        {
            id: nanoid(),
            slug: 'qr-code',
            title: 'QR Code Generator',
            description:
                "LinkDrop is more than just a link shortener. We've built a suite of powerful features that gives you marketing superpowers.",
        },
        {
            id: nanoid(),
            slug: 'short-link',
            title: 'Personalize Your Short links',
            description:
                "LinkDrop is more than just a link shortener. We've built a suite of powerful features that gives you marketing superpowers.",
        },
        {
            id: nanoid(),
            slug: 'customize-theme',
            title: 'Customizable Themes',
            description:
                "LinkDrop is more than just a link shortener. We've built a suite of powerful features that gives you marketing superpowers.",
        },
    ];

    return (
        <div className="mx-auto max-w-[996px] py-20 md:py-[120px]">
            <div className="mx-auto mb-10 max-w-[500px] text-center">
                <h2 className="mb-2 text-2xl font-semibold md:text-4xl">
                    Powerful Features
                </h2>
                <p className="text-sm text-gray-600 md:text-base">
                    LinkDrop is more than just a link shortener. We've built a
                    suite of powerful features that gives you marketing
                    superpowers.
                </p>
            </div>

            <div className="flex items-center gap-6">
                <div className="w-full max-w-[384px]">
                    <h6 className="mb-8 text-lg font-semibold md:text-2xl">
                        LinkDrop Features
                    </h6>
                    <Accordion
                        collapsible
                        type="single"
                        defaultValue={features[0].slug}
                    >
                        {features.map(({ id, slug, title, description }) => (
                            <AccordionItem
                                key={id}
                                value={slug}
                                className="border-gray-100 last:border-none"
                            >
                                <AccordionTrigger className="py-2 text-base hover:no-underline md:text-lg">
                                    {title}
                                </AccordionTrigger>
                                <AccordionContent className="text-base text-gray-800">
                                    {description}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </div>
    );
};

export default Features;
