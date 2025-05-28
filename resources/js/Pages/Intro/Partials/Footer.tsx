import { Link } from '@inertiajs/react';
import { getYear } from 'date-fns';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
    return (
        <div className="bg-[#F5FAFF]">
            <div className="container flex flex-col items-start justify-between gap-10 py-14 md:flex-row md:py-16">
                <div className="w-full md:max-w-[420px]">
                    <div className="mb-4 flex items-center gap-2">
                        <p>LinkDrop</p>
                        <p className="text-lg font-semibold">LinkDrop</p>
                    </div>

                    <p className="font-medium text-gray-600">
                        An effective business description should include
                        information that tells readers exactly what your company
                        does, who is in charge of operations, and what will make
                        your company successful.
                    </p>

                    <div className="mt-6 space-y-4">
                        <p className="font-medium text-gray-800">Follow on:</p>

                        <div className="flex items-center gap-4">
                            <Link href="#">
                                <Facebook className="h-5 w-5 text-gray-600" />
                            </Link>
                            <Link href="#">
                                <Twitter className="h-5 w-5 text-gray-600" />
                            </Link>
                            <Link href="#">
                                <Linkedin className="h-5 w-5 text-gray-600" />
                            </Link>
                            <Link href="#">
                                <Instagram className="h-5 w-5 text-gray-600" />
                            </Link>
                            <Link href="#">
                                <Youtube className="h-5 w-5 text-gray-600" />
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex w-full flex-col justify-between gap-10 md:max-w-[650px] md:flex-row">
                    <div>
                        <p className="mb-4 text-lg font-medium text-gray-800">
                            Pages
                        </p>
                        <ul className="space-y-[18px] text-gray-600">
                            <li>
                                <Link href="/">Home</Link>
                            </li>
                            <li>
                                <Link href="/dashboard/bio-links">Links</Link>
                            </li>
                            <li>
                                <Link href="/dashboard/projects">Project</Link>
                            </li>
                            <li>
                                <Link href="/about-us">About Us</Link>
                            </li>
                            <li>
                                <Link href="/contact-us">Contact Us</Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="mb-4 text-lg font-medium text-gray-800">
                            Support
                        </p>
                        <ul className="space-y-[18px] text-gray-600">
                            <li>
                                <Link href="#">Help</Link>
                            </li>
                            <li>
                                <Link href="/dashboard/bio-links">
                                    Getting Started
                                </Link>
                            </li>
                            <li>
                                <Link href="/dashboard/projects">FAQs</Link>
                            </li>
                            <li>
                                <Link href="/about-us">Privacy Policy</Link>
                            </li>
                            <li>
                                <Link href="/contact-us">
                                    Terms & Conditions
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <p className="mb-4 text-lg font-medium text-gray-800">
                            Address
                        </p>
                        <ul className="space-y-[18px] text-gray-600">
                            <li>
                                18, Time squar, California <br />
                                United State of America.
                            </li>
                            <li>+(123) 456 789 10</li>
                            <li>info@biolink.com</li>
                            <li>www.biolink.com</li>
                        </ul>
                    </div>
                </div>
            </div>

            <p className="border-t border-gray-200 p-6 text-center text-gray-600">
                Copyrights © {getYear(new Date())} Biolink. All rights
                reserved.
            </p>
        </div>
    );
};

export default Footer;
