import useInterval from "@hooks/useInterval";
import { AddCsatFeedbackVars } from "@pages/api/csat/add";
import { UseInfiniteQueryOptions, UseMutationOptions, UseQueryOptions, useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import {
  AddCannedCategory,
  AddConversationTags,
  AddTeamMembers,
  AgentListFilter,
  AssignAgentToConversation,
  AssignTeamInbox,
  AutomationRules,
  ContactFilterObjType,
  ConversationFilter,
  CreateCannedType,
  CreateContact,
  CreateCustomForm,
  CreateKnowledgeBaseArticleType,
  CreateKnowledgeBaseCategory,
  CreateTag,
  CreateTeam,
  CustomFilterCreate,
  CustomFilterUpdate,
  DateRange,
  FBPagesData,
  GetCSATScoreReq,
  RequestError,
  Status,
  TeamMembersByIdData,
  TeamMembersByInboxId,
  TeamMembersByTeamIdFilter,
  TicketFilterObj,
  UpdateAgent,
  UpdateAgentProductivityTags,
  UpdateAutomationRules,
  UpdateCannedCategoryType,
  UpdateCannedType,
  UpdateContact,
  UpdateContactReason,
  UpdateContactsNumber,
  UpdateConversationStatus,
  UpdateCustomForm,
  UpdateEmailInbox,
  UpdateInbox,
  UpdateInstagramInboxReq,
  UpdateKbCategories,
  UpdateKnowledgeBaseArticles,
  UpdateTag,
  UpdateTeam,
  UpdateTicketType,
  UpdateUserProfile,
  UpdateWhatsAppInboxReq,
} from "@types";
import { makeGqlAdminRequest, makeGqlRequest } from "@utils/axiosInterceptors";
import { removeKeysFromObj } from "@utils/removeKeysFromObj";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useMemo } from "react";
import { graphql } from "./gql";
import {
  ADD_AGENTMutation,
  ADD_AGENTMutationVariables,
  ADD_CSAT_FEEDBACKMutation,
  ADD_TAG_TO_CONVERSATIONMutation,
  ADD_TEAM_MEMBERSMutation,
  ASSIGN_AGENT_TO_CONVERSATIONMutation,
  CREATE_AUTOMATION_RULESMutation,
  CREATE_CANNED_CATEGORYMutation,
  CREATE_CANNED_RESPONSESMutation,
  CREATE_CONTACTMutation,
  CREATE_CUSTOM_FILTERMutation,
  CREATE_CUSTOM_FILTERMutationVariables,
  CREATE_KNOWLEDGE_BASE_ARTICLEMutation,
  CREATE_KNOWLEDGE_BASE_CATEGORYMutation,
  CREATE_TAGMutation,
  CREATE_TEAMMutation,
  CREATE_TICKETMutation,
  CREATE_TICKETMutationVariables,
  CREATE_TICKET_FORMMutation,
  DELETE_AGENT_BY_IDMutation,
  DELETE_ARTICLE_BY_IDMutation,
  DELETE_AUTOMATION_RULESMutation,
  DELETE_CANNED_CATEGORY_BY_IDMutation,
  DELETE_CANNED_RESPONSES_BY_IDMutation,
  DELETE_CONVERSATION_TAG_BY_IDMutation,
  DELETE_CUSTOM_FILTER_BY_IDMutation,
  DELETE_INBOX_BY_IDMutation,
  DELETE_KNOWLEDGE_BASE_CATEGORY_BY_IDMutation,
  DELETE_TAG_BY_IDMutation,
  DELETE_TEAMMutation,
  DELETE_TEAM_MEMBERMutation,
  DELETE_TICKETMutation,
  DELETE_TICKET_FORMMutation,
  FILTER_CONTACT_LISTQuery,
  GET_AGENT_BY_IDQuery,
  GET_AGENT_LISTQuery,
  GET_ALL_CANNED_RESPONSESQuery,
  GET_ALL_CONTACT_REASONSQuery,
  GET_ALL_KNOWLEDGE_BASE_ARTICLESQuery,
  GET_ALL_KNOWLEDGE_BASE_CATEGORIESQuery,
  GET_ALL_PUBLISHED_ARTICLES_BY_CATEGORIESQuery,
  GET_ALL_TAGSQuery,
  GET_AUTOMATION_RULESQuery,
  GET_A_TAG_BY_IDQuery,
  GET_All_CANNED_RESPONSE_CATEGORIESQuery,
  GET_CATEGORIES_BY_IDQuery,
  GET_CONTACT_BY_IDQuery,
  GET_CONTACT_BY_PHONE_NUMBERQuery,
  GET_CONTACT_COUNTQuery,
  GET_CONVERSATIONS_SUBSCRIPTIONSubscription,
  GET_CONVERSATION_BY_CONTACT_IDQuery,
  GET_CONVERSATION_BY_IDQuery,
  GET_CONVERSATION_COUNTSQuery,
  GET_CONVERSATION_LISTQuery,
  GET_CSAT_SCOREQuery,
  GET_CSAT_SCOREQueryVariables,
  GET_CUSTOM_FILTERSQuery,
  GET_CUSTOM_FILTER_BY_IDQuery,
  GET_FILTERED_CONVERSATIONQuery,
  GET_FILTERED_TICKETSQuery,
  GET_INBOXESQuery,
  GET_INBOXES_BY_IDQuery,
  GET_INSTAGRAM_PAGESQuery,
  GET_MESSAGESQuery,
  GET_MESSAGES_COUNT_BY_CONVERSATION_IDSubscription,
  GET_MESSAGES_SUBSCRIPTIONSubscription,
  GET_PUBLISHED_ARTICLES_BY_IDQuery,
  GET_SEARCHED_TICKETSQuery,
  GET_SPECIFIC_ARTICLE_BY_IDQuery,
  GET_SUBSCRIPTION_CONVERSATION_COUNTSubscription,
  GET_TEAMSQuery,
  GET_TEAM_BY_IDQuery,
  GET_TEAM_BY_MEMBER_IDQuery,
  GET_TEAM_BY_USER_IDQuery,
  GET_TEAM_MEMBERS_BY_INBOX_IDQuery,
  GET_TEAM_MEMBERS_BY_TEAM_IDQuery,
  GET_TICKETS_COUNTSQuery,
  GET_TICKET_BY_CONTACT_IDQuery,
  GET_TICKET_BY_IDQuery,
  GET_TICKET_COUNT_SUBSCRIPTIONSubscription,
  GET_TICKET_FORM_BY_IDQuery,
  GET_TICKET_FORM_LISTQuery,
  GET_TICKET_MESSAGES_BY_TICKET_IDQuery,
  GET_TICKET_MESSAGES_SUBSCRIPTIONSubscription,
  GET_TWITTER_CHANNEL_PROFILESQuery,
  GET_USER_STATUSQuery,
  GetAllPublishArticlesQuery,
  LINK_CONVERSATION_ID_TO_TICKETMutation,
  LINK_CONVERSATION_ID_TO_TICKETMutationVariables,
  READ_MESSAGESMutation,
  REPORT_CONVERSATION_COUNTSQuery,
  SEND_NOTE_WITH_CONVERSATION_CLOSEMutation,
  TICKET_CONTACTSQuery,
  UPDATED_AUTOMATION_RULESMutation,
  UPDATED_CANNED_RESPONSES_BY_IDMutation,
  UPDATED_CONTACT_REASON_BY_IDMutation,
  UPDATED_TAGSMutation,
  UPDATE_AGENTMutation,
  UPDATE_AGENT_STATUSMutation,
  UPDATE_AGENT_STATUSMutationVariables,
  UPDATE_ARTICLE_BY_IDMutation,
  UPDATE_CANNED_CATEGORY_by_IDMutation,
  UPDATE_CONTACTMutation,
  UPDATE_CONVERSATION_STATUSMutation,
  UPDATE_CUSTOM_FILTER_BY_IDMutation,
  UPDATE_EMAIL_INBOX_BY_IDMutation,
  UPDATE_INBOXES_BY_IDMutation,
  UPDATE_INSTAGRAM_INBOX_BY_IDMutation,
  UPDATE_KNOWLEDGE_BASE_CATEGORIES_BY_IDMutation,
  UPDATE_LAST_ACTIVE_ATMutation,
  UPDATE_PHONE_NUMBERMutation,
  UPDATE_TEAM_BY_IDMutation,
  UPDATE_TICKETMutation,
  UPDATE_TICKETMutationVariables,
  UPDATE_TICKET_FORM_BY_IDMutation,
  UPDATE_USER_PROFILE_BY_IDMutation,
  UPDATE_USER_STATUSMutation,
  UPDATE_WHATSAPP_INBOX_BY_IDMutation,
  USER_PROFILE_INFOQuery,
  // GET_USER_STATUSQuery,
  // USER_STATUSMutation,
  order_by,
  teams_bool_exp,
  users_constraint,
  users_update_column,
} from "./gql/graphql";
import { useCustomSubscription } from "./graphqlSubscriptions";
import { queryKeys } from "./querykeys";

/* =========INBOX RELATED API STARTS========= */

//! done
//! status error done
export const GET_INBOXES = async (limit: number, offset: number, searchContent: string) => {
  const search_content = `%${searchContent}%`;

  let filter: { _or: any[] } = {
    ...(!!searchContent && { _or: [{ name: { _ilike: search_content } }] }),
  };

  const variables = { limit, offset, filter };

  const result = await makeGqlRequest(
    graphql(`
      query GET_INBOXES($filter: inboxes_bool_exp, $offset: Int = 0, $limit: Int = 20) {
        total: inboxes_aggregate(where: $filter) {
          aggregate {
            count
          }
        }
        payload: inboxes(where: $filter, offset: $offset, limit: $limit, order_by: { id: asc }) {
          id
          name
          channel_type
          channel_id
          channel
          description
          is_enabled
          created_at
          updated_at
          reply_channel_id
          total_conversations: conversations_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `),
    variables
  );

  return result;
};

export const useInboxes = (
  { limit = Infinity, offset = 0, searchContent = "" }: { limit?: number; offset?: number; searchContent?: string },
  options?: UseQueryOptions<GET_INBOXESQuery, RequestError>
) => {
  return useQuery([queryKeys.inbox_list, { searchContent, offset, limit }], () => GET_INBOXES(+limit, +offset, searchContent), options);
};

//! done
export const GET_INBOXES_BY_ID = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_INBOXES_BY_ID($id: Int!) {
        payload: inboxes_by_pk(id: $id) {
          id
          name
          reply_channel_id
          channel_type
          channel
        }
      }
    `),
    { id }
  );

  return result.payload;
};

export const useInboxById = (id: number, options?: UseQueryOptions<GET_INBOXES_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.inbox_by_id, id], () => GET_INBOXES_BY_ID(id), options);
};

//! done
export const UPDATE_INBOXES_BY_ID = async (data: UpdateInbox) => {
  const variables = { id: data.id, updated_values: data.updated_values };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_INBOXES_BY_ID($id: Int!, $updated_values: inboxes_set_input = {}) {
        payload: update_inboxes_by_pk(pk_columns: { id: $id }, _set: $updated_values) {
          name
          is_enabled
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useUpdateInboxById = (options?: UseMutationOptions<UPDATE_INBOXES_BY_IDMutation["payload"], RequestError, UpdateInbox>) => {
  return useMutation((data) => UPDATE_INBOXES_BY_ID(data), options);
};

export const UPDATE_EMAIL_INBOX_BY_ID = async (updatedValues: UpdateEmailInbox) => {
  const { inbox_id, channel_id, inbox_update_values, channel_update_values } = updatedValues;
  const variables = { inbox_id, channel_id, inbox_update_values, channel_update_values };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_EMAIL_INBOX_BY_ID($inbox_id: Int!, $channel_id: Int!, $inbox_update_values: inboxes_set_input = {}, $channel_update_values: channel_email_set_input = {}) {
        updated_inbox: update_inboxes_by_pk(pk_columns: { id: $inbox_id }, _set: $inbox_update_values) {
          id
          name
          description
          is_enabled
        }
        updated_channel: update_channel_email_by_pk(pk_columns: { id: $channel_id }, _set: $channel_update_values) {
          id
          imap_enabled
          imap_username
          imap_host_address
          imap_port
          smtp_enabled
          smtp_username
          smtp_host_address
          smtp_port
          smtp_requires_ssl
          updated_at
          smtp_email
          imap_password
          smtp_password
        }
      }
    `),
    variables
  );

  return result;
};

export const useUpdateEmailInboxById = (options?: UseMutationOptions<UPDATE_EMAIL_INBOX_BY_IDMutation, RequestError, UpdateEmailInbox>) => {
  return useMutation((data) => UPDATE_EMAIL_INBOX_BY_ID(data), options);
};

export const UPDATE_WHATSAPP_INBOX_BY_ID = async (updatedValues: UpdateWhatsAppInboxReq) => {
  const { inbox_id, channel_id, name, description, phone_number, phone_number_id, business_account_id, access_token } = updatedValues;
  const variables = {
    inbox_id,
    channel_id,
    inbox_update_values: {
      ...(name && { name }),
      ...(description && { description }),
    },
    channel_update_values: {
      ...(phone_number && { phone_number }),
      ...(phone_number_id && { phone_number_id }),
      ...(business_account_id && { business_account_id }),
      ...(access_token && { access_token }),
    },
  };

  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_WHATSAPP_INBOX_BY_ID(
        $inbox_id: Int!
        $channel_id: bigint!
        $inbox_update_values: inboxes_set_input = {}
        $channel_update_values: channel_whatsapp_set_input = {}
      ) {
        updated_inbox: update_inboxes_by_pk(pk_columns: { id: $inbox_id }, _set: $inbox_update_values) {
          id
          name
          description
          is_enabled
        }
        updated_channel: update_channel_whatsapp_by_pk(pk_columns: { id: $channel_id }, _set: $channel_update_values) {
          id
          phone_number
          phone_number_id
          business_account_id
          access_token
        }
      }
    `),
    variables
  );

  return result;
};

export const useUpdateWhatsAppInboxById = (options?: UseMutationOptions<UPDATE_WHATSAPP_INBOX_BY_IDMutation, RequestError, UpdateWhatsAppInboxReq>) => {
  return useMutation((data) => UPDATE_WHATSAPP_INBOX_BY_ID(data), options);
};

//! done
export const DELETE_INBOX_BY_ID = async (inboxId: number) => {
  // const variables = { inboxId };
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_INBOX_BY_ID($inboxId: Int!) {
        payload: delete_inboxes_by_pk(id: $inboxId) {
          id
          name
          channel_type
          channel_id
        }
      }
    `),
    { inboxId }
  );

  return result.payload;
};

export const useDeleteInboxById = (options?: UseMutationOptions<DELETE_INBOX_BY_IDMutation["payload"], RequestError, number>) => {
  return useMutation((inboxId) => DELETE_INBOX_BY_ID(inboxId), options);
};

/* =========INBOX RELATED API ENDS========= */

const returnContactItems = `
  id
  name
  email
  phone_number
  profile_image: source(path: "profile_image")
  source
  created_at
  updated_at
`;

// Conversations API
const returnConversationItems = `
  id
  inbox_id
  contact_id
  conversation_type: additional_attributes(path: "type")
  status
  snoozed_until
  contact {
    ${returnContactItems}
  }
  created_at
  inbox {
    name
    channel_type
  }
  unread_messages: messages_aggregate(where: {status: {_eq: 1}}) {
    aggregate {
      count
    }
  }
  incoming: messages_aggregate(where: {message_type: {_eq: 0}}) {
    aggregate {
      count
    }
  }
  outgoing: messages_aggregate(where: {message_type: {_eq: 1}}) {
    aggregate {
      count
    }
  }
`;

const returnAttachmentItems = `
  id
  key
  file_name
  file_type
  extension
  url
`;

const returnMessageItems = `
  id
  message
  message_type
  conversation_id
  created_at
  internal
  content_attributes
  approved_at
  is_approved
  source_id
  sender_id
  sender_info
  attachments {
    ${returnAttachmentItems}
  }
`;

