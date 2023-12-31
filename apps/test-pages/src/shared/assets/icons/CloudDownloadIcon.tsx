import { iconType } from "./iconType";

const CloudDownloadIcon: iconType = ({ style }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className={style} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
    );
};

export default CloudDownloadIcon;