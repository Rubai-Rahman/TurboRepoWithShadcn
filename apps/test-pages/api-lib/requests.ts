import { CRMCardLockReqData, CRMCardTemporaryLock } from "@pages/api/crm/card/lock";
import { CRMCardStop, CRMCardStopReqData } from "@pages/api/crm/card/stop";
import { CRMCustomerData, CRMCustomerRequest } from "@pages/api/crm/customer";
import { AccountTransactionData, CRMTransactionRequest } from "@pages/api/crm/transaction";
import {
  AccountUser,
  AddConversationTags,
  AddTeamMembers,
  AgentBodyType,
  AgentListFilter,
  AssignAgentToConversation,
  AssignTeamInbox,
  AutomationRules,
  CannedType,
  Contact,
  ContactAggregate,
  Conversation,
  ConversationCounts,
  ConversationFilter,
  Count,
  CreateCannedType,
  CreateContact,
  CreateCustomForm,
  CreateEmailInbox,
  CreateEmailInboxResponse,
  CreateInstagramInboxReq,
  CreateInstagramInboxRes,
  CreateStreamInboxResponse,
  CreateTag,
  CreateTeam,
  CreateTicketType,
  CreateWebInboxResponse,
  CreateWhatsAppInbox,
  CreateWhatsAppInboxResponse,
  CustomFilter,
  CustomFilterCreate,
  CustomFilterUpdate,
  CustomForm,
  Inbox,
  InboxTwitterStream,
  InboxWebChat,
  MergeContact,
  Message,
  MessageBody,
  ReportConversationsCount,
  RequestError,
  SendConversationMessageBody,
  SendTicketMessageBody,
  SetNewPassType,
  SetNewPasswordPayload,
  Status,
  StatusUpdateResponse,
  Tag,
  Team,
  TeamMember,
  TeamMembersByIdData,
  TeamMembersByInboxId,
  TicketContacts,
  TicketCounts,
  TicketFilterObj,
  TicketMessage,
  TicketType,
  UpdateAgent,
  UpdateAutomationRules,
  UpdateCannedType,
  UpdateContact,
  UpdateContactsNumber,
  UpdateConversationStatus,
  UpdateCustomForm,
  UpdateInbox,
  UpdateTag,
  UpdateTeam,
  UpdateTicketType,
} from "@types";
import { HasuraApi, N8nApi, NextApiReq } from "@utils/axiosInterceptors";
import axios, { AxiosError } from "axios";
import FormData from "form-data";
import { useMemo, useState } from "react";
// import { UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "react-query";
import { CRMCardRequestPhysical, CRMCardRequestPhysicalReqData } from "@pages/api/crm/card/request";
import { CRMCardUnlock, CRMCardUnlockReqData } from "@pages/api/crm/card/unlock";
import { CRMVerifyCustomerExistenceData, CRMVerifyCustomerExistenceRequest } from "@pages/api/crm/customer/verify";
import { AccountFailedTransactionData, CRMFailedTransactionRequest } from "@pages/api/crm/transaction/failed";
import { UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions, useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FILTER_CONTACT_LISTQuery, GET_CONTACT_BY_IDQuery, GET_CONTACT_COUNTQuery, GET_CONVERSATION_LISTQuery, GET_MESSAGESQuery } from "./gql/graphql";
import * as gqlData from "./graphql";
import { useCustomSubscription } from "./graphqlSubscriptions";
import { queryKeys } from "./querykeys";

// Inbox APIs
export const useCreateEmailInbox = (options?: UseMutationOptions<CreateEmailInboxResponse, RequestError, CreateEmailInbox>) => {
  return useMutation((data) => N8nApi(`/inbox/email`, data), options);
};

export const useCreateWhatsAppInbox = (options?: UseMutationOptions<CreateWhatsAppInboxResponse, RequestError, CreateWhatsAppInbox>) => {
  return useMutation((data) => N8nApi(`/whatsapp/inbox`, data), options);
};

// export const useInboxes = (options?: UseQueryOptions<Inbox[], RequestError>) => {
//   return useQuery("inbox_list", () => HasuraApi(gqlData.GET_INBOXES()), options);
// };

// export const useDeleteInboxById = (options?: UseMutationOptions<unknown, RequestError, number>) => {
//   return useMutation((inboxId) => HasuraApi(gqlData.DELETE_INBOX_BY_ID(inboxId)), options);
// };

