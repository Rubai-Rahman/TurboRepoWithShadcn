import { useEffect } from "react";
import Resolved from "./Resolved";
import TicketRaised from "./TicketRaised";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { Props } from "./CloseTab.types";

const tabs = [
  { name: "Resolved", status: 5 },
  { name: "Waiting for Customer Reply", status: 6 },
  { name: "Ticket escalated", status: 7 },
  { name: "Ticket follow up", status: 8 },
  { name: "Irrelevant", status: 9 },
  { name: "No Answer required", status: 10 },
];

const CloseTab = ({ conversationData, reducerData, updater }: Props) => {
  // console.log("state reducer", data);

  useEffect(() => {
    conversationData.status > 4 &&
      updater({
        type: "CLOSE_TAB_STATUS_UPDATE",
        payload: conversationData.status,
      });
  }, [conversationData.status]);
  return (
    <div
      className={`w-full md:max-w-md lg:max-w-2xl 2xl:max-w-[50rem] min-[1920px]:max-w-[74rem] flex flex-col overflow-hidden ${
        conversationData.status > 4
          ? "cursor-not-allowed"
          : "pointer-events-auto"
      }`}
    >
      <div
        className={`w-full flex justify-start items-center p-2 group overflow-hidden hover:overflow-x-auto ${
          conversationData.status > 4
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >
        <div className="w-full flex justify-start items-center gap-2">
          {tabs.map((tab, index) => (
            <div
              key={index}
              // onClick={() => setSelectedTab(tab)}
              className={`flex justify-start items-center gap-1 text-md font-medium`}
            >
              {/* <input type="radio" id={tab.name} onChange={() => setSelectedTab(tab.status)} checked={selectedTab === tab.status} /> */}
              <Input
                type="radio"
                id={tab.name}
                className="ring-0 focus:ring-0"
                // defaultChecked={+conversationData.status === tab.status}
                // checked={+conversationData.status === tab.status}
                checked={reducerData.closeTabSelectedStatus === tab.status}
                onChange={() =>
                  updater({
                    type: "CLOSE_TAB_STATUS_UPDATE",
                    payload: tab.status,
                  })
                }
              />
              <Label
                htmlFor={tab.name}
                className={`whitespace-nowrap cursor-pointer ${
                  reducerData.closeTabSelectedStatus === tab.status
                    ? "text-blueCustom"
                    : "text-grayCustom"
                }`}
              >
                {tab.name}
              </Label>
            </div>
          ))}
        </div>
      </div>
      <div
        className={`w-full hover:overflow-x-auto ${
          conversationData.status > 4
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >
        {(reducerData.closeTabSelectedStatus === 5 ||
          reducerData.closeTabSelectedStatus === 6) && (
          <Resolved
            updater={updater}
            reducerData={reducerData}
            conversationData={conversationData}
          />
        )}
      </div>
      <div
        className={`w-full hover:overflow-x-auto ${
          conversationData.status > 4
            ? "pointer-events-none"
            : "pointer-events-auto"
        }`}
      >
        {(reducerData.closeTabSelectedStatus === 7 ||
          reducerData.closeTabSelectedStatus === 8) && (
          <TicketRaised
            contactId={+conversationData.contact_id}
            updater={updater}
          />
        )}
      </div>
    </div>
  );
};

export default CloseTab;
