import {
  GET_CONVERSATION_BY_IDQuery,
  GET_TICKET_BY_IDQuery,
} from "@api-lib/gql/graphql";
import {
  useConversationStatusUpdate,
  useSendNoteWithConversationClose,
} from "@api-lib/graphql";
import {
  useSendCsat,
  useSendMessage,
  useSendTicketMessage,
} from "@api-lib/requests";
import ReplySection from "@module/conversations/components/textEditor/ReplySection";
import {
  FilePreview,
  htmlToMarkDown,
} from "@module/conversations/components/textEditor/utils";
import { useConversationStore } from "@module/conversations/store/conversationStore";
import { ToastMessage } from "@shared/components/Toastify/Toastify";
import { useTweetReplyStore } from "@store";
import { useQueryClient } from "@tanstack/react-query";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import TextAlign from "@tiptap/extension-text-align";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import EmojiPicker from "emoji-picker-react";
import { useTranslation } from "next-i18next";
import React, {
  ChangeEvent,
  Fragment,
  useEffect,
  useReducer,
  useState,
} from "react";
import { BiAlignLeft, BiAlignRight } from "react-icons/bi";
import { BsEmojiSmileFill } from "react-icons/bs";
import { RiArrowUpSLine, RiAttachmentLine } from "react-icons/ri";
import { shallow } from "zustand/shallow";
import CloseTab from "./EditorParts/CloseTab/CloseTab";
import { TextEditorStateType } from "./EditorField.types";
import { Button } from "@shadcn/button";
import { Popover, PopoverContent, PopoverTrigger } from "@shadcn/popover";
import {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
} from "@shadcn/menubar";
import { Label } from "@shadcn/label";
import { Input } from "@shadcn/input";
import CustomSwitch from "@shared/components/CustomSwitch/CustomSwitch";

const reducer = (state, action) => {
  switch (action.type) {
    case "ENTER_BUTTON_CHECK":
      return {
        ...state,
        enterCheck: true,
      };
    case "ENTER_BUTTON_UNCHECK":
      return {
        ...state,
        enterCheck: false,
      };
    case "CC_CHANGE":
      return {
        ...state,
        emails: { cc: action.payload, bcc: state.emails.bcc },
      };
    case "BCC_CHANGE":
      return {
        ...state,
        emails: { bcc: action.payload, cc: state.emails.bcc },
      };
    case "RESET_CC_BCC":
      return {
        ...state,
        emails: { cc: "", bcc: "" },
      };
    case "CANNED_QUERY_UPDATE":
      return {
        ...state,
        cannedQuery: action.payload,
      };
    // case "CANNED_SELECTED_UPDATE":
    //   return {
    //     ...state,
    //     cannedSelected: action.payload,
    //   };
    case "DM_LINK_TOGGLE":
      return {
        ...state,
        addDMLink: action.payload,
      };
    // case "ATTACHMENT_UPDATE":
    //   return {
    //     ...state,
    //     attachments: action.payload,
    //   };
    case "TEXT_ALIGN_LEFT":
      return {
        ...state,
        textAlign: "text-left",
      };
    case "TEXT_ALIGN_RIGHT":
      return {
        ...state,
        textAlign: "text-right",
      };
    case "CLOSE_TAB_STATUS_UPDATE":
      return {
        ...state,
        closeTabSelectedStatus: action.payload,
      };
    case "SET_SELECTED_TICKET_ID":
      return {
        ...state,
        selectedTicketIdOnClose: action.payload,
      };
    case "SET_CONTACT_REASON_DATA":
      return {
        ...state,
        // contactReasonData: { ...state.contactReasonData, ...action.payload },
        contactReasonData: { ...action.payload },
      };
    default:
      return { ...state };
  }
};

const channels = ["telegram", "whatsapp", "tweet", "twitter_dm"];

