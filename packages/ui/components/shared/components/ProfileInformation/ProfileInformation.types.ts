import { GET_CONTACT_BY_IDQuery } from "@api-lib/gql/graphql";
import { CRMCustomerData } from "@pages/api/crm/customer";

export interface ProfileInformationTypes {
  maxWidth?: string;
  setSelected?: (item: string) => void;
  contactData: GET_CONTACT_BY_IDQuery["payload"];
  handleCrmData: (data: CRMCustomerData) => void;
  crmData: CRMCustomerData;
}
