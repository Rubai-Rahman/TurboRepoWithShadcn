import { iconType } from './iconType';

const CheckIcon: iconType = ({ style }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={style} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
    );
};

export default CheckIcon;