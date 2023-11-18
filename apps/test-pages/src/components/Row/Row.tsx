import React from "react";
import {
  AiFillTwitterCircle,
  AiOutlineArrowDown,
  AiOutlineMail,
} from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";
import { RowTypes } from "./Row.types";
import { Input } from "@shadcn/input";

const Row = ({
  maxWidth = "w-1/4",
  checkbox,
  channelIcon,
  text,
  count,
  icon1,
  icon2,
  icon3,
}: RowTypes) => {
  return (
    <div
      className={`border-l-2 border-primary px-4 py-2 flex items-center justify-between ${maxWidth}`}
    >
      <div className="flex items-center gap-x-1.5">
        {channelIcon && (
          <p>
            {channelIcon.toLowerCase() === "twitter" && (
              <AiFillTwitterCircle className="text-twitter" />
            )}
            {channelIcon.toLowerCase() === "whatsapp" && (
              <IoLogoWhatsapp className="text-whatsapp" />
            )}
            {channelIcon.toLowerCase() === "email" && (
              <AiOutlineMail className="text-black" />
            )}
            {channelIcon.toLowerCase() === "instagram" && (
              <RiInstagramFill className="text-instagram" />
            )}
          </p>
        )}
        {checkbox && (
          <Input type="checkbox" className="rounded-md focus:ring-0" />
        )}
        {text ? (
          <p className="text-textGray text-sm font-medium">{text}</p>
        ) : (
          <p className="text-textGray text-sm font-medium">Text</p>
        )}
      </div>
      <div className="flex items-center gap-x-2">
        {count && (
          <p className="h-5 w-5 bg-primary/10 text-primary flex items-center justify-center text-xs rounded-full">
            {count}
          </p>
        )}
        {icon1 && (
          <p className="w-5 h-5 bg-primary/10 text-primary flex items-center justify-center text-xs rounded-full">
            {icon1}
          </p>
        )}
        {icon2 && (
          <p className="w-5 h-5 bg-primary/10 text-primary flex items-center justify-center text-xs rounded-full">
            {icon2}
          </p>
        )}
        {icon3 && (
          <p className="w-5 h-5 bg-primary/10 text-primary flex items-center justify-center text-xs rounded-full">
            {icon3}
          </p>
        )}
      </div>
    </div>
  );
};

export default Row;
