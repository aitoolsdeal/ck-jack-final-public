import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { setMobileSidenav } from '@/context/app-context';
import { useAppContext } from '@/hooks/use-app-context';
import { default as adminRoutes } from '@/layouts/dashboard/partials/admin-routes';
import { cn, isActiveRoute } from '@/lib/utils';
import { PageProps } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import { ArrowLeft, LogOut } from 'lucide-react';
import SidebarNavItem from './partials/sidebar-nav-item';
import userRoutes from './partials/user-routes';

const DashboardSidebar = () => {
    const { url, props } = usePage<PageProps>();
    const { user } = props.auth;
    const { logo } = props.app;

    const [state, dispatch] = useAppContext();
    const { mobileSidenav, openSidenav } = state;

    const routeHandler = (route: string) => {
        router.get(route);

        if (!openSidenav) {
            setMobileSidenav(dispatch, !mobileSidenav);
        }
    };

    const sidebarWidth = mobileSidenav
        ? 'w-[240px] absolute top-0 left-0'
        : openSidenav
          ? 'w-[240px]'
          : 'w-[0px]';

    const getRoutes = () => {
        return user.data.role === 'admin' ? adminRoutes : userRoutes;
    };

    return (
        <section
            className={cn(
                'relative inset-0 z-50 h-full w-full transition-all duration-300',
                openSidenav ? 'max-w-[240px]' : 'max-w-[0px]',
            )}
        >
            <div
                className={cn(
                    'h-full overflow-x-hidden bg-white shadow transition-all duration-300',
                    sidebarWidth,
                )}
            >
                <div className="flex items-center justify-between pt-6">
                    <Link
                        href="/"
                        className="flex items-center gap-2 pl-4 lg:pl-5"
                    >
                        <img src={logo} className="h-10 w-10 rounded-md" />
                    </Link>

                    {!openSidenav && (
                        <Button
                            size="icon"
                            variant="outline"
                            className="h-9 w-6 rounded-r-none bg-gray-200 text-gray-500 hover:bg-gray-200 active:bg-gray-200"
                            onClick={() =>
                                setMobileSidenav(dispatch, !mobileSidenav)
                            }
                        >
                            <ArrowLeft />
                        </Button>
                    )}
                </div>

                <ScrollArea className="h-[calc(100vh-66px)]">
                    <div className="m-4 lg:m-5">
                        {getRoutes().map(({ title, pages, slug }) => {
                            return (
                                <div
                                    key={slug}
                                    className="mb-4 flex flex-col gap-3"
                                >
                                    <p className="mx-3.5 mb-4 mt-2 block text-xs font-medium lg:mx-[18px]">
                                        {title}
                                    </p>

                                    {pages.map(({ Icon, path, slug, name }) => (
                                        <SidebarNavItem
                                            key={slug}
                                            Icon={Icon}
                                            title={name}
                                            active={isActiveRoute(path, url)}
                                            onClick={() => routeHandler(path)}
                                        />
                                    ))}
                                </div>
                            );
                        })}

                        <SidebarNavItem
                            Icon={LogOut}
                            title="Log Out"
                            active={false}
                            onClick={() => router.post('/logout')}
                        />
                    </div>
                </ScrollArea>
            </div>
        </section>
    );
};

export default DashboardSidebar;
