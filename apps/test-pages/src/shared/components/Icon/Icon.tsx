import { ReactElement } from "react";
import { Icon } from "./Icon.types";

const Icon = ({
  name,
  className = "text-disabled",
  size = "text-xl",
  onClick,
}: Icon): ReactElement => {
  const Name = name;
  return <Name className={`${size} ${className}`} onClick={onClick} />;
};

export default Icon;
