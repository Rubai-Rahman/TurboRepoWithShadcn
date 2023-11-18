import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import React from "react";

const ButtonOption = () => {
  return (
    <div className="w-fit rounded-md shadow-lg">
      <div className="px-3 py-1.5">
        <div className="flex gap-x-2 items-center">
          <Input type="radio" name="option" />
          <Label htmlFor="button_option">New</Label>
        </div>
        <div className="flex gap-x-2 items-center">
          <Input type="radio" name="option" />
          <Label htmlFor="button_option">Open</Label>
        </div>
        <div className="flex gap-x-2 items-center">
          <Input type="radio" name="option" />
          <Label htmlFor="button_option">Resolved</Label>
        </div>
        <div className="flex gap-x-2 items-center">
          <Input type="radio" name="option" />
          <Label htmlFor="button_option">Closed</Label>
        </div>
      </div>
      <div className="border-t border-gray-300">
        <div className="px-3 py-1.5 flex items-center gap-x-2">
          <Input type="radio" name="option" />
          <Label htmlFor="button_option">Save as Template</Label>
        </div>
      </div>
    </div>
  );
};

export default ButtonOption;
