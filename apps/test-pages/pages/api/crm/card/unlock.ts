import { GET_TOKENS_BY_USER_ID } from "@api-lib/graphql";
import crmConfig from "@crm/config";
import { CardsClient } from "@crm/lib/cards_grpc_pb";
import { UnlockCardRequest, UnlockCardResponse } from "@crm/lib/cards_pb";
import * as grpc from "@grpc/grpc-js";
import { authOptions } from "@pages/api/auth/[...nextauth]";
import { HasuraAdminApi } from "@utils/axiosInterceptors";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const { endpoint, credentials } = crmConfig;

let cardClient: CardsClient = null;

if (credentials !== null) cardClient = new CardsClient(endpoint, credentials);

export type CRMCardUnlockReqData = UnlockCardRequest.AsObject;

export interface CRMCardUnlock {
  data: UnlockCardResponse.AsObject;
  error: grpc.ServiceError;
}

const cardUnlock = async (reqData: CRMCardUnlockReqData, meta: grpc.Metadata): Promise<CRMCardUnlock> => {
  try {
    const { customerId, cardToken, comments } = reqData;
    const req = new UnlockCardRequest();
    req.setCustomerId(customerId);
    req.setCardToken(cardToken);
    req.setComments(comments);

    const responseData: UnlockCardResponse = await new Promise((resolve, reject) => {
      cardClient.unlockCard(req, meta, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    const data = responseData.toObject();
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body } = req;

    if (!!body) {
      if (!!body.customerId && !!body.cardToken) {
        if (credentials !== null) {
          const session = await getServerSession(req, res, authOptions(req));

          if (session?.user?.id) {
            const getUserToken = await HasuraAdminApi(GET_TOKENS_BY_USER_ID(session.user.id));
            if (getUserToken.error) res.status(400).json({ message: "Something went wrong!", error: getUserToken.errors });
            const googleIdToken = getUserToken?.google?.id_token;

            if (!!googleIdToken) {
              const authToken = `bearer ${googleIdToken}`;
              const meta = new grpc.Metadata();
              meta.add("authorization", authToken);

              const reqData: CRMCardUnlockReqData = {
                customerId: body.customerId,
                cardToken: body.cardToken,
                comments: body.comments || "",
              };

              const responseData = await cardUnlock(reqData, meta);

              res.status(200).json(responseData);
            } else throw { message: "JWT token is missing!" };
          } else throw { message: "Session user not found!" };
        } else throw { message: "API endpoint misconfigured." };
      } else throw { message: "Missing fields in request body!" };
    } else throw { message: "No body in the request" };
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
