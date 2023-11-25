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
    // <div className="w-11/12 mx-auto flex flex-col gap-y-4 bg-neutral-600">
    //   <Button>Hello</Button>
    //   <Switch id="airplane-mode" />
    //   <CustomSwitch checked={checked} handler={handleChecked} />
    //   <CustomAccordion
    //     buttonClass=" flex justify-between"
    //     title="Appearance"
    //     titleClass="text-bigger font-semibold leading-6 text-darkCustom"
    //   >
    //     <div className="flex justify-between my-5">
    //       <div className="flex gap-x-2 items-center">
    //         <p className="font-medium text-normal leading-6 text-darkCustom">
    //           Widget Logo
    //         </p>
    //         <img
    //           alt="widget_logo"
    //           className="w-8 h-8"
    //           src="https://devs.fluent.sh/images/h_logo.png"
    //         />
    //       </div>

    //       <div className="flex gap-x-2 items-center">
    //         <p className="font-medium text-normal leading-6 text-darkCustom">
    //           Widget Theme
    //         </p>
    //         <div className="h-6 w-6 rounded-full bg-blueCustom text-white flex justify-center items-center">
    //           <AiOutlineCheck />
    //         </div>
    //       </div>

    //       <div className="flex gap-x-2 items-center">
    //         <div className="h-6 w-6 rounded-full bg-grayCustom text-white flex justify-center items-center">
    //           <FaPlus />
    //         </div>
    //         <p className="font-normal text-normal leading-6 text-darkCustom">
    //           Add Custom Color
    //         </p>
    //       </div>

    //       <div className="flex gap-x-2 items-center">
    //         <p className="font-medium text-normal leading-6 text-darkCustom">
    //           Widget Position
    //         </p>
    //         <div className="flex gap-x-2 items-center">
    //           <input
    //             defaultChecked
    //             id=""
    //             name="position"
    //             type="radio"
    //             value="Right"
    //           />{' '}
    //           <p>Right</p>
    //         </div>
    //         <div className="flex gap-x-2 items-center">
    //           <input id="" name="position" type="radio" value="Left" />
    //           <p>Left</p>
    //         </div>
    //       </div>
    //     </div>
    //   </CustomAccordion>
    //   <CustomAccordion
    //     buttonClass=" flex justify-between"
    //     title="Settings"
    //     titleClass="text-bigger font-semibold leading-6 text-darkCustom"
    //   >
    //     <div className="my-5">
    //       <div className="w-full">
    //         <p className="py-2 px-5 text-grayCustom font-medium text-small leading-4">
    //           Online Status Label
    //         </p>
    //         <input
    //           className="w-1/2 px-5 py-2 placeholder:text-grayCustom font-medium text-normal leading-6 focus:outline-none rounded border border-lineGrayCustom"
    //           placeholder="type your label here"
    //           type="text"
    //         />
    //       </div>

    //       <div className="my-5">
    //         <div className="my-3 flex justify-between items-center">
    //           <p className="py-2 px-5 text-grayCustom font-medium text-small leading-4">
    //             Display Chat Widget when Offline
    //           </p>
    //           <CustomSwitch checked={checked} handler={handleChecked} />
    //         </div>
    //         <textarea
    //           className="w-full border border-lineGrayCustom rounded px-5 py-2 placeholder:text-grayCustom font-medium text-normal leading-6 focus:outline-none"
    //           placeholder="Type your offline message here ..."
    //           rows={5}
    //         />
    //       </div>

    //       <div>
    //         <div className="flex items-center gap-x-2">
    //           <input id="" name="" type="checkbox" />
    //           <p className="font-medium text-normal text-grayCustom/80 leading-6">
    //             Display File Picker on widget
    //           </p>
    //           <ImAttachment className="text-grayCustom" />
    //         </div>

    //         <div className="flex items-center gap-x-2">
    //           <input id="" name="" type="checkbox" />
    //           <p className="font-medium text-normal text-grayCustom/80 leading-6">
    //             Allow users to end conversation from widget
    //           </p>
    //         </div>

    //         <div className="flex items-center gap-x-2">
    //           <input id="" name="" type="checkbox" />
    //           <p className="font-medium text-normal text-grayCustom/80 leading-6">
    //             Display Emoji Picker on widget
    //           </p>
    //           <BsEmojiSmileFill className="text-grayCustom" />
    //         </div>
    //       </div>
    //     </div>
    //   </CustomAccordion>
    //   <CustomAccordion
    //     buttonClass=" flex justify-between"
    //     title="Pre-Chat Survey"
    //     titleClass="text-bigger font-semibold leading-6 text-darkCustom"
    //   >
    //     <div className="my-5 space-y-4">
    //       <div className="flex gap-x-3 items-center">
    //         <p className="font-medium text-normal leading-4 text-darkCustom">
    //           Enable Pre-Chat Survey
    //         </p>
    //         <CustomSwitch checked={checked} handler={handleChecked} />
    //       </div>
    //       <div>
    //         <p className="py-2 px-5 text-grayCustom font-medium text-small leading-4">
    //           Online Status Label
    //         </p>
    //         <input
    //           className="w-1/2 px-5 py-2 placeholder:text-grayCustom font-medium text-normal leading-6 focus:outline-none rounded border border-lineGrayCustom"
    //           placeholder="type your label here"
    //           type="text"
    //         />
    //       </div>
    //       <p className="my-2 font-normal text-normal leading-6 text-grayCustom">
    //         Pre-Chat Survey Helps you Customer to identify their issue before
    //         chat starts.
    //       </p>

    //       <div className="">
    //         <p className="font-medium text-normal text-darkCustom leading-6 my-3">
    //           Survey Fields
    //         </p>
    //         <div className="flex justify-between items-center">
    //           <div className="flex gap-x-2 items-center">
    //             <input type="checkbox" />
    //             <p className="font-medium text-normal leading-6 text-grayCustom">
    //               Email
    //             </p>
    //           </div>
    //           <div className="flex gap-x-2 items-center">
    //             <input type="checkbox" />
    //             <p className="font-medium text-normal leading-6 text-grayCustom">
    //               Phone Number
    //             </p>
    //           </div>
    //           <div className="flex gap-x-2 items-center">
    //             <input type="checkbox" />
    //             <p className="font-medium text-normal leading-6 text-grayCustom">
    //               Website URL
    //             </p>
    //           </div>
    //           <div className="flex gap-x-2 items-center">
    //             <input type="checkbox" />
    //             <p className="font-medium text-normal leading-6 text-grayCustom">
    //               Name
    //             </p>
    //           </div>
    //           <div className="flex gap-x-2 items-center">
    //             <input type="checkbox" />
    //             <p className="font-medium text-normal leading-6 text-grayCustom">
    //               Complaint Field
    //             </p>
    //           </div>
    //           <div className="flex gap-x-2 items-center">
    //             <input type="checkbox" />
    //             <p className="font-medium text-normal leading-6 text-grayCustom">
    //               Address Field
    //             </p>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </CustomAccordion>
    //   <CustomComboBox data={data} />
    //   <Button
    //     onClick={() => {
    //       handleAction();
    //     }}
    //   >
    //     Modal
    //   </Button>
    //   <CustomDialog closeModal={closeModal} isOpen={isOpen}>
    //     <div className="grid gap-4 py-4">
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <Label className="text-right" htmlFor="name">
    //           Name
    //         </Label>
    //         <Input className="col-span-3" id="name" value="Pedro Duarte" />
    //       </div>
    //       <div className="grid grid-cols-4 items-center gap-4">
    //         <Label className="text-right" htmlFor="username">
    //           Username
    //         </Label>
    //         <Input className="col-span-3" id="username" value="@peduarte" />
    //       </div>

    //       <Button type="submit">Save changes</Button>
    //     </div>
    //   </CustomDialog>
    //   <CustomTabs
    //     data={tabsData}
    //     tabListClassName="bg-transparent rounded-none"
    //     tabTriggerClassName="data-[state=active]:border-b-2 data-[state=inactive]:border-b-2 data-[state=active]:border-blue-500 data-[state=inactive]:border-transparent data-[state=inactive]:text-blue-500 data-[state=active]:text-blue-500 rounded-none"
    //   />
    //   <CustomDropDownMenu
    //     data={menuData}
    //     menuClassName="w-[300px]"
    //     menuItemClassName="flex justify-between items-center gap-x-2"
    //   >
    //     <Button>click me</Button>
    //   </CustomDropDownMenu>
    //   <Beneficiaris />
    //   <AddFolder
    //     cancelBtnText="Cancel"
    //     maxWidth={500}
    //     placeholder="Enter folder name"
    //     saveBtnText="Save"
    //   />
    //   <ActivityLog/>
    // </div>
    <div className="bg-slate-500">
      <h1>Test Hello World </h1>
      <ActivityLog />
      <AddFolder
        maxWidth="w-full"
        placeholder="AddFolder"
        cancelBtnText="Cancel"
        saveBtnText="save"
      />
      <h2>Artcle</h2>
      <div className="bg-red-300">
        <Article kbItem={data} />
        <Beneficiaris />
      </div>
      <ButtonOption />
      <div className="p-9 bg-blue-700">
        <ChatBubble />
        <ChatPreview />
        <ChatPReviews />
      </div>
      <div className="pt-9 bg-yellow-700">
        <Component1 />
      </div>
      <div className="pt-9 bg-yellow-200">
        <ContactField radioField={radioFieldData} />
      </div>
      <div className="pt-9 bg-yellow-100">
        {/* <ContactProfile /> */}
        <CustomMultiSelect />
      </div>
      <div className="pt-9 bg-zinc-50">
        {/* <ContactProfile /> */}
        <MultiSelectReactDropdown />
      </div>
      <div className="pt-9 bg-zinc-100">
        <CustomTagInput />
      </div>
      {/* <div className='pt-9 bg-zinc-100'>
        <Header/>
      </div> */}
      <div className="py-9 bg-zinc-150">
        <InformationRow />
      </div>
      <div className="py-9 bg-zinc-200">
        <Input />
      </div>
      <div className="py-9 bg-zinc-250">
        <LeftSideTicket />
      </div>
      <div className="py-9 bg-zinc-350">
        <Home />
      </div>
      <div className="py-9 bg-zinc-450">
        <h1>hello</h1>
        <Notifications />
      </div>
      {/* <div className="py-9 bg-zinc-250">
        <CustomMessageBubble message_type={2} message="hello custom" />
      </div> */}
      {/* <div className="py-9 bg-zinc-250">
        <Navbar avatar="Avatar" statusHandler={1} status="ture" />
      </div> */}
    </div>
  );
}
