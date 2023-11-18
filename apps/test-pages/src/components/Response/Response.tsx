import React, { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@shadcn/button";
import { GET_ALL_CANNED_RESPONSESQuery } from "@api-lib/gql/graphql";
import { useConversationStore } from "@module/conversations/store/conversationStore";

const Response = ({
  selected,
  canned,
}: {
  selected?: boolean;
  canned: GET_ALL_CANNED_RESPONSESQuery["payload"][0];
}) => {
  const { cannedResponses, setCannedResponses } = useConversationStore(
    (state) => state
  );
  return (
    <div className="w-full border-b border-newBorder hover:bg-blueCustom/10 group">
      <Button
        className="w-full cursor-pointer"
        dir="auto"
        onClick={() => setCannedResponses({ ...canned })}
      >
        <div
          className={`border-l-2 ${
            selected ? "bg-selectedBG  border-primary" : "border-transparent"
          } `}
        >
          <div className="p-6 rounded-lg">
            <div className="flex justify-between mb-2">
              <div className="flex gap-x-2 items-center">
                {/* <img src={thunder} alt="thunder" /> */}
                {/* <p className="text-textGray font-medium text-small leading-4">General / Greeting</p> */}
                <p
                  className="text-textGray font-medium text-small leading-4"
                  dir="auto"
                >
                  {canned?.category?.name
                    ? canned?.category?.name
                    : "no category assigned"}
                </p>
              </div>
              <div className="hidden group-hover:block">
                {/* <button className=" cursor-pointer" onClick={() => setCannedResponses({ ...canned })}> */}
                <div>
                  <AiOutlinePlus className="text-textGray" />
                </div>
              </div>
            </div>
            <h5
              className="mb-1 text-big text-start font-semibold leading-6 text-textDark"
              dir="auto"
            >
              {canned.short_code}
            </h5>
            <p
              className="font-medium text-small text-start leading-4 text-textDark"
              dir="auto"
            >
              {canned.content}
            </p>
          </div>
        </div>
      </Button>
    </div>
  );
};

export default Response;