// Conversation APIs
// export const useConversationList = (
//   filters?: ConversationFilter,
//   options?: Omit<UseInfiniteQueryOptions<GET_CONVERSATION_LISTQuery["payload"], RequestError>, "keepPreviousData" | "staleTime" | "getNextPageParam">
// ) => {
//   const queryClient = useQueryClient();
//   const queryKey = ["conversation_list", filters];
//   // const { data: totalConversations } = useCustomSubscription<Count>(["conversation_count", filters], () =>
//   //   fromWsClientSubscription<Count>(gqlData.GET_SUBSCRIPTION_CONVERSATION_COUNT(filters))
//   // );

//   // const { data: totalConversations } = useQuery(["conversation_count", filters], () => gqlData.GET_SUBSCRIPTION_CONVERSATION_COUNT(filters));

//   const { data: totalConversations } = useQuery([queryKeys.conversation_count, filters], () => gqlData.GET_QUERY_CONVERSATION_COUNT());

//   useCustomSubscription({
//     query: gqlData.GET_SUBSCRIPTION_CONVERSATION_COUNT(filters).query,
//     // TODO: fix rerendering issues
//     variables: useMemo(() => gqlData.GET_SUBSCRIPTION_CONVERSATION_COUNT(filters).variables, [filters]),
//     // TODO: fix rerendering issues
//     queryToInvalidate: null,
//   });

//   // subscription query that updates main query data
//   // useSubscription(["conversation_subscription", filters], () => fromWsClientSubscription(gqlData.GET_CONVERSATIONS_SUBSCRIPTION(filters)), {
//   //   onData() {
//   //     queryClient.invalidateQueries(queryKey);
//   //     queryClient.invalidateQueries("inbox_list");
//   //   },
//   // });

//   useCustomSubscription({
//     query: gqlData.GET_CONVERSATIONS_SUBSCRIPTION(filters).query,
//     // TODO: fix rerendering issues
//     variables: useMemo(() => gqlData.GET_CONVERSATIONS_SUBSCRIPTION(filters).variables, [filters]),
//     // TODO: fix rerendering issues
//     queryToInvalidate: useMemo(() => [queryKeys.inbox_list, [queryKeys.conversation_list, filters]], [filters]),
//   });

//   // main query that fetches data
//   return useInfiniteQuery(queryKey, ({ pageParam = 0 }) => gqlData.GET_CONVERSATION_LIST(pageParam as number, filters), {
//     // getPreviousPageParam: (firstPage) => firstPage.previousId ?? undefined,
//     // getNextPageParam: (lastPage) => lastPage.nextId ?? undefined,

//     getNextPageParam: (lastPage, allPages) => {
//       const offset = 10;
//       const totalPaginationSets = Math.ceil(totalConversations?.aggregate.count / offset);

//       let length = 0;
//       allPages.forEach((page: []) => (length += page.length));
//       const nextPageParam = totalPaginationSets !== allPages.length && totalPaginationSets !== 0 ? length : undefined;
//       return nextPageParam;
//     },
//     enabled: !!totalConversations,
//     ...options,
//   });
// };

// export const useDeleteCustomFilter = (options?: UseMutationOptions<unknown, RequestError, number>) => {
//   return useMutation((id) => HasuraApi(gqlData.DELETE_CUSTOM_FILTER_BY_ID(id)), options);
// };

// export const useConversationById = (conversationId: number, options?: UseQueryOptions<Conversation, RequestError>) => {
//   return useQuery(["conversation_details", conversationId], () => HasuraApi(gqlData.GET_CONVERSATION_BY_ID(conversationId)), options);
// };

// export const useConversationByContactId = (contact_id: number, options?: UseQueryOptions<Conversation[], RequestError>) => {
//   return useQuery(["conversation_by_contact_id", contact_id], () => HasuraApi(gqlData.GET_CONVERSATION_BY_CONTACT_ID(contact_id)), options);
// };

// export const useConversationListFilteredSearch = (search_content: string, options?: UseQueryOptions<Conversation[], RequestError>) => {
//   return useQuery(["filtered_conversations", search_content], () => HasuraApi(gqlData.GET_FILTERED_CONVERSATIONS(search_content)), options);
// };

