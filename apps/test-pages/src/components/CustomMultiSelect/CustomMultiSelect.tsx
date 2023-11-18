import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@shadcn/select";
import React from "react";
import { ColourOption } from "./CustomMultiSelect.types";

export const colourOptions: ColourOption[] = [
  { value: "facebook", label: "Team Facebook", color: "#00B8D9" },
  { value: "twitter", label: "Team Twitter", color: "#5243AA" },
  { value: "whatsapp", label: "Team Whatsapp", color: "#FF5630" },
  { value: "messenger", label: "Team Messenger", color: "#FF8B00" },
];

const CustomMultiSelect = () => {
  return (
    <Select>
      <SelectTrigger className="w-96 ">
        <SelectValue placeholder={[colourOptions[0].value]} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup className="bg-darkCustom w-96 ">
          <SelectLabel>{[colourOptions[0].value]} </SelectLabel>

          {colourOptions.map((option: ColourOption) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default CustomMultiSelect;
