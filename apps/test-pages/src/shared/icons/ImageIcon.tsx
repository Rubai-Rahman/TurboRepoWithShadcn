import { SVGProps } from "react";

const ImageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x={2.5} y={2.5} width={15} height={15} rx={1} stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M11.667 12.5L14.167 10L17.5003 13.3333" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M2.5 13.3333L7.5 8.33325L16.6667 17.4999" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export default ImageIcon;