// export const useConversationCounts = (filters?: ConversationFilter, options?: UseQueryOptions<ConversationCounts, RequestError>) => {
//   return useQuery(["conversation_counts", filters], () => HasuraApi(gqlData.GET_CONVERSATION_COUNTS(filters)), options);
// };

// export const useConversationStatusUpdate = (options?: UseMutationOptions<unknown, RequestError, UpdateConversationStatus>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATE_CONVERSATION_STATUS(data)), options);
// };

// Message API
// export const useMessagesByConversationId = (
//   conversationId: number,
//   options?: Omit<
//     UseInfiniteQueryOptions<GET_MESSAGESQuery["payload"], RequestError>,
//     "getPreviousPageParam" | "refetchOnWindowFocus" | "enabled" | "keepPreviousData" | "staleTime"
//   >
// ) => {
//   const queryClient = useQueryClient();
//   const queryKey = ["message_list", conversationId];
//   // subscription query that updates main query data
//   // useSubscription(["messages_subscription", conversationId], () => fromWsClientSubscription(gqlData.GET_MESSAGES_SUBSCRIPTION(conversationId)), {
//   //   onData() {
//   //     queryClient.invalidateQueries(queryKey);
//   //     queryClient.invalidateQueries("conversation_list");
//   //   },
//   // });

//   useCustomSubscription({
//     query: gqlData.GET_MESSAGES_SUBSCRIPTION(conversationId).query,
//     // TODO: fix rerendering issues
//     variables: useMemo(() => gqlData.GET_MESSAGES_SUBSCRIPTION(conversationId).variables, [conversationId]),
//     // TODO: fix rerendering issues
//     queryToInvalidate: [queryKeys.conversation_list, [queryKeys.message_list, conversationId]],
//   });

//   // main query that fetches data
//   return useInfiniteQuery(queryKey, ({ pageParam = 0 }) => gqlData.GET_MESSAGES(conversationId, pageParam as number), {
//     getPreviousPageParam: (lastPage) => {
//       const cursorId = lastPage[0]?.id;
//       const previousPageParam = lastPage.length === 20 ? cursorId : undefined;
//       return previousPageParam;
//     },
//     enabled: !!conversationId,
//     keepPreviousData: true,
//     staleTime: Infinity,
//     ...options,
//   });
// };

// export const useMessageRead = (options?: UseMutationOptions<Message[], RequestError, number>) => {
//   return useMutation((conversation_id) => HasuraApi(gqlData.READ_MESSAGES(conversation_id)), options);
// };

// Agent APIs
// export const useAgentList = (filter?: AgentListFilter, options?: UseQueryOptions<AccountUser[], RequestError>) => {
//   return useQuery(["agent_list", filter], () => HasuraApi(gqlData.GET_AGENT_LIST(filter)), {
//     refetchOnMount: true,
//     ...options,
//   });
// };

// export const useAgentById = (id: number, options?: UseQueryOptions<AccountUser[], RequestError>) => {
//   return useQuery(["agent_by_id", id], () => HasuraApi(gqlData.GET_AGENT_BY_ID(id)), {
//     refetchOnMount: true,
//     ...options,
//   });
// };

export const useAddAgent = (options?: UseMutationOptions<unknown, AxiosError, AgentBodyType>) => {
  return useMutation((body) => N8nApi("/add/agent", body), options);
};

// export const useUpdateAgentById = (options?: UseMutationOptions<unknown, RequestError, UpdateAgent>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATE_AGENT_BY_ID(data)), options);
// };

// export const useDeleteAgents = (options?: UseMutationOptions<unknown, RequestError, number[] | number>) => {
//   return useMutation((agentId) => HasuraApi(gqlData.DELETE_AGENTS(agentId)), options);
// };

// export const useConversationAgentAssign = (options?: UseMutationOptions<unknown, RequestError, AssignAgentToConversation>) => {
//   return useMutation((data) => HasuraApi(gqlData.ASSIGN_AGENT_TO_CONVERSATION(data)), options);
// };

// Teams APIs
// export const useTeamList = (options?: UseQueryOptions<Team[], RequestError>) => {
//   return useQuery("team_list", () => HasuraApi(gqlData.GET_TEAM_LIST()), {
//     refetchOnMount: true,
//     ...options,
//   });
// };

// export const useCreateTeam = (options?: UseMutationOptions<unknown, RequestError, CreateTeam>) => {
//   return useMutation((data) => HasuraApi(gqlData.CREATE_TEAM(data)), options);
// };

