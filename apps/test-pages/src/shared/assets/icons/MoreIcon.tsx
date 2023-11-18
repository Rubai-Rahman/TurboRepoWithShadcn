import { SVGProps } from "react";

const MoreIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <circle cx={5} cy={10} r={1.25} fill="#6B7280" />
    <circle cx={15} cy={10} r={1.25} fill="#6B7280" />
  </svg>
);

export default MoreIcon;
