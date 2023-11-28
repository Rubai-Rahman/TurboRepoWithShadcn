import { Button } from '@shadcn/button';
import { Label } from '@shadcn/label';
import { Input } from '@shadcn/input';
import { Switch } from '@shadcn/switch';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { AiOutlineCheck } from 'react-icons/ai';
import { ImAttachment } from 'react-icons/im';
import { BsEmojiSmileFill } from 'react-icons/bs';
import { CreditCard, Keyboard, Settings, User } from 'lucide-react';
import CustomComboBox from '@localShared/CustomComboBox/CustomComboBox';
import CustomDialog from '@localShared/CustomDialog/CustomDialog';
import { CustomTabs } from '@localShared/CustomTabs/CustomTabs';
import { CustomDropDownMenu } from '@localShared/CustomDropDown/CustomDropDownMenu';
import CustomSwitch from '@localShared/CustomSwitch/CustomSwitch';
import CustomAccordion from '@localShared/CustomAccordion/CustomAccordion';
import AddFolder from '@localComponents/AddFolder/AddFolder';
import Beneficiaris from '../src/components/Beneficiaries/Beneficiaris';
import ActivityLog from '@localComponents/ActivityLog/ActivityLog';
import Article from '@localComponents/Article/Article';
import ButtonOption from '@localComponents/Button/ButtonOption';
import CardDetails from '@localComponents/Card/CardDetails';
import CardLock from '@localComponents/Card/CardLock';
import CardOptions from '@localComponents/Card/CardOptions';
import Cards from '@localComponents/Card/Cards';
import CardSettings from '@localComponents/Card/CardSettings';
import CardsList from '@localComponents/Card/CardsList';
import InactiveCards from '@localComponents/Card/InactiveCards';
import MasterCard from '@localComponents/Card/MasterCard';
import PermanentStop from '@localComponents/Card/PermanentStop';
import ReplaceCard from '@localComponents/Card/ReplaceCard';
import ChatBubble from '@localComponents/ChatBubble/ChatBubble';
import ChatPreview from '@localComponents/ChatPreview/ChatPreview';
import ChatPReviews from '@localComponents/ChatPreviews/ChatPreviews';
import Component1 from '@localComponents/Component1/Component1';
import ContactDetails from '@localComponents/ContactDetails/ContactDetails';
import ContactField from '@localComponents/ContactField/ContactField';
import ContactProfile from '@localComponents/ContactProfile/ContactProfile';
import CustomMultiSelect from '@localComponents/CustomMultiSelect/CustomMultiSelect';
import MultiSelectReactDropdown from '@localComponents/CustomMultiSelect/MultiSelectReactDropdown/MultiSelectReactDropdown';
import CustomTagInput from '@localComponents/CustomTagInput/CustomTagInput';
import Header from '@localComponents/Header/Header';
import InformationRow from '@localComponents/InformationRow/InformationRow';
import LeftSideTicket from '@localComponents/LeftSide/LeftSideTicket';
import CustomMessageBubble from '@localComponents/Message/CustomMessageBubble';
import Navbar from '@localComponents/Navbar/Navbar';
import Notifications from '@localComponents/Notification/Notification';
import AvatarSelection from '@localComponents/AvatarSelection/AvatarSelection';
import { Card } from '@globalComponents/shadcn/ui/card';
import { ContactDetailsType } from '../src/components/ContactDetails/ContactDetails.types';
import Nps from '@localComponents/NPS/Nps';
import Options from '@localComponents/Options/Options';
import { SiTheconversation } from 'react-icons/si';
import { IoClose, IoTicketOutline } from 'react-icons/io5';
import { MdModeEdit } from 'react-icons/md';
import { GiPodiumSecond } from 'react-icons/gi';
import PreviousTickets from '@localComponents/PreviousTickets/PreviousTickets';
import GetUserCardInfo from '@localComponents/ProfileInformation/GetUserCardInfo';
import ProfileInformation from '@localComponents/ProfileInformation/ProfileInformation';
import RadioButtonDropdown from '@localComponents/RadioButtonDropdown/RadioButtonDropdown';
import Reactions from '@localComponents/Reactions/Reactions';
import RecentConversationPreview from '@localComponents/RecentConversationPreview/RecentConversationPreview';
import RecentConversationSkeleton from '@localComponents/RecentConversations/RecentConversations.skeleton';
import RecentConversations from '@localComponents/RecentConversations/RecentConversations';
import ReplyingField from '@localComponents/ReplyingField/ReplyingField';
import Response from '@localComponents/Response/Response';
import EditorField from '@localComponents/ReplyingField/EditorField/EditorField';
import GifBox from '@localComponents/ReplyingField/EditorField/EditorParts/GiftBox';
import RightSide from '@localComponents/RightSide/RightSide';
import Boarding from '@localComponents/RightSide/Boarding/Boarding';
import GuidedWorkflow from '@localComponents/RightSide/GuidedWorkflow/GuidedWorkflow';

