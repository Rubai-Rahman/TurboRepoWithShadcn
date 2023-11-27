import { NextExternalApi } from "@utils/axiosInterceptors";
import jwt from "jsonwebtoken";
import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

const secret = process.env.NEXTAUTH_SECRET;

export const CREATE_WEB_CHAT_CHANNEL = () => {
  const query = `
    mutation CREATE_WEB_CHAT_CHANNEL {
      payload: insert_channel_web_chat_one(object: {}) {
        id
      }
    }
  `;
  return { query };
};

export const UPDATE_WEB_CHAT_CHANNEL = (channel_id: number, token: string) => {
  const variables = { channel_id, token };
  const query = `
    mutation UPDATE_WEB_CHAT_CHANNEL($channel_id: bigint!, $token: String!) {
      payload: update_channel_web_chat_by_pk(pk_columns: {id: $channel_id}, _set: {token: $token}) {
        id
        token
      }
    }
  `;
  return { query, variables };
};

export const CREATE_WEB_CHAT_INBOX = (inbox_name: string, channel_id: number, inbox_description = "") => {
  const variables = { inbox_name, channel_id, inbox_description };
  const query = `
    mutation CREATE_WEB_CHAT_INBOX($inbox_name: String!, $channel_id: Int!, $inbox_description: String = "") {
      payload: insert_inboxes_one(object: {name: $inbox_name, channel_type: "Channel::WebChat", channel_id: $channel_id, description: $inbox_description}) {
        id
        name
        description
      }
    }  
  `;
  return { query, variables };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body, method } = req;
  // works only when the request method is post
  if (method === "POST") {
    // works only when there is value in request body
    try {
      if (body) {
        const inboxName = body.name;
        const inboxDescription = body.description;
        const session = await unstable_getServerSession(req, res, authOptions(req));
        const hasuraReq = NextExternalApi(session);
        const { NEXT_PUBLIC_HASURA_URL } = process.env;

        // create channel
        const createChannel = await hasuraReq.post(NEXT_PUBLIC_HASURA_URL, CREATE_WEB_CHAT_CHANNEL()).then((resp) => resp.data);
        // create channel response is error
        if (createChannel.errors) res.status(400).json({ message: "Something went wrong!", error: createChannel.errors });
        // create channel response is success
        else {
          const channelId = createChannel.data.payload.id;
          // create inbox
          const createInbox = await hasuraReq.post(NEXT_PUBLIC_HASURA_URL, CREATE_WEB_CHAT_INBOX(inboxName, channelId, inboxDescription)).then((resp) => resp.data);
          // create inbox response is error
          if (createInbox.errors) res.status(400).json({ message: "Something went wrong!", error: createInbox.errors });
          // create channel response is success
          else {
            const jwtClaims = {
              "https://hasura.io/jwt/claims": {
                "x-hasura-allowed-roles": ["administrator", "supervisor", "agent", "public"],
                "x-hasura-default-role": "public",
                "x-hasura-role": "public",
                "x-hasura-account-id": session.user.account_id.toString(),
                "x-hasura-inbox-id": createInbox.data.payload.id.toString(),
              },
            };
            const encodedToken = jwt.sign(jwtClaims, secret, { algorithm: "HS256" });
            // update channel with token
            const updateChannel = await hasuraReq.post(NEXT_PUBLIC_HASURA_URL, UPDATE_WEB_CHAT_CHANNEL(channelId, encodedToken)).then((resp) => resp.data);
            // update channel response is error
            if (updateChannel.errors) res.status(400).json({ message: "Something went wrong!", error: updateChannel.errors });
            // update channel response is success
            else res.status(200).json({ inbox_id: createInbox.data.payload.id, message: "Inbox created successfully.", status: "success" });
          }
        }
      }
      // show error in response if no value in request body
      else res.status(400).json({ message: "Inbox name is missing in body!" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  // show error in response if not POST request method
  else res.status(400).json({ message: "This endpoint only supports 'POST' requests!" });
}
