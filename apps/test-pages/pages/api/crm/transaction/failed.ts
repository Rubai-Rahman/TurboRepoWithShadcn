import { GET_TOKENS_BY_USER_ID } from "@api-lib/graphql";
import crmConfig from "@crm/config";
import { AccountsClient } from "@crm/lib/accounts_grpc_pb";
import { FailedTransaction, GetFailedTransactionsRequest, GetFailedTransactionsResponse } from "@crm/lib/accounts_pb";
import * as grpc from "@grpc/grpc-js";
import { authOptions } from "@pages/api/auth/[...nextauth]";
import { HasuraAdminApi } from "@utils/axiosInterceptors";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const { endpoint, credentials } = crmConfig;

let accountClient: AccountsClient = null;

if (credentials !== null) accountClient = new AccountsClient(endpoint, credentials);

export interface AccountFailedTransactionData {
  data: FailedTransaction.AsObject[];
  error: unknown | grpc.ServiceError;
  nextPageToken?: string;
}

export interface CRMFailedTransactionRequest {
  crmAccountId: string;
  pageSize?: number;
  pageToken?: string;
}

const getAccountTransactionData = async (req: GetFailedTransactionsRequest, meta: grpc.Metadata): Promise<AccountFailedTransactionData> => {
  try {
    const responseData: GetFailedTransactionsResponse = await new Promise((resolve, reject) => {
      accountClient.getFailedTransactions(req, meta, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    const data = responseData.toObject().failedTransactionsList;
    return { data, error: null, nextPageToken: responseData.toObject().nextPageToken };
  } catch (error) {
    return { data: null, error };
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { query } = req;

    if (!!query) {
      if (!!query?.crmAccountId) {
        if (credentials !== null) {
          const pageSize = +query?.pageSize || 10;
          const transactionReq = new GetFailedTransactionsRequest();
          transactionReq.setAccountId(query?.crmAccountId as string);
          transactionReq.setPageSize(pageSize);
          if (!!query?.pageToken) transactionReq.setPageToken(query.pageToken as string);

          const session = await getServerSession(req, res, authOptions(req));

          if (session?.user?.id) {
            const getUserToken = await HasuraAdminApi(GET_TOKENS_BY_USER_ID(session.user.id));
            if (getUserToken.error) res.status(400).json({ message: "Something went wrong!", error: getUserToken.errors });
            const googleIdToken = getUserToken?.google?.id_token;

            if (!!googleIdToken) {
              const authToken = `bearer ${googleIdToken}`;
              const meta = new grpc.Metadata();
              meta.add("authorization", authToken);

              const transactionDetails = await getAccountTransactionData(transactionReq, meta);

              res.status(200).json(transactionDetails);
            } else throw { message: "JWT token is missing!" };
          } else throw { message: "Session user not found!" };
        } else throw { message: "API endpoint misconfigured." };
      } else throw { message: "CRM account id is missing in request parameter!" };
    } else throw { message: "No query parameter in the request" };
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
