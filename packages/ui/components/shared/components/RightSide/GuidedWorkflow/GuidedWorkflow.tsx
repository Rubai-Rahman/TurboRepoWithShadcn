import React, { useState } from "react";
import { Button } from "@shadcn/button";
import Image from "next/image";
import { Textarea } from "@shadcn/textarea";

const messages = [
  {
    message_type: 0,
    message: "Hey friend. How can I help you?",
    image:
      "https://www.netapp.com/media/web-side-x-side-professional-services_tcm19-8095.jpg?v=102953",
  },
  {
    message_type: 1,
    message: "I have a question",
  },
  {
    message_type: 0,
    message: "First, don't forget to check out the Documentation.",
    image:
      "https://www.netapp.com/media/web-side-x-side-professional-services_tcm19-8095.jpg?v=102953",
  },
  {
    message_type: 0,
    message: "Otherwise, I'm all ears!",
    image:
      "https://www.netapp.com/media/web-side-x-side-professional-services_tcm19-8095.jpg?v=102953",
  },
  {
    message_type: 0,
    gif_link: "https://media.tenor.com/YnuPB-Hr5boAAAAM/all-ears-hear-out.gif",
    image:
      "https://www.netapp.com/media/web-side-x-side-professional-services_tcm19-8095.jpg?v=102953",
  },
];

const GuidedWorkflow = ({ maxWidth = "w-full" }) => {
  const [checkDisable, setCheckDisable] = useState(true);

  const handleChange = (e) => {
    if (e.target.value) {
      setCheckDisable(false);
    } else {
      setCheckDisable(true);
    }
  };

  return (
    <div className={`${maxWidth} p-4`}>
      <p className="text-big font-semibold leading-6 mb-10">Guided Workflow</p>
      {messages.map((item, index) => (
        <div key={index} className="my-2">
          {/* <p className={`flex ${item.message_type === 0 ? '' : ''}`}>{item.message}</p> */}
          {item.message_type === 0 && (
            <div className="flex gap-x-4 items-end">
              <Image
                src={item.image}
                alt="user_image"
                className="w-6 h-6 rounded-full"
              />
              <div className="bg-selectedBG px-2 py-1 w-fit rounded-md">
                {item.message && (
                  <p className="text-normal font-medium leading-4 text-textDark">
                    {item.message}
                  </p>
                )}
                {item.gif_link && <Image src={item.gif_link} alt="gify" />}
              </div>
            </div>
          )}
          {item.message_type === 1 && (
            <div className="flex justify-end">
              <p className="bg-newSecondary px-2 py-1 rounded-md text-white text-normal font-medium leading-4">
                {item.message}
              </p>
            </div>
          )}
        </div>
      ))}
      <div className="shadow-md px-2 mt-2 rounded-md">
        <Textarea
          name="text"
          className=" w-full px-2 py-1.5 focus:outline-none"
          rows={6}
          onChange={(e) => handleChange(e)}
        ></Textarea>
        <div className="flex justify-end">
          <Button
            disabled={checkDisable}
            type="button"
            className={`text-white bg-purple-700 font-medium rounded-lg text-normal px-5 py-2.5 mb-2 ${
              checkDisable && "bg-purple-700/30"
            }`}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GuidedWorkflow;