// export const useDeleteTeam = (options?: UseMutationOptions<unknown, RequestError, number>) => {
//   return useMutation((team_id) => HasuraApi(gqlData.DELETE_TEAM(team_id)), options);
// };

// export const useUpdateTeam = (options?: UseMutationOptions<unknown, RequestError, UpdateTeam>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATE_TEAM(data)), options);
// };

// export const useAddTeamMembers = (options?: UseMutationOptions<unknown, RequestError, AddTeamMembers>) => {
//   return useMutation((data) => HasuraApi(gqlData.ADD_TEAM_MEMBERS(data.team_id, data.member_ids)), options);
// };

// export const useDeleteTeamMembers = (options?: UseMutationOptions<unknown, RequestError, number[] | number>) => {
//   return useMutation((member_id) => HasuraApi(gqlData.DELETE_TEAM_MEMBERS(member_id)), options);
// };

// export const useTeamMembersByTeamId = (data: TeamMembersByIdData, options?: UseQueryOptions<Pick<TeamMember, "agent">[], RequestError>) => {
//   return useQuery(["team_members", { team_id: data.team_id }], () => HasuraApi(gqlData.GET_TEAM_MEMBERS_BY_TEAM_ID(data.team_id, data.filter)), {
//     refetchOnMount: true,
//     ...options,
//   });
// };

// export const useTeamMembersByInboxId = <T = Pick<Team, "id" | "name" | "team_members">[]>(
//   data: TeamMembersByInboxId,
//   options?: UseQueryOptions<Pick<Team, "id" | "name" | "team_members">[], RequestError, T>
// ) => {
//   return useQuery(["team_members", { inbox_id: data.inbox_id }], () => HasuraApi(gqlData.GET_TEAM_MEMBERS_BY_INBOX_ID(data.inbox_id, data.filter)), options);
// };

// export const useTeamById = (team_id: number, options?: UseQueryOptions<Team, RequestError>) => {
//   return useQuery(["team_by_id", team_id], () => HasuraApi(gqlData.GET_TEAM_BY_ID(team_id)), {
//     refetchOnMount: true,
//     ...options,
//   });
// };

// export const useAssignTeamToInbox = (options?: UseMutationOptions<unknown, RequestError, AssignTeamInbox>) => {
//   return useMutation((data) => HasuraApi(gqlData.ASSIGN_TEAM_TO_INBOX(data.team_id, data.inbox_ids)), options);
// };

// Tags APIs
// export const useTagList = (options?: UseQueryOptions<Tag[], RequestError>) => {
//   return useQuery("tag_list", () => HasuraApi(gqlData.GET_TAG_LIST()), options);
// };

// export const useUpdateTagById = (options?: UseMutationOptions<unknown, RequestError, UpdateTag>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATE_TAG_BY_ID(data)), options);
// };

// export const useDeleteTagById = (options?: UseMutationOptions<unknown, RequestError, number>) => {
//   return useMutation((tag_id) => HasuraApi(gqlData.DELETE_TAG_BY_ID(tag_id)), options);
// };

// export const useDeleteConversationTag = (options?: UseMutationOptions<unknown, RequestError, AddConversationTags>) => {
//   return useMutation(({ tag_id, conversation_id }) => HasuraApi(gqlData.DELETE_CONVERSATION_TAG(tag_id, conversation_id)), options);
// };

// export const useAddTagToConversation = (options?: UseMutationOptions<unknown, RequestError, AddConversationTags>) => {
//   return useMutation(({ conversation_id, tag_id }) => HasuraApi(gqlData.ADD_TAG_TO_CONVERSATION(conversation_id, tag_id)), options);
// };

// Password
export const useSetNewAgentPassword = (options?: UseMutationOptions<SetNewPasswordPayload, AxiosError, Omit<SetNewPassType, "reset_password_token">>) => {
  return useMutation(async (data) => await axios.post("/api/auth/set-agent-password", data).then((res) => res.data), options);
};

export const useResetPassword = (options?: UseMutationOptions<SetNewPasswordPayload, AxiosError, Omit<SetNewPassType, "confirmation_token">>) => {
  return useMutation(async (data) => await axios.post("/api/auth/reset-agent-password", data).then((res) => res.data), options);
};

export const useResendVerificationEmail = (options?: UseMutationOptions<unknown, AxiosError, { agent_id: number }>) => {
  return useMutation((data) => N8nApi("/resend", data), options);
};

