import {
  GET_MESSAGESQuery,
  GET_TICKET_MESSAGES_BY_TICKET_IDQuery,
} from '@api-lib/gql/graphql';

export interface messageTypes {
  message_type: number;
  message:
    | GET_MESSAGESQuery['payload'][0]
    | GET_TICKET_MESSAGES_BY_TICKET_IDQuery['payload'][0];
}
