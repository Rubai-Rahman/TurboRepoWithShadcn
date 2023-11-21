import avatar from '@public/images/user_avatar.png';
import logo from '@public/images/diwan_logo.png';
import { HiChevronDown, HiOutlineBell } from 'react-icons/hi';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@shadcn/select';
import { Button } from '@shadcn/button';
import { Accordion } from '@shadcn/accordion';
import { Tabs, TabsList, TabsTrigger } from '@shadcn/tabs';
import { DropdownMenu, DropdownMenuTrigger } from '@shadcn/dropdown-menu';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl: avatar,
};
const navigation = [
  'Home',
  'Ticketing',
  'Contacts',
  'Knowledge Base',
  'Analytics',
  'Settings',
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
const publishingOptions = [
  {
    title: 'Create New',
    description: 'This job posting can be viewed by anyone who has the link.',
    current: true,
  },
  {
    title: 'Add New',
    description: 'This job posting will no longer be publicly accessible.',
    current: false,
  },
];

const Header = () => {
  const [selected, setSelected] = useState(publishingOptions[0]);
  return (
    <div>
      <Accordion type="single" collapsible className="bg-white shadow-sm">
        <>
          <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-164">
              {/* left side */}
              <div className="flex gap-x-4 items-center">
                {/* <VscMenu className="text-textGray" /> */}
                <Link href="#">
                  <Image src={logo} alt="dewan_logo" />
                </Link>
                <Tabs>
                  <TabsList className="flex">
                    {navigation.map((item, index) => (
                      <TabsTrigger
                        key={item}
                        value={`Tab-${index}`}
                        className={`mx-4 text-sm font-Inter font-medium
                           [data-state=active]:text-primary [data-state=active]:border-b-2 [data-state=active]:py-5 [data-state=active]:border-primary
                              [data-state=inactive]:border-transparent [data-state=iactive]:text-textGray`}
                      >
                        {item}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  {/* <Tab.Panels className='mt-2'>
                    {Object.values(categories).map((posts, idx) => (
                      <Tab.Panel
                        key={idx}
                        className={classNames(
                          'rounded-xl bg-white p-3',
                          'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                        )}
                      >
                        <ul>
                          {posts.map((post) => (
                            <li
                              key={post.id}
                              className='relative rounded-md p-3 hover:bg-gray-100'
                            >
                              <h3 className='text-sm font-medium leading-5'>
                                {post.title}
                              </h3>

                              <ul className='mt-1 flex space-x-1 text-xs font-normal leading-4 text-gray-500'>
                                <li>{post.date}</li>
                                <li>&middot;</li>
                                <li>{post.commentCount} comments</li>
                                <li>&middot;</li>
                                <li>{post.shareCount} shares</li>
                              </ul>

                              <a
                                href='#'
                                className={classNames(
                                  'absolute inset-0 rounded-md',
                                  'ring-blue-400 focus:z-10 focus:outline-none focus:ring-2'
                                )}
                              />
                            </li>
                          ))}
                        </ul>
                      </Tab.Panel>
                    ))}
                  </Tab.Panels> */}
                </Tabs>
              </div>

              {/* right side */}
              <div className="flex items-center gap-x-4">
                <Select>
                  <>
                    <SelectLabel>Change published status</SelectLabel>
                    <div className="relative">
                      <div className="inline-flex rounded-md ">
                        <div className="relative z-0 inline-flex rounded-md bg-indigo-500">
                          <div className="relative inline-flex items-center rounded-l-md text-white">
                            <p className="text-sm font-medium px-3 border-r-2 border-gray-400">
                              {selected.title}
                            </p>
                          </div>
                          <SelectTrigger className="relative inline-flex items-center bg-indigo-500 p-2 rounded-l-none rounded-r-md text-sm font-medium text-white hover:bg-indigo-600 focus:outline-none focus:z-10 ">
                            <HiChevronDown
                              className="h-5 w-5 text-white"
                              aria-hidden="true"
                            />
                          </SelectTrigger>
                        </div>
                      </div>
                      {/* after select options */}
                      {/*  <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
          
           <Listbox.Options className="origin-top-right absolute z-10 right-0 mt-2 w-72 rounded-md shadow-lg overflow-hidden bg-white divide-y divide-gray-200 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {publishingOptions.map((option) => (
                <Listbox.Option
                  key={option.title}
                  className={({ active }) =>
                    classNames(
                      active ? 'text-white bg-indigo-500' : 'text-gray-900',
                      'cursor-default select-none relative p-4 text-sm'
                    )
                  }
                  value={option}
                >
                  {({ selected, active }) => (
                    <div className="flex flex-col">
                      <div className="flex justify-between">
                        <p className={selected ? 'font-normal' : 'font-normal'}>{option.title}</p>
                        {selected ? (
                          <span className={active ? 'text-white' : 'text-indigo-500'}>
                           <HiCheck className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </div>
                      <p className={classNames(active ? 'text-indigo-200' : 'text-gray-500', 'mt-2')}>
                        {option.description}
                      </p>
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options> 
          </Transition>*/}
                    </div>
                  </>
                </Select>
                <Button
                  type="button"
                  className="text-primary font-semibold text-sm px-6 py-2 rounded-md border border-gray-300"
                >
                  Break for 20 min
                </Button>

                <Button
                  type="button"
                  className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <HiOutlineBell className="h-6 w-6" aria-hidden="true" />
                </Button>

                {/* Profile dropdown */}
                <DropdownMenu>
                  <div>
                    <DropdownMenuTrigger
                      asChild
                      className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="h-8 w-8 rounded-full"
                        src={user.imageUrl}
                        alt=""
                      />
                    </DropdownMenuTrigger>
                  </div>
                  {/* <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? "bg-gray-100" : "",
                                "block px-4 py-2 text-sm text-gray-700"
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition> */}
                </DropdownMenu>
              </div>

              {/* Mobile menu button */}
              {/* <div className='-mr-2 flex items-center sm:hidden'>
                <AccordionTrigger className='bg-white inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                  <span className='sr-only'>Open main menu</span>
                  {open ? (
                    <ImCross className='block h-6 w-6' aria-hidden='true' />
                  ) : (
                    <AiOutlineMenu
                      className='block h-6 w-6'
                      aria-hidden='true'
                    />
                  )}
                </AccordionTrigger>
              </div> */}
            </div>
          </div>
        </>
      </Accordion>
    </div>
  );
};

export default Header;
