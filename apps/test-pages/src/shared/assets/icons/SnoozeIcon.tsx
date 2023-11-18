import { SVGProps } from "react";

const SnoozeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={10} cy={10} r={7.5} stroke="#6B7280" strokeWidth={1.5} />
    <path d="M10.0003 5.8335V10.0002H6.66699" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M5.83366 15.8335L4.16699 17.5002" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M14.167 15.8335L15.8337 17.5002" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export default SnoozeIcon;