export const useSendResetPasswordMail = (options?: UseMutationOptions<unknown, AxiosError, { agent_id: number }>) => {
  return useMutation((data) => N8nApi("/password/reset", data), options);
};

function sendMsgData(body: MessageBody) {
  // body values
  const { text, html, inReplyTo, cc, bcc, internalMsg, attachments, fromEmail, toEmail, dmLink, mentionedUsers } = body;
  // add all values to FormData; conditionally add which are not always required
  const msgFormData = new FormData();
  msgFormData.append("text", text);
  msgFormData.append("html", html);
  inReplyTo && msgFormData.append("inReplyTo", inReplyTo);
  toEmail && msgFormData.append("toEmail", toEmail);
  fromEmail && msgFormData.append("fromEmail", fromEmail);
  cc && msgFormData.append("cc", cc);
  bcc && msgFormData.append("bcc", bcc);
  mentionedUsers && msgFormData.append("mentionedUsers", JSON.stringify(mentionedUsers));
  internalMsg && msgFormData.append("internal", JSON.stringify(internalMsg));
  dmLink && msgFormData.append("dmLink", JSON.stringify(dmLink));

  if (attachments) {
    attachments.forEach((attachment) => msgFormData.append("attachment", attachment));
  }

  return msgFormData;
}

// {conversationId: number, body: SendConversationMessageBody}
// Send conversation message
export const useSendMessage = (options?: UseMutationOptions<any, AxiosError, { conversationId: number; body: SendConversationMessageBody }>) => {
  return useMutation(
    (data) => {
      const { conversationId, body } = data;
      const msgFormData = sendMsgData(body);
      conversationId && msgFormData.append("conversationId", conversationId.toString());
      return N8nApi("/send", msgFormData);
    },
    { ...options }
  );
};

export const useSendCsat = (options?: UseMutationOptions<any, AxiosError, { conversationId: number; csat: boolean; language: "en" | "ar" }>) => {
  return useMutation(
    (data) => {
      const msgFormData = new FormData();
      const { conversationId, csat, language } = data;
      msgFormData.append("conversationId", conversationId.toString());
      msgFormData.append("csat", JSON.stringify(csat));
      msgFormData.append("language", language);
      return N8nApi("/send", msgFormData);
    },
    { ...options }
  );
};

// settings-tags
// export const useCreateTag = (options?: UseMutationOptions<unknown, RequestError, CreateTag>) => {
//   return useMutation((data) => HasuraApi(gqlData.CREATE_TAG(data)), options);
// };

export const useMergeContact = (options?: UseMutationOptions<unknown, RequestError, MergeContact>) => {
  return useMutation((data) => N8nApi(`/profile-merge`, data), options);
};

// export const useContactListFiltered = (
//   activePageNumber,
//   offset,
//   limitCount,
//   content,
//   ids?: number[],
//   filter_Obj?: { filter: any[] },
//   options?: Omit<UseInfiniteQueryOptions<FILTER_CONTACT_LISTQuery, RequestError>, "keepPreviousData" | "staleTime" | "getNextPageParam">
// ) => {
//   const queryKey = ["filtered_contacts", { content, filter_Obj }, offset, ids];

//   const { data, isLoading: loading } = useContactsCount();

//   return useInfiniteQuery(queryKey, ({ pageParam = 0 }) => gqlData.GET_FILTERED_CONTACTS(+offset, content, ids, filter_Obj), {
//     getNextPageParam: (lastPage, allPages) => {
//       const totalPage = Math.ceil(data.aggregate.count / limitCount);
//       const activePage = activePageNumber === 0 ? 1 : activePageNumber;
//       const limit = limitCount;
//       const nextPageParam = activePage > 1 ? (activePage - 1) * limit : 0;

//       return nextPageParam;
//     },
//     enabled: !!data,
//     keepPreviousData: true,
//     ...options,
//   });
// };

// export const useContactById = (id: number, options?: UseQueryOptions<Contact, RequestError>) => {
//   return useQuery(["contact_details", id], () => HasuraApi(gqlData.GET_CONTACT_BY_ID(id)), options);
// };

// export const useContactsCount = (options?: UseQueryOptions<GET_CONTACT_COUNTQuery["payload"], RequestError>) => {
//   return useQuery(["total_contacts"], () => gqlData.GET_CONTACT_COUNT(), options);
// };

