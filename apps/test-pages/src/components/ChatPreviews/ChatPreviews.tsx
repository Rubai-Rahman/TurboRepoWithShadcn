import React from 'react';
import CustomAccordion from '@localShared/CustomAccordion/CustomAccordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@shadcn/tabs';
import SearchBlock from '../SearchBlock/SearchBlock';
import ChatPreview from '../ChatPreview/ChatPreview';

const tabs = [
  {
    tab: 'Mine',
    count: 3,
    components: [
      {
        id: 1,
        name: 'Roberta Casas',
        channel: {
          name: 'twitter',
          handle: '@roberta_casas',
        },
        text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
        date: '25 Oct 2022 - 2:35 PM',
        time: '15 min',
        channel_handle: 'DM To @alt_care',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
        selected: false,
      },
      {
        id: 2,
        name: 'Neil Simenson',
        channel: {
          name: 'twitter',
          handle: '@neil_simenson',
        },
        text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
        date: '25 Oct 2022 - 2:35 PM',
        time: '9 min',
        channel_handle: 'DM To @alt_care',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
        count: 3,
        selected: true,
      },
      {
        id: 3,
        name: 'Thomas McFall',
        channel: {
          name: 'whatsapp',
          phone: '+9650512345687',
        },
        text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
        date: '25 Oct 2022 - 2:35 PM',
        time: '15 min',
        channel_handle: 'DM To @alt_care',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
        count: 1,
        selected: false,
      },
    ],
    disclosure: {
      title: 'Unassigned',
      count: 24,
      components: [
        {
          id: 1,
          name: 'Roberta Casas',
          channel: {
            name: 'twitter',
            handle: '@roberta_casas',
          },
          text: 'Delighted promotion improving property.',
          date: '25 Oct 2022 - 2:35 PM',
          time: '15 min',
          channel_handle: 'DM To @alt_care',
          avatar:
            'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
          selected: false,
        },
        {
          id: 2,
          name: 'Thomas McFall',
          channel: {
            name: 'whatsapp',
            phone: '+9650512345687',
          },
          text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
          date: '25 Oct 2022 - 2:35 PM',
          time: '15 min',
          channel_handle: 'DM To @alt_care',
          avatar:
            'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
          count: 1,
        },
      ],
    },
  },
  {
    tab: 'Pending',
    count: 12,
    components: [
      {
        id: 1,
        name: 'Roberta Casas',
        channel: {
          name: 'twitter',
          handle: '@roberta_casas',
        },
        text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
        date: '25 Oct 2022 - 2:35 PM',
        time: '15 min',
        channel_handle: 'DM To @alt_care',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
        selected: false,
      },
      {
        id: 2,
        name: 'Neil Simenson',
        channel: {
          name: 'twitter',
          handle: '@roberta_casas',
        },
        text: 'Delighted promotion improving property. ',
        date: '25 Oct 2022 - 2:35 PM',
        time: 'Pending',
        channel_handle: 'DM To @alt_care',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
        selected: false,
      },
    ],
    disclosure: {
      title: 'Unassigned',
      count: 24,
      components: [
        {
          id: 1,
          name: 'Helene Enges',
          channel: {
            name: 'instagram',
            handle: '@h.enges',
          },
          text: 'Delighted promotion improving property.',
          date: '25 Oct 2022 - 2:35 PM',
          time: '15 min',
          channel_handle: 'DM To @alt_care',
          avatar:
            'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
          selected: false,
          count: 3,
        },
        {
          id: 2,
          name: 'Thomas McFall',
          channel: {
            name: 'whatsapp',
            phone: '+9650512345687',
          },
          text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
          date: '25 Oct 2022 - 2:35 PM',
          time: '15 min',
          channel_handle: 'DM To @alt_care',
          avatar:
            'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
          count: 1,
        },
      ],
    },
  },
  {
    tab: 'Watching',
    components: [
      {
        id: 1,
        name: 'Neil Simenson',
        channel: {
          name: 'twitter',
          handle: '@neil_simenson',
        },
        text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
        date: '25 Oct 2022 - 2:35 PM',
        time: '15 min',
        channel_handle: 'DM To @alt_care',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
      },
      {
        id: 2,
        name: 'Roberta Green',
        channel: {
          name: 'twitter',
          handle: '@neil_simenson',
        },
        text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
        date: '25 Oct 2022 - 2:35 PM',
        time: '15 min',
        channel_handle: 'DM To @alt_care',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-2.jpg',
      },
    ],
    disclosure: {
      title: 'Unassigned',
      count: 24,
      components: [
        {
          id: 1,
          name: 'Helene Enges',
          channel: {
            name: 'instagram',
            handle: '@h.enges',
          },
          text: 'Delighted promotion improving property.',
          date: '25 Oct 2022 - 2:35 PM',
          time: '15 min',
          channel_handle: 'DM To @alt_care',
          avatar:
            'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
          selected: false,
          count: 3,
        },
        {
          id: 2,
          name: 'Thomas McFall',
          channel: {
            name: 'whatsapp',
            phone: '+9650512345687',
          },
          text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
          date: '25 Oct 2022 - 2:35 PM',
          time: '15 min',
          channel_handle: 'DM To @alt_care',
          avatar:
            'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
          count: 1,
        },
      ],
    },
  },
  {
    tab: 'History',
    components: [
      {
        id: 1,
        name: 'Roberta Casas',
        channel: {
          name: 'twitter',
          handle: '@roberta_casas',
        },
        text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
        date: '25 Oct 2022 - 2:35 PM',
        time: '15 min',
        channel_handle: 'DM To @alt_care',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
      },
      {
        id: 2,
        name: 'Neil Simenson',
        channel: {
          name: 'twitter',
          handle: '@neil_simenson',
        },
        text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime...',
        date: '25 Oct 2022 - 2:35 PM',
        time: '9 min',
        channel_handle: 'DM To @alt_care',
        avatar: 'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
        count: 2,
      },
    ],
    disclosure: {
      title: 'Unassigned',
      count: 24,
      components: [
        {
          id: 1,
          name: 'Helene Enges',
          channel: {
            name: 'instagram',
            handle: '@h.enges',
          },
          text: 'Delighted promotion improving property.',
          date: '25 Oct 2022 - 2:35 PM',
          time: '15 min',
          channel_handle: 'DM To @alt_care',
          avatar:
            'https://flowbite.com/docs/images/people/profile-picture-4.jpg',
          selected: false,
          count: 3,
        },
        {
          id: 2,
          name: 'Thomas McFall',
          channel: {
            name: 'whatsapp',
            phone: '+9650512345687',
          },
          text: 'Extended kindness trifling remember he confined outlived if. Assistance sentime... ',
          date: '25 Oct 2022 - 2:35 PM',
          time: '15 min',
          channel_handle: 'DM To @alt_care',
          avatar:
            'https://flowbite.com/docs/images/people/profile-picture-3.jpg',
          count: 1,
        },
      ],
    },
  },
];

