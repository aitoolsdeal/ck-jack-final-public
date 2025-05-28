import { Card } from '@/components/ui/card';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import { PageProps, TestimonialProps } from '@/types';
import { usePage } from '@inertiajs/react';
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useState } from 'react';

interface Props extends PageProps {
    testimonials: TestimonialProps[];
}

const Testimonials = () => {
    const { props } = usePage<Props>();
    const { testimonials } = props;
    const [api, setApi] = useState<any>();
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        if (!api) {
            return;
        }

        const handleSelect = () => {
            setCurrentSlide(api.selectedScrollSnap());
        };

        api.on('select', handleSelect);

        return () => {
            api.off('select', handleSelect);
        };
    }, [api]);

    return (
        <div className="testimonials container py-20">
            <div className="mx-auto mb-10 max-w-[360px] text-center">
                <h4 className="mb-4 text-xl font-bold md:text-4xl">
                    Meet Our Team
                </h4>
                <p className="text-sm md:text-base">
                    If you face any problem, our support team will help you
                    within a business working day.
                </p>
            </div>

            <Carousel
                setApi={setApi}
                className="w-full pb-7 md:pb-10"
                opts={{ align: 'start', loop: true }}
                plugins={[Autoplay({ delay: 3000 })]}
            >
                <CarouselContent>
                    {testimonials.map((item) => (
                        <CarouselItem
                            key={item.id}
                            className="basis-full md:basis-1/2 lg:basis-1/3"
                        >
                            <div className="p-1">
                                <Card className="relative mt-14 p-6 pt-16 text-center">
                                    <img
                                        src={item.thumbnail}
                                        className="absolute -top-[20%] left-1/2 h-[100px] w-[100px] -translate-x-1/2 transform rounded-full border-2 border-white"
                                        alt="customer-img"
                                    />
                                    <p>{item.testimonial}</p>

                                    <div className="my-4 border-t border-gray-200"></div>

                                    <p className="text-lg font-bold text-blue-500">
                                        {item.name}
                                    </p>
                                    <p className="text-sm">{item.title}</p>
                                </Card>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>

            <div className="flex h-4 items-center justify-center gap-3">
                {api &&
                    testimonials.map(({ id }, index) => (
                        <button
                            key={id}
                            className={cn(
                                'h-2 w-2 rounded-full transition-all duration-200',
                                currentSlide === index
                                    ? 'bg-primary outline outline-2 outline-border'
                                    : 'bg-muted',
                            )}
                            onClick={() => api.scrollTo(index)}
                        ></button>
                    ))}
            </div>
        </div>
    );
};

export default Testimonials;