// contacts for ticket
// export const useTicketContacts = (name: string, options?: UseQueryOptions<TicketContacts[], RequestError>) => {
//   return useQuery(["ticket_contacts", name], () => HasuraApi(gqlData.GET_CONTACTS_TICKET(name)), { enabled: name.length > 2, ...options });
// };

// settings - canned
// export const useCannedList = (options?: UseQueryOptions<CannedType[], RequestError>) => {
//   return useQuery("canned_list", () => HasuraApi(gqlData.GET_ALL_CANNED_RESPONSES()), options);
// };

// export const useCreateCanned = (options?: UseMutationOptions<unknown, RequestError, CreateCannedType>) => {
//   return useMutation((data) => HasuraApi(gqlData.CREATE_CANNED_RESPONSES(data)), options);
// };

// export const useUpdateCannedById = (options?: UseMutationOptions<unknown, RequestError, UpdateCannedType>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATED_CANNED_RESPONSES(data)), options);
// };

// export const useDeleteCanned = (options?: UseMutationOptions<unknown, RequestError, number>) => {
//   return useMutation((data) => HasuraApi(gqlData.DELETE_CANNED_RESPONSES(data)), options);
// };

// export const useUpdateContactById = (options?: UseMutationOptions<unknown, RequestError, UpdateContact>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATED_CONTACT_BY_ID(data)), options);
// };

// Reports
// export const useReportConversationCounts = (options?: UseQueryOptions<ReportConversationsCount, RequestError>) => {
//   return useQuery("report_conversation_counts", () => HasuraApi(gqlData.GET_REPORT_CONVERSATION_COUNTS()), options);
// };

//user status
// export const useSetUserStatus = (options?: UseMutationOptions<StatusUpdateResponse, RequestError, Status>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATE_USER_STATUS(data.user_id, data.availability)), options);
// };

// get user Status
// export const useStatusUser = <T = Status[]>(user_id: number, options?: UseQueryOptions<Status[], RequestError, T>) => {
//   return useQuery(["user_status", user_id], () => HasuraApi(gqlData.GET_USER_STATUS(user_id)), {
//     ...options,
//   });
// };

// Automation rules
// export const useAutomationRuleList = (options?: UseQueryOptions<AutomationRules[], RequestError>) => {
//   return useQuery("automation_rule_list", () => HasuraApi(gqlData.GET_AUTOMATION_RULES()), options);
// };

// export const useCreateAutomationRules = (options?: UseMutationOptions<unknown, RequestError, AutomationRules>) => {
//   return useMutation((data) => HasuraApi(gqlData.CREATE_AUTOMATION_RULES(data)), options);
// };

// export const useUpdateAutomationRuleById = (options?: UseMutationOptions<unknown, RequestError, UpdateAutomationRules>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATED_AUTOMATION_RULES(data)), options);
// };

// export const useDeleteAutomationRule = (options?: UseMutationOptions<unknown, RequestError, number>) => {
//   return useMutation((data) => HasuraApi(gqlData.DELETE_AUTOMATION_RULES(data)), options);
// };

// Custom filters
// export const useCustomFilterList = (filter_type: string, options?: UseQueryOptions<CustomFilter[], RequestError>) => {
//   return useQuery("custom_filter_list", () => HasuraApi(gqlData.GET_CUSTOM_FILTERS(filter_type)), options);
// };

// export const useCustomFilterById = (id: number, options?: UseQueryOptions<CustomFilter, RequestError>) => {
//   return useQuery(["custom_filter", id], () => HasuraApi(gqlData.GET_CUSTOM_FILTER_BY_ID(id)), options);
// };

// export const useCreateCustomFilter = (options?: UseMutationOptions<unknown, RequestError, CustomFilterCreate>) => {
//   return useMutation((data) => HasuraApi(gqlData.CREATE_CUSTOM_FILTER(data)), options);
// };

// export const useUpdateCustomFilter = (options?: UseMutationOptions<unknown, RequestError, CustomFilterUpdate>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATE_CUSTOM_FILTER_BY_ID(data)), options);
// };

// Twitter stream
export const useCreateInboxTwitterStream = (options?: UseMutationOptions<CreateStreamInboxResponse, { response: { data: { message: string } } }, InboxTwitterStream>) => {
  return useMutation(async (data) => await axios.post(`/api/twitter/stream/add`, data).then((res) => res.data), options);
};

