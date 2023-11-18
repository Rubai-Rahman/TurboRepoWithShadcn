import { SVGProps } from "react";

const ExportIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M2.5 16.6665H17.5" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
    <path d="M10.0002 2.5L14.1668 6.66667M10.0002 2.5L5.8335 6.66667M10.0002 2.5V13.3333" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export default ExportIcon;
