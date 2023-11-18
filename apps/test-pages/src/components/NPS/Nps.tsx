import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import React, { useState } from "react";
import {
  BsEmojiFrownFill,
  BsEmojiHeartEyesFill,
  BsFillEmojiAngryFill,
  BsFillEmojiLaughingFill,
  BsFillEmojiSmileFill,
} from "react-icons/bs";

const notificationMethods = [
  { id: "emoji", title: "Emoji" },
  { id: "number", title: "Numbers" },
];

const satisfactionByNumber = [
  { id: 0, feedback: "Extremely Satisfied" },
  { id: 1, feedback: "" },
  { id: 2, feedback: "Mostly Satisfied" },
  { id: 3, feedback: "" },
  { id: 4, feedback: "" },
  { id: 5, feedback: "Slightly Disatisfied" },
  { id: 6, feedback: "" },
  { id: 7, feedback: "Mostly Disatisfied" },
  { id: 8, feedback: "" },
  { id: 9, feedback: "Extremely Disatisfied" },
];

const satisfactionByEmoji = [
  { id: 0, feedback: "Extremely Satisfied" },
  { id: 1, feedback: "Mostly Satisfied" },
  { id: 2, feedback: "Slightly Disatisfied" },
  { id: 3, feedback: "Mostly Disatisfied" },
  { id: 4, feedback: "Extremely Disatisfied" },
];

function Nps() {
  const [rating, setRating] = useState("emoji");

  return (
    <div className="w-5/12 py-2 px-2">
      <Label className="text-sm font-Inter text-gray-500">Point Scale</Label>
      <fieldset className="mt-4">
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {notificationMethods.map((notificationMethod) => (
            <div key={notificationMethod.id} className="flex items-center">
              <Input
                id={notificationMethod.id}
                name="notification-method"
                type="radio"
                value={notificationMethod.id}
                onChange={(e: any) => setRating(e.target?.value)}
                defaultChecked={notificationMethod.id === "emoji"}
                className="focus:ring-indigo-500 h-4 w-4 text-blue-600 border-gray-300"
              />
              <Label
                htmlFor={notificationMethod.id}
                className={`${
                  rating === "number" && notificationMethod.title === "Numbers"
                    ? "text-blue-700"
                    : rating === "emoji" && notificationMethod.title === "Emoji"
                    ? "text-blue-700"
                    : "text-gray-700"
                } ml-3 block text-sm font-Inter text-gray-700`}
              >
                {notificationMethod.title}
              </Label>
            </div>
          ))}
        </div>
      </fieldset>
      {/* number */}
      {rating === "number" && (
        <div className="mt-5 flex items-start gap-2">
          {satisfactionByNumber.map((rating) => (
            <div
              key={rating.id}
              className="flex flex-col items-start w-16 gap-2"
            >
              <p className="text-xl font-semibold text-gray-500 h-14 w-14 rounded-full border border-gray-400 flex justify-center items-center hover:bg-gray-50">
                {rating.id}
              </p>
              <p className="text-xs text-gray-500 font-Inter text-center">
                {rating.feedback}
              </p>
            </div>
          ))}
        </div>
      )}
      {/* emoji */}
      {rating === "emoji" && (
        <div className="mt-5 flex justify-between gap-2">
          {satisfactionByEmoji.map((rating) => (
            <div key={rating.id} className="space-y-3">
              <div className="flex justify-center items-center">
                <p className="text-xl font-semibold text-gray-500 h-14 w-14 rounded-full hover:bg-gray-50">
                  {rating.id === 0 && (
                    <BsEmojiHeartEyesFill className="text-6xl text-gray-300 hover:text-yellow-300" />
                  )}
                  {rating.id === 1 && (
                    <BsFillEmojiLaughingFill className="text-6xl text-gray-300 hover:text-yellow-300" />
                  )}
                  {rating.id === 2 && (
                    <BsFillEmojiSmileFill className="text-6xl text-gray-300 hover:text-yellow-300" />
                  )}
                  {rating.id === 3 && (
                    <BsEmojiFrownFill className="text-6xl text-gray-300 hover:text-yellow-300" />
                  )}
                  {rating.id === 4 && (
                    <BsFillEmojiAngryFill className="text-6xl text-gray-300 hover:text-yellow-300" />
                  )}
                </p>
              </div>
              <p className="text-xs text-gray-500 font-Inter text-center">
                {rating.feedback}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Nps;
