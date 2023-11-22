import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCannedList } from "@api-lib/graphql";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Input } from "@shadcn/input";
import CannedSkeleton from "./ResponsePanel.skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
import Response from "@localComponents/Response/Response";

const tabs = [
  {
    tab: "All",
  },
  {
    // tab: "Suggestions",
  },
  // {
  //   tab: "Globe",
  // },
  // {
  //   tab: "Main",
  // },
  // {
  //   tab: "More",
  //   dropdownMenu: ["Menu 1", "Menu 2", "Menu 3"],
  // },
];

const ResponsePanel = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [limit, setLimit] = useState(2);
  const { t } = useTranslation("rightSide");
  // const { data: cannedData, status, isLoading: cannedStatus } = useCannedList(pageSize, offset, searchTerm);
  const {
    data: cannedData,
    status: cannedStatus,
    isLoading: cannedLoading,
  } = useCannedList(limit, 0, searchTerm, {
    onSuccess: (data:any) => {
      setLimit(data.total.aggregate.count);
    },
  });

  return (
    <div className="w-full overflow-hidden">
      <p className="text-darkCustom text-xl font-semibold py-2 px-4">
        {t("rightSide.response")}
      </p>

      <div
        className={`w-full px-3 py-2 gap-x-2 flex justify-end items-center border-b border-gray-300`}
      >
        <FiSearch className="text-textGray text-xl" />
        <Input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          // ref={inputRef}
          value={searchTerm}
          className="focus:outline-none w-full text-sm font-medium text-textGray border-none"
          placeholder="Search for Results"
        />

        {!!searchTerm && (
          <RxCross2
            onClick={() => setSearchTerm("")}
            className="text-textGray cursor-pointer text-xl"
          />
        )}
      </div>

      <div className="overflow-hidden">
        <Tabs className="w-full" defaultValue="Tab-0">
          <TabsList className="w-full flex justify-between items-center border-b border-lineGrayCustom pt-3 px-6">
            {tabs.map((tab, index) => (
              <TabsTrigger
                key={index}
                value={`Tab-${index}`}
                className={`pb-2 text-sm font-medium flex gap-x-2 items-center focus:outline-none [data-state=active]:text-blueCustom [data-state=active]:border-b-2 [data-state=active]:border-blueCustom [data-state=active]:pb-1.5`}
              >
                {tab.tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value={`Tab-0`}
            className="flex flex-col overflow-y-auto"
          >
            {cannedStatus === "error" ? (
              <p className="p-6">error- something went wrong</p>
            ) : cannedStatus === "loading" ? (
              <CannedSkeleton />
            ) : cannedData?.payload?.length === 0 ? (
              <p className="text-sm text-red-400 text-center my-3 capitalize">
                no canned response found
              </p>
            ) : (
              cannedData.payload.map((item:any) => (
                <Response key={item.id} canned={item} />
              ))
            )}
          </TabsContent>

          <TabsContent value={`Tab-1`} className="flex flex-col gap-y-2">
            <div className="px-6 py-4">
              <p className="text-small font-medium leading-4 text-grayCustom">
                Responses are triggered based on the current conversation you
                are in.
              </p>

              <div className="flex flex-col gap-y-3">
                {/* <CustomAccordion title="Note exists in content" from="right_side" />
                      <CustomAccordion title="SLA exists in content" from="right_side" /> */}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ResponsePanel;
