import { AppContext } from '@/context/app-context';
import { useContext } from 'react';

export function useAppContext() {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error(
            'useAppContext should be used inside the AppContextProvider.',
        );
    }

    return context;
}
