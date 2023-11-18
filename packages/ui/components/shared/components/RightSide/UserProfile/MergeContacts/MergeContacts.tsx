import React from "react";
import { RxCross1 } from "react-icons/rx";
import { MergeContactTypes } from "./MergeContacts.types";

const MergeContacts = ({ setSelected }: MergeContactTypes) => {
  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="text-big leading-6 font-semibold text-textDark">
          Merge Contacts
        </p>
        <RxCross1
          onClick={() => setSelected("close")}
          className="cursor-pointer font-light h-5 w-5"
        />
      </div>
      <p className="text-small leading-4 font-medium text-grayCustom mt-2 mb-5">
        Merge contacts to combine two profiles into one, including all atributes
        and conrsations. In case of conflict, the Primary contact&apos;s
        attributes will take precedence.
      </p>
    </div>
  );
};

export default MergeContacts;
