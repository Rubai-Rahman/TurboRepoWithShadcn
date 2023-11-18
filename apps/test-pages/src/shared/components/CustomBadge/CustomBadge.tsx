import React from "react";
import { Badge } from "@shadcn/badge";

const CustomBadge = ({
  className,
  label,
  labelClass,
}: {
  className: string;
  label: string;
  labelClass: string;
}) => {
  return (
    <Badge className={className}>
      <span className={labelClass}>{label}</span>
    </Badge>
  );
};

export default CustomBadge;
