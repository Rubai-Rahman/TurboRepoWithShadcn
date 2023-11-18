import React from "react";
import { Switch } from "@shadcn/switch";

const CustomSwitch = ({
  checked,
  handler,
  disable,
}: {
  checked: boolean;
  handler: any;
  disable?: boolean;
}) => {
  return (
    <div className="z-0">
      <Switch
        checked={checked}
        onCheckedChange={handler}
        disabled={disable}
        className={`data-[state=checked]:bg-indigo-600 data-[state=unchecked]:bg-gray-500 ${
          disable ? "cursor-not-allowed" : "cursor-pointer"
        }`}
      >
        {checked ? (
          <span
            className={`absolute inset-0 h-full w-full flex items-center justify-center transition-opacity focus:outline-none data-[state=checked]:opacity-100 data-[state=checked]:ease-in data-[state=checked]:duration-200 data-[state=unchecked]:opacity-0 data-[state=unchecked]:ease-out data-[state=unchecked]:duration-100`}
            aria-hidden="true"
          >
            <svg
              className="h-3 w-3 text-indigo-600"
              fill="currentColor"
              viewBox="0 0 12 12"
            >
              <path d="M3.707 5.293a1 1 0 00-1.414 1.414l1.414-1.414zM5 8l-.707.707a1 1 0 001.414 0L5 8zm4.707-3.293a1 1 0 00-1.414-1.414l1.414 1.414zm-7.414 2l2 2 1.414-1.414-2-2-1.414 1.414zm3.414 2l4-4-1.414-1.414-4 4 1.414 1.414z" />
            </svg>
          </span>
        ) : (
          <span
            className={`absolute inset-0 h-full w-full flex items-center justify-center transition-opacity focus:outline-none data-[state=checked]:opacity-0 data-[state=checked]:ease-out data-[state=checked]:duration-100 data-[state=unchecked]:opacity-100 data-[state=unchecked]:ease-in data-[state=unchecked]:duration-200`}
          >
            <svg
              className="h-3 w-3 text-gray-400"
              fill="none"
              viewBox="0 0 12 12"
            >
              <path
                d="M4 8l2-2m0 0l2-2M6 6L4 4m2 2l2 2"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </Switch>
    </div>
  );
};

export default CustomSwitch;
