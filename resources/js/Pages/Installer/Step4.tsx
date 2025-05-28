import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { PageProps } from '@/types';
import { Link, router } from '@inertiajs/react';
import React, { ReactNode, useState } from 'react';
import Layout from './Partials/Layout';
import Message from './Partials/Message';
import StepNavigator from './Partials/StepNavigator';

const Step4 = ({ flash }: PageProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setShowModal(true);

        router.post(
            route('install.store-step4'),
            {},
            {
                onFinish() {
                    setIsLoading(false);
                    setShowModal(false);
                },
            },
        );
    };

    return (
        <div>
            {/* Step Navigator */}
            <StepNavigator
                step1="fill"
                step2="fill"
                step3="fill"
                step4="active"
            />

            {/* Loading Message */}
            {isLoading && (
                <div
                    id="loader"
                    className="mb-4 rounded-md bg-green-100 px-5 py-3 text-center text-sm font-medium text-green-500"
                >
                    Loading...
                </div>
            )}

            <Message success={flash.success} error={flash.error} />

            <h6 className="mb-10 text-center text-2xl font-medium text-gray-900">
                You are in the final step of the installation process
            </h6>

            <div className="mt-12 flex w-full items-center justify-end gap-4">
                <Link href={route('install.show-step4')}>
                    <Button
                        type="button"
                        variant="outline"
                        className="border border-orange-500 !bg-transparent uppercase !text-orange-500"
                    >
                        Previous Step
                    </Button>
                </Link>

                <Button
                    type="button"
                    onClick={handleConfirm}
                    className="bg-orange-500 px-6 py-3 uppercase text-white hover:bg-orange-600/90"
                >
                    Confirm
                </Button>
            </div>

            <Dialog open={showModal} onOpenChange={setShowModal}>
                <DialogContent>
                    <div className="modal-box !rounded-md !bg-orange-50 !p-4 !text-gray-900 md:max-w-md">
                        <p className="!mb-6 !text-justify !font-medium">
                            Your app is currently undergoing an automatic
                            installation. This process will take a few minutes.
                            Please don't refresh your page or turn off your
                            device. Just stay with this process.
                        </p>
                        <div className="relative mt-6 w-full rounded-full bg-gray-200">
                            <div
                                id="shim-blue"
                                className="absolute h-2 animate-pulse rounded-full bg-blue-500"
                                style={{ width: '100%' }}
                            ></div>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
};

Step4.layout = (page: ReactNode) => <Layout children={page} />;

export default Step4;
