import { useTwitterStore } from "@store";
import { NextExternalApi } from "@utils/axiosInterceptors";
import { TOKENS, twitterRequestClient } from "@utils/twitterConfig";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { TwitterApi } from "twitter-api-v2";

export const UPDATE_AGENT_TWITTER_TOKEN = (agent_id: number, tokens: object) => {
  const variables = { agent_id, tokens };
  const query = `
		mutation UPDATE_AGENT_TWITTER_TOKEN($agent_id: bigint!, $tokens: jsonb) {
			payload: update_users_by_pk(pk_columns: {id: $agent_id}, _append: {tokens: $tokens}) {
				id
				tokens
			}
		}
  `;

  return { query, variables };
};

export const getBaseUrl = (url: string) => {
  if (url.includes("localhost")) {
    return `http://${url}`;
  }
  return `https://${url}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const hasuraReq = NextExternalApi(session);

  const { query } = req;
  const { NEXT_PUBLIC_HASURA_URL } = process.env;
  const HOST = getBaseUrl(req.headers.host);

  if (query.oauth_token || query.oauth_verifier) {
    const token = query.oauth_token as string;
    const verifier = query.oauth_verifier as string;
    const savedToken = useTwitterStore.getState().oauthToken;
    const savedSecret = useTwitterStore.getState().oauthSecret;

    if (!savedToken || !savedSecret || savedToken !== token) {
      return res.status(400).json({ error: "OAuth token is not known or invalid. Your request may have expired. Please renew the auth process." });
    }

    // Build a temporary client to get access token
    const tempClient = new TwitterApi({ ...TOKENS, accessToken: token, accessSecret: savedSecret });
    // Ask for definitive access token
    const { accessToken, accessSecret, screenName } = await tempClient.login(verifier);
    const twitter_tokens = { twitter_access_token: accessToken, twitter_access_secret: accessSecret, twitter_username: screenName };
    const addAgentTwitterToken = await hasuraReq.post(NEXT_PUBLIC_HASURA_URL, UPDATE_AGENT_TWITTER_TOKEN(session.user.id, twitter_tokens)).then((resp) => resp.data);

    if (addAgentTwitterToken.errors) return res.status(400).json({ message: "Something went wrong!", error: addAgentTwitterToken.errors });

    return res.status(200).json({ message: "Twitter access enabled." });
  }
  if (query.denied) {
    return res.status(400).json({ message: "Something went wrong!" });
  }
  if (Object.keys(query).length === 0) {
    const link = await twitterRequestClient.generateAuthLink(`${HOST}/api/twitter/access`, { linkMode: "authorize" });
    // Save token secret to use it after callback
    useTwitterStore.setState({ oauthToken: link.oauth_token, oauthSecret: link.oauth_token_secret });
    return res.redirect(link.url);
  }
}
