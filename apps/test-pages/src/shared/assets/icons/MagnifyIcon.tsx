import { SVGProps } from "react";

const MagnifyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={9.99984} cy={7.50008} r={5.83333} stroke="#6B7280" strokeWidth={1.5} />
    <circle cx={8.75} cy={5.41675} r={1.25} fill="#6B7280" />
    <path d="M10 19.1666V13.3333" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export default MagnifyIcon;
