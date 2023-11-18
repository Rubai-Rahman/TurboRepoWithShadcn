import { GET_ALL_KNOWLEDGE_BASE_ARTICLESQuery } from "@api-lib/gql/graphql";

export type Props = {
  articleContent: GET_ALL_KNOWLEDGE_BASE_ARTICLESQuery["payload"][0];
  closeModal: () => void;
};
