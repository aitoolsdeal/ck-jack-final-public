import { SVGProps } from 'react';

const Email = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M3.5 4C2.67188 4 2 4.66637 2 5.4877C2 5.95571 2.22188 6.39582 2.6 6.67786L9.4 11.736C9.75625 11.9995 10.2438 11.9995 10.6 11.736L17.4 6.67786C17.7781 6.39582 18 5.95571 18 5.4877C18 4.66637 17.3281 4 16.5 4H3.5Z"
                fill="currentColor"
            />
            <path
                opacity="0.4"
                d="M2 5.5861V14.0164C2 15.1105 2.89688 16 4 16H16C17.1031 16 18 15.1105 18 14.0164V5.5861C18 6.0541 17.7781 6.49421 17.4 6.77626L10.6 11.8344C10.2438 12.0979 9.75625 12.0979 9.4 11.8344L2.6 6.77626C2.22188 6.49421 2 6.0541 2 5.5861Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Email;
