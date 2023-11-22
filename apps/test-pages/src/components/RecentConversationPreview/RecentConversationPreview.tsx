import { GET_CONVERSATION_BY_CONTACT_IDQuery } from "@api-lib/gql/graphql";
import Dot from "@localShared/CustomDot/CustomDot";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const statusOptionsList = [
  { value: 1, label: "Unassigned" },
  { value: 2, label: "Assigned" },
  { value: 3, label: "Pending - Replied to customer" },
  { value: 4, label: "Pending - Snoozed" },
  { value: 5, label: "Resolved" },
  { value: 6, label: "Waiting for Customer Reply" },
  { value: 7, label: "Ticket escalated" },
  { value: 8, label: "Ticket follow up" },
  { value: 9, label: "Irrelevant" },
  { value: 10, label: "No Answer required" },
];

const RecentConversationPreview = ({
  maxWidth = "w-full",
  conversation,
}: {
  maxWidth: string;
  conversation: GET_CONVERSATION_BY_CONTACT_IDQuery["payload"][0];
}) => {
  return (
    <Link href={`/conversations/${conversation.id}`} className="w-full">
      <div
        className={`${maxWidth} border-b py-3 px-4 hover:bg-blueCustom/10 cursor-pointer`}
      >
        <div className="flex gap-x-3 mb-2">
          <div className="relative">
            {conversation?.contact?.profile_image ? (
              <Image
                width={40}
                height={40}
                className="rounded-full"
                src={conversation?.contact?.profile_image}
                alt={conversation?.contact?.name}
              />
            ) : (
              <div className="rounded-full cursor-pointer h-12 w-12 bg-sky-200 flex justify-center items-center">
                <span className="text-lg text-blue-400 shrink-0">
                  {conversation?.contact?.name?.slice(0, 1)}
                </span>
              </div>
            )}
            <Dot
              dotColor="bg-greenCustom"
              height="h-2"
              width="w-2"
              className="absolute top-0 right-0.5 ring-2 ring-white"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-darkCustom text-small leading-4 font-semibold">
              {conversation?.contact?.name}
            </p>
            <p className="text-grayCustom text-small leading-4 font-medium">
              {moment(conversation?.created_at).format("DD MMM YYYY - h:m A")}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-y-2">
          <p className="text-darkCustom text-small leading-4 font-medium line-clamp-2">
            {conversation?.messages[0]?.message}
          </p>
          <div className="flex justify-between">
            <p className="text-small leading-4 font-medium text-grayCustom">{`${
              conversation?.inbox?.channel_type.includes("TwitterStream")
                ? `Stream To ${conversation?.inbox?.channel?.value}`
                : conversation?.inbox?.channel_type.includes("Email")
                ? `Email To ${conversation?.inbox?.channel?.email}`
                : conversation?.inbox?.channel_type.includes("TwitterProfile")
                ? `Mention To @${conversation?.inbox?.channel?.screen_name}`
                : conversation?.inbox?.channel_type.includes("TwitterPrivate")
                ? `DM To @${conversation?.inbox?.channel?.screen_name}`
                : null
            }`}</p>
            {/* <p className="text-small leading-4 font-medium text-grayCustom">{conversation.status === statusOptionsList ? item.category : "Ticket Escalated"}</p> */}
            <p className="text-small leading-4 font-medium text-grayCustom">
              {conversation.status
                ? statusOptionsList.find(
                    (item) => item.value === conversation.status
                  ).label
                : null}
            </p>
          </div>
          <div className="flex gap-x-2 items-center">
            <Dot dotColor="bg-greenCustom" />
            <p className="text-grayCustom text-small leading-4 font-medium">
              {conversation?.agent?.name
                ? conversation.agent.name
                : "No agent assigned"}
            </p>
          </div>
          {/* <p className="text-small leading-4 font-semibold text-blueCustom">Show Previous</p> */}
        </div>
      </div>
    </Link>
  );
};

export default RecentConversationPreview;
