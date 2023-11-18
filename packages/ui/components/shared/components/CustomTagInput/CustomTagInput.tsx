import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const CustomTagInput = () => {
  const [selected, setSelected] = useState([]);

  return (
    <div className="w-2/6">
      <p className="text-xs font-medium text-textGray my-2 px-2">List Values</p>

      <TagsInput
        value={selected}
        onChange={setSelected}
        name="value"
        placeHolder="enter value and press enter"
        classNames={{
          tag: "bg-transparent text-black border border-gray-300 rounded-full px-4 py-1",
          input: "w-fit",
        }}
      />
    </div>
  );
};

export default CustomTagInput;
