import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { scrollToSection } from '@/lib/scroll-to-section';
import { cn } from '@/lib/utils';
import { PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { Menu } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const routes = [
    {
        id: nanoid(),
        name: 'Home',
        path: 'home',
    },
    {
        id: nanoid(),
        name: 'Features',
        path: 'features',
    },
    {
        id: nanoid(),
        name: 'Pricing',
        path: 'pricing',
    },
    {
        id: nanoid(),
        name: 'Docs',
        path: 'docs',
    },
];

const Navigation = () => {
    const { url, props } = usePage<PageProps>();
    const { auth, customize } = props;
    const [isSticky, setIsSticky] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 100) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div
            className={cn(
                'fixed top-0 z-50 w-full',
                isSticky ? 'px-0' : 'px-4',
            )}
        >
            <Card
                className={cn(
                    'container mt-6 rounded-2xl border-0 bg-transparent py-3 shadow-none transition-all duration-200',
                    isSticky &&
                        'mt-0 max-w-full rounded-none bg-[#F5FAFF] py-4 shadow',
                )}
            >
                <div className="container flex items-center justify-between gap-6 px-4">
                    <Link href="/" className="flex items-center gap-3">
                        <img
                            alt=""
                            src="/storage/icons/linkdrop.png"
                            className="h-9 w-9"
                        />
                        <span className="text-xl font-bold">LinkDrop</span>
                    </Link>

                    <ul className="hidden items-center gap-10 text-muted-foreground lg:flex">
                        {routes.map(({ id, name, path }) => (
                            <li
                                key={id}
                                className={cn(
                                    path === url
                                        ? 'font-medium text-primary'
                                        : '',
                                )}
                                onClick={() => scrollToSection(path)}
                            >
                                <Link href={path}>{name}</Link>
                            </li>
                        ))}
                    </ul>

                    <div>
                        {auth.user ? (
                            <div className="flex items-center gap-3">
                                <Button asChild className="rounded-full px-6">
                                    <Link href="/dashboard">Dashboard</Link>
                                </Button>

                                {auth.user.data.role === 'admin' && (
                                    <Button
                                        asChild
                                        className="rounded-full px-6"
                                    >
                                        <Link
                                            href={
                                                customize
                                                    ? '/'
                                                    : '?customize=intro'
                                            }
                                        >
                                            {customize
                                                ? 'Back To Home'
                                                : 'Customize'}
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Button
                                    asChild
                                    variant="secondary"
                                    className="rounded-full px-6"
                                >
                                    <Link href="/login">Log in</Link>
                                </Button>

                                <Button asChild className="rounded-full px-6">
                                    <Link href="/register">
                                        Sign up for free
                                    </Link>
                                </Button>
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <Sheet open={open} onOpenChange={setOpen}>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="w-10 px-0 lg:hidden"
                                    >
                                        <Menu className="h-5 w-5" />
                                        <span className="sr-only">
                                            Toggle Theme
                                        </span>
                                    </Button>
                                </SheetTrigger>

                                <SheetContent
                                    side="left"
                                    className="w-[220px] border-border"
                                >
                                    <Link
                                        href="/"
                                        onChange={() => setOpen(false)}
                                        className="flex items-center"
                                    >
                                        LinkDrop
                                    </Link>

                                    <div className="flex flex-col gap-3 py-7">
                                        {routes.map(({ id, name, path }) => (
                                            <Button
                                                key={id}
                                                variant="link"
                                                className="h-8 justify-start px-0 text-sm"
                                                onClick={() => router.get(path)}
                                            >
                                                {name}
                                            </Button>
                                        ))}
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default Navigation;
