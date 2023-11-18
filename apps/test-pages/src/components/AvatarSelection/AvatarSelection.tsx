import { Input } from "@shadcn/input";
import { Avatar, AvatarImage } from "@shadcn/avatar";
import React, { useState } from "react";

const AvatarSelection = ({ checkbox }: { checkbox?: boolean }) => {
  const [check, setCheck] = useState(false);

  const handleClick = (e) => {
    if (e.target.checked) {
      setCheck(e.target.checked);
    } else {
      setCheck(e.target.checked);
    }
  };
  return (
    <div className={`relative w-fit rounded-full ${check ? "opacity-50" : ""}`}>
      <Avatar>
        <AvatarImage
          src="https://flowbite.com/docs/images/people/profile-picture-4.jpg"
          alt="avatar"
          className={`w-12 h-12 rounded-full`}
        />
      </Avatar>
      {checkbox && (
        <Input
          type="checkbox"
          className="absolute left-5 top-5"
          onClick={(e) => handleClick(e)}
        />
      )}
    </div>
  );
};

export default AvatarSelection;
