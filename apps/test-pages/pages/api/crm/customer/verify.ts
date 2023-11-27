import { GET_TOKENS_BY_USER_ID } from "@api-lib/graphql";
import crmConfig from "@crm/config";
import { CustomersClient } from "@crm/lib/customers_grpc_pb";
import { VerifyCustomerExistenceByIdRequest, VerifyCustomerExistenceByIdResponse } from "@crm/lib/customers_pb";
import * as grpc from "@grpc/grpc-js";
import { authOptions } from "@pages/api/auth/[...nextauth]";
import { HasuraAdminApi } from "@utils/axiosInterceptors";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const { endpoint, credentials } = crmConfig;

let customerClient: CustomersClient = null;

if (credentials !== null) customerClient = new CustomersClient(endpoint, credentials);

export interface CRMVerifyCustomerExistenceData {
  data: VerifyCustomerExistenceByIdResponse.AsObject;
  error: unknown | grpc.ServiceError;
}

export interface CRMVerifyCustomerExistenceRequest {
  customerId: string;
}

const verifyCustomerExistence = async (req: VerifyCustomerExistenceByIdRequest, meta: grpc.Metadata): Promise<CRMVerifyCustomerExistenceData> => {
  try {
    const responseData: VerifyCustomerExistenceByIdResponse = await new Promise((resolve, reject) => {
      customerClient.verifyCustomerExistenceById(req, meta, (err, result) => {
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
    const { body: reqData } = req;

    if (!!reqData) {
      if (!!reqData?.customerId) {
        if (credentials !== null) {
          const verifyReq = new VerifyCustomerExistenceByIdRequest();
          verifyReq.setIdNumber(reqData.customerId as string);
          verifyReq.setTenantCode("tweeq");

          const session = await getServerSession(req, res, authOptions(req));

          if (session?.user?.id) {
            const getUserToken = await HasuraAdminApi(GET_TOKENS_BY_USER_ID(session.user.id));
            if (getUserToken.error) res.status(400).json({ message: "Something went wrong!", error: getUserToken.errors });
            const googleIdToken = getUserToken?.google?.id_token;

            if (!!googleIdToken) {
              const authToken = `bearer ${googleIdToken}`;
              const meta = new grpc.Metadata();
              meta.add("authorization", authToken);

              const responseData = await verifyCustomerExistence(verifyReq, meta);

              res.status(200).json(responseData);
            } else throw { message: "JWT token is missing!" };
          } else throw { message: "Session user not found!" };
        } else throw { message: "API endpoint misconfigured." };
      } else throw { message: "Customer ID is missing!" };
    } else throw { message: "No reqData parameter in the request" };
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
