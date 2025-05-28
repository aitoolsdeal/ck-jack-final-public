import { PageProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { CheckCircle } from 'lucide-react';

interface Props {
    features: PricingPlanFeature;
}

const PricingFeature = ({ features }: Props) => {
    const { props } = usePage<PageProps>();
    const app = props.translate.app;

    const featureList = [
        `${features.biolinks ?? 'Unlimited'} ${app.biolinks_create}`,
        `${features.biolink_blocks} ${app.biolink_blocks_access}`,
        `${features.shortlinks ?? 'Unlimited'} ${app.shortlinks_create}`,
        `${features.projects ?? 'Unlimited'} ${app.projects_create}`,
        `${features.qrcodes ?? 'Unlimited'} ${app.qrcodes_create}`,
        `${features.themes} ${app.theme_access}`,
        features.custom_theme
            ? app.custom_theme_create_allow
            : app.custom_theme_create_not_allow,
        `${features.support} ${app.hours_support}`,
    ];

    return (
        <>
            {featureList.map((item, ind) => (
                <div
                    key={ind}
                    className="mb-4 flex items-center text-gray-700 last:mb-0"
                >
                    <CheckCircle className="mr-2 h-4 w-4 text-blue-500" />
                    <small>{item}</small>
                </div>
            ))}
        </>
    );
};

export default PricingFeature;
