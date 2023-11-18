import { SVGProps } from "react";

interface Props extends SVGProps<SVGSVGElement> {}

const Knowledge_base_icon = (props: Props) => (
  <svg width={24} height={24} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M4.1665 16.6668L4.1665 3.3335" stroke="#6B7280" strokeWidth={1.5} />
    <path d="M8.3335 16.6668L8.3335 3.3335" stroke="#6B7280" strokeWidth={1.5} />
    <path d="M15.8332 16.25L11.6665 3.75" stroke="#6B7280" strokeWidth={1.5} />
  </svg>
);

export { Knowledge_base_icon };
