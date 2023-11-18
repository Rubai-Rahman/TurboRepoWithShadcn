import { GroupBase } from "react-select";
import { OptionsOrGroups } from "react-select";
import { HTMLInputTypeAttribute } from "react";
import {
  Control,
  ControllerRenderProps,
  FieldError,
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from "react-hook-form";

export interface FormInput {
  label: string;
  type: HTMLInputTypeAttribute;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegisterReturn<string>;
  placeholder?: string;
  defaultValue?: string | number | readonly string[];
}

export interface CustomSelect {
  field: ControllerRenderProps<FieldValues, string>;
  isSearchable?: boolean;
  options: OptionsOrGroups<any, GroupBase<any>>;
  error: FieldError;
  placeholder?: string;
  hideDropdownIndicator?: boolean;
}

export interface FormSelect extends Omit<CustomSelect, "field" | "error"> {
  label: string;
  defaultValue?: any;
  control: Control<any>;
  errors: FieldErrors<FieldValues>;
  register: UseFormRegisterReturn<string>;
}

export interface FormSwitchProps {
  control: Control<any>;
  register: UseFormRegisterReturn<string>;
  defaultValue?: boolean;
  disabled?: boolean;
}
