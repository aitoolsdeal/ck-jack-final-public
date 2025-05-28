import { ScrollArea } from '@/components/ui/scroll-area';
import { PropsWithChildren } from 'react';
import Main from '../main';
import DashboardNavbar from './navbar';
import DashboardSidebar from './sidebar';

const DashboardLayout = ({ children }: PropsWithChildren) => {
    return (
        <Main>
            <main className="flex h-screen">
                <DashboardSidebar />
                <ScrollArea className="h-screen w-full">
                    <DashboardNavbar />

                    <div className="container mx-auto grid grid-cols-1 px-6 py-10">
                        {children}
                    </div>
                </ScrollArea>
            </main>
        </Main>
    );
};

export default DashboardLayout;
