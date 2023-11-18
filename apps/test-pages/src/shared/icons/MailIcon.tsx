import { SVGProps } from "react";

const MailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M16.5 15.8332H3.5C2.94772 15.8332 2.5 15.3855 2.5 14.8332V5.1665C2.5 4.61422 2.94772 4.1665 3.5 4.1665H16.5C17.0523 4.1665 17.5 4.61422 17.5 5.1665V14.8332C17.5 15.3855 17.0523 15.8332 16.5 15.8332Z"
      stroke="#6B7280"
      strokeWidth={1.4}
    />
    <path d="M5.83301 7.5L9.99967 10.8333L14.1663 7.5" stroke="#6B7280" strokeWidth={1.5} strokeLinejoin="round" />
  </svg>
);

export default MailIcon;
