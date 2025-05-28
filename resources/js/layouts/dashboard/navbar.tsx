import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { setMobileSidenav, setOpenSidenav } from '@/context/app-context';
import { useAppContext } from '@/hooks/use-app-context';
import { PageProps } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { Expand, Menu, Minimize, UserCircle } from 'lucide-react';
import { useState } from 'react';

const DashboardNavbar = () => {
    const { props } = usePage<PageProps>();

    const user = props.auth.user.data;
    const [state, dispatch] = useAppContext();
    const { openSidenav, mobileSidenav } = state;
    const [isFullscreen, setIsFullscreen] = useState(false);

    const handleFullscreenToggle = () => {
        if (!isFullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
        setIsFullscreen(!isFullscreen);
    };

    return (
        <div className="sticky top-0 z-40 bg-white bg-opacity-50 px-5 py-4 backdrop-blur-lg transition-all md:px-7 md:py-6">
            <div className="flex justify-between gap-6 md:flex-row md:items-center">
                <div>
                    <Menu
                        className="hidden h-5 w-6 cursor-pointer lg:block"
                        onClick={() => setOpenSidenav(dispatch, !openSidenav)}
                    />

                    <Menu
                        className="block h-5 w-6 cursor-pointer lg:hidden"
                        onClick={() =>
                            setMobileSidenav(dispatch, !mobileSidenav)
                        }
                    />
                </div>

                <div className="flex items-center gap-5">
                    {isFullscreen ? (
                        <Minimize
                            onClick={handleFullscreenToggle}
                            className="h-[22px] w-[22px] cursor-pointer"
                        />
                    ) : (
                        <Expand
                            onClick={handleFullscreenToggle}
                            className="h-[22px] w-[22px] cursor-pointer"
                        />
                    )}

                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            {user.image ? (
                                <Avatar className="h-8 w-8">
                                    <AvatarImage
                                        src={user.image}
                                        alt="linkdrop"
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            ) : (
                                <UserCircle className="text-blue-gray-500 h-7 w-7" />
                            )}
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            className="min-w-[100px]"
                        >
                            <DropdownMenuItem
                                className="cursor-pointer justify-center"
                                onClick={() =>
                                    router.get('/dashboard/settings')
                                }
                            >
                                Settings
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                className="cursor-pointer justify-center"
                                onClick={() => router.post('/logout')}
                            >
                                Log Out
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar;
