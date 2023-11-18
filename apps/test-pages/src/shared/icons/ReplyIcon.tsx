import { SVGProps } from "react";

const ReplyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M13.3333 2.5L16.6667 5.83333M16.6667 5.83333L13.3333 9.16667M16.6667 5.83333H11C7.68629 5.83333 5 8.51962 5 11.8333V17.5"
      stroke="#6B7280"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
  </svg>
);

export default ReplyIcon;
