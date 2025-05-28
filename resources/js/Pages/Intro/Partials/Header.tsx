import { ExternalLink, Link, Palette, QrCode } from 'lucide-react';
import { nanoid } from 'nanoid';

const Header = () => {
    const features = [
        { id: nanoid(), content: 'Bio Link', Icon: Link },
        { id: nanoid(), content: 'Url Shortener', Icon: ExternalLink },
        { id: nanoid(), content: 'QR Code Generate', Icon: QrCode },
        { id: nanoid(), content: '19+ Themes', Icon: Palette },
    ];

    return (
        <div className="container mt-20">
            <div className="mx-auto max-w-[678px] py-16 text-center md:py-20">
                <h1 className="mb-2 text-3xl font-bold md:text-5xl md:leading-[60px]">
                    The Ultimate Link & QR Code Management Software
                </h1>
                <p className="mb-5 font-medium text-gray-600 md:mb-6 md:text-lg">
                    Presenting{' '}
                    <span className="font-semibold text-gray-800">
                        LinkDrop
                    </span>{' '}
                    The best link management software
                </p>

                <div className="flex items-center justify-center gap-4">
                    {features.map(({ id, content, Icon }) => (
                        <div key={id} className="flex items-center gap-2">
                            <Icon className="h-4 w-4 text-blue-500" />
                            <p className="font-semibold text-gray-800">
                                {content}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <img src="storage/theme-group.png" width="100%" alt="" />
        </div>
    );
};

export default Header;