export const useCreateWebInbox = (options?: UseMutationOptions<CreateWebInboxResponse, RequestError, InboxWebChat>) => {
  return useMutation(async (data) => await axios.post(`/api/web-chat/inbox`, data).then((res) => res.data), options);
};

// export const useInboxById = (id: number, options?: UseQueryOptions<Inbox, RequestError>) => {
//   return useQuery(["inbox_by_id", id], () => HasuraApi(gqlData.GET_INBOXES_BY_ID(id)), options);
// };

// export const useUpdateChannelNameById = (options?: UseMutationOptions<unknown, RequestError, UpdateInbox>) => {
//   return useMutation(({ id, name, reply_channel_id }) => HasuraApi(gqlData.UPDATE_INBOXES_CHANNEL_NAME_BY_ID(id, name, reply_channel_id)), options);
// };

// Tickets forms
// export const useTicketFormList = (options?: UseQueryOptions<CustomForm[], RequestError>) => {
//   return useQuery(["ticket_form_list"], () => HasuraApi(gqlData.GET_TICKET_FORM_LIST()), options);
// };

// export const useTicketFormById = (id: number, options?: UseQueryOptions<CustomForm[], RequestError>) => {
//   return useQuery(["ticket_form_by_id", id], () => HasuraApi(gqlData.GET_TICKET_FORM_BY_ID(id)), options);
// };

// export const useCreateTicketForm = (options?: UseMutationOptions<unknown, RequestError, CreateCustomForm>) => {
//   return useMutation((data) => HasuraApi(gqlData.CREATE_TICKET_FORM(data)), options);
// };

// export const useUpdateTicketForm = (options?: UseMutationOptions<unknown, RequestError, UpdateCustomForm>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATE_TICKET_FORM(data)), options);
// };

// export const useDeleteTicketForm = (options?: UseMutationOptions<unknown, RequestError, number>) => {
//   return useMutation((id) => HasuraApi(gqlData.DELETE_TICKET_FORM(id)), options);
// };

// tickets api
// export const useTicketById = (id: number, options?: UseQueryOptions<TicketType, RequestError>) => {
//   return useQuery(["tickets_by_id", id], () => HasuraApi(gqlData.GET_TICKET_BY_ID(id)), options);
// };

// export const useTicketsByContactId = (id: number, options?: UseQueryOptions<TicketType[], RequestError>) => {
//   return useQuery(["tickets_by_contact_id", id], () => HasuraApi(gqlData.GET_TICKET_BY_CONTACT_ID(id)), options);
// };

// export const useCreateTicket = (options?: UseMutationOptions<unknown, RequestError, CreateTicketType>) => {
//   return useMutation((data) => HasuraApi(gqlData.CREATE_TICKET(data)), options);
// };

// export const useUpdateTicket = (options?: UseMutationOptions<unknown, RequestError, UpdateTicketType>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATE_TICKET(data)), options);
// };

// export const useDeleteTicket = (options?: UseMutationOptions<unknown, RequestError, number>) => {
//   return useMutation((id) => HasuraApi(gqlData.DELETE_TICKET(id)), options);
// };

// export const useTicketMessagesByTicketId = (
//   ticketId: number,
//   options?: Omit<UseInfiniteQueryOptions<TicketMessage[], RequestError>, "getPreviousPageParam" | "refetchOnWindowFocus" | "enabled" | "keepPreviousData" | "staleTime">
// ) => {
//   // return useQuery(["ticket_messages", ticket_id], () => HasuraApi(gqlData.GET_TICKET_MESSAGES_BY_TICKET_ID(ticket_id)), options);

//   const queryClient = useQueryClient();
//   const queryKey = ["ticket_messages", ticketId];

//   // subscription query that updates main query data
//   useSubscription("ticket_messages_subscription", () => fromWsClientSubscription(gqlData.GET_TICKET_MESSAGES_SUBSCRIPTION(ticketId)), {
//     onData() {
//       queryClient.invalidateQueries(queryKey);
//       // queryClient.invalidateQueries("conversation_list");
//     },
//   });