const data = [
  {
    value: 'next.js',
    label: 'Next.js',
  },
  {
    value: 'sveltekit',
    label: 'SvelteKit',
  },
  {
    value: 'nuxt.js',
    label: 'Nuxt.js',
  },
  {
    value: 'remix',
    label: 'Remix',
  },
  {
    value: 'astro',
    label: 'Astro',
  },
];

const tabsData = [
  {
    name: 'Tab 1',
    count: 2,
    panel: <p>This is Account1</p>,
  },
  {
    name: 'Tab 2',

    panel: <p>This is Account2</p>,
  },
  {
    name: 'Tab 3',
    count: 5,
    panel: <p>This is Account3</p>,
  },
];

const menuData = [
  {
    label: 'My Account',
    data: [
      {
        logo: <User />,
        name: 'Profile',
        shortcut: '⇧⌘P',
      },
      {
        logo: <CreditCard />,
        name: 'Billing',
        shortcut: '⌘B',
      },
      {
        logo: <Settings />,
        name: 'Settings ',
        shortcut: '⌘S',
      },
      {
        logo: <Keyboard />,
        name: 'Keyboard shortcuts',
        shortcut: '⌘K',
      },
    ],
  },
  {
    label: 'My Profile',
    data: [
      {
        logo: <User />,
        name: 'Address',
        shortcut: '⇧⌘P',
      },
      {
        name: 'ProfilePicture',
        shortcut: '⌘B',
      },
      {
        logo: <Settings />,
        name: 'Phone Number ',
        shortcut: '⌘S',
      },
      {
        logo: <Keyboard />,
        name: 'Keyboard shortcuts',
      },
    ],
  },
];
const radioFieldData = [
  {
    id: 'radioOption1',
    labelText: 'Option 1',
  },
  {
    id: 'radioOption2',
    labelText: 'Option 2',
  },
];
const mockData = {
  __typename: 'query_root',
  payload: {
    __typename: 'contacts',
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    gender: 'Male',
    city: 'Cityville',
    profile_twitter: null, // Replace with actual data if applicable
    profile_instagram: null, // Replace with actual data if applicable
    preferred_language: 'English',
    phone_number: '123-456-7890',
    source: null, // Replace with actual data if applicable
    created_at: '2023-01-01T12:00:00Z',
    updated_at: '2023-01-02T15:30:00Z',
    last_activity_at: '2023-01-03T10:45:00Z',
    profile_image: null, // Replace with actual data if applicable
    conversations: [
      {
        __typename: 'conversations',
        id: 101,
        status: 1,
        created_at: '2023-01-01T14:30:00Z',
        account: {
          __typename: 'accounts',
          name: 'Account123',
        },
        incoming: {
          __typename: 'messages_aggregate',
          aggregate: {
            __typename: 'messages_aggregate_fields',
            count: 5,
          },
        },
        outgoing: {
          __typename: 'messages_aggregate',
          aggregate: {
            __typename: 'messages_aggregate_fields',
            count: 8,
          },
        },
        conversation_tags: [
          {
            __typename: 'conversation_tags',
            tag: {
              __typename: 'tags',
              name: 'Tag1',
            },
          },
          {
            __typename: 'conversation_tags',
            tag: {
              __typename: 'tags',
              name: 'Tag2',
            },
          },
        ],
        agent: {
          __typename: 'users',
          name: 'AgentSmith',
        },
        inbox: {
          __typename: 'inboxes',
          channel_type: 'Email',
        },
      },
      // Add more conversation objects as needed
    ],
    contact_tags: [
      {
        __typename: 'contact_tags',
        tag: {
          __typename: 'tags',
          id: 201,
          color: '#FF0000',
          name: 'Important',
        },
      },
      // Add more contact tag objects as needed
    ],
    total_conversations: {
      __typename: 'conversations_aggregate',
      aggregate: {
        __typename: 'conversations_aggregate_fields',
        count: 10,
      },
    },
    total_tickets: {
      __typename: 'ticket_aggregate',
      aggregate: {
        __typename: 'ticket_aggregate_fields',
        count: 3,
      },
    },
    total_csats: {
      __typename: 'csat_feedback_aggregate',
      aggregate: {
        __typename: 'csat_feedback_aggregate_fields',
        count: 7,
      },
    },
  },
};

