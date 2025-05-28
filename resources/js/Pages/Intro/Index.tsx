import Main from '@/layouts/main';
import { Head } from '@inertiajs/react';
import { ReactNode } from 'react';
import CreateBlock from './PrevPartials/CreateBlock';
import CreateLink from './PrevPartials/CreateLink';
import CreateQRCode from './PrevPartials/CreateQRCode';
import Features from './PrevPartials/Features';
import Footer from './PrevPartials/Footer';
import Header from './PrevPartials/Header';
import Navigation from './PrevPartials/Navigation';
import Pricing from './PrevPartials/Pricing';
import Testimonials from './PrevPartials/Testimonials';

const Index = () => {
    return (
        <>
            <Head title="Intro" />

            <Navigation />
            <Header />
            <Features />
            <CreateLink />
            <CreateBlock />
            <CreateQRCode />
            <Pricing />
            <Testimonials />
            <Footer />
        </>
    );
};

Index.layout = (page: ReactNode) => <Main children={page} />;

export default Index;
