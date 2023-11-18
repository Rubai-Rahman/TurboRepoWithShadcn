import React from "react";

const Dot = ({
  dotColor,
  width = "w-1.5",
  height = "h-1.5",
  className,
}: {
  dotColor?: string;
  width?: string;
  height?: string;
  className?: string;
}) => {
  return (
    <div
      className={`${width} ${height} rounded-full ${dotColor} ${className}`}
    ></div>
  );
};

export default Dot;
