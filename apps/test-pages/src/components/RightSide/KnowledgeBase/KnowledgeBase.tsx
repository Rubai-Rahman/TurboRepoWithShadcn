import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import KbSkeleton from "./KnowledgeBase.skeleton";
import { useKnowledgeBaseArticles } from "@api-lib/graphql";
import { Input } from "@shadcn/input";
import Article from "@components/Article/Article";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";

const KnowledgeBase = () => {
  const [searchKb, setSearchKb] = useState("");
  const { t } = useTranslation("rightSide");
  const { data: kbData, status: kbStatus } = useKnowledgeBaseArticles(searchKb);
  const tabs = [
    { tab: "All" },
    // { tab: "Suggestions" },
    // { tab: "Favorites" },
    // {
    //   tab: "More",
    //   dropdownMenu: ["Menu 1", "Menu 2", "Menu 3"],
    // },
  ];
  return (
    <div className="w-full">
      <p className="text-darkCustom text-xl font-semibold py-2 px-4">
        {t("rightSide.knowledgeBase")}
      </p>
      <div
        className={`w-full px-3 py-2 gap-x-2 flex justify-end items-center border-b border-gray-300`}
      >
        <FiSearch className="text-textGray text-xl" />
        <Input
          type="text"
          onChange={(e) => setSearchKb(e.target.value)}
          // ref={inputRef}
          value={searchKb}
          className="focus:outline-none w-full text-sm font-medium text-textGray border-none"
          placeholder="Search for Articles"
        />

        {!!searchKb && (
          <RxCross2
            onClick={() => setSearchKb("")}
            className="text-textGray cursor-pointer text-xl"
          />
        )}
      </div>
      <div>
        <div className="overflow-hidden">
          <Tabs className="w-full" defaultValue="Tab-0">
            <TabsList className="w-full flex justify-between items-center border-b border-lineGrayCustom pt-3 px-6">
              {tabs.map((tab, index) => (
                <TabsTrigger
                  key={index}
                  value={`Tab-${index}`}
                  className={`pb-2 text-sm font-medium flex gap-x-2 items-center focus:outline-none [data-state=active]:text-blueCustom [data-state=active]:border-b-2 [data-state=active]:border-blueCustom [data-state=active]:pb-1.5`}
                >
                  {/* {!tab?.dropdownMenu ? tab.tab : <CustomDropDown data={tab} placeholder="" />} */}
                  {tab.tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent
              value={`Tab-0`}
              className="flex flex-col overflow-y-auto"
            >
              {kbStatus === "error" ? (
                <p className="p-6">error- something went wrong</p>
              ) : kbStatus === "loading" ? (
                <KbSkeleton />
              ) : kbData?.payload?.length === 0 ? (
                <p className="text-sm text-red-400 text-center my-3 capitalize">
                  no kb-article found
                </p>
              ) : (
                kbData.payload.map((item) => (
                  <Article key={item.id} kbItem={item} />
                ))
              )}
            </TabsContent>
            <TabsContent value={`Tab-1`} className="flex flex-col gap-y-2">
              <div className="px-6 py-4">
                <p className="text-small font-medium leading-4 text-grayCustom">
                  no suggestions are available now
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
