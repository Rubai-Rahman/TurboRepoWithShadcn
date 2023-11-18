import { SVGProps } from "react";

const BookIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M4 6V3C4 2.44772 4.44772 2 5 2H17C17.5523 2 18 2.44772 18 3V17C18 17.5523 17.5523 18 17 18H5C4.44772 18 4 17.5523 4 17V14M4 6H1.5M4 6V14M4 14H1.5"
      stroke="#6B7280"
      strokeWidth={1.5}
    />
    <path d="M7 8H15" stroke="#6B7280" strokeWidth={1.5} />
    <path d="M7 12H12" stroke="#6B7280" strokeWidth={1.5} />
  </svg>
);

export default BookIcon;
