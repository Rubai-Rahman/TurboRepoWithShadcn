import { MdArrowDropDown } from "react-icons/md";
import { components } from "react-select";

const CaretDownIcon = () => {
  return <MdArrowDropDown className="w-8 h-7 text-stone-500" />;
};

export const DropdownIndicator = (props) => {
  return (
    <components.DropdownIndicator {...props}>
      <CaretDownIcon />
    </components.DropdownIndicator>
  );
};
