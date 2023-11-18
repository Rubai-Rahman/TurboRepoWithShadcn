import React from "react";
import { RxCross1 } from "react-icons/rx";
import { Button } from "@shadcn/button";
import { NewConversationTypes } from "./NewConversation.types";
import CustomComboBox from "@shared/components/CustomComboBox/CustomComboBox";

const NewConversation = ({ setSelected }: NewConversationTypes) => {
  const list = [
    { value: "Option 1", label: "Option 1" },
    { value: "Option 2", label: "Option 2" },
    { value: "Option 3", label: "Option 3" },
    { value: "Option 4", label: "Option 4" },
    ,
  ];

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        <p className="text-big leading-6 font-semibold text-darkCustom">
          New Conversation
        </p>
        <RxCross1
          onClick={() => setSelected("close")}
          className="cursor-pointer font-light h-5 w-5"
        />
      </div>

      <p className="text-small leading-4 font-medium text-grayCustom mt-2 mb-5">
        Start a new conversation by sending a new message.
      </p>

      <div className="my-3">
        <CustomComboBox
          label="Title"
          data={list}
          maxWidth="w-full"
          buttonClass="border border-lineGrayCustom rounded text-darkCustom text-normal leading-6 font-medium py-2 w-full"
        />
      </div>

      <div className="my-3">
        <CustomComboBox
          label="Title"
          data={list}
          maxWidth="w-full"
          buttonClass="border border-lineGrayCustom rounded text-darkCustom text-normal leading-6 font-medium py-2 w-full"
        />
      </div>

      <div className="flex gap-x-2">
        <Button
          type="button"
          className="text-white bg-blueCustom rounded text-normal leading-6 font-semibold w-full py-1"
          onClick={() => setSelected("close")}
        >
          Create
        </Button>
        <Button
          type="button"
          className="text-blueCustom bg-blueCustom/5 rounded text-normal leading-6 font-semibold w-full py-1"
          onClick={() => setSelected("close")}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default NewConversation;