const ChatPReviews = () => {
  return (
    <div className="w-2/6 border border-gray-300">
      <SearchBlock maxWidth="w-full" />

      <Tabs>
        <TabsList className="w-full pt-3 px-3 border-b border-gray-300 flex justify-between gap-x-4">
          {tabs.map((tab, index) => (
            <div className="flex items-center gap-x-2" key={index}>
              <TabsTrigger
                value={`Tab-${index}`}
                key={index}
                className={`pb-2 text-sm font-medium leading-6 flex gap-x-2 items-center focus:outline-none'
                      [data-state=active]:'text-primary [data-state=active]:border-b-2 [data-state=active]:border-primary [data-state=active]:pb-1.5'
                      [data-state=inactive]: 'text-textGray`}
              >
                {tab.tab}
              </TabsTrigger>
              {tab.count ? (
                <p className="flex justify-center items-center h-4 w-4 text-xs rounded-full bg-primary/20 text-primary mb-2">
                  {tab.count}
                </p>
              ) : null}
            </div>
          ))}
        </TabsList>
        <TabsContent value="Tab-0" className="mt-3">
          {tabs.map((tab, index) => (
            <div key={index} className="flex flex-col gap-y-2">
              {tab.components.map((component, index) => (
                <ChatPreview
                  key={component.id}
                  data={component}
                  maxWidth="w-full"
                  selected={component.selected}
                  tab={tab.tab}
                />
              ))}

              {tab.disclosure ? (
                <CustomAccordion
                  title={tab.disclosure.title}
                  count={tab.disclosure.count}
                  data={tab.disclosure.components}
                  from="left-side-home"
                />
              ) : null}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatPReviews;
