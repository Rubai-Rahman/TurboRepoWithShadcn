import { SVGProps } from "react";

const FolderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M1.66699 15.6668V6.8335C1.66699 6.28121 2.11471 5.8335 2.66699 5.8335H10.4194C10.6847 5.8335 10.939 5.72814 11.1266 5.5406L13.0408 3.62639C13.2283 3.43885 13.4827 3.3335 13.7479 3.3335H17.3337C17.8859 3.3335 18.3337 3.78121 18.3337 4.3335V15.6668C18.3337 16.2191 17.8859 16.6668 17.3337 16.6668H2.66699C2.11471 16.6668 1.66699 16.2191 1.66699 15.6668Z"
      stroke="#6B7280"
      strokeWidth={1.5}
    />
  </svg>
);

export default FolderIcon;
