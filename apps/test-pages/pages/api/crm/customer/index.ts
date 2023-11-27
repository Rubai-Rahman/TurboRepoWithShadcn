import { GET_TOKENS_BY_USER_ID } from "@api-lib/graphql";
import crmConfig from "@crm/config";
import { AccountsClient } from "@crm/lib/accounts_grpc_pb";
import { Account, GetCustomerAccountsRequest, GetCustomerAccountsResponse } from "@crm/lib/accounts_pb";
import { CardsClient } from "@crm/lib/cards_grpc_pb";
import { Card, GetCustomerCardsRequest, GetCustomerCardsResponse } from "@crm/lib/cards_pb";
import { CustomersClient } from "@crm/lib/customers_grpc_pb";
import {
  Customer,
  GetCustomerDetailsRequest,
  GetCustomerDetailsResponse,
  GetNationalAddressRequest,
  GetNationalAddressResponse,
  GetOccupationRequest,
  GetOccupationResponse,
} from "@crm/lib/customers_pb";
import * as grpc from "@grpc/grpc-js";
import { authOptions } from "@pages/api/auth/[...nextauth]";
import { HasuraAdminApi } from "@utils/axiosInterceptors";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";

const { endpoint, credentials } = crmConfig;

let customerClient: CustomersClient = null,
  accountClient: AccountsClient = null,
  cardClient: CardsClient = null;

if (credentials !== null) {
  customerClient = new CustomersClient(endpoint, credentials);
  accountClient = new AccountsClient(endpoint, credentials);
  cardClient = new CardsClient(endpoint, credentials);
}

interface DataResponse {
  error: grpc.ServiceError;
}

interface CustomerNationalAddress extends DataResponse {
  data: GetNationalAddressResponse.AsObject;
}

interface CustomerOccupation extends DataResponse {
  data: GetOccupationResponse.AsObject;
}

export interface CustomerDetailsData extends DataResponse {
  data: Customer.AsObject & {
    nationalAddress?: GetNationalAddressResponse.AsObject;
    occupation?: GetOccupationResponse.AsObject;
  };
}

export interface AccountDetailsData extends DataResponse {
  data: Account.AsObject[];
}

export interface CardDetailsData extends DataResponse {
  data: Card.AsObject[];
}

export interface CRMCustomerRequest {
  mobile: string;
  last4Digit?: string;
}

export interface CRMCustomerData {
  customerDetails: CustomerDetailsData;
  accountDetails: AccountDetailsData;
  cardDetails: CardDetailsData;
  lastUpdated: Date;
}

const getCustomerDetailsData = async (req: GetCustomerDetailsRequest, meta: grpc.Metadata): Promise<CustomerDetailsData> => {
  try {
    const responseData: GetCustomerDetailsResponse = await new Promise((resolve, reject) => {
      customerClient.getCustomerDetails(req, meta, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    const data = responseData.toObject().customer;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const getCustomerNationalAddress = async (customerId: string, meta: grpc.Metadata): Promise<CustomerNationalAddress> => {
  try {
    const req = new GetNationalAddressRequest();
    req.setCustomerId(customerId);

    const responseData: GetNationalAddressResponse = await new Promise((resolve, reject) => {
      customerClient.getNationalAddress(req, meta, (err, result) => {
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

const getCustomerOccupation = async (customerId: string, meta: grpc.Metadata): Promise<CustomerOccupation> => {
  try {
    const req = new GetOccupationRequest();
    req.setCustomerId(customerId);

    const responseData: GetOccupationResponse = await new Promise((resolve, reject) => {
      customerClient.getOccupation(req, meta, (err, result) => {
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

const getAccountDetailsData = async (customerId: string, meta: grpc.Metadata): Promise<AccountDetailsData> => {
  try {
    const req = new GetCustomerAccountsRequest();
    req.setCustomerId(customerId);

    const responseData: GetCustomerAccountsResponse = await new Promise((resolve, reject) => {
      accountClient.getCustomerAccounts(req, meta, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    const data = responseData.toObject().accountsList;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

const getCardDetailsData = async (customerId: string, meta: grpc.Metadata): Promise<CardDetailsData> => {
  try {
    const req = new GetCustomerCardsRequest();
    req.setCustomerId(customerId);

    const responseData: GetCustomerCardsResponse = await new Promise((resolve, reject) => {
      cardClient.getCustomerCards(req, meta, (err, result) => {
        if (err) reject(err);
        resolve(result);
      });
    });
    const data = responseData.toObject().cardsList;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { body }: { body: CRMCustomerRequest } = req;

    if (!!body) {
      if (!!body?.mobile) {
        if (credentials !== null) {
          const customerReq = new GetCustomerDetailsRequest();
          const mobile = body.mobile as string;
          const formattedMobileNo = mobile.startsWith("+966") ? mobile : mobile.startsWith("966") ? "+" + mobile : "+966" + (mobile.startsWith("0") ? mobile.slice(1) : mobile);

          // set justification
          const referredPageUrl = new URL(req.headers?.referer || "").pathname;
          let justification = "NA";
          if (referredPageUrl.includes("/contacts/")) {
            const contactId = referredPageUrl.split("/contacts/")[1];
            justification = `contactId ${contactId}`;
          }
          if (referredPageUrl.includes("/tickets/")) {
            const ticketId = referredPageUrl.split("/tickets/")[1];
            justification = `ticketId ${ticketId}`;
          }
          if (referredPageUrl.includes("/conversations/")) {
            const conversationId = referredPageUrl.split("/conversations/")[1];
            justification = `conversationId ${conversationId}`;
          }

          customerReq.setTenant("tweeq");
          customerReq.setMobile(formattedMobileNo);
          customerReq.setIdLast4Digits((body?.last4Digit as string) || "");
          customerReq.setJustification(justification);

          const session = await getServerSession(req, res, authOptions(req));

          if (session?.user?.id) {
            const getUserToken = await HasuraAdminApi(GET_TOKENS_BY_USER_ID(session.user.id));
            if (getUserToken.error) res.status(400).json({ message: "Something went wrong!", error: getUserToken.errors });
            const googleIdToken = getUserToken?.google?.id_token;

            if (!!googleIdToken) {
              const authToken = `bearer ${googleIdToken}`;
              const meta = new grpc.Metadata();
              meta.add("authorization", authToken);

              let customerDetails: CustomerDetailsData, accountDetails: AccountDetailsData, cardDetails: CardDetailsData;

              customerDetails = await getCustomerDetailsData(customerReq, meta);
              const customerId = customerDetails?.data?.id;

              if (!!customerId) {
                const nationalAddress = await getCustomerNationalAddress(customerId, meta);
                const occupation = await getCustomerOccupation(customerId, meta);
                customerDetails.data.nationalAddress = nationalAddress?.data;
                customerDetails.data.occupation = occupation?.data;
                accountDetails = await getAccountDetailsData(customerId, meta);
                cardDetails = await getCardDetailsData(customerId, meta);
              }

              const lastUpdated = new Date();

              const responseData: CRMCustomerData = { customerDetails, accountDetails, cardDetails, lastUpdated };

              res.status(200).json(responseData);
            } else throw { message: "JWT token is missing!" };
          } else throw { message: "Session user not found!" };
        } else throw { message: "API endpoint misconfigured." };
      } else throw { message: "Mobile number is missing from request!" };
    } else throw { message: "No body in the request" };
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
