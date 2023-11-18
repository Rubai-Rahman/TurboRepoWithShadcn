import { SVGProps } from "react";

const CopyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16.5 12.5H8.5C7.94772 12.5 7.5 12.0523 7.5 11.5V3.5C7.5 2.94772 7.94772 2.5 8.5 2.5H16.5C17.0523 2.5 17.5 2.94772 17.5 3.5V11.5C17.5 12.0523 17.0523 12.5 16.5 12.5Z"
      stroke="#6B7280"
      strokeWidth={1.5}
    />
    <path d="M5 7.5H3.5C2.94772 7.5 2.5 7.94772 2.5 8.5V16.5C2.5 17.0523 2.94772 17.5 3.5 17.5H11.5C12.0523 17.5 12.5 17.0523 12.5 16.5V15" stroke="#6B7280" strokeWidth={1.5} />
  </svg>
);

export default CopyIcon;
