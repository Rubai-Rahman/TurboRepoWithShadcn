import React from "react";
import { BsEnvelope, BsPlus, BsTelephone } from "react-icons/bs";
import { UserProfileTypes } from "./UserProfile.types";

const UserProfile = ({
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
        {/* <Avatar
    img={profileUrl}
    rounded={true}
    status="busy"
    statusPosition="top-right"
    size="lg"
  /> */}
        <div className="flex-shrink-0">
          <div className="relative">
            <img className="h-14 w-14 rounded-full" src={profileUrl} alt="" />
            <span
              className="absolute inset-0 shadow-inner rounded-full"
              aria-hidden="true"
            />
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
        <p className="text-blue-600 text-sm font-Inter font-medium">
          <BsTelephone className="text-xl text-gray-400 mr-3" />
          {phone}
        </p>
        <p className="text-slate-900 text-sm font-Inter">
          <BsEnvelope className="text-xl text-gray-400 mr-3" />
          {email}
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
