import SearchBlock from '@components/SearchBlock/SearchBlock';
import TicketPreview from '@components/TicketPreview/TicketPreview';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcn/tabs';
import CustomAccordion from '@localShared/components/CustomAccordion/CustomAccordion';
import React from 'react';

const LeftSideTicket = () => {
  const tabs = [
    {
      name: 'Mine',
      count: 2,
    },
    {
      name: 'Team',
      count: 12,
    },
    {
      name: 'Watching',
    },
    {
      name: 'History',
    },
  ];

  return (
    <div className="w-[26rem] border border-gray-300">
      <SearchBlock maxWidth="w-full" placeholder="Search for Tickets" />
      <Tabs>
        <TabsList className="flex justify-between border-b border-gray-300 px-3 mt-2">
          {tabs.map((tab, index) => (
            <div key={index} className="flex gap-x-1">
              <TabsTrigger
                key={index}
                value={`Tab-${index}`}
                className={`w-full text-sm font-medium pb-3
                      [data-state=active]:text-primary [data-state=active]:border-b-2 [data-state=active]:border-primary [data-state=active]:focus:outline-none'
                      [data-state=inactive]::text-textGray`}
              >
                {tab.name}
              </TabsTrigger>
              {tab.count && (
                <p className="w-5 h-4 rounded-full bg-primary/10 text-primary text-xs mt-1 flex justify-center items-center font-medium">
                  {tab.count}
                </p>
              )}
            </div>
          ))}
        </TabsList>
        <TabsContent value={`Tab-0`} className="flex flex-col overflow-y-auto">
          <div className="border-b border-gray-300">
            <TicketPreview maxWidth="w-full" />
            <TicketPreview maxWidth="w-full" selected={true} />
            <TicketPreview maxWidth="w-full" />
          </div>
          <div className="px-2">
            <CustomAccordion from="previous-tickets" title="Unassigned" />
          </div>
          <div>
            <h1>hi</h1>
          </div>
          <div>
            <h1>hi</h1>
          </div>
          <div>
            <h1>hi</h1>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LeftSideTicket;
