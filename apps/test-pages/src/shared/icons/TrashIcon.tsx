import { SVGProps } from "react";

const TrashIcon = ({ color }) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15.185 5.8335L13.8145 16.6261C13.7511 17.1257 13.3261 17.5002 12.8225 17.5002H7.17718C6.6736 17.5002 6.24858 17.1257 6.18515 16.6261L4.81465 5.8335H2.9165H15.185ZM15.185 5.8335H17.0832"
      stroke={color}
      strokeWidth={1.5}
    />
    <path d="M7.5 2.5H12.5" stroke={color} strokeWidth={1.5} />
  </svg>
);

export default TrashIcon;
