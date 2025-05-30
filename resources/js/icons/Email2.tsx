import { SVGProps } from 'react';

const Email2 = (props: SVGProps<SVGSVGElement>) => {
    return (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
        >
            <path
                d="M21.75 3C22.9922 3 24 4.00734 24 5.25C24 5.95781 23.6672 6.62344 23.1 7.05L12.9 14.7C12.3656 15.0984 11.6344 15.0984 11.1 14.7L0.9 7.05C0.333422 6.62344 0 5.95781 0 5.25C0 4.00734 1.00734 3 2.25 3H21.75ZM10.2 15.9C11.2688 16.7016 12.7312 16.7016 13.8 15.9L24 8.25V18C24 19.6547 22.6547 21 21 21H3C1.34297 21 0 19.6547 0 18V8.25L10.2 15.9Z"
                fill="currentColor"
            />
        </svg>
    );
};

export default Email2;
