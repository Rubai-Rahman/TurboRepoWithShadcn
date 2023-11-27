import { SET_NEW_AGENT_PASSWORD } from "@api-lib/graphql";
import { HasuraApi } from "@utils/axiosInterceptors";
import { AES } from "crypto-js";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { body } = req;

  if ("confirmation_token" in body && "password" in body) {
    const encryptedPassword = AES.encrypt(body.password, process.env.NEXTAUTH_SECRET).toString();

    try {
      const resp = await HasuraApi(SET_NEW_AGENT_PASSWORD(body.confirmation_token, encryptedPassword), { anonymous: true });

      if (resp.affected_rows > 0) {
        res.status(200).json({ data: resp, message: "Password set successful. You can login now!" });
      } else res.status(400).json({ message: "Token invalid!" });
    } catch (error) {
      res.status(400).json({ message: "Something went wrong! Password set failed." });
    }
  } else res.status(400).json({ message: "Invalid input data." });
}
