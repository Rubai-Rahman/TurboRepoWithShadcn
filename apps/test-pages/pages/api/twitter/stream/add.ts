import { NextExternalApi } from "@utils/axiosInterceptors";
import type { NextApiRequest, NextApiResponse } from "next";
import { getToken } from "next-auth/jwt";
import { getSession } from "next-auth/react";
import { TwitterApi } from "twitter-api-v2";

interface AddTwitterStreamChannel {
  rule_id: string;
  value: string;
}

interface TwitterStreamChannelResponse {
  errors?: any;
  data?: {
    payload: {
      id: number;
      rule_id: string;
      value: string;
    };
  };
}

interface AddTwitterStreamInbox {
  name: string;
  channel_id: number;
  channel_type: string;
  reply_channel_id: number;
}

interface TwitterStreamInboxResponse {
  errors?: any;
  data?: {
    payload: {
      id: number;
      name: string;
      channel_id: number;
      channel_type: string;
    };
  };
}

const ADD_TWITTER_STREAM_CHANNEL = (object: AddTwitterStreamChannel) => {
  const variables = { object };
  const query = `
    mutation ADD_TWITTER_STREAM_CHANNEL($object: channel_twitter_stream_insert_input!) {
      payload: insert_channel_twitter_stream_one(object: $object, on_conflict: {constraint: channel_twitter_stream_account_id_value_key}) {
        id
        rule_id
        value
      }
    }
  `;

  return { query, variables };
};

const ADD_TWITTER_STREAM_INBOX = (object: AddTwitterStreamInbox) => {
  const variables = { object };
  const query = `
		mutation CREATE_INBOX($object: inboxes_insert_input!) {
			payload: insert_inboxes_one(object: $object) {
				id
				name
				channel_id
				channel_type
			}
		}
  `;

  return { query, variables };
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await getToken({ req });
  // check if user is authenticated
  if (token) {
    // give access if the authenticated user is administrator level
    if (token.role === "administrator") {
      const session = await getSession({ req });
      const hasuraReq = NextExternalApi(session);
      const { body } = req;
      const { TWITTER_PROJECT_BEARER_TOKEN, NEXT_PUBLIC_HASURA_URL } = process.env;

      const { channelName, keyword, replyChannelId } = body;

      // New client
      const bearerClient = new TwitterApi(TWITTER_PROJECT_BEARER_TOKEN);

      // add rule to the stream endpoint
      const addRules = await bearerClient.v2.updateStreamRules({
        add: [{ value: keyword }],
      });

      let createChannelData = null;
      // rule added successfully
      if (addRules.meta.summary.created > 0) {
        // add rule to db table
        createChannelData = {
          rule_id: addRules.data[0].id,
          value: addRules.data[0].value,
        };
      }
      if (addRules.errors) {
        if (addRules.errors[0].title === "DuplicateRule") {
          createChannelData = {
            // @ts-ignore
            rule_id: addRules.errors[0].id,
            value: addRules.errors[0].value,
          };
        } else {
          return res.status(400).json({ message: "Twitter API error", error: addRules.errors[0].detail });
        }
      }

      const createChannelResult = await hasuraReq
        .post<TwitterStreamChannelResponse>(NEXT_PUBLIC_HASURA_URL, ADD_TWITTER_STREAM_CHANNEL(createChannelData))
        .then((resp) => resp.data);
      // return error response for channel creation error
      if (createChannelResult.errors) return res.status(400).json({ message: "Something went wrong! Channel creation failed.", error: createChannelResult.errors });

      if (!!createChannelResult.data.payload) {
        // create a new inbox for the channel id
        const createInboxData = {
          name: channelName,
          channel_id: createChannelResult.data.payload.id,
          channel_type: "Channel::TwitterStream",
          ...(replyChannelId && { reply_channel_id: replyChannelId }),
        };
        const createInboxResult = await hasuraReq.post<TwitterStreamInboxResponse>(NEXT_PUBLIC_HASURA_URL, ADD_TWITTER_STREAM_INBOX(createInboxData)).then((resp) => resp.data);
        // return error response for inbox creation error
        if (createInboxResult.errors) return res.status(400).json({ message: "Something went wrong! Inbox creation failed.", error: createInboxResult.errors });
        // return success response for inbox creation
        return res.status(200).json({ inboxId: createInboxResult.data.payload.id, message: "Inbox added successfully" });
      } else {
        if (addRules.errors[0].title === "DuplicateRule") return res.status(400).json({ message: "An inbox with duplicate rule exists!" });
      }
    }
  } else {
    res.status(401).json({ message: "Access denied!" });
  }
}
