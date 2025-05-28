import Breadcrumb from '@/components/breadcrumb';
import DeleteByInertia from '@/components/delete-by-inertia';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Dashboard from '@/layouts/dashboard/layout';
import { PageProps, TestimonialProps } from '@/types';
import { Head } from '@inertiajs/react';
import { MessageSquareText, Trash } from 'lucide-react';
import { ReactNode } from 'react';
import CreateTestimonial from './Partials/CreateTestimonial';
import EditTestimonial from './Partials/EditTestimonial';

interface Props extends PageProps {
    testimonials: TestimonialProps[];
}

const Index = ({ testimonials, translate }: Props) => {
    const { app } = translate;

    return (
        <>
            <Head title={app.testimonials} />
            <Breadcrumb
                Icon={MessageSquareText}
                title={app.testimonials}
                Component={<CreateTestimonial />}
            />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {testimonials.map((item) => (
                    <Card
                        key={item.id}
                        className="relative mt-14 p-6 pt-16 text-center"
                    >
                        <div className="absolute right-3 top-3">
                            <EditTestimonial testimonial={item} />

                            <DeleteByInertia
                                apiPath={route('testimonials.destroy', {
                                    id: item.id,
                                })}
                                Component={
                                    <Button
                                        size="icon"
                                        className="ml-3 h-7 w-7 rounded-full bg-red-50 text-red-500 hover:bg-red-50 active:bg-red-50"
                                    >
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                }
                            />
                        </div>
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
                ))}
            </div>
        </>
    );
};

Index.layout = (page: ReactNode) => <Dashboard children={page} />;

export default Index;
