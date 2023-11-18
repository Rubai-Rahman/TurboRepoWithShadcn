import { ReactElement, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
interface tabsType {
  name: string;
  count?: number;
  panel: ReactElement;
}

export function CustomTabs({
  data,
  tabTriggerClassName,
  tabListClassName,
}: {
  data: tabsType[];
  tabTriggerClassName: string;
  tabListClassName: string;
}) {
  return (
    <Tabs className="w-full" defaultValue="Tab-0">
      <TabsList className={`w-full ${tabListClassName} `}>
        {data.map((tab, index) => (
          <TabsTrigger
            key={tab.name}
            value={`Tab-${index}`}
            className={`flex gap-x-2 w-full ${tabTriggerClassName}
            `}
          >
            {tab.name}

            {tab.count ? (
              <p className="w-4 h-4 rounded-full bg-blue-500/20 text-blue-500 flex justify-center items-center text-xs">
                {tab.count}
              </p>
            ) : null}
          </TabsTrigger>
        ))}
      </TabsList>
      {data.map((tab, index) => (
        <TabsContent key={tab.name} value={`Tab-${index}`}>
          {tab.panel}
        </TabsContent>
      ))}
    </Tabs>
  );
}
