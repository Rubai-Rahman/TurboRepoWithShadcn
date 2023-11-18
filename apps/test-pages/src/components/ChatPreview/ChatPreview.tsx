import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillTwitterCircle } from "react-icons/ai";
import { BiEnvelope } from "react-icons/bi";
import { BsGlobe2 } from "react-icons/bs";
import moment from "moment";
import { useRouter } from "next/router";
import { ChatPreviewTypes } from "./ChatPreview.types";
import TwitterListeningIcon from "@shared/icons/TwitterListeningIcon";

const ChatPreview = ({
  selected,
  resolved,
  data,
  maxWidth = "w-1/4",
  tab,
  assigned_to = "Hafiz Ahmed",
}: ChatPreviewTypes) => {
  const router = useRouter();
  const inboxId = +router.query.inboxId;
  const smartFolderId = +router.query.smartFolderId;
  const teamId = +router.query.teamId;
  const labelId = router.query.labelId;

  const pathUrl = (cnvId: number) => {
    return router.pathname.includes("/inbox")
      ? `/inbox/${inboxId}/conversations/${cnvId}`
      : router.pathname.includes("/smart-folder")
      ? `/smart-folder/${smartFolderId}/conversations/${cnvId}`
      : router.pathname.includes("/mentions")
      ? `/mentions/conversations/${cnvId}`
      : router.pathname.includes("/team")
      ? `/team/${teamId}/conversations/${cnvId}`
      : router.pathname.includes("/label")
      ? `/label/${labelId as string}/conversations/${cnvId}`
      : router.pathname.includes("/awaiting-approvals")
      ? `/awaiting-approvals/conversations/${cnvId}`
      : `/conversations/${cnvId}`;
  };

  if (data.id === +router.query.conversationId) {
    selected = true;
  } else {
    selected = false;
  }
  return (
    <Link href={pathUrl(data.id)}>
      <div>
        {/*         {Array.isArray(data) === true ? (
        data.map((item) => (
          <div className={`${maxWidth} border-b border-newBorder`}>
            <div className={`px-4 py-2 flex gap-x-3 border-l-2 ${selected ? "bg-selectedBG border-primary" : "border-transparent"}`}>
              <div className="w-fit flex flex-col gap-y-2">
                <img
                  className="w-10 h-10 rounded-full bg-white"
                  src={`${item?.avatar ? item.avatar : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}`}
                  alt="Rounded avatar"
                />
                <div className="flex justify-center mt-1">
                  {item?.channel.name === "twitter" && <AiFillTwitterCircle className="text-2xl text-twitter" />}
                  {item?.channel.name === "whatsapp" && (
                    <p className="flex justify-center items-center bg-whatsapp h-5 w-5 rounded-full">
                      <BsWhatsapp className="text-xs text-white" />
                    </p>
                  )}
                  {item?.channel.name === "instagram" && (
                    <p className="flex justify-center items-center bg-instagram h-5 w-5 rounded-full">
                      <BsInstagram className="text-xs text-white" />
                    </p>
                  )}

                  {!item?.channel.name && <AiFillTwitterCircle className="text-2xl text-twitter" />}
                </div>
              </div>

              <div className="w-5/6 flex flex-col gap-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-big font-semibold leading-6 text-textDark">{item?.name ? item.name : "Roberta Casas"}</p>
                    <p className="text-small text-textGray font-medium leading-4">
                      {item?.channel.name === "twitter" && item?.channel.handle}
                      {item?.channel.name === "instagram" && item?.channel.handle}
                      {item?.channel.name === "whatsapp" && item?.channel.phone}
                      {!item?.channel && "@roberta_casas"}
                    </p>
                  </div>
                  <div className="flex items-center gap-x-2">
                    {resolved ? (
                      <p className="px-3 py-1 rounded-full bg-textGray/10 text-small font-medium leading-4 text-textGray">Resolved</p>
                    ) : (
                      <>
                        {item?.count && (
                          <p className="h-6 w-6 rounded-full bg-primary/10 text-smaller text-primary leading-4 font-semibold flex justify-center items-center">{item.count}</p>
                        )}

                        <BsPieChartFill className={`text-xl text-newSuccess ${selected && "text-newSecondary"}`} />
                        <p className="text-xs text-textGray font-medium">{item?.time ? item.time : "15 min"}</p>
                      </>
                    )}
                  </div>
                </div>
                <p className="font-medium text-xs">{item?.text ? item.text : "Extended kindness trifling remember he confined outlived if Assistance sentime..."}</p>

                <div className="flex justify-between text-xs font-medium text-textGray">
                  <p>{item?.channel_handle ? item.channel_handle : "DM To @alt_care"}</p>
                  <p>{item?.date ? item.date : "25 Oct 2022 - 2:35 PM"}</p>
                </div>

                {item.assigned_to && (
                  <p className="text-small leading-4 font-medium text-textGray flex items-center gap-x-2">
                    <Dot dotColor="bg-newSuccess" /> {item.assigned_to}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))
      ) : ( */}
        <div
          className={`w-full h-36 border-b border-lineGrayCustom hover:bg-blueCustom/10`}
        >
          <div
            className={`flex gap-x-3 border-l-2 h-full py-5 px-4 ${
              selected
                ? "bg-blueCustom/5 border-blueCustom"
                : "border-transparent"
            }`}
          >
            <div className="w-fit flex flex-col gap-y-2">
              {data?.contact?.profile_image ? (
                <Image
                  width={40}
                  height={40}
                  className="rounded-full"
                  src={data?.contact?.profile_image}
                  alt={data?.contact?.name}
                />
              ) : (
                <div className="rounded-full cursor-pointer h-10 w-10 bg-sky-200 flex justify-center items-center">
                  <span className="text-lg text-blue-400 shrink-0">
                    {data?.contact?.name.slice(0, 1)}
                  </span>
                </div>
              )}

              <div className="flex justify-center mt-1">
                {data?.conversation_type === "twitter_stream" && (
                  <div className="w-6 h-6 rounded-full flex justify-center items-center bg-twitter">
                    <TwitterListeningIcon color="#fff" width="14" height="14" />
                  </div>
                )}
                {data?.conversation_type === "twitter_public" && (
                  <AiFillTwitterCircle className="text-2xl text-twitter" />
                )}
                {data?.conversation_type === "twitter_private" && (
                  <AiFillTwitterCircle className="text-2xl text-twitter" />
                )}
                {data?.conversation_type === "email" && (
                  <BiEnvelope className="text-2xl text-orangeCustom" />
                )}
                {data?.conversation_type === "web_chat" && (
                  <BsGlobe2 className="text-2xl bg-black text-white rounded-full p-1" />
                )}
                {/* {data?.channel.name === "whatsapp" && (
                  <p className="flex justify-center items-center bg-whatsapp h-5 w-5 rounded-full">
                    <BsWhatsapp className="text-xs text-white" />
                  </p>
                )} */}
                {/* {data?.channel.name === "instagram" && (
                  <p className="flex justify-center items-center bg-instagram h-5 w-5 rounded-full">
                    <BsInstagram className="text-xs text-white" />
                  </p>
                )} */}

                {/* {!data?.channel.name && <AiFillTwitterCircle className="text-2xl text-twitter" />} */}
              </div>
            </div>

            <div className="w-full flex flex-col gap-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-md font-semibold leading-6 text-darkCustom capitalize">
                    {data?.contact?.name
                      ? data.contact.name
                      : "No name assigned"}
                  </p>
                  {/* <p className="text-small text-textGray font-medium leading-4">
                    {data?.channel.name === "twitter" && data?.channel.handle}
                    {data?.channel.name === "whatsapp" && data?.channel.phone}
                    {data?.channel.name === "instagram" && data?.channel.handle}
                    {!data?.channel && "@roberta_casas"}
                  </p> */}
                </div>
                <div className="flex items-center gap-x-2">
                  {resolved ? (
                    <p className="px-3 py-1 rounded-full bg-blueCustom/10 text-xs font-medium text-grayCustom">
                      Resolved
                    </p>
                  ) : (
                    <>
                      {data?.unread_messages?.aggregate?.count > 0 && (
                        <p className="h-6 w-6 rounded-full bg-blueCustom/10 text-xs text-blue flex justify-center items-center">
                          {data.unread_messages.aggregate.count}
                        </p>
                      )}

                      {/* {tab?.toLowerCase() === "pending" ? (
                        data.time.toLowerCase() !== "pending" ? (
                          <BsStopwatch />
                        ) : (
                          ""
                        )
                      ) : (
                        <BsPieChartFill className={`text-xl text-newSuccess ${selected && "text-newSecondary"}`} />
                      )} */}
                      <p className="text-small text-textGray font-medium leading-4">
                        {data?.messages.length > 0
                          ? moment(data.messages[0].created_at).fromNow()
                          : null}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <p className="font-medium text-xs leading-4 text-darkCustom line-clamp-2 break-all mt-4">
                {data?.messages.length > 0
                  ? data?.messages[0]?.message
                  : "No messages for this"}
              </p>

              <div className="flex justify-between text-xs font-medium leading-4 text-grayCustom">
                {/* //! this needs to be modified with proper handle */}
                <p className={`text-xs font-medium text-grayCustom`}>{`${
                  data?.inbox?.channel_type
                    .toLowerCase()
                    .includes("twitterstream")
                    ? `Stream To ${data?.messages[0]?.conversation?.inbox?.channel?.value}`
                    : data?.inbox?.channel_type.toLowerCase().includes("email")
                    ? `Email To ${data?.messages[0]?.conversation?.inbox?.channel?.imap_username}`
                    : data?.inbox?.channel_type
                        .toLowerCase()
                        .includes("twitterprofile")
                    ? `Mention To @${data?.messages[0]?.conversation?.inbox?.channel?.screen_name}`
                    : data?.inbox?.channel_type
                        .toLowerCase()
                        .includes("twitterprivate")
                    ? `DM To @${data?.messages[0]?.conversation?.inbox?.channel?.screen_name}`
                    : ""
                }`}</p>
                {/* //! seted as last message coming time */}
                <p>
                  {data?.messages
                    ? moment(data?.messages[0]?.created_at).format(
                        "DD MMM YYYY - h:m A"
                      )
                    : null}
                </p>
              </div>

              {/* {assigned_to && (
                <div className="text-small leading-4 font-medium text-grayCustom flex items-center gap-x-2">
                  <Dot dotColor="bg-greenCustom" /> {assigned_to}
                </div>
              )} */}
            </div>
          </div>
        </div>
        {/* )} */}
      </div>
    </Link>
  );
};

export default ChatPreview;