// const EditorField = ({ tab, conversationData }: { tab: string; conversationData: GET_CONVERSATION_BY_IDQuery["payload"] }) => {
const EditorField = ({
  tab,
  type,
  data,
}: {
  tab: string;
  type: "conversation" | "ticket";
  data:
    | GET_CONVERSATION_BY_IDQuery["payload"]
    | GET_TICKET_BY_IDQuery["payload"];
}) => {
  const internalMsg =
    tab.toLowerCase() === "note" || tab.toLowerCase() === "reply internally"
      ? true
      : false; //in conversation this is for note
  const conversationData =
    type === "conversation" && (data as GET_CONVERSATION_BY_IDQuery["payload"]);
  const ticketData =
    type === "ticket" && (data as GET_TICKET_BY_IDQuery["payload"]);
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  const { cannedResponses } = useConversationStore((state) => state);
  const [isTweet, replyToID, mentionedUsers] = useTweetReplyStore(
    (state) => [state.isTweet, state.replyToId, state.mentionedUsers],
    shallow
  );

  const [attachments, setAttachments] = useState<File[]>([]);

  const InitialState: TextEditorStateType = {
    enterCheck: false,
    emails: { cc: "", bcc: "" },
    cannedQuery: "",
    // cannedSelected: null,
    addDMLink: false,
    // attachments: [],
    textAlign: "text-left",
    closeTabSelectedStatus: 5,
    selectedTicketIdOnClose: null,
    contactReasonData: conversationData?.closing_contact_reason_value,
  };

  const [state, dispatch] = useReducer<
    (state: TextEditorStateType, action: any) => TextEditorStateType
  >(reducer, InitialState);
  const updater = (value) => {
    dispatch(value);
  };

  //  editor config
  const editor = useEditor(
    {
      content:
        data.status > 4
          ? `Conversation is Closed as "${
              statusOptionsList.find((item) => item.value === data.status).label
            }"`
          : "",
      editable: data.status < 5,
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            class: "text-sky-500",
          },
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
          alignments: ["left", "center", "right"],
          defaultAlignment: "left",
        }),
        Placeholder.configure({
          placeholder: t("chattingTab.placeholder"),
          emptyEditorClass:
            "before:float-left before:text-slate-300 before:h-0 before:content-[attr(data-placeholder)]",
        }),
        // CannedCommand.configure({
        //   suggestion: suggestion,
        // }),
        /* MentionExt.configure({
            HTMLAttributes: {
              class: "text-[#a975ff] bg-[#a975ff]/10 border rounded-md underline underline-offset-2",
            },
            suggestion: {
              items: ({ query }) => {
                if (internalMsg) return mentionsListArray.filter((item) => item.info.name.toLowerCase().includes(query.toLowerCase()));
              },
              render: () => {
                let component;
                let popup;
  
                return {
                  onStart: (props) => {
                    component = new ReactRenderer(MentionList, {
                      props,
                      editor: props.editor,
                    });
                    popup = tippy("#richTexEditor", {
                      getReferenceClientRect: props.clientRect,
                      appendTo: "parent",
                      content: component.element,
                      showOnCreate: true,
                      interactive: true,
                      trigger: "manual",
                      placement: "top-start",
                    });
                  },
                  onUpdate(props) {
                    component.updateProps(props);
                    popup[0].setProps({
                      getReferenceClientRect: props.clientRect,
                    });
                  },
                  onKeyDown(props) {
                    if (props.event.key === "Escape") {
                      popup[0].hide();
                      return true;
                    }
                    return component.ref?.onKeyDown(props);
                  },
                  onExit() {
                    popup[0].destroy();
                    component.destroy();
                  },
                };
              },
            },
          }), */
        Image.configure({}),
      ],
      editorProps: {
        attributes: {
          class: `focus:outline-none px-2 rich-text overflow-hidden ${
            data.status > 4
              ? "cursor-not-allowed font-bold"
              : "h-[calc(100vh-84.5vh)]"
          }`,
        },
      },
    },
    [data.status]
  );

  // add canned responses to the editor
  const addCanned = () => {
    editor && editor.commands.insertContent(`${cannedResponses?.content_html}`);
  };
  useEffect(() => {
    editor && addCanned();
  }, [cannedResponses]);

  //add attachment to editor
  const onAttachmentSelect = ({
    currentTarget: { files },
  }: ChangeEvent<HTMLInputElement>) => {
    if (files && files.length > 0) {
      setAttachments((attachment) => [...attachment, ...Array.from(files)]);
    }
  };
  //add emoji
  const addEmoji = (e) => {
    const sym = e.unified.split("-");
    const codesArray = [];
    sym.forEach((el: string) => codesArray.push("0x" + el));
    const emoji = String.fromCodePoint(...(codesArray as number[]));
    editor.chain().focus().insertContent(emoji).run();
  };

  // add gif
  const addGif = (gif) => {
    editor.chain().focus().setImage({ src: gif.images.preview_gif.url }).run();
  };

  // get editor messages as different format
  const plainMsg = editor && editor.getText({ blockSeparator: " " });
  const htmlMsg = plainMsg !== "" ? editor && editor.getHTML() : "";
  const markdownMsg = htmlToMarkDown(htmlMsg);

  const exceptionChannelExists = channels.includes(
    conversationData?.conversation_type
  );

  // final message content
  const msgContent = exceptionChannelExists ? plainMsg : markdownMsg;

  const body = {
    text: msgContent,
    html: htmlMsg,
    internalMsg: internalMsg, //this is for note
    ...(isTweet && { mentionedUsers: mentionedUsers }),
    ...(isTweet && { inReplyTo: replyToID && replyToID[conversationData.id] }),
    ...(isTweet && { dmLink: state.addDMLink }),
    ...(attachments && { attachments: attachments }),
    ...((!!state.emails.cc || !!state.emails.bcc) && state.emails),
  };

  const conversationMutation = useSendMessage({
    onSuccess: (data) => {
      ToastMessage("success", "message sent");
      dispatch({ type: "RESET_CC_BCC" });
      editor && editor.commands.clearContent();
      setAttachments([]);
    },
    onError: (error) => {
      // console.log(error, error.cause, error.code, error.config, error.isAxiosError, error.message, error.name, error.request, error.response, error.stack, error.toJSON());
      // console.log(error);
      ToastMessage("error", error.message);
    },
  });

  const ticketMutation = useSendTicketMessage(ticketData.id, body, {
    onSuccess: () => {
      ToastMessage("success", "message sent");
      //   setEmails({ ...emails, cc: "", bcc: "" });
      //   editor && editor.commands.clearContent();
      //   setAttachments([]);
      dispatch({ type: "RESET_CC_BCC" });
      editor && editor.commands.clearContent();
      setAttachments([]);
    },
    onError: (error) => {
      //   setAttachments([]);
      ToastMessage("error", `${error.message}`);
    },
    // onSettled: () => {
    //   setAttachments([]);
    // },
  });

  const csatMutation = useSendCsat({
    onSuccess: (data) => {
      ToastMessage("success", "CSAT survey link sent");
    },
    onError: (error) => {
      ToastMessage("error", error.message);
    },
  });

  // send note api
  const { mutate: sendCloseNote } = useSendNoteWithConversationClose();

  const { mutate: openCloseTabMutation } = useConversationStatusUpdate({
    onSuccess: (data) => {
      editor && editor.commands.clearContent();
      queryClient.invalidateQueries([
        "conversation_details",
        conversationData.id,
      ]);
      // dispatch({ type: "CLOSE_TAB_STATUS_UPDATE", payload: data.status });
      data.status > 4 &&
        (sendCloseNote({
          conversation_id: conversationData.id,
          message: `conversation is closed with the option "${
            statusOptionsList.find((item) => item.value === data.status).label
          }"  ${msgContent.length > 0 ? `and message "${msgContent}"` : ""} ${
            data?.closing_contact_reason_value && "with contact reason"
          }  "${JSON.stringify(data.closing_contact_reason_value).replaceAll(
            /[\{\}"]/g,
            " "
          )}"`,
          message_type: 4, //! message_type = 4 for note
        }),
        dispatch({
          type: "SET_CONTACT_REASON_DATA",
          payload: data.closing_contact_reason_value,
        }));
      queryClient.invalidateQueries(["message_list", conversationData.id]);
      ToastMessage(
        "success",
        `Conversation ${data.status > 4 ? "Closed" : "Reopened"}`
      );
    },
    onError: () => {
      ToastMessage(
        "error",
        "Something went wrong, Conversation Closing Failed"
      );
    },
  });

  // send message
  const sendMessage = () => {
    type === "conversation" &&
      conversationMutation.mutateAsync({
        conversationId: +conversationData.id,
        body,
      });
    type === "ticket" && ticketMutation.mutateAsync();
    // setEmails({ cc: "", bcc: "" });
    // dispatch({ type: "RESET_CC_BCC" });
    // editor && editor.commands.clearContent();
    // setAttachments([]);
    // dispatch({ type: "ATTACHMENT_UPDATE", payload: [] });
  };

  const handleCsat = (lang) => {
    csatMutation.mutateAsync({
      conversationId: +conversationData.id,
      csat: true,
      language: lang,
    });
  };
  const handleClose = () => {
    const formValue = {
      ...(type === "conversation" && { conversation_id: conversationData.id }),
      updated_status: {
        status: state.closeTabSelectedStatus,
        ...((state.closeTabSelectedStatus === 5 ||
          state.closeTabSelectedStatus === 6) && {
          closing_contact_reason_id: 12,
        }),
        ...((state.closeTabSelectedStatus === 5 ||
          state.closeTabSelectedStatus === 6) && {
          closing_contact_reason_value: state.contactReasonData,
        }),
        ...((state.closeTabSelectedStatus === 7 ||
          state.closeTabSelectedStatus === 8) && {
          closing_ticket_id: state.selectedTicketIdOnClose,
        }),
        closing_description: msgContent,
      },
    };
    // conversationMutation.mutateAsync({ conversationId: +conversationData.id, body: { text: msgContent, internalMsg: true } });
    openCloseTabMutation(formValue);
  };

  const handleReopen = () => {
    const formValue = {
      ...(type === "conversation" && { conversation_id: conversationData.id }),
      updated_status: {
        status: 1,
      },
    };
    openCloseTabMutation(formValue);
  };

  // on enter press send message if enter checked
  editor &&
    editor.setOptions({
      editorProps: {
        handleKeyDown: (view, event) => {
          if (
            conversationData.conversation_type === "twitter_public" ||
            conversationData.conversation_type === "twitter_stream"
          ) {
            if (
              editor.getText().trim().length !== 0 &&
              event.ctrlKey &&
              event.key === "Enter" &&
              replyToID[conversationData.id] !== undefined
            ) {
              sendMessage();
              return true;
            }
          } else {
            if (
              editor.getText().trim().length !== 0 &&
              event.ctrlKey &&
              event.key === "Enter"
            ) {
              sendMessage();
              return true;
            }
          }
          return false;
        },
      },
    });

  return (
    <div>
      {tab.toLowerCase() === "reply public" && !body.inReplyTo && (
        <div className="w-fit ml-3 px-2 py-0.5 rounded-md bg-orangeCustom/10 text-orangeCustom">
          <p>please select a conversation to reply</p>
        </div>
      )}
      {/* top part */}
      {tab.toLowerCase() === "reply public" && (
        <div className="flex items-center justify-start gap-x-2 px-4 py-2 w-full overflow-hidden">
          {/* <p className="text-grayCustom text-sm font-medium">Replying to:</p> */}
          {/* {mentionsList.map((handle, index) => (
              <p key={index} className="text-blueCustom text-xs font-medium cursor-pointer">
                @{handle}
              </p>
            ))} */}
          <ReplySection />
        </div>
      )}

      {tab && tab.toLowerCase() === "close" && (
        <CloseTab
          conversationData={conversationData}
          reducerData={state}
          updater={updater}
        />
      )}

      {/* from/CC/to part */}
      {/* {(tab.toLowerCase() === "reply to customer" || tab.toLowerCase() === "forward internally") && ( */}
      {conversationData.conversation_type === "email" && (
        <div className="border-b border-lineGrayCustom py-2 px-4">
          <div className="text-grayCustom text-sm font-medium leading-6 flex justify-between">
            <div className="flex items-center gap-x-2">
              <p>
                From:{" "}
                <span className="text-darkCustom">
                  {conversationData?.id &&
                    conversationData?.inbox?.channel?.smtp_email}
                </span>
              </p>
              {/* <CustomCombobox data={listbox1} buttonClass="border-0" /> */}
            </div>
            {tab.toLowerCase() === "reply to customer" && (
              <div className="flex items-center gap-x-2">
                <p>
                  To :{" "}
                  <span className="text-darkCustom">
                    {conversationData?.id && conversationData?.contact?.email}
                  </span>
                </p>
                {/* <CustomCombobox data={listbox2} buttonClass="border-0" /> */}
              </div>
            )}
            {tab.toLowerCase() === "forward internally" && (
              <div className="flex items-center gap-x-2">
                <p>CC </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* editor section */}
      <div className="px-4">
        {/* text writing part */}
        {!(
          state.closeTabSelectedStatus === 7 ||
          state.closeTabSelectedStatus === 8
        ) && (
          <EditorContent editor={editor} />
          // <EditorContent dir="auto" editor={editor} className={`flex-grow overflow-auto my-2 cursor-text ${state.textAlign}`} />
        )}

        {/* canned responses */}
        {/* {(tab.toLowerCase() === "reply public" || tab.toLowerCase() === "reply private") && (
          <div className="flex items-center gap-1.5 mb-2">
            {cannedResponses &&
              cannedResponses.slice(0, 3).map((canned) => {
                return (
                  <p
                    onClick={() => {
                      editor.commands.insertContent(`${canned.content} `);
                    }}
                    key={canned.id}
                    className="px-3 py-1 bg-blueCustom/10 rounded text-grayCustom cursor-pointer font-medium text-xs"
                  >
                    {canned.content}
                  </p>
                );
              })}
          </div>
        )} */}
        {tab.toLowerCase() === "note" && (
          <p className="text-grayCustom text-xs font-medium mb-3">
            Your note will not be visible to the customer
          </p>
        )}
      </div>

      {/* attachment preview && suggested canned responses */}
      {attachments.length > 0 && (
        <div className="px-3 py-1 flex justify-between items-center gap-3 border max-h-20 overflow-y-auto">
          <div className="flex flex-wrap gap-3">
            {attachments.map((attachment, index) => (
              <FilePreview
                key={index}
                file={attachment}
                onClose={() => {
                  const newAttachments = attachments.filter(
                    (i) => i !== attachment
                  );
                  setAttachments(newAttachments);
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* footer part */}
      <div className="w-full px-2 py-1.5 flex justify-between items-center border-t border-lineGrayCustom">
        {/* tools */}
        <div
          className={`flex items-center gap-x-2 ${
            data.status > 4 && "invisible"
          }`}
        >
          {/* left align */}
          {/* <Button onClick={() => dispatch({ type: "TEXT_ALIGN_LEFT" })} className="p-1.5 hover:bg-grayCustom/[0.15] rounded">
            <BiAlignLeft className="text-grayCustom h-5 w-5" />
          </Button> */}
          <Button
            onClick={() => (
              editor.chain().focus().setTextAlign("left").run(),
              dispatch({ type: "TEXT_ALIGN_LEFT" })
            )}
            className={`${
              editor?.isActive({ textAlign: "left" }) ? "is-active" : ""
            } p-1.5 hover:bg-grayCustom/[0.15] rounded`}
            // className={` p-1.5 hover:bg-grayCustom/[0.15] rounded`}
            value="left"
            aria-label="left aligned"
          >
            <BiAlignLeft className="text-grayCustom h-5 w-5" />
          </Button>

          {/* right align */}
          <Button
            onClick={() => (
              editor.chain().focus().setTextAlign("right").run(),
              dispatch({ type: "TEXT_ALIGN_RIGHT" })
            )}
            className={`${
              editor?.isActive({ textAlign: "right" }) ? "is-active" : ""
            } p-1.5 hover:bg-grayCustom/[0.15] rounded`}
            // className={` p-1.5 hover:bg-grayCustom/[0.15] rounded`}
            value="right"
            aria-label="Right aligned"
          >
            <BiAlignRight className="text-grayCustom h-5 w-5" />
          </Button>
          {/* <Button onClick={() => dispatch({ type: "TEXT_ALIGN_RIGHT" })} className="p-1.5 hover:bg-grayCustom/[0.15] rounded">
            <BiAlignRight className="text-grayCustom h-5 w-5" />
          </Button> */}

          {/* emoji picker */}
          <div>
            <div className="relative">
              <Popover>
                <PopoverTrigger
                  asChild
                  className={`text-grayCustom hover:text-third p-2 rounded-md transition tooltip [data-state=open]:bg-slate-200 [data-state=close]:hover:bg-slate-200`}
                  data-tip="Emoji"
                >
                  <BsEmojiSmileFill />
                </PopoverTrigger>
                <PopoverContent className="absolute bottom-10 z-10 bg-white transform shadow-lg rounded-sm">
                  <EmojiPicker onEmojiClick={addEmoji} />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* attachment */}
          <div className="flex justify-center items-center">
            <Label
              className="text-xl p-1.5 rounded-md hover:bg-grayCustom/[0.15] text-grayCustom transition tooltip"
              data-tip="Add Attachment"
            >
              <RiAttachmentLine className="w-5 h-5" />
              <Input
                type="file"
                className="hidden"
                onChange={onAttachmentSelect}
                // onClick={(event) => {
                //   (event.target as HTMLInputElement).value = null;
                // }}
              />
            </Label>
          </div>

          {/* image picker */}
          {/* <div className="flex justify-center items-center">
            <label className="text-xl p-1.5 rounded-md hover:bg-slate-200 text-[#848484] hover:text-[#848484] transition tooltip" data-tip="Add Attachment">
              <FiImage />
              <input
                type="file"
                className="hidden"
                // onChange={onAttachmentSelect}
                // onClick={(event) => {
                //   (event.target as HTMLInputElement).value = null;
                // }}
              />
            </label>
          </div> */}

          {/* gif picker */}
          {/* <div className="">
            <Popover className="relative">
              {({ open }) => (
                <>
                  <Popover.Button className={`${open ? "bg-pastelBlueCustom" : "hover:bg-slate-200"} rounded-md transition tooltip`} data-tip="Emoji">
                    <p className="text-grayCustom font-bold tracking-widest">GIPHY</p>
                  </Popover.Button>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Popover.Panel className="absolute bottom-10 z-10 w-[405px] h-[400px] overflow-y-auto overflow-x-hidden bg-white transform shadow-double rounded-sm">
                      <GifBox onGifClick={addGif} />
                    </Popover.Panel>
                  </Transition>
                </>
              )}
            </Popover>
          </div> */}
        </div>
        {/* action buttons */}
        <div className="flex justify-end gap-x-2 items-center">
          {tab.toLowerCase() === "reply public" && (
            <div className="flex items-center gap-x-3">
              <p className="text-grayCustom font-medium text-xs">Add PM Link</p>
              <CustomSwitch
                checked={state.addDMLink}
                handler={() =>
                  dispatch({
                    type: "DM_LINK_TOGGLE",
                    payload: !state.addDMLink,
                  })
                }
              />
            </div>
          )}

          <div>
            <CsatMenuButton handleCsat={handleCsat} />
          </div>
          {data.status < 5 ? (
            <>
              {tab.toLowerCase() !== "close" && (
                <Button
                  onClick={sendMessage}
                  disabled={
                    !(
                      body?.text?.length > 0 || body?.attachments?.length > 0
                    ) ||
                    (tab.toLowerCase() === "reply public" && !body.inReplyTo)
                  }
                  // disabled={!(body.text.length > 0 || body.attachments.length > 0)}
                  className={`text-white font-medium rounded-md text-sm px-4 py-1.5 disabled:cursor-not-allowed ${
                    tab.toLowerCase() === "note"
                      ? "bg-grayCustom disabled:bg-grayCustom/20"
                      : "bg-blueCustom disabled:bg-blueCustom/20"
                  }`}
                >
                  {tab.toLowerCase() === "note"
                    ? "Add Note"
                    : tab.toLowerCase() === "reply to customer"
                    ? "Submit as Open"
                    : "Send"}
                </Button>
              )}
              {tab.toLowerCase() === "close" && (
                <Button
                  onClick={handleClose}
                  // disabled={!(body.text.length > 0 || body.attachments.length > 0)}
                  className={`text-white font-medium rounded-md text-sm px-5 py-2.5 disabled:cursor-not-allowed ${
                    tab.toLowerCase() === "note"
                      ? "bg-grayCustom disabled:bg-grayCustom/20"
                      : "bg-blueCustom disabled:bg-blueCustom/20"
                  }`}
                >
                  Close
                </Button>
              )}
            </>
          ) : (
            <Button
              onClick={handleReopen}
              className={`text-white font-medium rounded-md text-sm px-5 py-2.5 disabled:cursor-not-allowed bg-orangeCustom`}
            >
              Reopen
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorField;

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

const CsatMenuButton = ({ handleCsat }) => {
  return (
    <>
      <Menubar className="relative inline-block text-left">
        <MenubarMenu>
          <MenubarTrigger className="inline-flex w-full justify-center rounded-md bg-black bg-opacity-20 px-4 py-1.5 text-sm font-medium text-white hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            Send CSAT
            <RiArrowUpSLine
              className="ml-2 -mr-1 h-5 w-5 text-white"
              aria-hidden="true"
            />
          </MenubarTrigger>
          <MenubarContent className="absolute left-0 bottom-full mb-2 w-40 origin-bottom-left divide-y divide-gray-100 rounded-md bg-gray-200 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="px-1 py-1">
              <MenubarItem>
                <Button
                  onClick={() => handleCsat("en")}
                  className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                    active ? "bg-blueCustom text-white" : "text-gray-900"
                  } `}
                >
                  {/* {active ? <EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" /> : <EditInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />} */}
                  Language - English
                </Button>
              </MenubarItem>
              <MenubarItem>
                <Button
                  onClick={() => handleCsat("ar")}
                  className={`group flex w-full items-center rounded-md px-2 py-2 text-sm ${
                    active ? "bg-blueCustom text-white" : "text-gray-900"
                  }`}
                >
                  {/* {active ? <EditActiveIcon className="mr-2 h-5 w-5" aria-hidden="true" /> : <EditInactiveIcon className="mr-2 h-5 w-5" aria-hidden="true" />} */}
                  Language - Arabic
                </Button>
              </MenubarItem>
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
