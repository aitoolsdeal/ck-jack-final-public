import { PageProps, ThemeProps } from '@/types';
import { usePage } from '@inertiajs/react';
import { Fragment } from 'react';

interface Props {
    title: string;
    theme?: ThemeProps;
}

const ThemeBadge = ({ title, theme }: Props) => {
    const { props } = usePage<PageProps>();
    const { role, pricing_plan } = props.auth.user.data;

    const themeAccessLock = (theme: ThemeProps): boolean => {
        if (role !== 'admin') {
            if (
                pricing_plan?.pricing_features?.themes === 'BASIC' &&
                theme.type !== 'BASIC'
            ) {
                return true;
            } else if (
                (pricing_plan?.pricing_features?.themes === 'STANDARD' &&
                    theme.type !== 'BASIC') ||
                theme.type !== 'STANDARD'
            ) {
                return true;
            }
        }

        return false;
    };

    const badgeHandler = () => {
        if (theme) {
            return themeAccessLock(theme);
        } else {
            return role === 'user' ? true : false;
        }
    };

    return (
        <Fragment>
            {badgeHandler() && (
                <div className="absolute left-0 top-0 h-full w-full rounded-md bg-gray-900/60">
                    <span className="absolute right-2 top-2 rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-500">
                        {title}
                    </span>
                </div>
            )}
        </Fragment>
    );
};

export default ThemeBadge;
