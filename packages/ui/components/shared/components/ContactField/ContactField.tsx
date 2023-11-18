import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import React, { useState } from "react";

const ContactField = ({
  radioField,
}: {
  radioField: { id: string; labelText: string }[];
}) => {
  const [checks, setChecks] = useState("1");
  const handleSubmit = (e: any) => {
    setChecks(e.target.value);
  };
  return (
    <div className="max-w-xs shadow-md px-3 py-3">
      {radioField.map((radio) => (
        <div className="flex items-center mb-4" key={radio.id}>
          <Input
            id={radio.id}
            defaultChecked={radio.id === "1"}
            onChange={handleSubmit}
            type="radio"
            value={radio.id}
            name="default-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300"
          />

          <Label
            htmlFor={radio.id}
            className={`${
              radio.id === checks ? "text-blue-600" : "text-gray-400"
            } ml-2 text-sm font-medium`}
          >
            {radio.labelText}
          </Label>
        </div>
      ))}
    </div>
  );
};

export default ContactField;
