import { PropsWithChildren } from 'react';
import Main from './main';

const GuestLayout = ({ children }: PropsWithChildren) => {
    return (
        <Main>
            <main className="flex min-h-screen flex-col items-center bg-gray-100 p-6 sm:justify-center">
                <div className="w-full overflow-hidden bg-white p-6 shadow-md sm:max-w-md sm:rounded-lg">
                    {children}
                </div>
            </main>
        </Main>
    );
};

export default GuestLayout;
