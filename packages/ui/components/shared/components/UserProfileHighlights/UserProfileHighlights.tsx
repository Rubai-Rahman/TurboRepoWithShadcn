import { UserProfileTypes } from "@components/UserProfile/UserProfile.types";
import React from "react";
import { BsEnvelope, BsPlus, BsTelephone } from "react-icons/bs";
import { IoMdMale } from "react-icons/io";

const UserProfileHighlights = ({
  profileUrl,
  profileName,
  designation,
  email,
  location,
  phone,
}: UserProfileTypes) => {
  return (
    <div className="max-w-sm space-y-3 w-1/4 shadow-sm px-3 py-3">
      <div className="flex items-start space-x-5">
        <div className="flex-shrink-0">
          <div className="relative">
            <img
              className="w-16 h-16 rounded-full"
              src={profileUrl}
              alt="avatar"
            />
            <div className="flex justify-center items-center w-6 h-6 bg-primary rounded-full absolute -top-1.5 right-0">
              <IoMdMale className="text-xs font-bold text-white" />
            </div>
          </div>
        </div>

        <div className="pt-1.5">
          <h3 className="text-xl font-medium text-gray-800">{profileName}</h3>
          <p className="text-sm font-medium text-gray-500">{location}</p>
        </div>
      </div>
      <div className="flex items-center justify-start gap-3">
        {designation.map((post, index) => {
          return (
            <span
              key={index}
              className="border px-4 py-1 rounded-full text-slate-800 text-sm"
            >
              {post.position}
            </span>
          );
        })}
        <span className="border px-1 py-1 rounded-full text-slate-900 inline-flex items-center justify-center">
          <BsPlus className="text-xl text-gray-700" />
        </span>
      </div>
      <div className="space-y-3">
        <p className="text-blue-600 text-sm font-Inter font-medium flex">
          <BsTelephone className="text-xl text-gray-400 mr-3" />
          {phone}
        </p>
        <p className="text-slate-900 text-sm font-Inter font-medium flex">
          <BsEnvelope className="text-xl text-gray-400 mr-3" />
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserProfileHighlights;
