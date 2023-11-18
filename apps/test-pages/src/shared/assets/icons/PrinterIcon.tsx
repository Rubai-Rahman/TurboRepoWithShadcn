import { SVGProps } from "react";

const PrinterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M6.25 7.75H3.5C2.94772 7.75 2.5 8.19772 2.5 8.75V13.5C2.5 14.0523 2.94772 14.5 3.5 14.5H6.25M6.25 7.75H13.75M6.25 7.75V3.5C6.25 2.94772 6.69772 2.5 7.25 2.5H12.75C13.3023 2.5 13.75 2.94772 13.75 3.5V7.75M13.75 7.75H16.5C17.0523 7.75 17.5 8.19772 17.5 8.75V13.5C17.5 14.0523 17.0523 14.5 16.5 14.5H13.75M6.25 14.5V12.5C6.25 11.9477 6.69772 11.5 7.25 11.5H12.75C13.3023 11.5 13.75 11.9477 13.75 12.5V14.5M6.25 14.5V16.5C6.25 17.0523 6.69772 17.5 7.25 17.5H12.75C13.3023 17.5 13.75 17.0523 13.75 16.5V14.5"
      stroke="#6B7280"
      strokeWidth={1.5}
    />
  </svg>
);

export default PrinterIcon;