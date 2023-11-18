import { GET_CONVERSATION_BY_IDQuery } from "@api-lib/gql/graphql";
import { useEffect, useState } from "react";
import EditorField from "./EditorField/EditorField";
import { Button } from "@shadcn/button";

const ReplyingField = ({
  tabs,
  conversationDataById,
}: {
  tabs: string[];
  conversationDataById: GET_CONVERSATION_BY_IDQuery["payload"];
}) => {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);

  useEffect(() => {
    conversationDataById.status > 4
      ? setSelectedTab(tabs[2])
      : setSelectedTab(tabs[0]);
  }, [conversationDataById.id]);
  return (
    <div
      className={`flex flex-col transform-transition ${
        selectedTab.toLowerCase() === "note" ? "bg-[#FFFBF6]" : "bg-[#F7F9FF]"
      }`}
    >
      <div
        className={`flex gap-x-8 px-4 border-b ${
          conversationDataById.status > 4 && "hidden"
        }`}
      >
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
        <EditorField
          tab={selectedTab}
          type="conversation"
          data={conversationDataById}
        />
      </div>
    </div>
  );
};

export default ReplyingField;