//   // main query that fetches data
//   return useInfiniteQuery(queryKey, ({ pageParam = 0 }) => HasuraApi(gqlData.GET_TICKET_MESSAGES_BY_TICKET_ID(ticketId, pageParam as number), { dataReverse: true }), {
//     getPreviousPageParam: (lastPage) => {
//       const cursorId = lastPage[0]?.id;
//       const previousPageParam = lastPage.length === 20 ? cursorId : undefined;
//       return previousPageParam;
//     },
//     enabled: !!ticketId,
//     keepPreviousData: true,
//     staleTime: Infinity,
//     ...options,
//   });
// };

// export const useTicketsFiltered = (content: string, order: string, filter_Obj?: { filter: any[] }, options?: UseQueryOptions<TicketType[], RequestError>) => {
//   return useQuery(["filtered_tickets", { content, filter_Obj, order }], () => HasuraApi(gqlData.GET_FILTERED_TICKETS(content, filter_Obj, order)), options);
// };

// export const useTicketCounts = (filters?: TicketFilterObj, options?: UseQueryOptions<TicketCounts, RequestError>) => {
//   return useQuery(["ticket_counts", filters], () => HasuraApi(gqlData.GET_TICKETS_COUNTS(filters)), options);
// };

// Send ticket message
export const useSendTicketMessage = (ticketId: number, body: SendTicketMessageBody, options?: UseMutationOptions<unknown, AxiosError>) => {
  const msgFormData = sendMsgData(body);
  msgFormData.append("ticketId", ticketId?.toString());
  return useMutation(() => N8nApi("/send/ticket", msgFormData), options);
};
// create contact
// export const useCreateContact = (options?: UseMutationOptions<unknown, RequestError, CreateContact>) => {
//   return useMutation((data) => HasuraApi(gqlData.CREATE_CONTACT(data)), options);
// };

//get twitter channel profiles
// export const useTwitterChannelProfiles = (options?: UseQueryOptions<Inbox[], RequestError>) => {
//   return useQuery("twitter_channel_profiles", () => HasuraApi(gqlData.GET_TWITTER_CHANNEL_PROFILES()), options);
// };
// update phone_number
// export const usePhoneNumber = (options?: UseMutationOptions<unknown, RequestError, UpdateContactsNumber>) => {
//   return useMutation((data) => HasuraApi(gqlData.UPDATE_PHONE_NUMBER(data.id, data.phone_number)), options);
// };

// CRM
export const useGetCRMCustomerData = () => {
  return useMutation<CRMCustomerData, unknown, CRMCustomerRequest>((data) => NextApiReq("post", "/crm/customer", { data: data }));
};

export const useCRMCustomerVerifyExistence = () => {
  return useMutation<CRMVerifyCustomerExistenceData, unknown, CRMVerifyCustomerExistenceRequest>((data) => NextApiReq("post", "/crm/customer/verify", { data: data }));
};

export const useGetCRMTransactionData = (data: CRMTransactionRequest, options?: UseQueryOptions<AccountTransactionData, RequestError>) => {
  return useQuery(["crm_transaction_data", data], () => NextApiReq("get", "/crm/transaction", { params: data }), options);
};

export const useGetCRMFailedTransactionData = (data: CRMFailedTransactionRequest, options?: UseQueryOptions<AccountFailedTransactionData, RequestError>) => {
  return useQuery(["crm_failed_transaction_data", data], () => NextApiReq("get", "/crm/transaction/failed", { params: data }), options);
};

export const useCRMTempLockCard = () => {
  return useMutation<CRMCardTemporaryLock, unknown, CRMCardLockReqData>((data) => NextApiReq("post", "/crm/card/lock", { data: data }));
};

export const useCRMStopCard = () => {
  return useMutation<CRMCardStop, unknown, CRMCardStopReqData>((data) => NextApiReq("post", "/crm/card/stop", { data: data }));
};

export const useCRMUnlockCard = () => {
  return useMutation<CRMCardUnlock, unknown, CRMCardUnlockReqData>((data) => NextApiReq("post", "/crm/card/unlock", { data: data }));
};

export const useCRMRequestPhysicalCard = () => {
  return useMutation<CRMCardRequestPhysical, unknown, CRMCardRequestPhysicalReqData>((data) => NextApiReq("post", "/crm/card/request", { data: data }));
};

// Create Instagram Inbox
export const useCreateInstagramInbox = () => {
  return useMutation<CreateInstagramInboxRes, AxiosError, CreateInstagramInboxReq>((data) => N8nApi("/inbox/instagram", data));
};
