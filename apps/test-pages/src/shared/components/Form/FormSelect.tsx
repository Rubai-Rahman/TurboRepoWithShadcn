import { ErrorMessage } from "@hookform/error-message";
import { Controller } from "react-hook-form";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import Select from "react-select";
import { CustomSelect, FormSelect } from "./Form.types";

const CustomSelect = (props: CustomSelect) => {
  const {
    field,
    isSearchable = true,
    options,
    error,
    placeholder,
    hideDropdownIndicator = false,
  } = props;

  return (
    <Select
      {...field}
      placeholder={placeholder}
      unstyled
      options={options}
      isSearchable={isSearchable}
      onChange={(selectedOption) => {
        field.onChange(selectedOption?.value || "");
      }}
      value={options.find((option) => option.value === field.value)}
      components={{
        IndicatorSeparator: () => null,
        DropdownIndicator: () =>
          hideDropdownIndicator ? null : (
            <MdOutlineKeyboardArrowDown className="text-xl text-grayCustom/70" />
          ),
      }}
      classNames={{
        control: ({ isFocused, menuIsOpen, selectProps: { isSearchable } }) =>
          `text-sm !min-h-0 px-4 py-2 rounded border ${
            isFocused || menuIsOpen
              ? "border-blueCustom"
              : error
              ? "border-red-500"
              : "border-lineGrayCustom"
          } ${isSearchable ? "!cursor-text" : "!cursor-pointer"}`,
        placeholder: () => "text-grayCustom/70",
        indicatorsContainer: () => "!cursor-pointer",
        menu: () => "mt-1.5 bg-white rounded text-sm shadow-layout",
        menuList: () => "py-1.5",
        option: ({ isSelected, isDisabled, isFocused }) =>
          `px-4 py-2 transition ${
            isSelected
              ? "bg-blueCustom text-white"
              : isFocused
              ? "bg-blueCustom/10"
              : "hover:bg-blueCustom/10"
          } ${isDisabled ? "!cursor-default" : "!cursor-pointer"}`,
        noOptionsMessage: () => "py-2",
      }}
    />
  );
};

const FormSelect = (props: FormSelect) => {
  const {
    label: labelText,
    control,
    errors,
    register,
    defaultValue,
    ...rest
  } = props;
  const name = register.name;

  return (
    <div className="flex flex-col">
      <label className="px-4 py-2 w-full text-grayCustom" htmlFor={name}>
        {labelText}
      </label>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field, fieldState: { error } }) => (
          <CustomSelect field={field} error={error} {...rest} />
        )}
      />
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <p className="px-4 py-1 rounded bg-red-50 text-red-500 text-sm">
            {message}
          </p>
        )}
      />
    </div>
  );
};

export default FormSelect;
