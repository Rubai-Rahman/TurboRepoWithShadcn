import { Controller } from "react-hook-form";
import { FormSwitchProps } from "./Form.types";
import CustomSwitch from "../CustomSwitch/CustomSwitch";

const FormSwitch = (props: FormSwitchProps) => {
  const { control, register, defaultValue, disabled } = props;
  const name = register.name;
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field: { onChange, value } }) => (
        <CustomSwitch checked={value} handler={onChange} disable={disabled} />
      )}
    />
  );
};

export default FormSwitch;
