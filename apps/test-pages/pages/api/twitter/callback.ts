import { useTwitterStore } from "@store";
import { NextExternalApi } from "@utils/axiosInterceptors";
import { TOKENS, twitterRequestClient } from "@utils/twitterConfig";
import type { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { TwitterApi } from "twitter-api-v2";

export const getBaseUrl = (url: string) => {
  if (url.includes("localhost")) {
    return `http://${url}`;
  }
  return `https://${url}`;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const n8nReq = NextExternalApi(session);

  const { query } = req;
  const { N8N_URL } = process.env;
  const HOST = getBaseUrl(req.headers.host);

  if (query.oauth_token || query.oauth_verifier) {
    const token = query.oauth_token as string;
    const verifier = query.oauth_verifier as string;
    const savedToken = useTwitterStore.getState().oauthToken;
    const savedSecret = useTwitterStore.getState().oauthSecret;

    if (!savedToken || !savedSecret || savedToken !== token) {
      res.status(400).json({ error: "OAuth token is not known or invalid. Your request may have expired. Please renew the auth process." });
    }

    // Build a temporary client to get access token
    const tempClient = new TwitterApi({ ...TOKENS, accessToken: token, accessSecret: savedSecret });

    // Ask for definitive access token
    const { accessToken, accessSecret, screenName, userId } = await tempClient.login(verifier);

    const data = { userId, accessToken, accessSecret, screenName };
    // url of n8n webhook
    const url = N8N_URL + "/inbox/twitter";

    const result = await n8nReq.post(url, data).then((resp) => resp.data.data);

    if (result?.already_created === true) {
      const inboxId: string = result.inboxes[0].id;
      res.redirect(`/settings/inboxes/new/${inboxId}/finish?already_created=true`);
    } else {
      const newInboxId: string = result.insert_inboxes.returning[0].id;
      res.redirect(`/settings/inboxes/new/${newInboxId}/finish`);
    }
  }
  if (query.denied) {
    res.redirect(`/settings/inboxes/new/twitter`);
  }
  if (Object.keys(query).length === 0) {
    const link = await twitterRequestClient.generateAuthLink(`${HOST}/api/twitter/callback`, { linkMode: "authorize" });
    // Save token secret to use it after callback
    useTwitterStore.setState({ oauthToken: link.oauth_token, oauthSecret: link.oauth_token_secret });
    res.redirect(link.url);
  }
}
