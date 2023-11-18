import { SVGProps } from "react";

const MenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M3.33301 5H13.333" stroke="#6B7280" strokeWidth={1.5} />
    <path d="M3.33301 15L9.99967 15" stroke="#6B7280" strokeWidth={1.5} />
    <path d="M3.33301 10L16.6663 10" stroke="#6B7280" strokeWidth={1.5} />
  </svg>
);

export default MenuIcon;
