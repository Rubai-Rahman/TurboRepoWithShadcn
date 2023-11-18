import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap_white.css";
import React from "react";
import { TooltipComponentInterface } from "./Tooltip.types";

const TooltipComponent = ({
  data,
  children,
  placement = "bottom",
  background = "transparent",
  color = "#1da1f2",
  border = "none",
  borderRadius = "10px",
  boxShadow = "10px 10px 43px -9px rgba(0,0,0,0.43)",
}: TooltipComponentInterface) => {
  console.log(data, data);

  return (
    <div>
      <Tooltip
        placement={placement}
        overlay={data}
        overlayStyle={{ background: background }}
        overlayInnerStyle={{
          color: color,
          border: border,
          borderRadius: borderRadius,
          boxShadow: boxShadow,
        }}
      >
        {children}
      </Tooltip>
    </div>
  );
};

export default TooltipComponent;
