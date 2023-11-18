import { GET_TICKET_BY_IDQuery } from "@api-lib/gql/graphql";
import { useState } from "react";
import EditorField from "./EditorField/EditorField";
import { Button } from "@shadcn/button";

const TicketReplyingField = ({
  tabs,
  ticketDataById,
}: {
  tabs: string[];
  ticketDataById: GET_TICKET_BY_IDQuery["payload"];
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  return (
    <div
      className={`flex flex-col transform-transition ${
        selectedTab === "Note" ? "bg-[#FFFBF6]" : "bg-[#F7F9FF]"
      }`}
    >
      <div className="flex gap-x-8 px-4 border-b">
        {tabs.map((tab, index) => (
          <Button
            key={index}
            onClick={() => setSelectedTab(tab)}
            className={`text-md py-2.5 font-medium capitalize ${
              tab.toLowerCase() === selectedTab.toLowerCase()
                ? "text-blueCustom border-b-2 border-blueCustom focus:outline-none"
                : "text-grayCustom"
            }`}
          >
            {tab}
          </Button>
        ))}
      </div>
      <div className="w-full">
        <EditorField tab={selectedTab} type="ticket" data={ticketDataById} />
      </div>
    </div>
  );
};

export default TicketReplyingField;
