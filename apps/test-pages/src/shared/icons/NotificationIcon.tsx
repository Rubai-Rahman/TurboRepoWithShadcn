import { SVGProps } from "react";

const NotificationIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M3.3335 15L4.77779 6.87583C5.22786 4.34422 7.42886 2.5 10.0002 2.5C12.5715 2.5 14.7725 4.34423 15.2225 6.87584L16.6668 15H3.3335Z"
      stroke="#6B7280"
      strokeWidth={1.5}
      strokeLinejoin="round"
    />
    <path d="M8.3335 17.5H11.6668" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export default NotificationIcon;
