import { SVGProps } from "react";

const WorkFlowIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M3.3335 12.8332V7.1665C3.3335 5.50965 4.67664 4.1665 6.3335 4.1665H13.6668C15.3237 4.1665 16.6668 5.50965 16.6668 7.1665V12.8332C16.6668 14.49 15.3237 15.8332 13.6668 15.8332H6.3335C4.67664 15.8332 3.3335 14.49 3.3335 12.8332Z"
      stroke="#6B7280"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path d="M0.833496 7.5V12.5" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M19.1665 7.5V12.5" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
    <circle cx={7.0835} cy={10} r={1.25} fill="#6B7280" />
    <circle cx={12.9165} cy={10} r={1.25} fill="#6B7280" />
  </svg>
);

export default WorkFlowIcon;
