import {
  GET_MESSAGESQuery,
  GET_TICKET_MESSAGES_BY_TICKET_IDQuery,
} from '@api-lib/gql/graphql';
import ReadOnlyEditor from '@module/conversations/components/ReadOnlyEditor';
import Sanitize from '@module/conversations/components/conversationPanel/Sanitize';
import { UseInfiniteQueryResult } from '@tanstack/react-query';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { BsArrow90DegRight, BsFileEarmarkArrowDown } from 'react-icons/bs';
import { FiExternalLink } from 'react-icons/fi';
import { RiCloseLine } from 'react-icons/ri';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { shallow } from 'zustand/shallow';
import { messageTypes } from './CustomMessageBubble.types';

import Icon from '@localShared/components/Icon/Icon';
import { Button } from '@shadcn/button';
import { Dialog, DialogContent, DialogTrigger } from '@shadcn/dialog';
import CustomDialog from '@localShared/components/CustomDialog/CustomDialog';
import { useTweetReplyStore } from '@store';

const CustomMessageBubble = ({ message_type, message }: messageTypes) => {
  const conversationMessage = message as GET_MESSAGESQuery['payload'][0];
  const ticketMessage =
    message as GET_TICKET_MESSAGES_BY_TICKET_IDQuery['payload'][0];

  const [setReplyToId, setTweetReplyToContent, setMentionedUsers] =
    useTweetReplyStore(
      (state) => [
        state.setReplyToId,
        state.setReplyToContent,
        state.setMentionedUsers,
      ],
      shallow
    );
  const session = useSession();

  const handleTweet = () => {
    setReplyToId(conversationMessage.conversation_id, message.source_id);
    setTweetReplyToContent(
      conversationMessage.conversation_id,
      message.message
    );
    setMentionedUsers(conversationMessage.conversation_id, [
      ...message?.content_attributes?.mentioned_users,
      {
        id: message.sender_info.id || message.sender_info.source.id,
        username:
          message.sender_info.username || message.sender_info.source.username,
      },
    ]);
  };

  const TWITTER_USERNAME_REGEX = /(^|[^@\w])@(\w{1,15})\b/g;
  const TWITTER_USERNAME_REPLACEMENT = '$1[@$2](http://twitter.com/$2)';

  const twitterContent = message?.message?.replace(
    TWITTER_USERNAME_REGEX,
    TWITTER_USERNAME_REPLACEMENT
  );

  return (
    <div
      className={`flex gap-x-2 order-last ${
        message_type > 0 && 'flex-row-reverse'
      }`}
    >
      <div className="relative">
        {message_type === 0 ? (
          conversationMessage?.conversation?.contact?.profile_image ? (
            <Image
              width={35}
              height={35}
              className="rounded-full"
              src={conversationMessage?.conversation?.contact?.profile_image}
              alt={conversationMessage?.conversation?.contact?.name}
            />
          ) : message?.contact?.profile_image ? (
            <Image
              width={35}
              height={35}
              className="rounded-full"
              src={message?.contact?.profile_image}
              alt={message?.contact?.name}
            />
          ) : (
            <div className="rounded-full cursor-pointer h-12 w-12 bg-sky-200 flex justify-center items-center">
              {/* <span className="text-lg text-blue-400 shrink-0">{message?.conversation?.contact?.name?.slice(0, 1)}</span> */}
              <span className="text-lg text-blue-400 shrink-0">
                {conversationMessage?.conversation?.contact?.name?.slice(
                  0,
                  1
                ) || message?.contact?.name?.slice(0, 1)}
              </span>
            </div>
          )
        ) : session?.data?.user?.avatar_url ? (
          // <Image width={35} height={35} className="rounded-full" src={session?.data?.user?.avatar_url} alt={message?.conversation?.contact?.name} />
          <Image
            width={35}
            height={35}
            className="rounded-full"
            src={session?.data?.user?.avatar_url}
            alt={message?.contact?.name}
          />
        ) : (
          <div className="rounded-full cursor-pointer h-12 w-12 bg-sky-200 flex justify-center items-center">
            <span className="text-lg text-blue-400 shrink-0">
              {session?.data?.user?.name?.slice(0, 1)}
            </span>
          </div>
        )}
      </div>

      <div
        className={`flex flex-col w-full ${
          message_type === 0 ? 'items-start' : 'items-end'
        }`}
      >
        {message.attachments.length > 0 && (
          <div className="pb-0.5 bg-white">
            {message.attachments.map((item) => (
              <AttachmentMsg key={item.id} fileInfo={item} />
            ))}
            {message.message.length === 0 && (
              <p
                className={`text-darkCustom rounded-xl px-2 ${
                  message_type > 0 && 'text-right'
                }`}
              >
                <span>
                  {moment(message.created_at).format('DD/MM/YYYY h:mm a')}
                </span>
              </p>
            )}
          </div>
        )}
        {message.attachments && message.message.length > 0 && (
          <div
            className={`w-9/12 px-6 py-3 border-2 border-gray-200 ${
              message_type === 0
                ? 'rounded-r-2xl rounded-bl-2xl'
                : message_type === 1
                ? 'bg-blueCustom border-transparent rounded-l-2xl rounded-br-2xl'
                : message_type === 3
                ? 'bg-blueCustom/10 border-transparent rounded-l-2xl rounded-br-2xl'
                : message_type === 4
                ? 'bg-orangeCustom border-transparent rounded-l-2xl rounded-br-2xl text-white'
                : 'bg-blueCustom/10 rounded-l-2xl rounded-br-2xl'
            }`}
          >
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  {/* <p className={`text-base font-semibold ${(message_type === 1 || message_type === 2) && "text-white"}`}>{message?.conversation?.contact?.name}</p> */}
                  <p
                    className={`text-normal font-semibold ${
                      message_type > 0 && 'text-white'
                    }`}
                  >
                    {message?.sender_info?.name}
                  </p>
                  <p
                    className={`pt-1 text-xs font-medium  ${
                      message_type > 0 ? 'text-white/90' : 'text-grayCustom'
                    }`}
                    // >{`@${message?.conversation?.contact?.source.username}`}</p>
                  >
                    {message?.sender_info?.email}
                  </p>
                </div>
                <p
                  className={`text-xs font-medium  ${
                    message_type > 0 ? 'text-white/60' : 'text-grayCustom'
                  }`}
                >
                  {moment(message.created_at).format('DD/MM/YYYY h:mm a')}
                </p>
              </div>

              {/* //* these are emojis */}

              {/* {message_type === 0 && (
            <div className="flex gap-x-2">
              <BsFillEmojiNeutralFill className="text-[#B0BBC6]" />
              <BsFillEmojiFrownFill className="text-[#B0BBC6]" />
              <BsFillEmojiSmileFill className="text-newSuccess" />
            </div>
          )} */}
            </div>
            {conversationMessage?.conversation?.type.includes('email') &&
              message_type !== 4 && (
                <div
                  className={`flex flex-col gap-1.5 py-2 text-third font-semibold ${
                    message.message_type === 1 && 'text-white'
                  }`}
                >
                  <p className="font-normal">
                    <span className="font-bold">From : </span>{' '}
                    {conversationMessage?.content_attributes?.from}
                  </p>
                  <p className="font-normal">
                    <span className="font-bold">To : </span>{' '}
                    {conversationMessage?.content_attributes?.to}
                  </p>
                  {conversationMessage?.content_attributes?.cc && (
                    <p className="font-semibold">
                      <span className="font-bold">CC : </span>{' '}
                      {conversationMessage?.content_attributes?.cc.join(', ')}
                    </p>
                  )}
                  <p className="font-normal">
                    <span className="font-bold">Subject : </span>{' '}
                    {conversationMessage?.content_attributes?.subject}
                  </p>
                </div>
              )}
            <div
              className={`py-3 font-medium text-[0.9rem] break-all ${
                message_type > 0 ? 'text-white' : 'text-darkCustom'
              }`}
            >
              {message.content_attributes.html ? (
                <Sanitize
                  html={message.content_attributes.html}
                  message_type={message_type}
                />
              ) : message.content_attributes.html &&
                conversationMessage.conversation.type ? (
                <ReadOnlyEditor
                  content={
                    conversationMessage.conversation.type.includes('twitter')
                      ? twitterContent
                      : message.message
                  }
                  messageType={message_type}
                />
              ) : (
                <ReactMarkdown
                  className="rich-text"
                  children={message.message}
                  remarkPlugins={[remarkGfm]}
                />
              )}
            </div>
            <p
              className={`text-xs font-medium ${
                message_type > 0 ? 'text-white/60' : 'text-grayCustom'
              }`}
            >
              {message_type === 0 &&
                `${
                  conversationMessage?.conversation?.inbox?.channel_type
                    .toLowerCase()
                    .includes('twitterstream')
                    ? `Stream To ${conversationMessage?.conversation?.inbox?.channel?.value}`
                    : conversationMessage?.conversation?.inbox?.channel_type
                        .toLowerCase()
                        .includes('email')
                    ? `Email To ${conversationMessage?.conversation?.inbox?.channel?.smtp_email}`
                    : conversationMessage?.conversation?.inbox?.channel_type
                        .toLowerCase()
                        .includes('twitterprofile')
                    ? `Mention To @${conversationMessage?.conversation?.inbox?.channel?.screen_name}`
                    : conversationMessage?.conversation?.inbox?.channel_type
                        .toLowerCase()
                        .includes('twitterprivate')
                    ? `DM To @${conversationMessage?.conversation?.inbox?.channel?.screen_name}`
                    : ''
                }`}

              {message_type === 4 && 'Note'}

              {message_type !== 0 &&
                message_type !== 4 &&
                `${
                  conversationMessage?.conversation?.inbox?.channel_type
                    .toLowerCase()
                    .includes('twitterstream')
                    ? `Stream To ${conversationMessage?.content_attributes?.mentioned_users?.map(
                        (user) => ` @${user.username}`
                      )}`
                    : conversationMessage?.conversation?.inbox?.channel_type
                        .toLowerCase()
                        .includes('email')
                    ? `Email To ${conversationMessage?.conversation?.inbox?.channel?.smtp_email}`
                    : conversationMessage?.conversation?.inbox?.channel_type
                        .toLowerCase()
                        .includes('twitterprofile')
                    ? `Mention To ${conversationMessage?.content_attributes?.mentioned_users?.map(
                        (user) => ` @${user.username}`
                      )}`
                    : conversationMessage?.conversation?.inbox?.channel_type
                        .toLowerCase()
                        .includes('twitterprivate')
                    ? `DM To @${conversationMessage?.conversation?.contact?.source?.username}`
                    : ''
                }`}
            </p>

            <div className="flex justify-between items-center mt-3">
              {message_type === 0 ? (
                <div className="flex gap-x-2">
                  {/* <button type="button" className="bg-transparent border border-gray-300 text-black rounded-full text-xs font-medium px-4">
                Product
              </button>
              <button type="button" className="bg-transparent border border-gray-300 text-black rounded-full text-xs font-medium px-4">
                Sales
              </button>
              <button type="button" className="bg-transparent border border-gray-300 text-black rounded-full text-base font-medium w-7">
                +
              </button> */}
                </div>
              ) : message_type === 3 ? (
                <div className="flex items-center gap-x-2">
                  <Button
                    type="button"
                    className="text-primary border border-primary bg-transparent rounded-full text-xs font-medium px-3 py-1"
                  >
                    Accept
                  </Button>
                  <Button
                    type="button"
                    className="text-danger bg-transparent text-xs font-medium hover:bg-danger/10 rounded-full px-3 py-1"
                  >
                    Reject
                  </Button>
                </div>
              ) : null}

              <div
                className={`flex gap-x-3 items-center ${
                  message_type > 0 ? 'text-white' : 'text-grayCustom'
                }`}
              >
                {message_type === 0 &&
                  (conversationMessage.conversation.type === 'twitter_stream' ||
                    conversationMessage.conversation.type ===
                      'twitter_public') && (
                    <BsArrow90DegRight
                      onClick={handleTweet}
                      className="cursor-pointer"
                    />
                  )}
                {(conversationMessage?.conversation?.type ===
                  'twitter_stream' ||
                  conversationMessage?.conversation?.type ===
                    'twitter_public') && (
                  <Link
                    href={`https://twitter.com/${conversationMessage?.conversation?.contact?.source.username}/status/${message?.source_id}`}
                    data-tip="View tweet in twitter"
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <FiExternalLink />
                  </Link>
                )}
                {/* <BsThreeDots /> */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomMessageBubble;

// attachment message
const AttachmentMsg = ({
  fileInfo,
}: {
  fileInfo: UseInfiniteQueryResult<
    GET_MESSAGESQuery['payload']
  >['data']['pages'][0][0]['attachments'][0];
}) => {
  const { key, file_name: fileName, file_type: fileType, url } = fileInfo;
  const fileSrc = url !== null ? url : `/api/file/${key}`;
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }
  function openModal() {
    setIsOpen(true);
  }

  const [vdoModal, setVdoModal] = useState(false);
  function closeVdoModal() {
    setVdoModal(false);
  }
  function openVdoModal() {
    setVdoModal(true);
  }

  // image message
  const imageDisplay = (
    <div className="bg-white">
      <div
        className="relative w-fit max-w-lg flex justify-center items-center overflow-hidden rounded-md cursor-pointer"
        onClick={openModal}
      >
        <Image src={fileSrc} alt={fileName} />
      </div>
      <CustomDialog isOpen={isOpen} closeModal={closeModal}>
        <div className="max-w-lg overflow-hidden align-middle transition-all transform">
          <div className="w-full relative">
            <Image src={fileSrc} alt={fileName} />
          </div>
        </div>
      </CustomDialog>
    </div>
  );

  // video message
  const videoDisplay = (
    <div className="px-1 pt-1 bg-white">
      <div
        className="overflow-hidden rounded-md cursor-pointer"
        onClick={openVdoModal}
      >
        <video src={fileSrc} muted playsInline />
      </div>
      <CustomDialog isOpen={vdoModal} closeModal={closeVdoModal}>
        <div className="inline-block overflow-hidden align-middle transition-all transform">
          <video
            src={fileSrc}
            controls
            playsInline
            className="max-h-[75vh] max-w-full"
          />
        </div>
      </CustomDialog>
    </div>
  );

  // audio message
  const audioDisplay = (
    <div className="px-1 pt-1 bg-white">
      <audio controls>
        <source src={fileSrc} />
      </audio>
    </div>
  );

  // file message
  const fileDisplay = (
    <div className="px-4 pt-1 bg-white flex gap-x-3 items-center">
      <Link href={fileSrc} className="text-xs inline-block">
        <Icon
          name={BsFileEarmarkArrowDown}
          className="text-gray-600 hover:text-black text-base"
        />
        {/* <Button icon={<  />} text={null} colors="bg-transparent" padding={null} /> */}
      </Link>

      <div className="text-xs text-primary">{fileName}</div>
    </div>
  );

  // return displayed file message based on file type
  return fileType === 'image'
    ? imageDisplay
    : fileType === 'video'
    ? videoDisplay
    : fileType === 'audio'
    ? audioDisplay
    : fileDisplay;
};
