import React, { useState } from "react";
import ProfileInformation from "../../ProfileInformation/ProfileInformation";
import NewConversation from "./NewConversation/NewConversation";
import MergeContacts from "./MergeContacts/MergeContacts";
import NewTicket from "./NewTicket/NewTicket";
import EditContact from "./EditContact/EditContact";
import { GET_CONTACT_BY_IDQuery } from "@api-lib/gql/graphql";
import { CRMCustomerData } from "@pages/api/crm/customer";
import Social from "@components/Social/Social";
import RecentConversations from "@components/RecentConversations/RecentConversations";
import PreviousTickets from "@components/PreviousTickets/PreviousTickets";

const UserProfile = ({
  contactData,
  crmData,
  handleCrmData,
}: {
  contactData: GET_CONTACT_BY_IDQuery["payload"];
  crmData: CRMCustomerData;
  handleCrmData: (data: CRMCustomerData) => void;
}) => {
  const [selected, setSelected] = useState("close");
  const setSelectedFunc = (option) => setSelected(option);

  // Get tweeq data into state
  // const [tweeqData, setTweeqData] = useState<TweeqUserData>(null);
  // const handleTweeqData = (data: TweeqUserData) => {
  //   setTweeqData(data);
  // };

  return (
    <>
      {selected === "close" && !!contactData && (
        <div className="divide-y h-full">
          <ProfileInformation
            maxWidth="w-full"
            setSelected={setSelectedFunc}
            contactData={contactData}
            handleCrmData={handleCrmData}
            crmData={crmData}
          />
          {/* {tweeqData && <TweeqInfo tweeqData={tweeqData} />} */}
          <Social maxWidth="w-full" contactData={contactData} />
          <RecentConversations maxWidth="w-full" contactData={contactData} />
          <PreviousTickets maxWidth="w-full" contactData={contactData} />
        </div>
      )}
      {selected === "chat" && <NewConversation setSelected={setSelected} />}
      {selected === "arrow" && <MergeContacts setSelected={setSelected} />}
      {selected === "ticket" && (
        <NewTicket contactData={contactData} setSelected={setSelected} />
      )}
      {selected === "edit" && (
        <EditContact setSelected={setSelected} contactData={contactData} />
      )}
    </>
  );
};

export default UserProfile;
