import { SVGProps } from "react";

const MaleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={8} cy={12} r={5} stroke="#6B7280" strokeWidth={1.5} />
    <path d="M11.5 8.50008L17 3M17 3V9M17 3H11" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export default MaleIcon;
