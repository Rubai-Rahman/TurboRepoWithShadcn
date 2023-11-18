import { GET_CONVERSATION_LISTQuery } from "@api-lib/gql/graphql";

export interface ChatPreviewTypes {
  selected?: boolean;
  resolved?: boolean;
  maxWidth?: string;
  data?: GET_CONVERSATION_LISTQuery["payload"][0];
  tab?: string;
  assigned_to?: string;
}
