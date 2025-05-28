import { socialType } from '@/data/socials-links';
import { LinkProps, PaginationProps } from '@/types';
import axios from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function stringToCss(strStyle: string) {
    const parsedStyle: any = {};

    // Parse the CSS string
    strStyle.split(';').forEach((declaration) => {
        const [property, value] = declaration.split(':');
        if (property && value) {
            parsedStyle[property.trim()] = value.trim();
        }
    });

    return parsedStyle;
}

export function jsxStyle(styles: {
    [key: string]: string;
}): React.CSSProperties {
    const inlineStyles: any = {};
    for (const key in styles) {
        if (styles.hasOwnProperty(key)) {
            const propKey = key.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
            inlineStyles[propKey] = styles[key];
        }
    }
    return inlineStyles;
}

export function cssToJsxStyle(cssString: string): Record<string, string> {
    const styleObject: Record<string, string> = {};

    // Split the CSS string by semicolon to get individual declarations
    const cssRules = cssString.split(';').filter((rule) => rule.trim() !== '');

    cssRules.forEach((rule) => {
        // Split the rule only at the first colon to preserve values with colons (e.g., URLs)
        const colonIndex = rule.indexOf(':');
        const property = rule.slice(0, colonIndex).trim();
        const value = rule.slice(colonIndex + 1).trim();

        // Convert the property name to camelCase
        const camelCaseProperty = property.replace(/-([a-z])/g, (_, char) =>
            char.toUpperCase(),
        );

        // Assign the value to the property
        styleObject[camelCaseProperty] = value;
    });

    return styleObject;
}

export function getLink(link: LinkProps, name: string): string {
    if (link.socials) {
        const socials: socialType[] = JSON.parse(link.socials);
        const value = socials.find((item) => item.name === name);
        if (value && value.link) {
            return value.link;
        } else {
            return '';
        }
    } else {
        return '';
    }
}

export const pageChange = (
    current: PaginationProps,
    previous: PaginationProps,
) => {
    let changed = false;
    const curLength = current.data.length;
    const prevLength = previous.data.length;

    if (curLength > prevLength || curLength < prevLength) {
        changed = true;
    } else {
        for (let i = 0; i < curLength; i++) {
            const newItem = current.data[i];
            const prevItem = previous.data[i];
            if (newItem.id !== prevItem.id) {
                changed = true;
                break;
            }
        }
    }

    if (current.data[0] && current.data[0].qrcode) {
        changed = true;
    }

    return changed;
};

// Assume this function is triggered on a button click or similar action
export function fileExporter(path: string) {
    axios
        .get(path)
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const filename = response.headers['filename'];
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
        })
        .catch((error) => {
            console.error('Error while downloading CSV:', error);
        });
}

export function isActiveRoute(route: string, url: string) {
    const routeSlit = route.split('/');
    const urlSplit = url.split('/');

    const currentRoute =
        routeSlit.length > 2
            ? routeSlit[2] == 'stripe'
                ? routeSlit[3]
                : routeSlit[2]
            : routeSlit[1];

    const currentUrl =
        urlSplit.length > 2
            ? urlSplit[2] == 'stripe'
                ? urlSplit[3]
                : urlSplit[2]
            : urlSplit[1];

    return currentRoute === currentUrl;
}

export const getDayShortName = (month: number, day: number) => {
    if (month < 1 || month > 12) {
        throw new Error('Invalid month. Month should be between 1 and 12.');
    }
    if (day < 1 || day > 31) {
        throw new Error('Invalid day. Day should be between 1 and 31.');
    }

    // Check the actual number of days in the given month
    const daysInMonth = new Date(2024, month, 0).getDate(); // Get the last day of the month
    if (day > daysInMonth) {
        throw new Error(
            `Invalid date. ${month}/${day} exceeds the number of days in the month.`,
        );
    }

    // Create the date and get the day short name
    const date = new Date(2024, month - 1, day); // Use year 2024 for consistent leap year handling
    const dayShortName = new Intl.DateTimeFormat('en-US', {
        weekday: 'long',
    }).format(date);

    return dayShortName;
};
