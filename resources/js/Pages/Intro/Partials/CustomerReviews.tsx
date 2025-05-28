'use client';

import { useEffect, useState } from 'react';

const testimonials = [
    {
        name: 'John Doe',
        role: 'Founder, TechStart',
        content:
            'Shadcnkit has been a game-changer for our startup. It helped us launch our MVP in record time!',
    },
    {
        name: 'Jane Smith',
        role: 'Freelance Developer',
        content:
            "As a freelancer, Shadcnkit has become my go-to toolkit. It's boosted my productivity significantly.",
    },
    {
        name: 'Alex Johnson',
        role: 'Content Creator',
        content:
            "Shadcnkit's components are not only beautiful but also highly customizable. It's perfect for my projects!",
    },
    {
        name: 'Emily Brown',
        role: 'UX Designer',
        content:
            "The attention to detail in Shadcnkit is impressive. It's made my design process so much smoother.",
    },
    {
        name: 'Michael Lee',
        role: 'Product Manager',
        content:
            "Shadcnkit has streamlined our development process. We're shipping features faster than ever.",
    },
    {
        name: 'Sarah Wilson',
        role: 'Marketing Specialist',
        content:
            'The consistency and flexibility of Shadcnkit have made our marketing campaigns more cohesive.',
    },
    {
        name: 'David Taylor',
        role: 'E-commerce Owner',
        content:
            'Implementing Shadcnkit on our e-commerce site has significantly improved our conversion rates.',
    },
    {
        name: 'Lisa Chen',
        role: 'Full-stack Developer',
        content:
            "Shadcnkit's documentation is top-notch. It's been a pleasure integrating it into our tech stack.",
    },
    {
        name: 'Robert Garcia',
        role: 'Startup Advisor',
        content:
            "I recommend Shadcnkit to all my clients. It's a game-changer for rapid prototyping and development.",
    },
];

const CustomerReviews = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(
                (prevIndex) => (prevIndex + 3) % testimonials.length,
            );
        }, 5000); // Change testimonials every 5 seconds

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container py-20 md:py-[120px]">
            <div className="mx-auto mb-10 max-w-[500px] text-center">
                <h2 className="mb-2 text-2xl font-semibold md:text-4xl">
                    Trusted by the best
                </h2>
                <p className="text-sm text-gray-600 md:text-base">
                    Shadcnkit is helping over a thousand of the top creators,
                    SaaS startups, and freelancers grow faster.
                </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[0, 1, 2].map((offset) => {
                    const index = (currentIndex + offset) % testimonials.length;
                    const testimonial = testimonials[index];
                    return (
                        <div
                            key={index}
                            className="rounded-lg border border-border bg-background p-6"
                        >
                            <p className="mb-6 text-lg italic">
                                &ldquo;{testimonial.content}&rdquo;
                            </p>
                            <div className="flex items-center">
                                <div className="mr-3 h-10 w-10 rounded-full bg-primary"></div>
                                <div className="text-left">
                                    <h3 className="text-base font-semibold">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        {testimonial.role}
                                    </p>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 flex justify-center">
                {[0, 3, 6].map((startIndex) => (
                    <button
                        key={startIndex}
                        className={`mx-1 h-2 w-2 rounded-full ${
                            currentIndex === startIndex
                                ? 'bg-primary'
                                : 'bg-muted'
                        }`}
                        onClick={() => setCurrentIndex(startIndex)}
                    />
                ))}
            </div>
        </div>
    );
};

export default CustomerReviews;
