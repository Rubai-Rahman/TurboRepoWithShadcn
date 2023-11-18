import { ErrorMessage } from "@hookform/error-message";
import { FormInput } from "./Form.types";

const FormInput = (props: FormInput) => {
  const {
    label: labelText,
    type,
    placeholder,
    errors,
    register,
    defaultValue,
  } = props;
  const errorCls =
    register.name in errors ? "border-red-500" : "border-lineGrayCustom";

  return (
    <div className="flex flex-col">
      <label
        className="px-4 py-2 w-full text-grayCustom"
        htmlFor={register.name}
      >
        {labelText}
      </label>
      <input
        className={`px-4 py-2 w-full text-sm rounded placeholder:text-grayCustom/70 placeholder:font-normal border focus:border-blueCustom focus:outline-none ${errorCls}`}
        type={type}
        {...(placeholder && { placeholder })}
        {...(defaultValue && { defaultValue })}
        {...register}
      />
      <ErrorMessage
        errors={errors}
        name={register.name}
        render={({ message }) => (
          <p className="px-4 py-1 rounded bg-red-50 text-red-500 text-sm">
            {message}
          </p>
        )}
      />
    </div>
  );
};

export default FormInput;