const conversationFilterVariable = (filters: ConversationFilter, searchTerm: string) => {
  let where: { _and?: any[]; _or?: any[] } = {},
    and = [],
    // or = [],
    or = [
      { messages: { message: { _ilike: `%${searchTerm}%` } } },
      { contact: { _or: [{ name: { _ilike: `%${searchTerm}%` } }, { email: { _ilike: `%${searchTerm}%` } }, { phone_number: { _ilike: `%${searchTerm}%` } }] } },
    ],
    created_at: order_by = order_by.desc;

  if (filters.filter.length > 0) {
    and = filters.filter.map((item) => {
      if (item.filterOptions.value === "status") {
        return {
          [item.filterOptions.value]: {
            [item.operatorOptions.value === "_eq" ? "_in" : "_nin"]: item.valueOptions.value,
          },
        };
      }

      if (item.filterOptions.value === "tab_type") {
        return {
          [item.filterOptions.value]: {
            [item.operatorOptions.value === "_eq" ? "_contains" : ""]: item.valueOptions.value,
          },
        };
      }

      if (item.filterOptions.value === "created_at") {
        created_at = item.valueOptions.value as order_by;
      }

      if (item.filterOptions.value === "team_id") {
        return {
          inbox: {
            team_inboxes: {
              [item.filterOptions.value]: {
                [item.operatorOptions.value]: item.valueOptions.value,
              },
            },
          },
        };
      }

      if (item.filterOptions.value === "tag_id") {
        return {
          conversation_tags: {
            [item.filterOptions.value]: {
              [item.operatorOptions.value]: item.valueOptions.value,
            },
          },
        };
      }

      if (item.filterOptions.value === "source_type") {
        return {
          additional_attributes: {
            ["_contains"]: {
              ["type"]: item.valueOptions.value,
            },
          },
        };
      }

      // if (item.filterOptions.value !== "status" && item.filterOptions.value !== "tab_type" && item.filterOptions.value !== "tag_id") {
      if (item.filterOptions.value === "agent_id" || item.filterOptions.value === "inbox_id") {
        return {
          [item.filterOptions.value]: {
            [item.operatorOptions.value]:
              item.operatorOptions.value === "_ilike" || item.operatorOptions.value === "_nilike" ? `%${item.valueOptions.value}%` : item.valueOptions.value,
          },
        };
      }
    });
  }

  // if (searchTerm.length > 0) {
  //   or = [
  //     { messages: { message: { _ilike: `%${searchTerm}%` } } },
  //     { contact: { _or: [{ email: { _ilike: `%${searchTerm}%` } }, { phone_number: { _ilike: `%${searchTerm}%` } }] } },
  //   ];
  // }

  // this is for remove undefined value
  const removeUndefined = and.filter((item) => item !== undefined);
  // this is for making default status open
  // const cond = removeUndefined.length === 0 ? [{ status: { _in: [0] } }] : removeUndefined;
  let hasStatus = 0;
  const checkHasStatus = removeUndefined.forEach((item) => "status" in item && hasStatus++);
  const cond =
    // removeUndefined.length === 0 ? [{ status: { _in: [0] } }] : removeUndefined.length > 0 && hasStatus === 0 ? [...removeUndefined, { status: { _in: [0] } }] : removeUndefined;
    removeUndefined.length === 0 ? [] : removeUndefined.length > 0 && hasStatus === 0 ? [...removeUndefined] : removeUndefined;
  // {inbox_id: {_is_null: false}} => this condition for showing only non archived conversations
  where = { _and: [...cond, { inbox_id: { _is_null: false } }], _or: [...or] };

  return { where, created_at };
};

//! done
export const GET_CONVERSATION_LIST = async (offset?: number, filters: ConversationFilter = { filter: [] }, searchTerm: string = "") => {
  const filtered_variables = conversationFilterVariable(filters, searchTerm).where;
  const created_at = conversationFilterVariable(filters, searchTerm).created_at;
  const variables = { offset, where: filtered_variables, created_at };

  const result = await makeGqlRequest(
    graphql(`
      query GET_CONVERSATION_LIST($where: conversations_bool_exp = {}, $offset: Int = 0, $created_at: order_by = desc) {
        payload: conversations(where: $where, offset: $offset, limit: 10, order_by: { messages_aggregate: { max: { created_at: $created_at } } }) {
          id
          inbox_id
          contact_id
          conversation_type: type
          status
          snoozed_until
          contact {
            id
            name
            email
            phone_number
            profile_image: source(path: "profile_image")
            source
            created_at
            updated_at
          }
          created_at
          inbox {
            name
            channel_type
            channel
          }
          unread_messages: messages_aggregate(where: { status: { _eq: 1 } }) {
            aggregate {
              count
            }
          }
          incoming: messages_aggregate(where: { message_type: { _eq: 0 } }) {
            aggregate {
              count
            }
          }
          outgoing: messages_aggregate(where: { message_type: { _eq: 1 } }) {
            aggregate {
              count
            }
          }
          messages(limit: 1, order_by: { created_at: desc }, where: { message_type: { _neq: 2 } }) {
            id
            message
            message_type
            conversation_id
            created_at
            internal
            content_attributes
            approved_at
            source_id
            sender_id
            sender_info
            conversation {
              inbox {
                channel
              }
            }
            attachments {
              id
              key
              file_name
              file_type
              extension
              url
            }
          }
        }
      }
    `),
    variables
  );

  return result.payload;
};

//! done
export const GET_CONVERSATION_COUNTS = async (filters: ConversationFilter = { filter: [] }, searchTerm: string = "") => {
  const vars = conversationFilterVariable(filters, searchTerm).where;
  const exclude = ["tab_type"];
  const filtered_variables = vars._and.map((item) => removeKeysFromObj(item, exclude));
  const variables = { _and: filtered_variables };
  const result = await makeGqlRequest(
    graphql(`
      query GET_CONVERSATION_COUNTS($_and: [conversations_bool_exp!] = {}) {
        mine: conversations_aggregate(where: { tab_type: { _contains: "mine" }, _and: $_and }) {
          aggregate {
            count
          }
        }
        pending: conversations_aggregate(where: { tab_type: { _contains: "pending" }, _and: $_and }) {
          aggregate {
            count
          }
        }
        watching: conversations_aggregate(where: { tab_type: { _contains: "watching" }, _and: $_and }) {
          aggregate {
            count
          }
        }
        history: conversations_aggregate(where: { tab_type: { _contains: "history" }, _and: $_and }) {
          aggregate {
            count
          }
        }
        unassigned: conversations_aggregate(where: { tab_type: { _contains: "unassigned" }, _and: $_and }) {
          aggregate {
            count
          }
        }
      }
    `),
    variables
  );

  return result;
};

export const useConversationCounts = (filters?: ConversationFilter, searchTerm: string = "", options?: UseQueryOptions<GET_CONVERSATION_COUNTSQuery, RequestError>) => {
  return useQuery([queryKeys.conversation_counts, filters], () => GET_CONVERSATION_COUNTS(filters, searchTerm), options);
};

//! done
export const GET_SUBSCRIPTION_CONVERSATION_COUNT = (filters: ConversationFilter = { filter: [] }, searchTerm: string) => {
  const filtered_variables = conversationFilterVariable(filters, searchTerm).where;
  const variables = { where: filtered_variables };

  const query = graphql(`
    subscription GET_SUBSCRIPTION_CONVERSATION_COUNT($where: conversations_bool_exp = {}) {
      payload: conversations_aggregate(where: $where) {
        aggregate {
          count
        }
      }
    }
  `);

  return { query, variables };
};

export const useConversationCountSubscription = (filters: ConversationFilter, searchTerm: string): GET_SUBSCRIPTION_CONVERSATION_COUNTSubscription["payload"] => {
  return useCustomSubscription({
    query: GET_SUBSCRIPTION_CONVERSATION_COUNT(filters, searchTerm).query,
    // TODO: fix rerendering issues
    variables: useMemo(() => GET_SUBSCRIPTION_CONVERSATION_COUNT(filters, searchTerm).variables, [JSON.stringify(filters), searchTerm]),
    // TODO: fix rerendering issues
    queryToInvalidate: useMemo(
      () => [[queryKeys.inbox_list], [queryKeys.conversation_list, filters, searchTerm], [queryKeys.conversation_count, filters, searchTerm]],
      [JSON.stringify(filters), searchTerm]
    ),
  });
};

//! done
export const GET_CONVERSATIONS_SUBSCRIPTION = (filters: ConversationFilter = { filter: [] }, searchTerm: string) => {
  const filtered_variables = conversationFilterVariable(filters, searchTerm).where;

  const variables = { where: filtered_variables };
  const query = graphql(`
    subscription GET_CONVERSATIONS_SUBSCRIPTION($where: conversations_bool_exp = {}, $offset: Int = 0, $created_at: order_by = desc) {
      payload: conversations(where: $where, offset: $offset, limit: 1, order_by: { messages_aggregate: { max: { created_at: $created_at } } }) {
        id
      }
    }
  `);

  return { query, variables };
};

export const useConversationSubscription = (filters: ConversationFilter = { filter: [] }, searchTerm: string = ""): GET_CONVERSATIONS_SUBSCRIPTIONSubscription["payload"] => {
  return useCustomSubscription({
    query: GET_CONVERSATIONS_SUBSCRIPTION(filters, searchTerm).query,
    // TODO: fix rerendering issues
    variables: useMemo(() => GET_CONVERSATIONS_SUBSCRIPTION(filters, searchTerm).variables, [JSON.stringify(filters), searchTerm]),
    // TODO: fix rerendering issues
    queryToInvalidate: useMemo(() => [[queryKeys.inbox_list], [queryKeys.conversation_list, filters, searchTerm]], [JSON.stringify(filters), searchTerm]),
  });
};

export const useConversationList = (
  filters?: ConversationFilter,
  searchTerm?: string,
  options?: Omit<UseInfiniteQueryOptions<GET_CONVERSATION_LISTQuery["payload"], RequestError>, "keepPreviousData" | "staleTime" | "getNextPageParam">
) => {
  // const { data: totalConversations } = useSubscription<Count>(["conversation_count", filters], () =>
  //   fromWsClientSubscription<Count>(gqlData.GET_SUBSCRIPTION_CONVERSATION_COUNT(filters))
  // );

  const totalConversations = useConversationCountSubscription(filters, searchTerm);

  useConversationSubscription(filters, searchTerm);

  // main query that fetches data
  return useInfiniteQuery([queryKeys.conversation_list, filters, searchTerm], ({ pageParam = 0 }) => GET_CONVERSATION_LIST(pageParam as number, filters, searchTerm), {
    getNextPageParam: (lastPage, allPages) => {
      const offset = 10;
      const totalPaginationSets = Math.ceil(totalConversations?.aggregate?.count / offset);

      let length = 0;
      allPages.forEach((page: []) => (length += page.length));
      const nextPageParam = totalPaginationSets !== allPages.length && totalPaginationSets !== 0 ? length : undefined;
      return nextPageParam;
    },
    enabled: !!totalConversations,
    ...options,
  });
};

//! done
//! status error not set
export const GET_CONVERSATION_BY_ID = async (conversationId: number) => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_CONVERSATION_BY_ID($conversationId: bigint!) {
        payload: conversations_by_pk(id: $conversationId) {
          id
          inbox_id
          contact_id
          conversation_type: type
          status
          snoozed_until
          created_at
          closing_contact_reason_value
          additional_attributes
          contact {
            id
            name
            email
            phone_number
            preferred_language
            profile_image: source(path: "profile_image")
            source
            created_at
            updated_at
          }
          agent {
            id
            name
            display_name
            email
          }
          inbox {
            name
            channel
            reply_channel {
              id
              screen_name
            }
            team_inboxes {
              team {
                id
                name
              }
            }
          }
          conversation_tags {
            tag {
              id
              name
              color
            }
          }
          assigned_team_member {
            team {
              id
              name
            }
            user {
              id
              name
            }
          }
        }
      }
    `),
    { conversationId }
  );

  return result.payload;
};

export const useConversationById = (conversationId: number, options?: UseQueryOptions<GET_CONVERSATION_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.conversation_details, conversationId], () => GET_CONVERSATION_BY_ID(conversationId), options);
};

//! done
export const GET_SEARCHED_CONVERSATIONS = async (content: string) => {
  // This API currently searches through: message, email, phone_number, contact_name
  const search_content = `%${content}%`;
  const id = isNaN(+content) || !Number.isInteger(+content) ? null : +content;

  const or: object[] = [
    { messages: { message: { _ilike: search_content } } },
    { contact: { _or: [{ email: { _ilike: search_content } }, { phone_number: { _ilike: search_content } }, { name: { _ilike: search_content } }] } },
  ];
  id != null && or.push({ id: { _eq: id } }); // this is for pushing id filter when search term is integer

  const where = {
    _or: or,
    inbox_id: { _is_null: false },
  };

  const result = await makeGqlRequest(
    graphql(`
      query GET_FILTERED_CONVERSATION($search_content: String = "%%", $where: conversations_bool_exp) {
        payload: conversations(limit: 10, order_by: { messages_aggregate: { max: { created_at: desc } } }, offset: 0, where: $where) {
          id
          inbox_id
          contact_id
          conversation_type: type
          status
          snoozed_until
          contact {
            id
            name
            email
            phone_number
            profile_image: source(path: "profile_image")
            source
            created_at
            updated_at
          }
          created_at
          inbox {
            name
            channel_type
          }
          unread_messages: messages_aggregate(where: { status: { _eq: 1 } }) {
            aggregate {
              count
            }
          }
          incoming: messages_aggregate(where: { message_type: { _eq: 0 } }) {
            aggregate {
              count
            }
          }
          outgoing: messages_aggregate(where: { message_type: { _eq: 1 } }) {
            aggregate {
              count
            }
          }
          messages(order_by: { id: desc }, where: { message: { _ilike: $search_content }, message_type: { _in: [0, 1] } }) {
            id
            message
            message_type
            conversation_id
            created_at
            internal
            content_attributes
            approved_at
            source_id
            sender_id
            sender_info
            conversation {
              inbox {
                channel
              }
            }
            attachments {
              id
              key
              file_name
              file_type
              extension
              url
            }
          }
        }
      }
    `),
    { search_content, where }
  );

  // { search_content, id }
  return result.payload;
};

export const useSearchedConversationList = (search_content: string, options?: UseQueryOptions<GET_FILTERED_CONVERSATIONQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.filtered_conversations, search_content], () => GET_SEARCHED_CONVERSATIONS(search_content), options);
};

//! done
export const GET_CONVERSATION_BY_CONTACT_ID = async (contact_id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_CONVERSATION_BY_CONTACT_ID($contact_id: Int!) {
        payload: conversations(where: { contact_id: { _eq: $contact_id }, inbox_id: { _is_null: false } }) {
          id
          inbox_id
          contact_id
          conversation_type: type
          status
          snoozed_until
          contact {
            id
            name
            email
            phone_number
            profile_image: source(path: "profile_image")
            source
            created_at
            updated_at
          }
          created_at
          inbox {
            name
            channel_type
            channel
          }
          unread_messages: messages_aggregate(where: { status: { _eq: 1 } }) {
            aggregate {
              count
            }
          }
          incoming: messages_aggregate(where: { message_type: { _eq: 0 } }) {
            aggregate {
              count
            }
          }
          outgoing: messages_aggregate(where: { message_type: { _eq: 1 } }) {
            aggregate {
              count
            }
          }
          messages(order_by: { id: desc }, limit: 1, where: { message_type: { _neq: 2 } }) {
            id
            message
            message_type
            conversation_id
            created_at
            internal
            content_attributes
            approved_at
            source_id
            sender_id
            sender_info
            attachments {
              id
              key
              file_name
              file_type
              extension
              url
            }
          }
          account {
            name
          }
          conversation_tags {
            tag {
              id
              name
              color
            }
          }
          agent {
            name
          }
          assigned_team_member {
            user {
              name
              id
            }
          }
        }
      }
    `),
    { contact_id }
  );

  return result.payload;
};

export const useConversationByContactId = (contact_id: number, options?: UseQueryOptions<GET_CONVERSATION_BY_CONTACT_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.conversation_by_contact_id, contact_id], () => GET_CONVERSATION_BY_CONTACT_ID(contact_id), options);
};

//! done
export const GET_CUSTOM_FILTERS = async (filter_type: string) => {
  let type = 0;
  if (filter_type === "conversation") type = 0;
  if (filter_type === "contact") type = 1;
  if (filter_type === "ticket") type = 2;

  const result = await makeGqlRequest(
    graphql(`
      query GET_CUSTOM_FILTERS($type: Int!) {
        payload: custom_filters(where: { filter_type: { _eq: $type } }) {
          id
          name
          query
          filter_type
        }
      }
    `),
    { type }
  );
  return result.payload;
};

export const useCustomFilterList = (filter_type: string, options?: UseQueryOptions<GET_CUSTOM_FILTERSQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.custom_filter_list, filter_type], () => GET_CUSTOM_FILTERS(filter_type), options);
};

//! done
export const GET_CUSTOM_FILTER_BY_ID = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_CUSTOM_FILTER_BY_ID($id: bigint!) {
        payload: custom_filters_by_pk(id: $id) {
          id
          name
          query
          filter_type
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useCustomFilterById = (id: number, options?: UseQueryOptions<GET_CUSTOM_FILTER_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.custom_filter_by_id, id], () => GET_CUSTOM_FILTER_BY_ID(id), options);
};

