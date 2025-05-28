import { Link } from '@inertiajs/react';

const LimitWarning = ({
    limit,
    message,
}: {
    limit: boolean;
    message: string;
}) => {
    return (
        <>
            {!limit && (
                <div className="mb-10 rounded-md bg-red-50 p-4">
                    <p className="text-center text-red-500">
                        {message}{' '}
                        <Link
                            href="/dashboard/stripe/pricing-plans"
                            className="underline"
                        >
                            Click Here
                        </Link>
                    </p>
                </div>
            )}
        </>
    );
};

export default LimitWarning;
