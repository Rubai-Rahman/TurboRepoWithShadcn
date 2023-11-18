import { ReactElement } from "react";
import { InputWithLabelInterface } from "./InputWithLabel.types";

const InputWithLabel = (
  props: Partial<InputWithLabelInterface>
): ReactElement => {
  const {
    children,
    defaultValue,
    labelText = "",
    labelPosition = "top",
    labelCls = "text-secondary font-normal text-lg",
    inputType = "text",
    sideLabel = "",
    sideLabelCls = "pl-2",
    containerClass = "gap-2",
    inputClass = "py-2 bg-[#F6F6F6] border-0 focus:outline-none focus:border-gray-300 focus:ring-gray-300 focus:ring-1",
    placeholder = "",
    icon = null,
    iconPosition = "left",
    inputName,
    registerValue,
    value,
    disabled,
    rows,
    cols,
    onChange,
  } = props;
  return (
    <div className={`flex flex-col ${containerClass}`}>
      <p
        className={`
      ${labelCls} 
      ${labelPosition === "top" && "order-1"} 
      ${labelPosition === "bottom" && "order-2"} 
      `}
      >
        {labelText}
      </p>
      <label
        className={`relative block ${labelPosition === "top" && "order-2"} ${
          labelPosition === "bottom" && "order-1"
        }`}
      >
        {icon && (
          <span
            className={`absolute inset-y-0 ${
              iconPosition === "left" && "left-0  ml-2"
            } ${iconPosition === "right" && "right-0  mr-2"} flex items-center`}
          >
            {icon}
          </span>
        )}
        {inputType !== "select" &&
          inputType !== "checkbox" &&
          inputType !== "radio" &&
          inputType !== "textarea" && (
            <input
              type={inputType}
              className={`w-full rounded block sm:text-sm border-disabled ${
                icon
                  ? `${iconPosition === "left" && "pl-10 pr-3"} ${
                      iconPosition === "right" && "pr-10 pl-3"
                    }`
                  : "px-3"
              } placeholder:italic placeholder:text-third  ${inputClass}`}
              {...registerValue}
              placeholder={placeholder}
              defaultValue={defaultValue}
              value={value}
              disabled={disabled}
              onChange={onChange}
            />
          )}

        {inputType === "textarea" && (
          <textarea
            {...registerValue}
            rows={rows}
            cols={cols}
            placeholder={placeholder}
            defaultValue={defaultValue}
            value={value}
            onChange={onChange}
            className={`rounded block sm:text-sm border-disabled 
            ${
              icon
                ? `${iconPosition === "left" && "pl-10 pr-3"} ${
                    iconPosition === "right" && "pr-10 pl-3"
                  }`
                : "px-3"
            } placeholder:italic placeholder:text-third  ${inputClass}`}
          />
        )}

        {(inputType === "checkbox" || inputType === "radio") && (
          <div className="flex items-center">
            <input
              type={inputType}
              name={inputName}
              className={`rounded block sm:text-sm bg-[#F6F6F6] ${
                icon ? "px-10" : "px-3"
              } placeholder:italic placeholder:text-third  ${inputClass}`}
              {...registerValue}
              placeholder={placeholder}
              defaultValue={defaultValue}
              disabled={disabled}
              onChange={onChange}
            />
            {sideLabel && <span className={sideLabelCls}>{sideLabel}</span>}
          </div>
        )}

        {inputType === "select" && (
          <select
            className={`w-full rounded block sm:text-sm border-disabled ${
              icon ? "px-10" : "px-3"
            } placeholder:italic placeholder:text-secondary ${inputClass}`}
            {...registerValue}
            placeholder={placeholder}
            defaultValue={defaultValue}
            disabled={disabled}
            onChange={onChange}
          >
            {children}
          </select>
        )}
      </label>
    </div>
  );
};

export default InputWithLabel;