//! done
export const CREATE_CUSTOM_FILTER = async (data: CustomFilterCreate) => {
  // filter_type: conversation = 0, contact = 1, ticket = 2
  const filter_type = data.filter_type === "conversation" ? 0 : data.filter_type === "contact" ? 1 : data.filter_type === "ticket" ? 2 : null;
  const variables: CREATE_CUSTOM_FILTERMutationVariables = { object: { ...data, filter_type: filter_type } };
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_CUSTOM_FILTER($object: custom_filters_insert_input = {}) {
        payload: insert_custom_filters_one(object: $object) {
          id
          name
          query
          filter_type
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useCreateCustomFilter = (options?: UseMutationOptions<CREATE_CUSTOM_FILTERMutation["payload"], RequestError, CustomFilterCreate>) => {
  return useMutation((data) => CREATE_CUSTOM_FILTER(data), options);
};

//! done
//! not used
export const UPDATE_CUSTOM_FILTER_BY_ID = async (data: CustomFilterUpdate) => {
  let set = {};
  if ("name" in data) set = { ...set, name: data.name };
  if ("query" in data) set = { ...set, query: data.query };

  const variables = { id: data.id, set };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_CUSTOM_FILTER_BY_ID($id: bigint!, $set: custom_filters_set_input = {}) {
        payload: update_custom_filters_by_pk(pk_columns: { id: $id }, _set: $set) {
          id
          name
          query
          filter_type
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useUpdateCustomFilter = (options?: UseMutationOptions<UPDATE_CUSTOM_FILTER_BY_IDMutation["payload"], RequestError, CustomFilterUpdate>) => {
  return useMutation((data) => UPDATE_CUSTOM_FILTER_BY_ID(data), options);
};

//! done
export const DELETE_CUSTOM_FILTER_BY_ID = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_CUSTOM_FILTER_BY_ID($id: bigint = "") {
        payload: delete_custom_filters_by_pk(id: $id) {
          id
          name
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useDeleteCustomFilter = (options?: UseMutationOptions<DELETE_CUSTOM_FILTER_BY_IDMutation["payload"], RequestError, number>) => {
  return useMutation((id) => DELETE_CUSTOM_FILTER_BY_ID(id), options);
};

//! done
export const GET_MESSAGES = async (conversationId: number, offset?: number) => {
  // const cursorNum = cursor === 0 ? { _gt: 0 } : { _lt: cursor };

  // const variables = { conversationId, cursor: cursorNum, offset: cursor };
  const variables = { conversationId, offset };
  const result = await makeGqlRequest(
    graphql(`
      query GET_MESSAGES($conversationId: bigint!, $offset: Int) {
        payload: messages(where: { conversation_id: { _eq: $conversationId } }, limit: 10, order_by: { created_at: desc }, offset: $offset) {
          id
          message
          message_type
          conversation_id
          created_at
          internal
          content_attributes
          approved_at
          source_id
          sender_id
          sender_info
          attachments {
            id
            key
            file_name
            file_type
            extension
            url
          }
          reply_of_message {
            id
            message
          }
          conversation {
            type
            inbox {
              name
              channel_type
              channel
            }
            contact {
              id
              name
              email
              phone_number
              profile_image: source(path: "profile_image")
              source
              created_at
              updated_at
            }
          }
        }
      }
    `),
    variables
  );

  return result.payload.reverse();
};

//! done
export const GET_MESSAGES_SUBSCRIPTION = (conversationId: number) => {
  const variables = { conversationId };
  const query = graphql(`
    subscription GET_MESSAGES_SUBSCRIPTION($conversationId: bigint!) {
      payload: messages(where: { conversation_id: { _eq: $conversationId } }, limit: 1, order_by: { created_at: desc }) {
        id
      }
    }
  `);

  return { query, variables };
};

export const useMessagesSubscription = (conversationId: number): GET_MESSAGES_SUBSCRIPTIONSubscription["payload"] => {
  return useCustomSubscription({
    query: GET_MESSAGES_SUBSCRIPTION(conversationId).query,
    // TODO: fix rerendering issues
    variables: useMemo(() => GET_MESSAGES_SUBSCRIPTION(conversationId).variables, [conversationId]),
    // TODO: fix rerendering issues
    queryToInvalidate: useMemo(() => [[queryKeys.conversation_list], [queryKeys.message_list, conversationId]], [conversationId]),
  });
};

export const GET_MESSAGES_COUNT_BY_CONVERSATION_ID = (conversationId: number) => {
  const variables = { conversationId };
  const query = graphql(`
    subscription GET_MESSAGES_COUNT_BY_CONVERSATION_ID($conversationId: bigint = 10) {
      payload: messages_aggregate(where: { conversation_id: { _eq: $conversationId } }) {
        aggregate {
          count
        }
      }
    }
  `);

  return { query, variables };
};

export const useMessagesCountByConversationIdSubscription = (conversationId: number): GET_MESSAGES_COUNT_BY_CONVERSATION_IDSubscription["payload"] => {
  return useCustomSubscription({
    query: GET_MESSAGES_COUNT_BY_CONVERSATION_ID(conversationId).query,
    // TODO: fix rerendering issues
    variables: useMemo(() => GET_MESSAGES_COUNT_BY_CONVERSATION_ID(conversationId).variables, [conversationId]),
    // TODO: fix rerendering issues
    queryToInvalidate: useMemo(() => [[queryKeys.conversation_list], [queryKeys.message_list, conversationId]], [conversationId]),
  });
};

export const useMessagesByConversationId = (
  conversationId: number,
  options?: Omit<UseInfiniteQueryOptions<GET_MESSAGESQuery["payload"], RequestError>, "getPreviousPageParam" | "refetchOnWindowFocus" | "keepPreviousData" | "staleTime">
) => {
  const totalMessagesByConversationId = conversationId && useMessagesCountByConversationIdSubscription(conversationId);

  // useCustomSubscription({
  //   query: GET_MESSAGES_SUBSCRIPTION(conversationId).query,
  //   // TODO: fix rerendering issues
  //   variables: useMemo(() => GET_MESSAGES_SUBSCRIPTION(conversationId).variables, [conversationId]),
  //   // TODO: fix rerendering issues
  //   queryToInvalidate: useMemo(() => [queryKeys.conversation_list, [queryKeys.message_list, conversationId]], [conversationId]),
  // });

  conversationId && useMessagesSubscription(conversationId);

  return useInfiniteQuery([queryKeys.message_list, conversationId], ({ pageParam = 0 }) => GET_MESSAGES(conversationId, pageParam as number), {
    getNextPageParam: (lastPage, allPages) => {
      const offset = 10;
      const totalPaginationSets = Math.ceil(totalMessagesByConversationId?.aggregate?.count / offset);

      let length = 0;
      allPages.forEach((page: []) => (length += page.length));
      const nextPageParam = totalPaginationSets !== allPages.length && totalPaginationSets !== 0 ? length : undefined;
      return nextPageParam;
    },
    // enabled: !!totalMessagesByConversationId && !!conversationId,

    keepPreviousData: true,
    staleTime: Infinity,
    ...options,
  });
};

//! done
export const READ_MESSAGES = async (conversation_id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation READ_MESSAGES($conversation_id: bigint!) {
        payload: update_messages(where: { conversation_id: { _eq: $conversation_id }, status: { _eq: 1 } }, _set: { status: 0 }) {
          returning {
            id
            message
            message_type
            conversation_id
            created_at
            internal
            content_attributes
            approved_at
            source_id
            sender_id
            sender_info
            attachments {
              id
              key
              file_name
              file_type
              extension
              url
            }
          }
        }
      }
    `),
    { conversation_id }
  );

  return result.payload;
};

export const useMessageRead = (options?: UseMutationOptions<READ_MESSAGESMutation["payload"], RequestError, number>) => {
  return useMutation((conversation_id) => READ_MESSAGES(conversation_id), options);
};

export const GET_USER_BY_EMAIL = (email: string, organization_id: number) => {
  let account_id = {};
  if (!!organization_id) account_id = { _eq: organization_id };
  const variables = { email, account_id };
  const query = `
    query GET_USER_BY_EMAIL($email: citext!, $account_id: bigint_comparison_exp = {}) {
      payload: account_agents(where: {email: {_eq: $email}, account_id: $account_id}) {
        id
        name
        display_name
        email
        phone_number
        avatar_url
        availability
        role
        last_active_at
        joined_as_agent_at
        user_created_at
        account_id
        password
      }
    }
  `;

  return { query, variables };
};

//! no need, handled by next_auth
export const UPDATE_USER_GOOGLE_TOKEN = (id: number, token: string) => {
  const variables = { id, tokens: { google: token } };
  const query = `
    mutation UPDATE_USER_GOOGLE_TOKEN($id: bigint!, $tokens: jsonb!) {
      payload: update_users_by_pk(pk_columns: {id: $id}, _append: {tokens: $tokens}) {
        id
      }
    }
  `;

  return { query, variables };
};

/* ========Agent Starts======== */
//! done
/* export const GET_AGENT_LIST = async (filters: AgentListFilter = {}) => {
  let filter = [];
  if ("active" in filters) filter = [{ ...filter }, { status: { _eq: true } }];
  if ("team_a_nai" in filters) filter = [{ ...filter }, { _or: [{ user: { team: { _is_null: true } } }, { user: { team: { _contains: { id: filters.team_a_nai.team_id } } } }] }];
  if ("search_content" in filters) {
    const search = "%" + filters.search_content + "%";
    filter = [
      { ...filter },
      { _or: [{ role: { _ilike: search } }, { user: { _or: [{ name: { _ilike: search } }, { email: { _ilike: search } }, { phone_number: { _ilike: search } }] } }] },
    ];
  }
  const result = await makeGqlRequest(
    graphql(`
      query GET_AGENT_LIST($filter: account_users_bool_exp) {
        payload: account_users(where: $filter, order_by: { user_id: asc }) {
          role
          availability
          status
          info: user {
            user_id: id
            updated_at
            hr_id
            email
            phone_number
            name
            confirmed_at
            verified
            team
          }
          inviter_id
        }
      }
    `),
    { filter: { _and: filter } }
  );
  return result.payload;
};
export const useAgentList = (filters: AgentListFilter, options?: UseQueryOptions<GET_AGENT_LISTQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.agent_list, filters], () => GET_AGENT_LIST(filters), options);
}; */

export const GET_AGENT_LIST = async (limit: number, offset: number, searchContent: string, isActive: boolean) => {
  const search_content = `%${searchContent}%`;

  let where: { _or: any[] } = {
    ...(isActive && { is_enabled: { _eq: true } }),
    ...(!!searchContent && {
      _or: [{ name: { _ilike: search_content } }, { email: { _ilike: search_content } }, { phone_number: { _ilike: search_content } }, { role: { _ilike: search_content } }],
    }),
  };

  const variables = { limit, offset, where };
  const result = await makeGqlRequest(
    graphql(`
      query GET_AGENT_LIST($where: account_agents_bool_exp = {}, $offset: Int = 0, $limit: Int = 20) {
        total: account_agents_aggregate(where: $where) {
          aggregate {
            count
          }
        }
        payload: account_agents(limit: $limit, offset: $offset, order_by: { id: desc }, where: $where) {
          id
          name
          phone_number
          email
          avatar_url
          role
          is_enabled
          verified
          team_list: team_members {
            team {
              id
              name
            }
            user_id
          }
        }
      }
    `),
    variables
  );

  return result;
};

export const useAgentList = (
  { limit = Infinity, offset = 0, searchContent = "", isActive = false }: { limit?: number; offset?: number; searchContent?: string; isActive?: boolean },
  options?: UseQueryOptions<GET_AGENT_LISTQuery, RequestError>
) => {
  return useQuery([queryKeys.agent_list, { searchContent, limit, offset }], () => GET_AGENT_LIST(+limit, +offset, searchContent, isActive), options);
};

//! done
export const GET_AGENT_BY_ID = async (user_id: number) => {
  const variables = { user_id };

  const result = await makeGqlRequest(
    graphql(`
      query GET_AGENT_BY_ID($user_id: bigint!) {
        payload: account_agents(where: { id: { _eq: $user_id } }) {
          id
          name
          role
          email
          phone_number
          verified
          invited_by {
            id
            name
          }
          team_members {
            team {
              id
              name
              is_enabled
            }
          }
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useAgentById = (id: number, options?: UseQueryOptions<GET_AGENT_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.agent_by_id, id], () => GET_AGENT_BY_ID(id), options);
};

//! done
export const UPDATE_AGENT_BY_ID = async (updateValues: UpdateAgent) => {
  const variables = {
    agent_id: updateValues.agent_id,
    set_account_users: {
      ...(updateValues.role && { role: updateValues.role }),
      ...("status" in updateValues && { is_enabled: updateValues.status }),
      ...(updateValues.name && { name: updateValues.name }),
      ...(updateValues.phone_number && { phone_number: updateValues.phone_number }),
    },
    set_user: {
      ...(updateValues.hr_id && { hr_id: updateValues.hr_id }),
      ...(updateValues.email && { email: updateValues.email }),
    },
  };

  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_AGENT($agent_id: bigint!, $set_account_users: account_users_set_input = {}, $set_user: users_set_input = {}) {
        account_users: update_account_users(where: { user_id: { _eq: $agent_id } }, _set: $set_account_users) {
          returning {
            id
          }
        }
        user: update_users_by_pk(pk_columns: { id: $agent_id }, _set: $set_user) {
          id
        }
      }
    `),
    variables
  );

  return result;
};

export const useUpdateAgentById = (options?: UseMutationOptions<UPDATE_AGENTMutation, RequestError, UpdateAgent>) => {
  return useMutation((data) => UPDATE_AGENT_BY_ID(data), options);
};

export const UPDATE_AGENT_STATUS = async ({ agent_id, is_enabled }: UPDATE_AGENT_STATUSMutationVariables) => {
  const variables = { agent_id, is_enabled };

  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_AGENT_STATUS($agent_id: bigint!, $is_enabled: Boolean!) {
        payload: update_account_users(where: { user_id: { _eq: $agent_id } }, _set: { is_enabled: $is_enabled }) {
          returning {
            user_id
            is_enabled
          }
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useUpdateAgentStatus = () => {
  return useMutation<UPDATE_AGENT_STATUSMutation["payload"], RequestError, UPDATE_AGENT_STATUSMutationVariables>((data) => UPDATE_AGENT_STATUS(data));
};

//! done
export const DELETE_AGENTS = async (agent_id: number) => {
  // const variables = { agents: agent_id instanceof Array ? [...agent_id] : [agent_id] };
  const variables = { agent_id };
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_AGENT_BY_ID($agent_id: bigint!) {
        payload: delete_account_users(where: { user_id: { _eq: $agent_id } }) {
          returning {
            id
          }
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useDeleteAgents = (options?: UseMutationOptions<DELETE_AGENT_BY_IDMutation["payload"], RequestError, number>) => {
  return useMutation((agentId) => DELETE_AGENTS(agentId), options);
};

//! not needed, handled by next_auth
export const SET_NEW_AGENT_PASSWORD = (confirmation_token: string, encrypted_password: string) => {
  const variables = { confirmation_token, encrypted_password };
  const query = `
    mutation SET_NEW_AGENT_PASSWORD($confirmation_token: String!, $encrypted_password: String!) {
      payload: update_users(where: {confirmation_token: {_eq: $confirmation_token}}, _set: {encrypted_password: $encrypted_password, confirmed_at: "now()", confirmation_token: null}) {
        affected_rows
        returning {
          id
          confirmed_at
        }
      }
    }
  `;

  return { query, variables };
};

//! not needed, handled by next_auth
export const RESET_AGENT_PASSWORD = (reset_password_token: string, encrypted_password: string) => {
  const variables = { reset_password_token, encrypted_password };
  const query = `
    mutation RESET_AGENT_PASSWORD($reset_password_token: String!, $encrypted_password: String!) {
      payload: update_users(where: {reset_password_token: {_eq: $reset_password_token}}, _set: {encrypted_password: $encrypted_password, reset_password_sent_at: null, reset_password_token: null}) {
        affected_rows
        returning {
          id
          confirmed_at
        }
      }
    }
  `;

  return { query, variables };
};

/* ========Agent Ends======== */

/* ==========TEAM STARTS========== */
//! done
export const GET_TEAM_LIST = async (limit: number, offset: number) => {
  const variables = { limit, offset };
  const result = await makeGqlRequest(
    graphql(`
      query GET_TEAMS($filter: teams_bool_exp, $offset: Int = 0, $limit: Int = 20) {
        payload: teams(where: $filter, order_by: { id: asc }, limit: $limit, offset: $offset) {
          id
          name
          type
          description
          is_enabled
          team_members {
            id
            auto_assign_enabled
            approval_enabled
            max_conversation_queue
            user {
              id
              name
            }
          }
          team_inboxes {
            id
            inbox {
              id
              name
            }
          }
        }
        total: teams_aggregate {
          aggregate {
            count
          }
        }
      }
    `),
    variables
  );

  return result;
};

export const useTeamList = (limit: number = Infinity, offset: number = 0, options?: UseQueryOptions<GET_TEAMSQuery, RequestError>) => {
  return useQuery([queryKeys.team_list, offset, limit], () => GET_TEAM_LIST(+limit, +offset), {
    refetchOnMount: true,
    ...options,
  });
};

export const GET_TEAM_BY_MEMBER_ID = async (agent_id: number, conversation_id: number) => {
  const variables = { agent_id, conversation_id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_TEAM_BY_MEMBER_ID($agent_id: bigint!, $conversation_id: bigint!) {
        payload: teams(where: { team_members: { user_id: { _eq: $agent_id } }, team_inboxes: { inbox: { conversations: { id: { _eq: $conversation_id } } } } }) {
          id
          name
          is_enabled
          allow_auto_assign
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useTeamByMemberId = (agent_id: number, conversation_id: number, options?: UseQueryOptions<GET_TEAM_BY_MEMBER_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.teams_by_member_id, agent_id, conversation_id], () => GET_TEAM_BY_MEMBER_ID(+agent_id, +conversation_id), {
    refetchOnMount: true,
    ...options,
  });
};

export const GET_TEAM_BY_USER_ID = async (user_id: number) => {
  const variables = { user_id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_TEAM_BY_USER_ID($user_id: bigint!) {
        payload: teams(where: { team_members: { user_id: { _eq: $user_id } } }) {
          id
          name
        }
      }
    `),
    variables
  );

  return result;
};

export const useTeamByUserId = (agent_id: number, options?: UseQueryOptions<GET_TEAM_BY_USER_IDQuery, RequestError>) => {
  return useQuery([queryKeys.teams_by_member_id, agent_id], () => GET_TEAM_BY_USER_ID(+agent_id), {
    refetchOnMount: true,
    ...options,
  });
};

//! done
export const CREATE_TEAM = async (createValues: CreateTeam) => {
  const { name, description, members, type, inboxes = [] } = createValues;
  let object = { name, description, type, team_members: { data: [] }, team_inboxes: { data: [] } };

  if (members.length > 0) {
    const team_members = members.map((member) => ({
      user_id: member.user_id,
      approval_enabled: member.approval_enabled,
      auto_assign_enabled: member.auto_assign_enabled,
      max_conversation_queue: member.max_conversation_queue,
    }));
    object = { ...object, team_members: { data: team_members } };
  }

  if (inboxes.length > 0) {
    const team_inboxes = inboxes.map((id) => {
      return id;
    });
    object = { ...object, team_inboxes: { data: team_inboxes } };
  }

  const variables = { object };
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_TEAM($object: teams_insert_input!) {
        payload: insert_teams_one(object: $object) {
          id
          name
          description
          is_enabled
          type
          team_members {
            id
            auto_assign_enabled
            approval_enabled
            max_conversation_queue
            user {
              id
              name
            }
          }
          team_inboxes {
            id
            inbox {
              id
              name
            }
          }
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useCreateTeam = (options?: UseMutationOptions<CREATE_TEAMMutation["payload"], RequestError, CreateTeam>) => {
  return useMutation((data) => CREATE_TEAM(data), options);
};

//! done
export const DELETE_TEAM = async (team_id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_TEAM($team_id: bigint!) {
        payload: delete_teams_by_pk(id: $team_id) {
          id
          name
          type
          description
          is_enabled
          team_members {
            id
            user {
              id
              name
            }
          }
          team_inboxes {
            id
            inbox {
              id
              name
            }
          }
        }
      }
    `),
    { team_id }
  );

  return result.payload;
};

export const useDeleteTeam = (options?: UseMutationOptions<DELETE_TEAMMutation["payload"], RequestError, number>) => {
  return useMutation((team_id) => DELETE_TEAM(team_id), options);
};

//! done
export const UPDATE_TEAM_BY_ID = async (updatedValues) => {
  const { team_id, name, type, description, is_enabled, members = [], inboxes = [] } = updatedValues;
  let member_ids = [];
  let inbox_ids = [];

  let setValues = {};
  if (name) setValues = { ...setValues, name };
  if (type !== null && type !== undefined) {
    setValues = { ...setValues, type };
  } else {
    setValues = { ...setValues, type: null };
  }
  if (description) setValues = { ...setValues, description };
  if ("is_enabled" in updatedValues) setValues = { ...setValues, is_enabled };

  let inserted_team_members = [];
  if (members.length > 0) {
    member_ids = members.map((member) => member.user_id);
    inserted_team_members = members.map((member) => {
      return {
        team_id,
        user_id: member.user_id,
        approval_enabled: member.approval_enabled,
        auto_assign_enabled: member.auto_assign_enabled,
        max_conversation_queue: member.max_conversation_queue,
      };
    });
  }

  let inserted_team_inboxes = [];
  if (inboxes.length > 0) {
    inbox_ids = inboxes.map((inbox) => inbox.inbox_id);
    inserted_team_inboxes = inboxes.map((inbox) => {
      return {
        team_id: inbox.team_id,
        inbox_id: inbox.inbox_id,
      };
    });
  }

  const variables = {
    team_id,
    set: setValues,
    member_ids,
    inbox_ids,
    inserted_team_members,
    inserted_team_inboxes,
  };

  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_TEAM_BY_ID(
        $team_id: bigint!
        $set: teams_set_input!
        $member_ids: [bigint!]
        $inserted_team_members: [team_members_insert_input!]!
        $inbox_ids: [bigint!]
        $inserted_team_inboxes: [team_inboxes_insert_input!]!
      ) {
        deleted_team_members: delete_team_members(where: { team_id: { _eq: $team_id }, user_id: { _nin: $member_ids } }) {
          returning {
            team_id
            user_id
          }
        }
        inserted_team_members: insert_team_members(
          objects: $inserted_team_members
          on_conflict: { constraint: team_members_team_id_user_id_key, update_columns: [approval_enabled, auto_assign_enabled, max_conversation_queue] }
        ) {
          returning {
            team_id
            user_id
          }
        }
        deleted_team_inboxes: delete_team_inboxes(where: { team_id: { _eq: $team_id }, inbox_id: { _nin: $inbox_ids } }) {
          returning {
            team_id
            inbox_id
          }
        }
        inserted_team_inboxes: insert_team_inboxes(objects: $inserted_team_inboxes, on_conflict: { constraint: team_inboxes_team_id_inbox_id_key, update_columns: [] }) {
          returning {
            team_id
            inbox_id
          }
        }
        updated_team: update_teams_by_pk(pk_columns: { id: $team_id }, _set: $set) {
          id
          name
          type
          is_enabled
          team_members {
            team_id
            user_id
            approval_enabled
            auto_assign_enabled
            max_conversation_queue
          }
        }
      }
    `),
    variables
  );

  return result;
};

export const useUpdateTeamById = (options?: UseMutationOptions<UPDATE_TEAM_BY_IDMutation, RequestError, any>) => {
  return useMutation((data) => UPDATE_TEAM_BY_ID(data), options);
};

//! done
export const GET_TEAM_BY_ID = async (team_id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_TEAM_BY_ID($team_id: bigint!) {
        payload: teams_by_pk(id: $team_id) {
          id
          name
          type
          description
          is_enabled
          allow_auto_assign
          team_members {
            user {
              id
              name
            }
            auto_assign_enabled
            approval_enabled
            max_conversation_queue
          }
          team_inboxes {
            inbox {
              id
              name
            }
          }
        }
      }
    `),
    { team_id }
  );
  return result.payload;
};

export const useTeamDetailsById = (team_id: number, options?: UseQueryOptions<GET_TEAM_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.team_details_by_id, team_id], () => GET_TEAM_BY_ID(team_id), {
    refetchOnMount: true,
    ...options,
  });
};

/* ==========TEAM ENDS========== */

//! done
//! not used in the project
export const ADD_TEAM_MEMBERS = async (team_id: number, member_ids: number[]) => {
  const objects = member_ids.map((user_id) => {
    return { team_id, user_id };
  });
  const variables = { objects };
  const result = await makeGqlRequest(
    graphql(`
      mutation ADD_TEAM_MEMBERS($objects: [team_members_insert_input!] = {}) {
        payload: insert_team_members(objects: $objects, on_conflict: { constraint: team_members_team_id_user_id_key, update_columns: [] }) {
          returning {
            id
            team_id
            user_id
          }
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useAddTeamMembers = (options?: UseMutationOptions<ADD_TEAM_MEMBERSMutation["payload"], RequestError, AddTeamMembers>) => {
  return useMutation((data) => ADD_TEAM_MEMBERS(data.team_id, data.member_ids), options);
};

//! done
//! not used in the project
export const DELETE_TEAM_MEMBERS = async (member_id: number[] | number) => {
  const variables = { members: member_id instanceof Array ? [...member_id] : [member_id] };
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_TEAM_MEMBER($members: [bigint!]) {
        payload: delete_team_members(where: { user_id: { _in: $members } }) {
          affected_rows
          returning {
            id
          }
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useDeleteTeamMembers = (options?: UseMutationOptions<DELETE_TEAM_MEMBERMutation["payload"], RequestError, number[] | number>) => {
  return useMutation((member_id) => DELETE_TEAM_MEMBERS(member_id), options);
};

//! done
export const GET_TEAM_MEMBERS_BY_TEAM_ID = async (team_id: number, filters: TeamMembersByTeamIdFilter = {}) => {
  let is_enabled = {},
    mine_id = {};
  if ("active" in filters) is_enabled = { status: { _eq: true } };
  if ("exclude_me" in filters) mine_id = { _neq: filters.exclude_me.id };

  const variables = { team_id, is_enabled, mine_id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_TEAM_MEMBERS_BY_TEAM_ID($team_id: bigint!, $is_enabled: account_users_bool_exp, $mine_id: bigint_comparison_exp) {
        payload: team_members(where: { team_id: { _eq: $team_id }, user: { account_users: $is_enabled, id: $mine_id } }) {
          agent: user {
            id
            name
            display_name
            email
          }
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useTeamMembersByTeamId = (data: TeamMembersByIdData, options?: UseQueryOptions<GET_TEAM_MEMBERS_BY_TEAM_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.team_members_by_team_id, { team_id: data.team_id }], () => GET_TEAM_MEMBERS_BY_TEAM_ID(data.team_id, data.filter), {
    refetchOnMount: true,
    ...options,
  });
};

//! new not done
export const GET_TEAM_MEMBERS_BY_INBOX_ID = async (inbox_id: number) => {
  const variables = { inbox_id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_TEAM_MEMBERS_BY_INBOX_ID($inbox_id: bigint!) {
        payload: teams(where: { is_enabled: { _eq: true }, team_inboxes: { inbox_id: { _eq: $inbox_id } } }) {
          id
          name
          team_members(where: { agent: { is_enabled: { _eq: true } } }) {
            team_id
            user_id
            user {
              name
              account_users {
                availability
              }
            }
            max_conversation_queue
            total_conversations: conversations_aggregate(where: { inbox_id: { _eq: $inbox_id } }) {
              aggregate {
                count
              }
            }
          }
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useTeamMembersByInboxId = (data: TeamMembersByInboxId, options?: UseQueryOptions<GET_TEAM_MEMBERS_BY_INBOX_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.team_members_by_inbox_id, { inbox_id: data.inbox_id }], () => GET_TEAM_MEMBERS_BY_INBOX_ID(data.inbox_id), options);
};

//! done
//! not used in code
export const ASSIGN_TEAM_TO_INBOX = async (team_id: number, inbox_ids: number[]) => {
  const objects = inbox_ids.map((inbox_id) => {
    return { team_id, inbox_id };
  });
  const variables = { objects };
  const result = await makeGqlRequest(
    graphql(`
      mutation ASSIGN_TEAM_TO_INBOX($objects: [team_inboxes_insert_input!] = {}) {
        payload: insert_team_inboxes(objects: $objects, on_conflict: { constraint: team_inboxes_team_id_inbox_id_key, update_columns: [] }) {
          returning {
            id
            team_id
            inbox_id
          }
        }
      }
    `),
    variables
  );

  return result;
};

export const useAssignTeamToInbox = (options?: UseMutationOptions<unknown, RequestError, AssignTeamInbox>) => {
  return useMutation((data) => ASSIGN_TEAM_TO_INBOX(data.team_id, data.inbox_ids), options);
};

//! not used in code
export const REMOVE_TEAM_INBOX = (ids: number[] | number) => {
  const variables = { ids: ids instanceof Array ? [...ids] : [ids] };
  const query = `
    mutation REMOVE_TEAM_INBOX($ids: [bigint!]) {
      payload: delete_team_inboxes(where: {id: {_in: $ids}}) {
        returning {
          id
          inbox_id
          team_id
        }
      }
    }
  `;

  return { query, variables };
};

// Queries: Conversation updates
//! done
export const ASSIGN_AGENT_TO_CONVERSATION = async ({ conversation_id, agent_id, team_id }: AssignAgentToConversation) => {
  const variables = { conversation_id, agent_id, team_id };
  const result = await makeGqlRequest(
    graphql(`
      mutation ASSIGN_AGENT_TO_CONVERSATION($conversation_id: bigint!, $agent_id: bigint!, $team_id: bigint!) {
        payload: update_conversations_by_pk(pk_columns: { id: $conversation_id }, _set: { agent_id: $agent_id, assigned_team_id: $team_id }) {
          id
          assigned_team_member {
            team {
              id
              name
            }
            user {
              id
              name
            }
          }
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useConversationAgentAssign = (options?: UseMutationOptions<ASSIGN_AGENT_TO_CONVERSATIONMutation["payload"], RequestError, AssignAgentToConversation>) => {
  return useMutation(({ conversation_id, agent_id, team_id }) => ASSIGN_AGENT_TO_CONVERSATION({ conversation_id, agent_id, team_id }), options);
};

/* ============CANNED RESPONSES START============= */
//! done
export const GET_ALL_CANNED_RESPONSES = async (limit: number, offset: number, searchTerm: string) => {
  const search_content = `%${searchTerm}%`;
  const variables = { limit, offset, search_content };
  const result = await makeGqlRequest(
    graphql(`
      query GET_ALL_CANNED_RESPONSES($search_content: String = "", $offset: Int = 0, $limit: Int = 20) {
        total: canned_responses_aggregate(where: { _or: [{ short_code: { _ilike: $search_content } }, { content: { _ilike: $search_content } }] }) {
          aggregate {
            count
          }
        }
        payload: canned_responses(where: { _or: [{ short_code: { _ilike: $search_content } }, { content: { _ilike: $search_content } }] }, offset: $offset, limit: $limit) {
          id
          short_code
          content
          content_html
          use_count
          is_enabled
          category {
            id
            name
          }
          created_by {
            name
            id
          }
          created_at
          updated_at
        }
      }
    `),
    variables
  );

  return result;
};

export const useCannedList = (limit: number = Infinity, offset: number = 0, searchTerm: string = "", options?: UseQueryOptions<GET_ALL_CANNED_RESPONSESQuery, RequestError>) => {
  return useQuery([queryKeys.canned_list, searchTerm, offset, limit], () => GET_ALL_CANNED_RESPONSES(+limit, +offset, searchTerm), options);
};

//! done
export const DELETE_CANNED_RESPONSES_BY_ID = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_CANNED_RESPONSES_BY_ID($id: Int!) {
        payload: delete_canned_responses_by_pk(id: $id) {
          id
        }
      }
    `),
    { id }
  );

  return result.payload;
};

export const useDeleteCannedResponseById = (options?: UseMutationOptions<DELETE_CANNED_RESPONSES_BY_IDMutation["payload"], RequestError, number>) => {
  return useMutation((data) => DELETE_CANNED_RESPONSES_BY_ID(data), options);
};

//! done
export const CREATE_CANNED_RESPONSES = async (object: CreateCannedType) => {
  const variables = { object };
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_CANNED_RESPONSES($object: canned_responses_insert_input = {}) {
        payload: insert_canned_responses_one(object: $object) {
          id
          short_code
          content
          use_count
          is_enabled
          category {
            id
            name
          }
          created_at
          updated_at
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useCreateCannedResponse = (options?: UseMutationOptions<CREATE_CANNED_RESPONSESMutation["payload"], RequestError, CreateCannedType>) => {
  return useMutation((data) => CREATE_CANNED_RESPONSES(data), options);
};
//! done
export const UPDATED_CANNED_RESPONSES_BY_ID = async (data: UpdateCannedType) => {
  const variables = { id: data.id, updated_values: data.updated_values };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATED_CANNED_RESPONSES_BY_ID($id: Int!, $updated_values: canned_responses_set_input = {}) {
        payload: update_canned_responses_by_pk(pk_columns: { id: $id }, _set: $updated_values) {
          id
          short_code
          content
          content_html
          is_enabled
          updated_at
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useUpdateCannedResponseById = (options?: UseMutationOptions<UPDATED_CANNED_RESPONSES_BY_IDMutation["payload"], RequestError, UpdateCannedType>) => {
  return useMutation((data) => UPDATED_CANNED_RESPONSES_BY_ID(data), options);
};

/* ============CANNED RESPONSES END============= */

/* ============CANNED CATEGORY START============= */

export const GET_ALL_CANNED_CATEGORIES = async (limit: number, offset: number) => {
  let where = {};
  const variables = { limit, offset, where };
  const result = await makeGqlRequest(
    graphql(`
      query GET_All_CANNED_RESPONSE_CATEGORIES(
        $limit: Int = 20
        $offset: Int = 0
        $order_by: [canned_responses_category_order_by!] = {}
        $where: canned_responses_category_bool_exp = {}
      ) {
        total: canned_responses_category_aggregate(where: $where) {
          aggregate {
            count
          }
        }
        payload: canned_responses_category(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
          id
          name
          language
          is_enabled
          created_at
          updated_at
          created_by {
            name
            id
          }
        }
      }
    `),
    variables
  );

  return result;
};

export const useCannedCategoryList = (limit: number = Infinity, offset: number = 0, options?: UseQueryOptions<GET_All_CANNED_RESPONSE_CATEGORIESQuery, RequestError>) => {
  return useQuery([queryKeys.canned_category_list, offset, limit], () => GET_ALL_CANNED_CATEGORIES(+limit, +offset), options);
};

export const CREATE_CANNED_CATEGORY = async (name: string, lang: string) => {
  const variables = { name, lang };
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_CANNED_CATEGORY($name: String!, $lang: String!) {
        payload: insert_canned_responses_category_one(object: { name: $name, language: $lang }) {
          id
          language
          name
          is_enabled
          created_at
          updated_at
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useCreateCannedCategory = (options?: UseMutationOptions<CREATE_CANNED_CATEGORYMutation["payload"], RequestError, AddCannedCategory>) => {
  return useMutation(({ name, lang }) => CREATE_CANNED_CATEGORY(name, lang), options);
};

export const UPDATE_CANNED_CATEGORY_by_ID = async (data: UpdateCannedCategoryType) => {
  const variables = { id: data.id, updated_values: data.updated_values };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_CANNED_CATEGORY_by_ID($id: bigint!, $updated_values: canned_responses_category_set_input = {}) {
        payload: update_canned_responses_category_by_pk(pk_columns: { id: $id }, _set: $updated_values) {
          id
          name
          is_enabled
          updated_at
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useUpdateCannedCategoryById = (options?: UseMutationOptions<UPDATE_CANNED_CATEGORY_by_IDMutation["payload"], RequestError, UpdateCannedCategoryType>) => {
  return useMutation((data) => UPDATE_CANNED_CATEGORY_by_ID(data), options);
};

export const DELETE_CANNED_CATEGORY_BY_ID = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_CANNED_CATEGORY_BY_ID($id: bigint!) {
        payload: delete_canned_responses_category_by_pk(id: $id) {
          id
        }
      }
    `),
    { id }
  );

  return result.payload;
};

export const useDeleteCannedCategoryById = (options?: UseMutationOptions<DELETE_CANNED_CATEGORY_BY_IDMutation["payload"], RequestError, number>) => {
  return useMutation((id) => DELETE_CANNED_CATEGORY_BY_ID(id), options);
};

/* ============CANNED CATEGORY END============= */

//! done
//! not used in the project
export const DELETE_CONTACTS = async (contact_id: string | number) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_CONTACTS($contact_id: Int!) {
        payload: delete_contacts_by_pk(id: $contact_id) {
          id
          name
          email
          phone_number
          profile_image: source(path: "profile_image")
          source
          created_at
          updated_at
        }
      }
    `),
    { contact_id: +contact_id }
  );

  return result;
};

//! done
export const UPDATED_CONTACT_BY_ID = async (updateValues: UpdateContact) => {
  const { contact_id, ...rest } = updateValues;
  const variables = { id: contact_id, set: rest };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_CONTACT($id: Int!, $set: contacts_set_input = {}) {
        payload: update_contacts_by_pk(pk_columns: { id: $id }, _set: $set) {
          id
          name
          email
          phone_number
          profile_image: source(path: "profile_image")
          source
          created_at
          updated_at
          city
          gender
          preferred_language
          social_profiles
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useUpdateContactById = (options?: UseMutationOptions<UPDATE_CONTACTMutation["payload"], RequestError, any>) => {
  return useMutation((data) => UPDATED_CONTACT_BY_ID(data), options);
};

//! done
//! old conversation status update api
// export const UPDATE_CONVERSATION_STATUS = async (updateValues: UpdateConversationStatus) => {
//   const { conversation_id, status: inserted_status, snoozed_until: inserted_snoozed_until } = updateValues;
//   // status: 0 = open, 1 = closed, 2 = snoozed
//   let status = 0,
//     snoozed_until = null;

//   if (inserted_status === "closed") status = 1;
//   if (inserted_status === "snoozed") {
//     const today = new Date();
//     const nextHour = new Date(Date.now() + 1000 * 60 * 60).toISOString();
//     const nextDay = new Date(today.setDate(today.getDate() + 1)).toISOString();
//     const nextWeek = new Date(today.setDate(today.getDate() + 7)).toISOString();

//     status = 2;
//     if (inserted_snoozed_until === "day") snoozed_until = nextDay;
//     else if (inserted_snoozed_until === "week") snoozed_until = nextWeek;
//     else snoozed_until = nextHour;
//   }

//   const variables = { conversation_id, status, snoozed_until };
//   const result = await makeGqlRequest(
//     graphql(`
//       mutation UPDATE_CONVERSATION_STATUS($conversation_id: Int!, $status: Int!, $snoozed_until: timestamptz = "") {
//         payload: update_conversations_by_pk(pk_columns: { id: $conversation_id }, _set: { status: $status, snoozed_until: $snoozed_until }) {
//           id
//           status
//         }
//       }
//     `),
//     variables
//   );

//   return result.payload;
// };

// export const useConversationStatusUpdate = (options?: UseMutationOptions<UPDATE_CONVERSATION_STATUSMutation["payload"], RequestError, UpdateConversationStatus>) => {
//   return useMutation((data) => UPDATE_CONVERSATION_STATUS(data), options);
// };
//! old conversation status update api end

//! new conversation status update api
export const UPDATE_CONVERSATION_STATUS = async (updateValues: UpdateConversationStatus) => {
  // status: 0 = open, 1 = closed, 2 = snoozed

  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_CONVERSATION_STATUS($conversation_id: bigint!, $updated_status: conversations_set_input = {}) {
        payload: update_conversations_by_pk(pk_columns: { id: $conversation_id }, _set: $updated_status) {
          id
          status
          closing_contact_reason_value
        }
      }
    `),
    updateValues
  );

  return result.payload;
};

export const useConversationStatusUpdate = (options?: UseMutationOptions<UPDATE_CONVERSATION_STATUSMutation["payload"], RequestError, UpdateConversationStatus>) => {
  return useMutation((data) => UPDATE_CONVERSATION_STATUS(data), options);
};

export const DELETE_CONVERSATION_TAG_BY_ID = async (tag_id: number, conversation_id: number) => {
  const variables = { tag_id, conversation_id };
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_CONVERSATION_TAG_BY_ID($tag_id: bigint!, $conversation_id: bigint!) {
        payload: delete_conversation_tags(where: { tag_id: { _eq: $tag_id }, conversation_id: { _eq: $conversation_id } }) {
          affected_rows
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useDeleteConversationTagById = (options?: UseMutationOptions<DELETE_CONVERSATION_TAG_BY_IDMutation["payload"], RequestError, AddConversationTags>) => {
  return useMutation(({ tag_id, conversation_id }) => DELETE_CONVERSATION_TAG_BY_ID(tag_id, conversation_id), options);
};

export const SEND_NOTE_WITH_CONVERSATION_CLOSE = async (conversation_id: number, message: string, message_type: number) => {
  // const variables = { tag_id, conversation_id };
  const result = await makeGqlRequest(
    graphql(`
      mutation SEND_NOTE_WITH_CONVERSATION_CLOSE($message: String = "", $message_type: Int = 10, $conversation_id: bigint = "") {
        payload: insert_messages_one(object: { message: $message, message_type: $message_type, conversation_id: $conversation_id }) {
          message
          conversation {
            id
          }
          message_type
        }
      }
    `),
    { conversation_id, message, message_type }
  );

  return result.payload;
};

export const useSendNoteWithConversationClose = (
  options?: UseMutationOptions<SEND_NOTE_WITH_CONVERSATION_CLOSEMutation["payload"], RequestError, { conversation_id: number; message: string; message_type: number }>
) => {
  return useMutation(({ conversation_id, message, message_type }) => SEND_NOTE_WITH_CONVERSATION_CLOSE(conversation_id, message, message_type), options);
};

//! done
export const ADD_TAG_TO_CONVERSATION = async (conversation_id: number, tag_id: number) => {
  const variables = { conversation_id, tag_id };
  const result = await makeGqlRequest(
    graphql(`
      mutation ADD_TAG_TO_CONVERSATION($tag_id: bigint!, $conversation_id: bigint!) {
        payload: insert_conversation_tags_one(
          object: { tag_id: $tag_id, conversation_id: $conversation_id }
          on_conflict: { constraint: conversation_tags_conversation_id_tag_id_key, update_columns: [] }
        ) {
          tag {
            name
          }
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useAddTagToConversation = (options?: UseMutationOptions<ADD_TAG_TO_CONVERSATIONMutation["payload"], RequestError, AddConversationTags>) => {
  return useMutation(({ conversation_id, tag_id }) => ADD_TAG_TO_CONVERSATION(conversation_id, tag_id), options);
};

//! done
export const GET_FILTERED_CONTACTS = async (limit: number, offset: number, content: string, ids: number[], filter_Obj: ContactFilterObjType) => {
  // This API currently searches through: name, email, phone_number, social type
  const search_content = `%${content}%`;
  // let where: { _or: any[]; _and?: any[]; contact_inboxes: {}; contact_tags: {} } = {
  let where: { _or: any[]; _and?: any[]; contact_tags: {} } = {
      _or: [{ name: { _ilike: search_content } }, { email: { _ilike: search_content } }, { phone_number: { _ilike: search_content } }],
      // contact_inboxes: { id: { _is_null: false } },
      ...(ids?.length > 0 && { contact_tags: { tag_id: { _in: ids } } }),
    },
    and = [];

  // if (ids?.length > 0) {
  //   offset = 0;
  // }

  if (filter_Obj.filter.length > 0) {
    and = filter_Obj.filter.map((item) =>
      item.filterOptions.value === "source_type"
        ? {
            source: {
              _contains: {
                type: `${item.userValue}`,
              },
            },
          }
        : {
            [item.filterOptions.value]: {
              [item.operatorOptions.value]: `${
                item.operatorOptions.value === "_ilike" || item.operatorOptions.value === "_nilike"
                  ? `%${item.userValue}%`
                  : item.operatorOptions.value === "_similar" || item.operatorOptions.value === "_nsimilar"
                  ? `${item.userValue}%`
                  : `${item.userValue}`
              }`,
            },
          }
    );
  }

  if (and.length > 0) {
    where = { ...where, _and: and };
  }

  const variables = { limit, offset, where };

  const result = await makeGqlRequest(
    graphql(`
      query FILTER_CONTACT_LIST($limit: Int = 20, $offset: Int = 0, $where: contacts_bool_exp = {}) {
        counts: contacts_aggregate(where: $where) {
          aggregate {
            count
          }
        }
        payload: contacts(order_by: { id: desc }, limit: $limit, offset: $offset, where: $where) {
          id
          name
          email
          phone_number
          profile_image: source(path: "profile_image")
          source
          created_at
          updated_at
          account_id
          last_activity_at
          social_profiles
          total_conversations: conversations_aggregate(where: { inbox_id: { _is_null: false } }) {
            aggregate {
              count
            }
          }
          total_tickets: tickets_aggregate {
            aggregate {
              count
            }
          }
          total_csats: csat_feedbacks_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `),
    variables
  );
  return result;
};

export const useContactListFiltered = (
  limit: number,
  offset: number,
  content: string,
  ids?: number[],
  filter_Obj?: { filter: any[] },
  options?: UseQueryOptions<FILTER_CONTACT_LISTQuery, RequestError>
) => {
  return useQuery([queryKeys.filtered_contacts, { content, filter_Obj }, offset, ids, limit], () => GET_FILTERED_CONTACTS(+limit, +offset, content, ids, filter_Obj), options);
};

//! done
export const GET_CONTACT_COUNT = async () => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_CONTACT_COUNT($offset: Int = 0, $where: contacts_bool_exp = {}) {
        payload: contacts_aggregate(order_by: { id: desc }, offset: $offset, where: $where) {
          aggregate {
            count
          }
        }
      }
    `)
  );
  return result.payload;
};

export const useContactsCount = (options?: UseQueryOptions<GET_CONTACT_COUNTQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.total_contacts], () => GET_CONTACT_COUNT(), options);
};

// Reports
//! done
export const GET_REPORT_CONVERSATION_COUNTS = async (date: DateRange = {}) => {
  const today = new Date();
  const prevDay = new Date(today.setDate(today.getDate() - 1)).toISOString();

  let date_range = { _gte: `${prevDay}`, _lte: "now()" };
  if ("start_date" in date && "end_date" in date) {
    date_range = { _gte: `${date.start_date}`, _lte: `${date.end_date}` };
  }

  const variables = { date_range };
  const result = await makeGqlRequest(
    graphql(`
      query REPORT_CONVERSATION_COUNTS($date_range: timestamptz_comparison_exp = {}) {
        total: conversations_aggregate(where: { updated_at: $date_range }) {
          aggregate {
            count
          }
        }
        open: conversations_aggregate(where: { status: { _eq: 0 }, updated_at: $date_range }) {
          aggregate {
            count
          }
        }
        assigned: conversations_aggregate(where: { agent_id: { _is_null: false }, updated_at: $date_range }) {
          aggregate {
            count
          }
        }
        unassigned: conversations_aggregate(where: { agent_id: { _is_null: true }, updated_at: $date_range }) {
          aggregate {
            count
          }
        }
        closed: conversations_aggregate(where: { status: { _eq: 1 }, updated_at: $date_range }) {
          aggregate {
            count
          }
        }
      }
    `),
    variables
  );
  return result;
};

export const useReportConversationCounts = (options?: UseQueryOptions<REPORT_CONVERSATION_COUNTSQuery, RequestError>) => {
  return useQuery([queryKeys.report_conversation_counts], () => GET_REPORT_CONVERSATION_COUNTS(), options);
};

//! done
export const GET_AUTOMATION_RULES = async () => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_AUTOMATION_RULES {
        payload: automation_rules(order_by: { id: asc }) {
          id
          name
          description
          event_name
          conditions
          actions
          active
          created_at
        }
      }
    `)
  );
  return result.payload;
};

export const useAutomationRuleList = (options?: UseQueryOptions<GET_AUTOMATION_RULESQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.automation_rule_list], () => GET_AUTOMATION_RULES(), options);
};

//! done
export const CREATE_AUTOMATION_RULES = async (data: AutomationRules) => {
  const variables = { object: data };
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_AUTOMATION_RULES($object: automation_rules_insert_input = {}) {
        payload: insert_automation_rules_one(object: $object) {
          id
          name
          description
          event_name
          conditions
          actions
          active
          created_at
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useCreateAutomationRules = (options?: UseMutationOptions<CREATE_AUTOMATION_RULESMutation["payload"], RequestError, AutomationRules>) => {
  return useMutation((data) => CREATE_AUTOMATION_RULES(data), options);
};

//! done
export const UPDATED_AUTOMATION_RULES = async (params: UpdateAutomationRules) => {
  const { id, ...rest } = params;
  const variables = { id: id, _set: rest };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATED_AUTOMATION_RULES($id: bigint!, $_set: automation_rules_set_input = {}) {
        payload: update_automation_rules_by_pk(pk_columns: { id: $id }, _set: $_set) {
          id
          name
          description
          event_name
          conditions
          actions
          active
          created_at
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useUpdateAutomationRuleById = (options?: UseMutationOptions<UPDATED_AUTOMATION_RULESMutation["payload"], RequestError, UpdateAutomationRules>) => {
  return useMutation((data) => UPDATED_AUTOMATION_RULES(data), options);
};

//! done
export const DELETE_AUTOMATION_RULES = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_AUTOMATION_RULES($id: bigint!) {
        payload: delete_automation_rules_by_pk(id: $id) {
          id
          name
          description
          event_name
          conditions
          actions
          active
          created_at
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useDeleteAutomationRule = (options?: UseMutationOptions<DELETE_AUTOMATION_RULESMutation["payload"], RequestError, number>) => {
  return useMutation((data) => DELETE_AUTOMATION_RULES(data), options);
};

// User status
export const UPDATE_USER_STATUS = async (user_id: number, availability: number) => {
  const variables = { user_id, availability };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_USER_STATUS($user_id: bigint!, $availability: Int!) {
        payload: update_account_users(where: { user_id: { _eq: $user_id } }, _set: { availability: $availability }) {
          affected_rows
          returning {
            user_id
            availability
          }
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useSetUserStatus = (options?: UseMutationOptions<UPDATE_USER_STATUSMutation["payload"], RequestError, Status>) => {
  return useMutation((data) => UPDATE_USER_STATUS(data.user_id, data.availability), options);
};

//get user status
//! change not done
export const GET_USER_STATUS = async (user_id: number) => {
  const variables = { user_id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_USER_STATUS($user_id: bigint!) {
        payload: account_agents(where: { id: { _eq: $user_id } }) {
          id
          availability
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useStatusUser = <T = Status[]>(user_id: number, options?: UseQueryOptions<GET_USER_STATUSQuery["payload"], RequestError, T>) => {
  return useQuery([queryKeys.user_status, user_id], () => GET_USER_STATUS(user_id), {
    ...options,
  });
};

//get contact by ID
//! done
export const GET_CONTACT_BY_ID = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_CONTACT_BY_ID($id: Int!) {
        payload: contacts_by_pk(id: $id) {
          id
          name
          email
          gender
          city
          profile_twitter
          profile_instagram
          preferred_language
          phone_number
          profile_image: source(path: "profile_image")
          source
          created_at
          updated_at
          last_activity_at
          conversations {
            id
            account {
              name
            }
            status
            incoming: messages_aggregate(where: { message_type: { _eq: 0 } }) {
              aggregate {
                count
              }
            }
            outgoing: messages_aggregate(where: { message_type: { _eq: 1 } }) {
              aggregate {
                count
              }
            }
            conversation_tags {
              tag {
                name
              }
            }
            created_at
            agent {
              name
            }
            inbox {
              channel_type
            }
          }
          contact_tags {
            tag {
              id
              color
              name
            }
          }
          total_conversations: conversations_aggregate(where: { inbox_id: { _is_null: false } }) {
            aggregate {
              count
            }
          }
          total_tickets: tickets_aggregate {
            aggregate {
              count
            }
          }
          total_csats: csat_feedbacks_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useContactById = (id: number, options?: UseQueryOptions<GET_CONTACT_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.contact_details, id], () => GET_CONTACT_BY_ID(id), options);
};

export const GET_CONTACT_BY_PHONE_NUMBER = async (phone_number: string) => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_CONTACT_BY_PHONE_NUMBER($phone_number: String!) {
        payload: contacts(where: { phone_number: { _eq: $phone_number } }) {
          id
          name
          email
          phone_number
          profile_image: source(path: "profile_image")
          source
          created_at
          updated_at
          account_id
          last_activity_at
          social_profiles
          total_conversations: conversations_aggregate(where: { inbox_id: { _is_null: false } }) {
            aggregate {
              count
            }
          }
          total_tickets: tickets_aggregate {
            aggregate {
              count
            }
          }
          total_csats: csat_feedbacks_aggregate {
            aggregate {
              count
            }
          }
        }
      }
    `),
    { phone_number }
  );
  return result.payload;
};

export const useContactByPhoneNumber = (phone_number: string, options?: UseQueryOptions<GET_CONTACT_BY_PHONE_NUMBERQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.contact_details, phone_number], () => GET_CONTACT_BY_PHONE_NUMBER(phone_number), options);
};

// contacts for ticket
//! done
export const GET_CONTACTS_TICKET = async (contacts: string) => {
  const search_contacts = `%${contacts}%`;
  const result = await makeGqlRequest(
    graphql(`
      query TICKET_CONTACTS($search_contacts: String!) {
        payload: contacts(
          where: { _and: [{ _or: [{ name: { _ilike: $search_contacts } }, { email: { _ilike: $search_contacts } }, { phone_number: { _ilike: $search_contacts } }] }] }
        ) {
          id
          name
          email
          phone_number
          profile_image: source(path: "profile_image")
          source
          created_at
          updated_at
        }
      }
    `),
    { search_contacts }
  );
  return result.payload;
};

export const useTicketContacts = (name: string, options?: UseQueryOptions<TICKET_CONTACTSQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.ticket_contacts, name], () => GET_CONTACTS_TICKET(name), { enabled: name.length > 2, ...options });
};

// BUILD FORM
//! done
export const GET_TICKET_FORM_LIST = async () => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_TICKET_FORM_LIST {
        payload: ticket_forms {
          id
          type
          description
          enabled
          survey_form
          account_id
          created_at
          updated_at
        }
      }
    `)
  );
  return result.payload;
};

export const useTicketFormList = (options?: UseQueryOptions<GET_TICKET_FORM_LISTQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.ticket_form_list], () => GET_TICKET_FORM_LIST(), options);
};

//! done
export const GET_TICKET_FORM_BY_ID = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_TICKET_FORM_BY_ID($id: bigint!) {
        payload: ticket_forms_by_pk(id: $id) {
          id
          survey_form
          type
          description
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useTicketFormById = (id: number, options?: UseQueryOptions<GET_TICKET_FORM_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.ticket_form_by_id, id], () => GET_TICKET_FORM_BY_ID(id), options);
};

//! done
export const CREATE_TICKET_FORM = async (data: CreateCustomForm) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_TICKET_FORM($object: ticket_forms_insert_input = {}) {
        payload: insert_ticket_forms_one(object: $object) {
          description
          enabled
          id
          survey_form
          type
        }
      }
    `),
    { object: data }
  );
  return result.payload;
};

export const useCreateTicketForm = (options?: UseMutationOptions<CREATE_TICKET_FORMMutation["payload"], RequestError, CreateCustomForm>) => {
  return useMutation((data) => CREATE_TICKET_FORM(data), options);
};

//! done
//! now using in settings > workflows
export const UPDATE_TICKET_FORM_BY_ID = async (data: UpdateCustomForm) => {
  const variables = {
    id: data.id,
    survey_form: data.survey_form,
  };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_TICKET_FORM_BY_ID($id: bigint!, $survey_form: json = {}) {
        payload: update_ticket_forms_by_pk(pk_columns: { id: $id }, _set: { survey_form: $survey_form }) {
          id
          updated_at
          survey_form
          type
        }
      }
    `),
    variables
  );
  return result.payload;
};
export const useUpdateTicketForm = (options?: UseMutationOptions<UPDATE_TICKET_FORM_BY_IDMutation["payload"], RequestError, UpdateCustomForm>) => {
  return useMutation((data) => UPDATE_TICKET_FORM_BY_ID(data), options);
};

//! done
export const DELETE_TICKET_FORM = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_TICKET_FORM($id: bigint!) {
        payload: delete_ticket_forms_by_pk(id: $id) {
          id
          type
          description
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useDeleteTicketForm = (options?: UseMutationOptions<DELETE_TICKET_FORMMutation["payload"], RequestError, number>) => {
  return useMutation((id) => DELETE_TICKET_FORM(id), options);
};

//! done
export const GET_TICKET_BY_ID = async (id: number) => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_TICKET_BY_ID($id: bigint!) {
        payload: ticket_by_pk(id: $id) {
          id
          form_value
          created_at
          contact_id
          assigned_agent
          account_id
          type
          priority
          resolution_time
          conversation_id
          status
          subject
          assigned_team
          ticket_form_id
          updated_at
          description
          created_by
          source
          team {
            id
            name
          }
          agent {
            id
            name
          }
          contact {
            id
            name
            email
            phone_number
            preferred_language
            profile_image: source(path: "profile_image")
            source
            created_at
            updated_at
            social_profiles
            conversations {
              id
              messages {
                id
                message
              }
            }
          }
          created_user {
            name
          }
          ticket_shares {
            team {
              id
              name
            }
          }
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useTicketById = (id: number, options?: UseQueryOptions<GET_TICKET_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.tickets_by_id, id], () => GET_TICKET_BY_ID(id), options);
};

export const LINK_CONVERSATION_ID_TO_TICKET = async (ticketId: number, conversationId: number) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation LINK_CONVERSATION_ID_TO_TICKET($conversationId: bigint!, $ticketId: bigint!) {
        payload: update_ticket_by_pk(pk_columns: { id: $ticketId }, _set: { conversation_id: $conversationId }) {
          conversation_id
        }
      }
    `),
    { conversationId, ticketId }
  );
  return result.payload;
};

export const useLinkConversationToTicket = (
  options?: UseMutationOptions<LINK_CONVERSATION_ID_TO_TICKETMutation["payload"], RequestError, LINK_CONVERSATION_ID_TO_TICKETMutationVariables>
) => {
  return useMutation(({ ticketId, conversationId }) => LINK_CONVERSATION_ID_TO_TICKET(ticketId, conversationId), options);
};

//! done
export const CREATE_TICKET = async (object: CREATE_TICKETMutationVariables["object"]) => {
  // export const CREATE_TICKET = async (object: CREATE_TICKETMutationVariables["object"]) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_TICKET($object: ticket_insert_input = {}) {
        payload: insert_ticket_one(object: $object) {
          id
          form_value
          created_at
          contact_id
          assigned_agent
          account_id
          type
          priority
          resolution_time
          status
          subject
          assigned_team
          ticket_form_id
          updated_at
          description
          created_by
          source
          team {
            id
            name
          }
          agent {
            id
            name
          }
          ticket_shares {
            id
            team_id
            ticket_id
          }
        }
      }
    `),
    { object }
  );
  return result.payload;
};

export const useCreateTicket = (options?: UseMutationOptions<CREATE_TICKETMutation["payload"], RequestError, CREATE_TICKETMutationVariables["object"]>) => {
  return useMutation((data) => CREATE_TICKET(data), options);
};
//ticketId
//! done
export const UPDATE_TICKET = async (data: UPDATE_TICKETMutationVariables) => {
  const { id, ticket_id, teams_id, ticket_share, _set } = data;
  const variables: UPDATE_TICKETMutationVariables = { id, ticket_id, teams_id, ticket_share, _set };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_TICKET($ticket_id: Int!, $teams_id: [Int!], $ticket_share: [ticket_share_insert_input!] = {}, $id: bigint!, $_set: ticket_set_input = {}) {
        delete_ticket_share(where: { ticket_id: { _eq: $ticket_id }, team_id: { _nin: $teams_id } }) {
          returning {
            id
            team_id
            ticket_id
          }
        }
        insert_ticket_share(on_conflict: { constraint: ticket_share_ticket_id_team_id_key, update_columns: [] }, objects: $ticket_share) {
          returning {
            id
            team_id
            ticket_id
          }
        }
        updated_ticket: update_ticket_by_pk(pk_columns: { id: $id }, _set: $_set) {
          id
          form_value
          created_at
          contact_id
          assigned_agent
          account_id
          type
          priority
          resolution_time
          status
          subject
          assigned_team
          ticket_form_id
          updated_at
          description
          created_by
          source
          team {
            id
            name
          }
          agent {
            id
            name
          }
        }
      }
    `),
    variables
  );
  return result.updated_ticket;
};

export const useUpdateTicket = (options?: UseMutationOptions<UPDATE_TICKETMutation["updated_ticket"], RequestError, UPDATE_TICKETMutationVariables>) => {
  return useMutation((data) => UPDATE_TICKET(data), options);
};

//! done
//! not used in the project
export const DELETE_TICKET = async (id: number) => {
  const variables = { id };
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_TICKET($id: bigint!) {
        payload: delete_ticket_by_pk(id: $id) {
          id
          form_value
          created_at
          contact_id
          assigned_agent
          account_id
          type
          priority
          resolution_time
          status
          subject
          assigned_team
          ticket_form_id
          updated_at
          description
          created_by
          source
          team {
            id
            name
          }
          agent {
            id
            name
          }
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useDeleteTicket = (options?: UseMutationOptions<DELETE_TICKETMutation["payload"], RequestError, number>) => {
  return useMutation((id) => DELETE_TICKET(id), options);
};

//! done
export const GET_TICKET_BY_CONTACT_ID = async (id: number) => {
  const variables = { id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_TICKET_BY_CONTACT_ID($id: bigint!) {
        payload: ticket(where: { contact_id: { _eq: $id } }) {
          id
          description
          subject
          source
          status
          priority
          created_at
          updated_at
          type
          form_value
          assigned_agent
          agent {
            name
          }
          team {
            name
            id
          }
        }
      }
    `),
    { id }
  );

  return result.payload;
};

export const useTicketsByContactId = (id: number, options?: UseQueryOptions<GET_TICKET_BY_CONTACT_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.tickets_by_contact_id, id], () => GET_TICKET_BY_CONTACT_ID(id), options);
};

//! done
export const GET_TICKET_MESSAGES_BY_TICKET_ID = async (ticketId: number, cursor?: number) => {
  const cursorNum = cursor === 0 ? { _gt: 0 } : { _lt: cursor };
  const variables = { ticket_id: ticketId, cursor: cursorNum };
  const result = await makeGqlRequest(
    graphql(`
      query GET_TICKET_MESSAGES_BY_TICKET_ID($ticket_id: Int!, $cursor: Int_comparison_exp = {}) {
        payload: ticket_messages(where: { ticket_id: { _eq: $ticket_id }, id: $cursor }, limit: 20, order_by: { id: desc }) {
          id
          message: content
          content_attributes
          message_type
          internal
          sender_info
          status
          source_id
          created_at
          ticket_id
          attachments {
            id
            key
            file_name
            file_type
            extension
            url
          }
        }
      }
    `),
    variables
  );
  return result.payload.reverse();
};

//! done
export const GET_TICKET_MESSAGES_SUBSCRIPTION = (ticketId: number) => {
  const variables = { ticketId };
  const query = graphql(`
    subscription GET_TICKET_MESSAGES_SUBSCRIPTION($ticketId: Int!) {
      payload: ticket_messages(where: { ticket_id: { _eq: $ticketId } }, limit: 1, order_by: { id: desc }) {
        id
      }
    }
  `);

  return { query, variables };
};

export const useTicketMessageSubscription = (ticketId: number): GET_TICKET_MESSAGES_SUBSCRIPTIONSubscription["payload"] => {
  return useCustomSubscription({
    query: GET_TICKET_MESSAGES_SUBSCRIPTION(ticketId).query,
    // TODO: fix rerendering issues
    variables: useMemo(() => GET_TICKET_MESSAGES_SUBSCRIPTION(ticketId).variables, [ticketId]),
    // TODO: fix rerendering issues
    queryToInvalidate: useMemo(() => [[queryKeys.ticket_messages, ticketId]], [ticketId]),
  });
};

export const useTicketMessagesByTicketId = (
  ticketId: number,
  options?: Omit<
    UseInfiniteQueryOptions<GET_TICKET_MESSAGES_BY_TICKET_IDQuery["payload"], RequestError>,
    "getPreviousPageParam" | "refetchOnWindowFocus" | "keepPreviousData" | "staleTime" | "enabled"
  >
) => {
  // return useQuery(["ticket_messages", ticket_id], () => HasuraApi(gqlData.GET_TICKET_MESSAGES_BY_TICKET_ID(ticket_id)), options);

  // const queryClient = useQueryClient();
  // const queryKey = ["ticket_messages", ticketId];

  // subscription query that updates main query data
  // useSubscription("ticket_messages_subscription", () => fromWsClientSubscription(gqlData.GET_TICKET_MESSAGES_SUBSCRIPTION(ticketId)), {
  //   onData() {
  //     queryClient.invalidateQueries(queryKey);
  //     // queryClient.invalidateQueries("conversation_list");
  //   },
  // });

  ticketId && useTicketMessageSubscription(ticketId);

  // main query that fetches data
  return useInfiniteQuery([queryKeys.ticket_messages, ticketId], ({ pageParam = 0 }) => GET_TICKET_MESSAGES_BY_TICKET_ID(ticketId, pageParam as number), {
    getPreviousPageParam: (lastPage) => {
      const cursorId = lastPage[0]?.id;
      const previousPageParam = lastPage.length === 20 ? cursorId : undefined;
      return previousPageParam;
    },
    keepPreviousData: true,
    staleTime: Infinity,
    enabled: !!ticketId,
    ...options,
  });
};

const ticketFilterVariable = (searchedContent: string, filter_Obj: TicketFilterObj, order: order_by) => {
  let and = [];
  let where: { _or: any; _and?: any[] } = {
    _or: [
      { ...(searchedContent.length > 0 && { type: { _ilike: `%${searchedContent}%` } }) },
      { ...(searchedContent.length > 0 && { subject: { _ilike: `%${searchedContent}%` } }) },
    ],
  };
  if (filter_Obj.filter.length > 0) {
    and = filter_Obj.filter.map((item) => {
      const {
        filterOptions: { value: filterOption },
      } = item;
      if (filterOption === "agent") {
        return { agent: { id: { _eq: typeof item.userValue === "object" && +item.userValue.value } } };
      }
      if (filterOption === "team") {
        return { team: { id: { _eq: typeof item.userValue === "object" && +item.userValue.value } } };
      }
      if (filterOption === "priority") {
        return { priority: { _eq: typeof item.userValue === "object" && +item.userValue.value } };
      }
      if (filterOption === "status") {
        return {
          status: {
            ["_eq"]: typeof item.userValue === "object" && +item.userValue.value,
          },
        };
      }
      if (filterOption === "subject") {
        return {
          subject: {
            [item.operatorOptions.value]: item.operatorOptions.value === "_ilike" ? `%${item.userValue}%` : item.userValue,
          },
        };
      }
      if (filterOption === "type") {
        return {
          type: {
            ["_eq"]: typeof item.userValue === "object" && item.userValue.value,
          },
        };
      }
      if (filterOption === "tab_type") {
        // _has_keys_any
        let filterKey = "";
        let filteredValue = null;
        if (item.operatorOptions.value === "_eq" && typeof item.userValue === "object") {
          filterKey = "_has_keys_any";
          filteredValue = [item.userValue.value];
          if (item.userValue.value === "history") {
            filteredValue = ["history", "shared"];
          }
        }
        return {
          tab_type: {
            // ["_contains"]: typeof item.userValue === "object" && item.userValue.value,
            [filterKey]: filteredValue,
          },
        };
      }
    });
  }
  if (and.length > 0) {
    where = { ...where, _and: [...and] };
  }

  return where;
};

export const GET_SEARCHED_TICKETS = async (searchedContent: string) => {
  const search_content = `%${searchedContent}%`;

  const id = isNaN(+searchedContent) || !Number.isInteger(+searchedContent) ? null : +searchedContent;

  const or: object[] = [{ type: { _ilike: search_content } }, { description: { _ilike: search_content } }, { subject: { _ilike: search_content } }];
  id != null && or.push({ id: { _eq: id } }); // this is for pushing id filter when search term is integer

  const where = { _or: or };

  const result = await makeGqlRequest(
    graphql(`
      query GET_SEARCHED_TICKETS($where: ticket_bool_exp) {
        payload: ticket(where: $where) {
          id
          form_value
          created_at
          contact_id
          assigned_agent
          account_id
          type
          priority
          resolution_time
          status
          subject
          assigned_team
          ticket_form_id
          updated_at
          description
          created_by
          source
          team {
            id
            name
          }
          agent {
            id
            name
          }
        }
      }
    `),
    { where }
  );
  return result.payload;
};

export const useSearchedTickets = (searchedContent?: string, options?: UseQueryOptions<GET_SEARCHED_TICKETSQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.searched_tickets, searchedContent], () => GET_SEARCHED_TICKETS(searchedContent), options);
};
// get all ticket by search n also filter
//! done
export const GET_FILTERED_TICKETS = async (offset: number, content: string, filter_Obj: TicketFilterObj, order: order_by) => {
  const where = ticketFilterVariable(content, filter_Obj, order);
  const variables = { offset, where, id: order };
  const result = await makeGqlRequest(
    graphql(`
      query GET_FILTERED_TICKETS($offset: Int = 0, $where: ticket_bool_exp = {}, $id: order_by) {
        payload: ticket(order_by: { id: $id }, limit: 10, offset: $offset, where: $where) {
          id
          form_value
          created_at
          contact_id
          assigned_agent
          account_id
          type
          priority
          resolution_time
          status
          subject
          assigned_team
          ticket_form_id
          updated_at
          description
          created_by
          source
          team {
            id
            name
          }
          agent {
            id
            name
          }
        }
      }
    `),
    variables
  );
  return result.payload;
};

//! done
export const GET_TICKET_COUNT_SUBSCRIPTION = (content: string, filter_Obj: TicketFilterObj = { filter: [] }, order: order_by) => {
  const where = ticketFilterVariable(content, filter_Obj, order);
  const variables = { where };

  const query = graphql(`
    subscription GET_TICKET_COUNT_SUBSCRIPTION($where: ticket_bool_exp = {}) {
      payload: ticket_aggregate(where: $where) {
        aggregate {
          count
        }
      }
    }
  `);

  return { query, variables };
};

export const useTicketCountSubscription = (
  content: string,
  filter_Obj: TicketFilterObj = { filter: [] },
  order: order_by
): GET_TICKET_COUNT_SUBSCRIPTIONSubscription["payload"] => {
  return useCustomSubscription({
    query: GET_TICKET_COUNT_SUBSCRIPTION(content, filter_Obj, order).query,
    // TODO: fix rerendering issues
    variables: useMemo(() => GET_TICKET_COUNT_SUBSCRIPTION(content, filter_Obj, order).variables, [JSON.stringify(filter_Obj), content]),
    // TODO: fix rerendering issues
    queryToInvalidate: useMemo(
      () => [
        [queryKeys.filtered_tickets, filter_Obj],
        [queryKeys.ticket_counts, filter_Obj],
      ],
      [JSON.stringify(filter_Obj), content]
    ),
  });
};

//! done
export const GET_TICKETS_SUBSCRIPTION = (content: string, filter_Obj: TicketFilterObj = { filter: [] }, order: order_by) => {
  const where = ticketFilterVariable(content, filter_Obj, order);
  const variables = { where };
  const query = graphql(`
    subscription GET_TICKETS_SUBSCRIPTION($where: ticket_bool_exp = {}, $offset: Int = 0, $created_at: order_by = desc, $offset1: Int = 10, $created_at1: order_by = asc) {
      ticket(where: $where, offset: $offset1, limit: 1, order_by: { messages_aggregate: { max: { created_at: $created_at1 } } }) {
        id
      }
    }
  `);

  return { query, variables };
};

export const useTicketsSubscription = (content: string, filter_Obj: TicketFilterObj = { filter: [] }, order: order_by): GET_CONVERSATIONS_SUBSCRIPTIONSubscription["payload"] => {
  return useCustomSubscription({
    query: GET_TICKETS_SUBSCRIPTION(content, filter_Obj, order).query,
    // TODO: fix rerendering issues
    variables: useMemo(() => GET_TICKETS_SUBSCRIPTION(content, filter_Obj, order).variables, [JSON.stringify(filter_Obj), content]),
    // TODO: fix rerendering issues
    queryToInvalidate: useMemo(
      () => [
        [queryKeys.filtered_tickets, filter_Obj],
        [queryKeys.ticket_counts, filter_Obj],
      ],
      [JSON.stringify(filter_Obj), content]
    ),
  });
};

export const useTicketsFiltered = (
  content: string,
  filter_Obj: TicketFilterObj = { filter: [] },
  order: order_by,
  options?: Omit<UseInfiniteQueryOptions<GET_FILTERED_TICKETSQuery["payload"], RequestError>, "keepPreviousData" | "staleTime" | "getNextPageParam">
) => {
  // const { data: totalConversations } = useSubscription<Count>(["conversation_count", filters], () =>
  //   fromWsClientSubscription<Count>(gqlData.GET_SUBSCRIPTION_CONVERSATION_COUNT(filters))
  // );

  const totalTickets = useTicketCountSubscription(content, filter_Obj, order);

  useTicketsSubscription(content, filter_Obj, order);

  // main query that fetches data
  return useInfiniteQuery([queryKeys.filtered_tickets, content, filter_Obj], ({ pageParam = 0 }) => GET_FILTERED_TICKETS(pageParam as number, content, filter_Obj, order), {
    getNextPageParam: (lastPage, allPages) => {
      const offset = 10;
      const totalPaginationSets = Math.ceil(totalTickets?.aggregate?.count / offset);
      let length = 0;
      allPages.forEach((page: []) => (length += page.length));
      const nextPageParam = totalPaginationSets !== allPages.length && totalPaginationSets !== 0 ? length : undefined;

      return nextPageParam;
    },
    enabled: true,
    ...options,
  });
};

// export const useTicketsFiltered = (
//   content: string,
//   order: order_by,
//   filter_Obj?: { filter: any[] },
//   options?: UseQueryOptions<GET_SEARCH_TICKETSQuery["payload"], RequestError>
// ) => {
//   return useQuery([queryKeys.filtered_tickets, { content, filter_Obj, order }], () => GET_FILTERED_TICKETS(content, filter_Obj, order), options);
// };

//! done
// ! tickets count for mine, unassigned, all
export const GET_TICKETS_COUNTS = async (content: string = "", filter_Obj: TicketFilterObj = { filter: [] }, order: order_by = order_by.asc) => {
  // const vars = ticketFilterVariable(content, filter_Obj, order)._and;
  // const exclude = ["tab_type"];
  // const filtered_variables = vars.map((item) => removeKeysFromObj(item, exclude));

  // const variables = { _and: filtered_variables };
  const variables = { _and: [] };
  const result = await makeGqlRequest(
    graphql(`
      query GET_TICKETS_COUNTS($_and: [ticket_bool_exp!] = {}) {
        mine: ticket_aggregate(where: { tab_type: { _contains: "mine" }, _and: $_and }) {
          aggregate {
            count
          }
        }
        team: ticket_aggregate(where: { tab_type: { _contains: "team" }, _and: $_and }) {
          aggregate {
            count
          }
        }
        watching: ticket_aggregate(where: { tab_type: { _contains: "watching" }, _and: $_and }) {
          aggregate {
            count
          }
        }
        history: ticket_aggregate(where: { tab_type: { _has_keys_any: ["history", "shared"] }, _and: $_and }) {
          aggregate {
            count
          }
        }
        unassigned: ticket_aggregate(where: { tab_type: { _contains: "unassigned" }, _and: $_and }) {
          aggregate {
            count
          }
        }
      }
    `),
    variables
  );

  return result;
};

export const useTicketCounts = (content?: string, filter_Obj?: TicketFilterObj, order?: order_by, options?: UseQueryOptions<GET_TICKETS_COUNTSQuery, RequestError>) => {
  return useQuery([queryKeys.ticket_counts, filter_Obj], () => GET_TICKETS_COUNTS(content, filter_Obj, order), options);
};

//! done
// create contact from ticket
export const CREATE_CONTACT = async (contact_values: CreateContact) => {
  const variables = { contact_values };
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_CONTACT($contact_values: contacts_insert_input = {}) {
        payload: insert_contacts_one(object: $contact_values) {
          id
          name
          email
          phone_number
          gender
          city
          preferred_language
          profile_twitter
        }
      }
    `),
    { contact_values }
  );
  return result.payload;
};

export const useCreateContact = (options?: UseMutationOptions<CREATE_CONTACTMutation["payload"], RequestError, CreateContact>) => {
  return useMutation((data) => CREATE_CONTACT(data), options);
};

// update contact from ticket -- phone number
export const UPDATE_PHONE_NUMBER = async (id, phone_number) => {
  const variables = { id: id, set: phone_number };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_PHONE_NUMBER($id: Int!, $set: String!) {
        payload: update_contacts_by_pk(pk_columns: { id: $id }, _set: { phone_number: $set }) {
          id
          phone_number
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const usePhoneNumber = (options?: UseMutationOptions<UPDATE_PHONE_NUMBERMutation["payload"], RequestError, UpdateContactsNumber>) => {
  return useMutation((data) => UPDATE_PHONE_NUMBER(data.id, data.phone_number), options);
};

//! done
export const GET_TWITTER_CHANNEL_PROFILES = async () => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_TWITTER_CHANNEL_PROFILES {
        payload: channel_twitter_profiles {
          id
          screen_name
        }
      }
    `)
  );
  return result.payload;
};

export const useTwitterChannelProfiles = (options?: UseQueryOptions<GET_TWITTER_CHANNEL_PROFILESQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.twitter_channel_profiles], () => GET_TWITTER_CHANNEL_PROFILES(), options);
};

export const USER_PROFILE_INFO = async (userId: number) => {
  const result = await makeGqlRequest(
    graphql(`
      query USER_PROFILE_INFO($id: bigint!) {
        payload: users_by_pk(id: $id) {
          availability
          email
          display_name
          id
          hr_id
          name
          phone_number
          updated_at
        }
      }
    `),
    { id: userId }
  );
  return result.payload;
};

export const useUserProfileInfo = (userId: number, options?: UseQueryOptions<USER_PROFILE_INFOQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.user_profile_info], () => USER_PROFILE_INFO(userId), options);
};

//!done
//frontend kb articles by category
export const GET_ALL_PUBLISH_ARTICLES_BY_CATEGORIES = async () => {
  const result = await makeGqlRequest(
    graphql(`
      query GetAllPublishArticles($limit: Int = 20, $offset: Int = 0) {
        payload: knowledge_base_articles(limit: $limit, offset: $offset, where: { article_status: { _eq: "published" } }) {
          id
          name
          body
          language
          article_status
          category {
            name
            id
          }
        }
        total: knowledge_base_articles_aggregate {
          aggregate {
            count
          }
        }
      }
    `)
  );
  return result.payload;
};
export const usePublishedArticles = (options?: UseQueryOptions<GetAllPublishArticlesQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.publish_articles], () => GET_ALL_PUBLISH_ARTICLES_BY_CATEGORIES(), options);
};
//!done
//frontend kb articles by category
export const GET_PUBLISH_ARTICLES_BY_ID = async (id: number) => {
  const variables = { id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_PUBLISHED_ARTICLES_BY_ID($id: bigint = "") {
        payload: knowledge_base_articles_by_pk(id: $id) {
          id
          name
          updated_at
          body
          meta_tags
          meta_description
          language
          category {
            id
            name
          }
        }
      }
    `),
    { id }
  );
  return result.payload;
};
export const usePublishedArticlesById = (id: number, options?: UseQueryOptions<GET_PUBLISHED_ARTICLES_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.publish_articles, id], () => GET_PUBLISH_ARTICLES_BY_ID(id), options);
};

//!progress
// get all articles by categories
export const GET_PUBLISHED_ARTICLES_BY_CATEGORIES = async (categories: string) => {
  const variables = { categories };
  const result = await makeGqlRequest(
    graphql(`
      query GET_ALL_PUBLISHED_ARTICLES_BY_CATEGORIES($categories: String!) {
        payload: knowledge_base_articles(where: { article_status: { _eq: "published" }, _and: { category: { name: { _eq: $categories } } } }) {
          id
          name
          article_status
          body
          category {
            id
            name
          }
        }
      }
    `),
    { categories }
  );
  return result.payload;
};

export const usePublishedArticlesByCategories = (categories: string, options?: UseQueryOptions<GET_ALL_PUBLISHED_ARTICLES_BY_CATEGORIESQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.publish_articles, categories], () => GET_PUBLISHED_ARTICLES_BY_CATEGORIES(categories), options);
};

export const UPDATE_USER_PROFILE_BY_ID = async (updatedValues: UpdateUserProfile) => {
  const {
    id,
    updated_values: { name, phone_number, email, display_name },
  } = updatedValues;
  const variables = { id, updated_values: { name: name, phone_number: phone_number, email: email, display_name: display_name } };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_USER_PROFILE_BY_ID($id: bigint!, $updated_values: users_set_input = {}) {
        payload: update_users_by_pk(pk_columns: { id: $id }, _set: $updated_values) {
          name
          display_name
          email
          phone_number
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useUpdateUserProfileById = (options?: UseMutationOptions<UPDATE_USER_PROFILE_BY_IDMutation["payload"], RequestError, UpdateUserProfile>) => {
  return useMutation((data) => UPDATE_USER_PROFILE_BY_ID(data), options);
};

//!done
//Create categories
export const CREATE_KNOWLEDGE_BASE_CATEGORY = async (object) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_KNOWLEDGE_BASE_CATEGORY($object: knowledge_base_categories_insert_input = {}) {
        payload: insert_knowledge_base_categories_one(object: $object) {
          id
          name
          language
          description
          updated_at
          is_enabled
        }
      }
    `),
    { object }
  );
  return result.payload;
};
export const useCreateKbCategories = (options?: UseMutationOptions<CREATE_KNOWLEDGE_BASE_CATEGORYMutation["payload"], RequestError, CreateKnowledgeBaseCategory>) => {
  return useMutation((data) => CREATE_KNOWLEDGE_BASE_CATEGORY(data), options);
};

//!done
//get all categories
export const GET_ALL_KNOWLEDGE_BASE_CATEGORIES = async () => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_ALL_KNOWLEDGE_BASE_CATEGORIES {
        total: knowledge_base_categories_aggregate {
          aggregate {
            count
          }
        }
        payload: knowledge_base_categories(order_by: { id: asc }) {
          id
          name
          description
          language
          is_enabled
          created_by {
            name
          }
          updated_at
          created_at
        }
      }
    `)
  );
  return result.payload;
};

export const useKbCategories = (options?: UseQueryOptions<GET_ALL_KNOWLEDGE_BASE_CATEGORIESQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.categories], () => GET_ALL_KNOWLEDGE_BASE_CATEGORIES(), options);
};
//!done
//categories by id
export const KB_CATEGORIES_BY_ID = async (id: number) => {
  const variables = { id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_CATEGORIES_BY_ID($id: bigint = "") {
        payload: knowledge_base_categories_by_pk(id: $id) {
          id
          name
          language
          description
        }
      }
    `),
    { id }
  );
  return result.payload;
};
export const useKbCategoriesById = (id: number, options?: UseQueryOptions<GET_CATEGORIES_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.categories_by_id, id], () => KB_CATEGORIES_BY_ID(id), options);
};

//!done
//update categories
export const UPDATE_KNOWLEDGE_BASE_CATEGORIES_BY_ID = async (updateValues: UpdateKbCategories) => {
  const {
    id,
    updated_values: { name, description, language, is_enabled },
  } = updateValues;
  const variables = { id: id, updated_values: { name: name, description: description, language: language, is_enabled: is_enabled } };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_KNOWLEDGE_BASE_CATEGORIES_BY_ID($id: bigint!, $updated_values: knowledge_base_categories_set_input = {}) {
        payload: update_knowledge_base_categories_by_pk(pk_columns: { id: $id }, _set: $updated_values) {
          id
          name
        }
      }
    `),
    variables
  );
  return result.payload;
};
export const useUpdateKbCategories = (options?: UseMutationOptions<UPDATE_KNOWLEDGE_BASE_CATEGORIES_BY_IDMutation["payload"], RequestError, UpdateKbCategories>) => {
  return useMutation((data) => UPDATE_KNOWLEDGE_BASE_CATEGORIES_BY_ID(data), options);
};
//!done
//delete categories
export const DELETE_KNOWLEDGE_BASE_CATEGORY_BY_ID = async (id: number) => {
  const variables = { id };
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_KNOWLEDGE_BASE_CATEGORY_BY_ID($id: bigint!) {
        payload: delete_knowledge_base_categories_by_pk(id: $id) {
          id
        }
      }
    `),
    { id }
  );
  return result.payload;
};
export const useDeleteKbCategories = (options?: UseMutationOptions<DELETE_KNOWLEDGE_BASE_CATEGORY_BY_IDMutation["payload"], RequestError, number>) => {
  return useMutation((id) => DELETE_KNOWLEDGE_BASE_CATEGORY_BY_ID(id), options);
};

//!done
// get all articles
export const GET_ALL_KNOWLEDGE_BASE_ARTICLES = async (searchArticles: string) => {
  const search_content = `%${searchArticles}%`;
  const result = await makeGqlRequest(
    graphql(`
      query GET_ALL_KNOWLEDGE_BASE_ARTICLES($search_content: String = "", $offset: Int = 0) {
        total: knowledge_base_articles_aggregate(
          where: { _or: [{ name: { _ilike: $search_content } }, { body: { _ilike: $search_content } }] }
          offset: $offset
          order_by: { id: asc }
        ) {
          aggregate {
            count
          }
        }
        payload: knowledge_base_articles(where: { _or: [{ name: { _ilike: $search_content } }, { body: { _ilike: $search_content } }] }, offset: $offset, order_by: { id: asc }) {
          id
          name
          body
          article_status
          permissions
          read_count
          is_enabled
          language
          meta_tags
          meta_description
          conversation_trigger
          category_id
          created_by {
            name
          }
          created_at
          updated_at
          category {
            name
          }
        }
      }
    `),
    { search_content }
  );
  return result;
};

export const useKnowledgeBaseArticles = (searchArticles: string, options?: UseQueryOptions<GET_ALL_KNOWLEDGE_BASE_ARTICLESQuery, RequestError>) => {
  return useQuery([queryKeys.articles, searchArticles], () => GET_ALL_KNOWLEDGE_BASE_ARTICLES(searchArticles), options);
};

//!done
//create new articles
export const CREATE_KNOWLEDGE_BASE_ARTICLE = async (object: CreateKnowledgeBaseArticleType) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_KNOWLEDGE_BASE_ARTICLE($object: knowledge_base_articles_insert_input = {}) {
        payload: insert_knowledge_base_articles_one(object: $object) {
          id
          name
          body
          read_count
          permissions
          language
          is_enabled
          created_at
          updated_at
          article_status
          conversation_trigger
          meta_description
          meta_tags
          created_by {
            name
          }
        }
      }
    `),
    { object }
  );
  return result.payload;
};

export const useCreateKbArticle = (options?: UseMutationOptions<CREATE_KNOWLEDGE_BASE_ARTICLEMutation["payload"], RequestError, CreateKnowledgeBaseArticleType>) => {
  return useMutation((data) => CREATE_KNOWLEDGE_BASE_ARTICLE(data), options);
};
//!done
//articles by id
export const GET_SPECIFIC_ARTICLE_BY_ID = async (id: number) => {
  const variables = { id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_SPECIFIC_ARTICLE_BY_ID($id: bigint!) {
        payload: knowledge_base_articles_by_pk(id: $id) {
          id
          name
          body
          article_status
          permissions
          read_count
          is_enabled
          language
          meta_tags
          meta_description
          conversation_trigger
          category_id
          created_by {
            name
          }
          created_at
          updated_at
        }
      }
    `),
    { id }
  );
  return result.payload;
};
export const useKbArticleById = (id: number, options?: UseQueryOptions<GET_SPECIFIC_ARTICLE_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.articles_by_id, id], () => GET_SPECIFIC_ARTICLE_BY_ID(id), options);
};
//!done
//update articles
export const UPDATE_ARTICLE_BY_ID = async (updateValues: UpdateKnowledgeBaseArticles) => {
  const {
    id,
    updated_values: { name, body, permissions, language, article_status, category_id, conversation_trigger, meta_description, meta_tags, is_enabled },
  } = updateValues;
  const variables = { id: id, updated_values: { name, body, permissions, language, article_status, category_id, conversation_trigger, meta_description, meta_tags, is_enabled } };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_ARTICLE_BY_ID($id: bigint = "", $updated_values: knowledge_base_articles_set_input = {}, $read_count: Int = 1) {
        payload: update_knowledge_base_articles_by_pk(pk_columns: { id: $id }, _set: $updated_values, _inc: { read_count: $read_count }) {
          id
          name
          read_count
        }
      }
    `),
    variables
  );
  return result.payload;
};
export const useUpdateKbArticles = (options?: UseMutationOptions<UPDATE_ARTICLE_BY_IDMutation["payload"], RequestError, UpdateKnowledgeBaseArticles>) => {
  return useMutation((data) => UPDATE_ARTICLE_BY_ID(data), options);
};

//!done
// delete articles
export const DELETE_ARTICLE_BY_ID = async (id: number) => {
  const variables = { id };
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_ARTICLE_BY_ID($id: bigint = "") {
        payload: delete_knowledge_base_articles_by_pk(id: $id) {
          id
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useDeleteKbArticleById = (options?: UseMutationOptions<DELETE_ARTICLE_BY_IDMutation["payload"], RequestError, number>) => {
  return useMutation((id) => DELETE_ARTICLE_BY_ID(id), options);
};

// -------- settings-->agent productivity-->tags-->start-------

//!progress
export const CREATE_TAG = async (object: CreateTag) => {
  const result = await makeGqlRequest(
    graphql(`
      mutation CREATE_TAG($object: tags_insert_input = {}) {
        payload: insert_tags_one(object: $object) {
          id
          name
          description
          level
        }
      }
    `),
    { object }
  );
  return result.payload;
};
export const useCreateApTag = (options?: UseMutationOptions<CREATE_TAGMutation["payload"], RequestError, CreateTag>) => {
  return useMutation((data) => CREATE_TAG(data), options);
};

// !done
export const GET_ALL_TAGS = async (searchItems: string) => {
  const search_items = `%${searchItems}%`;
  const result = await makeGqlRequest(
    graphql(`
      query GET_ALL_TAGS($search_items: String!) {
        total: tags_aggregate {
          aggregate {
            count
          }
        }
        payload: tags(where: { _or: [{ name: { _ilike: $search_items } }, { description: { _ilike: $search_items } }] }, order_by: { id: asc }) {
          id
          name
          description
          is_enabled
          level
          created_at
          updated_at
          smart_tags
          account_id
          created_by {
            id
            name
          }
        }
      }
    `),
    { search_items }
  );
  return result;
};
export const useTagList = (searchedContent: string = "", options?: UseQueryOptions<GET_ALL_TAGSQuery, RequestError>) => {
  return useQuery([queryKeys.tag_list, searchedContent], () => GET_ALL_TAGS(searchedContent), options);
};

// !done
export const GET_A_TAG_BY_ID = async (id: number) => {
  const variables = { id };
  const result = await makeGqlRequest(
    graphql(`
      query GET_A_TAG_BY_ID($id: bigint = "") {
        payload: tags_by_pk(id: $id) {
          id
          name
          description
          level
          smart_tags
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useGetTagsById = (id?: number, options?: UseQueryOptions<GET_A_TAG_BY_IDQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.tag_by_id, id], () => GET_A_TAG_BY_ID(id), options);
};

//!progress
//update categories
export const UPDATED_TAGS = async (updated_values: UpdateAgentProductivityTags) => {
  const {
    id,
    updated_values: { name, description, level, is_enabled },
  } = updated_values;
  const variables = { id: id, updated_values: { name: name, description: description, level: level, is_enabled: is_enabled } };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATED_TAGS($updated_values: tags_set_input = {}, $id: bigint = "") {
        payload: update_tags_by_pk(pk_columns: { id: $id }, _set: $updated_values) {
          id
          name
          description
          is_enabled
        }
      }
    `),
    variables
  );
  return result.payload;
};
export const useUpdateApTag = (options?: UseMutationOptions<UPDATED_TAGSMutation["payload"], RequestError, UpdateAgentProductivityTags>) => {
  return useMutation((data) => UPDATED_TAGS(data), options);
};

//!done
// delete a tag
export const DELETE_TAG_BY_ID = async (id: number) => {
  const variables = { id };
  const result = await makeGqlRequest(
    graphql(`
      mutation DELETE_TAG_BY_ID($id: bigint!) {
        payload: delete_tags_by_pk(id: $id) {
          id
          name
          description
          level
          is_enabled
          created_at
          updated_at
        }
      }
    `),
    { id }
  );
  return result.payload;
};

export const useDeleteTagById = (options?: UseMutationOptions<DELETE_TAG_BY_IDMutation["payload"], RequestError, number>) => {
  return useMutation((id) => DELETE_TAG_BY_ID(id), options);
};

export const UPDATED_CONTACT_REASON_BY_ID = async (data: UpdateContactReason) => {
  const variables = {
    id: data.id,
    categories: data.categories,
  };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATED_CONTACT_REASON_BY_ID($id: bigint = "", $categories: jsonb = "") {
        payload: update_workflows_contact_reason_by_pk(pk_columns: { id: $id }, _set: { categories: $categories }) {
          id
          updated_at
          contact_reason
          categories
        }
      }
    `),
    variables
  );
  return result.payload;
};
export const useUpdateContactReason = (options?: UseMutationOptions<UPDATED_CONTACT_REASON_BY_IDMutation["payload"], RequestError, UpdateContactReason>) => {
  return useMutation((data) => UPDATED_CONTACT_REASON_BY_ID(data), options);
};

// get all articles
export const GET_ALL_CONTACT_REASONS = async () => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_ALL_CONTACT_REASONS {
        payload: workflows_contact_reason {
          categories
          contact_reason
          created_at
          id
          updated_at
        }
      }
    `)
  );
  return result.payload;
};

export const useContactReasonList = (options?: UseQueryOptions<GET_ALL_CONTACT_REASONSQuery["payload"], RequestError>) => {
  return useQuery([queryKeys.contact_reasons_list], () => GET_ALL_CONTACT_REASONS(), options);
};

export const UPDATE_LAST_ACTIVE_AT = async (user_id: number) => {
  const variables = { user_id };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_LAST_ACTIVE_AT($user_id: bigint!) {
        payload: update_account_users(where: { user_id: { _eq: $user_id } }, _set: { last_active_at: "now()" }) {
          returning {
            user_id
            last_active_at
          }
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useUpdateLastActiveAt = () => {
  const { data } = useSession();
  const { mutate } = useMutation(UPDATE_LAST_ACTIVE_AT);
  const interval = 3 * 60000; // call the mutation every 'x' minute
  useInterval(() => {
    if (!!data?.user?.id) mutate(data.user.id);
  }, interval);
};

export const GET_TOKENS_BY_USER_ID = (user_id: number) => {
  const variables = { user_id };
  const query = `
    query GET_TOKENS_BY_USER_ID($user_id: bigint!) {
      payload: users_by_pk(id: $user_id) {
        google: tokens(path: "google")
      }
    }
  `;
  return { query, variables };
};

export const UPDATE_USER_TOKEN = (user_id: number, tokens: object) => {
  const variables = { user_id, tokens };
  const query = `
    mutation UPDATE_USER_TOKEN($user_id: bigint!, $tokens: jsonb!) {
      payload: update_users_by_pk(pk_columns: {id: $user_id}, _append: {tokens: $tokens}) {
        id
      }
    }
    `;
  return { query, variables };
};

interface AddAgent {
  name: string;
  role: string;
  phone_number: string;
  email: string;
  invitation_address: string;
}

// Add agent
export const ADD_AGENT = async (data: AddAgent) => {
  const variables: ADD_AGENTMutationVariables = {
    object: {
      name: data.name,
      role: data.role,
      ...(data?.phone_number && { phone_number: data.phone_number }),
      ...(data?.invitation_address && { invitation_address: data.invitation_address }),
      user: {
        data: {
          name: data.name,
          email: data.email,
        },
        on_conflict: {
          constraint: users_constraint.users_email_key,
          update_columns: [users_update_column.email],
        },
      },
    },
  };

  const result = await makeGqlRequest(
    graphql(`
      mutation ADD_AGENT($object: account_users_insert_input!) {
        payload: insert_account_users_one(object: $object, on_conflict: { constraint: account_users_account_id_user_id_key, update_columns: [] }) {
          id
          user_id
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useAddAgent = () => {
  return useMutation<ADD_AGENTMutation["payload"], unknown, AddAgent>((data) => ADD_AGENT(data));
};

// CSAT
export const GET_CONVERSATION_CSAT = async (csat_id: string) => {
  const variables = { csat_id };
  const result = await makeGqlAdminRequest(
    graphql(`
      query GET_CONVERSATION_CSAT($csat_id: String!) {
        payload: conversations(where: { csat_id: { _eq: $csat_id } }) {
          id
          contact_id
          csat_sent
          csat_sent_at
          csat_language
          csat_feedback {
            satisfaction_point
            open_question_ans
          }
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const GET_TICKET_CSAT = async (csat_id: string) => {
  const variables = { csat_id };
  const result = await makeGqlAdminRequest(
    graphql(`
      query GET_TICKET_CSAT($csat_id: String!) {
        payload: ticket(where: { csat_id: { _eq: $csat_id } }) {
          id
          contact_id
          csat_sent
          csat_sent_at
          csat_language
          csat_feedback {
            satisfaction_point
            open_question_ans
          }
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const ADD_CSAT_FEEDBACK = async (data: AddCsatFeedbackVars) => {
  const { contact_id, conversation_id = null, ticket_id = null, satisfaction_point, open_question_ans } = data;
  const variables = {
    object: {
      contact_id,
      ...(!!conversation_id && { conversation_id }),
      ...(!!ticket_id && { ticket_id }),
      satisfaction_point,
      ...(!!open_question_ans && { open_question_ans }),
    },
  };
  const result = await makeGqlAdminRequest(
    graphql(`
      mutation ADD_CSAT_FEEDBACK($object: csat_feedback_insert_input!) {
        payload: insert_csat_feedback_one(object: $object) {
          contact_id
          conversation_id
          ticket_id
          satisfaction_point
          open_question_ans
        }
      }
    `),
    variables
  );
  return result.payload;
};

export const useAddCsatFeedback = () => {
  return useMutation<ADD_CSAT_FEEDBACKMutation["payload"], unknown, AddCsatFeedbackVars>(
    async (data) =>
      await axios.post("/api/csat/add", {
        contact_id: data.contact_id,
        ticket_id: data.ticket_id,
        conversation_id: data.conversation_id,
        satisfaction_point: data.satisfaction_point,
        open_question_ans: data.open_question_ans,
      })
  );
};

export const GET_CSAT_SCORE = async (where: GET_CSAT_SCOREQueryVariables["where"]) => {
  const variables = { where };
  const result = await makeGqlRequest(
    graphql(`
      query GET_CSAT_SCORE($where: csat_feedback_bool_exp = {}) {
        feedback: csat_feedback(where: $where) {
          satisfaction_point
          open_question_ans
          conversation_id
          ticket_id
        }
        aggregations: csat_feedback_aggregate(where: $where) {
          aggregate {
            count
            sum {
              satisfaction_point
            }
          }
        }
      }
    `),
    variables
  );
  return result;
};

export const useGetCSATScore = (data: GetCSATScoreReq, options?: UseQueryOptions<GET_CSAT_SCOREQuery, RequestError>) => {
  const { contactId, filterBy } = data;
  let filteredVariables: Omit<GET_CSAT_SCOREQueryVariables["where"], "contact_id"> = {};

  if (filterBy?.channel) filteredVariables.conversation = { inbox: { channel_type: { _ilike: `%${filterBy.channel}%` } } };
  if (filterBy?.agent_id) filteredVariables._or = [{ conversation: { agent_id: { _eq: filterBy.agent_id } } }, { ticket: { assigned_agent: { _eq: filterBy.agent_id } } }];
  if (filterBy?.ticketType) filteredVariables.ticket = { form_value: { _contains: { "Ticket Type": filterBy.ticketType } } };
  if (filterBy?.dateFrom && filterBy?.dateTo) filteredVariables.created_at = { _gte: String(filterBy.dateFrom), _lte: String(filterBy.dateTo) };

  const filters: GET_CSAT_SCOREQueryVariables["where"] = {
    contact_id: { _eq: contactId },
    ...filteredVariables,
  };

  return useQuery([queryKeys.csat, data], () => GET_CSAT_SCORE(filters), options);
};

// Instagram Inbox
export const GET_INSTAGRAM_PAGES = async () => {
  const result = await makeGqlRequest(
    graphql(`
      query GET_INSTAGRAM_PAGES {
        payload: channel_instagram {
          page_id
        }
      }
    `)
  );
  return result.payload;
};

export const useGetInstagramPages = (pageAccessToken: string, options?: Omit<UseQueryOptions<FBPagesData, RequestError>, "select" | "enabled">) => {
  // fetch page_id from channels in DB
  const { data: storedPages } = useQuery(["stored_instagram_pages"], GET_INSTAGRAM_PAGES);
  // fetch pages from facebook
  const fields = "access_token,name,instagram_business_account";
  return useQuery(
    ["fb_pages", pageAccessToken],
    async () => await axios.get(`https://graph.facebook.com/v17.0/me/accounts?fields=${fields}&access_token=${pageAccessToken}`).then((res) => res.data),
    {
      // filter out pages that are already available in DB and return only new pages
      select(data: FBPagesData) {
        if (data?.data && storedPages) {
          return {
            data: data.data.filter((fbPage) => {
              return !!fbPage?.instagram_business_account?.id && !storedPages?.some((storedPage) => fbPage.id === storedPage.page_id);
            }),
            paging: data.paging,
          };
        } else {
          return data;
        }
      },
      enabled: !!storedPages && !!pageAccessToken,
      ...options,
    }
  );
};

export const UPDATE_INSTAGRAM_INBOX_BY_ID = async (updatedValues: UpdateInstagramInboxReq) => {
  const { inbox_id, inbox_update_values } = updatedValues;
  const variables = { inbox_id, inbox_update_values };
  const result = await makeGqlRequest(
    graphql(`
      mutation UPDATE_INSTAGRAM_INBOX_BY_ID($inbox_id: Int!, $inbox_update_values: inboxes_set_input = {}) {
        payload: update_inboxes_by_pk(pk_columns: { id: $inbox_id }, _set: $inbox_update_values) {
          id
          name
          description
          is_enabled
        }
      }
    `),
    variables
  );

  return result.payload;
};

export const useUpdateInstagramInboxById = () => {
  return useMutation<UPDATE_INSTAGRAM_INBOX_BY_IDMutation["payload"], RequestError, UpdateInstagramInboxReq>((data) => UPDATE_INSTAGRAM_INBOX_BY_ID(data));
};