const contactDetailsData: ContactDetailsType = {
  categories: {
    conversations: [
      {
        id: 1,
        title: 'Conversation 1',
        profileUrl: '/profiles/user1.jpg',
        channel: 'Chat',
        name: 'John Doe',
        username: 'john_doe',
        status: 1,
        tag: 'General',
        date: '2023-11-27',
        priority: 2,
        subject: 'Support',
        duration: '30 minutes',
      },
    ],
    tickets: [
      {
        id: 1,
        title: 'Ticket 1',
        profileUrl: '/profiles/user2.jpg',
        channel: 'Email',
        name: 'Jane Smith',
        username: 'jane_smith',
        status: 2,
        tag: 'Technical',
        date: '2023-11-28',
        priority: 1,
        subject: 'Bug Report',
        duration: '1 hour',
      },
      // Add more ticket objects as needed
    ],
    notes: [],
  },
};

export default function Home() {
  const [checked, setChecked] = useState<boolean>(true);
  const [isOpen, setIsOpen] = useState(false);

  const handleChecked = () => {
    setChecked(!checked);
  };

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handleAction = () => {
    openModal();
  };

  return (
    <div className="bg-black p-4 w-full h-full">
      <div className="bg-slate-400">
        <ActivityLog />
      </div>
      <div className="bg-slate-400">
        <AddFolder
          maxWidth="w-full"
          placeholder="Addfolder"
          cancelBtnText="cancel"
          saveBtnText="save"
        />
      </div>
      <div className="bg-slate-400">
        <Article kbItem={'kbItem'} />
      </div>
      <div className="bg-slate-400">
        <AvatarSelection />
      </div>
      <div className="bg-slate-400">
        <Beneficiaris />
      </div>
      <div className="bg-slate-400">
        <ButtonOption />
      </div>
      <div className="bg-slate-400">
        <Card />
        <CardDetails
          setScreen={() => {
            0;
          }}
          selectedCard={{ name: 'Sample Card', type: 'Credit' }}
          displayedCard={[
            {
              token: 'someToken',
              status: 1,
              cardNumber: '1234567890123456',
              cardHolderName: 'John Doe',
              type: 1,
            },
            {
              token: 'someToken',
              status: 1,
              cardNumber: '1234567890123456',
              cardHolderName: 'John Doe',
              type: 1,
            },
          ]}
        />
        <CardsList
          setScreen={() => {}}
          setSelectedCard={() => {}}
          selectedCard={{ name: 'Sample Card', type: 'Credit' }}
          displayedCard={[
            {
              token: 'someToken',
              status: 1,
              cardNumber: '1234567890123456',
              cardHolderName: 'John Doe',
              type: 1,
            },
            {
              token: 'someToken',
              status: 1,
              cardNumber: '1234567890123456',
              cardHolderName: 'John Doe',
              type: 1,
            },
          ]}
        />
      </div>
      <div className="bg-slate-400">
        <ChatBubble />
      </div>
      <div className="bg-slate-500">
        <ChatPreview />
      </div>
      <div className="bg-slate-600 pb-8">
        <Component1 />
      </div>
      <div className="bg-slate-600 pb-8">
        <ContactDetails categories={contactDetailsData.categories} />
      </div>
      <div className="bg-slate-600 pb-8">
        <ContactField radioField={[{ id: '454656', labelText: 'label' }]} />
      </div>
      <div className="bg-amber-300 pb-8">
        <ContactProfile />
      </div>
      <div className="bg-slate-600 pb-8">
        <CustomMultiSelect />
      </div>
      <div className="bg-slate-600 pb-8">
        <MultiSelectReactDropdown />
      </div>
      <div className="bg-slate-600 pb-8">
        <CustomTagInput />
      </div>
      {/* <div className="bg-slate-600 pb-8">
      need to fixed this
        <Header />
      </div> */}
      <div className="bg-slate-500">
        <InformationRow />
      </div>
      <div className="bg-amber-50 text-white">
        <Input />
      </div>
      <div className="bg-amber-100">
        <LeftSideTicket />
      </div>
      {/* <div className="bg-amber-100">
      need to add some require file to code base
        <CustomMessageBubble
          message_type={1}
          message={{
            id: 1,
            text: 'Hello, this is a sample message.',
            sender: {
              id: 123,
              name: 'John Doe',
            },
          }}
        />
      </div> */}
      {/* <div>
        need to update some component
        <CustomMessageBubble message_type={1}
  message={{
    id: 1,
    text: 'Hello, this is a sample message.',
    sender: {
      id: 123,
      name: 'John Doe',
    }
  }}/>
      </div> */}
      {/* <div>
        //Nedd to add Transalation package
        <Navbar
          avatar="avatar"
          status={5}
          statusHandler={() => {
            0;
          }}
        />
      </div> */}
      <div className="bg-orange-300 p-8">
        <Notifications />
      </div>
      <div className="bg-orange-500 p-8">
        <Nps />
      </div>
      <div className="bg-lime-500 p-8">
        <Options
          closeIcon={<IoClose />}
          conversationIcon={<SiTheconversation />}
          editIcon={<MdModeEdit />}
          secondIcon={<GiPodiumSecond />}
          ticketIcon={<IoTicketOutline />}
        />
      </div>
      {/* <div>
        <PreviousTickets />
      </div>
      <div>
        <GetUserCardInfo />
      </div> */}
      {/* <div>
        <ProfileInformation/>
      </div> */}
      <div className="bg-sky-900 p-9">
        <RadioButtonDropdown />
      </div>
      <div className="bg-sky-900 p-9">
        <Reactions />
      </div>
      <div className="bg-sky-900 p-9">
        <RecentConversationPreview maxWidth="w-full" />
      </div>
      <div className="bg-sky-900 p-9">
        <RecentConversationSkeleton />
      </div>
      {/* <div className="bg-sky-900 p-9">
        <RecentConversations/>
      </div> */}
      {/* <div className="bg-sky-900 p-9">
        <ReplyingField/>
      </div> */}

      {/* <div className="bg-sky-900 p-9">
        <EditorField/>
      </div> */}
      {/* <div className="bg-sky-900 p-9">
        < GifBox/>
      </div> */}
      {/* <div className="bg-sky-900 p-9">
        <Response />
      </div> */}
      {/* <div>
        <RightSide/>
    </div> */}
      <div className='bg-lime-200 pb-9'>
        <Boarding/>
      </div>
      <div className='bg-lime-300 pb-9'>
        <GuidedWorkflow/>
      </div>

    </div>
  );
}
