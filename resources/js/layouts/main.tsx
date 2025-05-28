import { Toaster } from '@/components/ui/toaster';
import { AppContextProvider } from '@/context/app-context';
import { useToast } from '@/hooks/use-toast';
import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { PropsWithChildren, useEffect } from 'react';

const Main = ({ children }: PropsWithChildren) => {
    const { toast } = useToast();
    const { props } = usePage<PageProps>();

    useEffect(() => {
        if (props.flash.error) {
            toast({
                variant: 'destructive',
                description: props.flash.error,
            });
        }

        if (props.flash.success || props.flash.warning) {
            toast({
                description: props.flash.success || props.flash.warning,
            });
        }
    }, [props.flash]);

    return (
        <AppContextProvider>
            <Toaster />

            {children}
        </AppContextProvider>
    );
};

export default Main;
