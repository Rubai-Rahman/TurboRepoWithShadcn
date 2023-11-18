import { iconType } from './iconType';

const ThreeDots: iconType = ({ style }) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className={style}
            fill="none"
            viewBox="0 0 30 30"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
        </svg>
    );
};

export default ThreeDots;