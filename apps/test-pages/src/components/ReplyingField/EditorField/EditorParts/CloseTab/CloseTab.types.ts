import { TextEditorStateType } from "../../EditorField.types";
import { GET_CONVERSATION_BY_IDQuery } from "@api-lib/gql/graphql";

export interface Props {
  conversationData: GET_CONVERSATION_BY_IDQuery["payload"];
  reducerData: TextEditorStateType;
  updater: (value: any) => void;
}
