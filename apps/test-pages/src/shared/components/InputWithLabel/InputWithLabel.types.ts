import { ReactNode } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface InputWithLabelInterface {
  defaultValue?: string | number;
  children: ReactNode;
  labelText: string;
  labelPosition: "top" | "bottom";
  labelCls: string;
  inputType: string;
  sideLabel: string;
  sideLabelCls?: string;
  containerClass: string;
  inputClass: string;
  placeholder: string;
  icon: ReactNode;
  iconPosition: string;
  inputName: string;
  registerValue: UseFormRegisterReturn<string>;
  value: any;
  disabled?: boolean;
  ref?: any;
  rows?: number;
  cols?: number;
  onChange?: (e) => void;
}
