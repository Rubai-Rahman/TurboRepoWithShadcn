import { SVGProps } from "react";

const CategoryThunder = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M13.8891 4.16675L8.3335 11.1667H13.3335L12.7779 15.8334L18.3335 8.83341H13.3335L13.8891 4.16675Z"
      stroke="#6B7280"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M1.6665 10H5.83317" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M1.6665 5H9.1665" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M1.6665 15H9.1665" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export default CategoryThunder;
