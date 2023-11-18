import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shadcn/accordion";
import { useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
} from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const navigation = [
  { name: "Team", icon: HiChartPie, href: "#", count: 3, current: false },
  { name: "Projects", icon: HiInbox, href: "#", count: 3, current: false },
  {
    name: "Calendar",
    icon: HiShoppingBag,
    href: "#",
    count: 3,
    current: false,
  },
  { name: "Documents", icon: HiTable, href: "#", current: false },
  { name: "Reports", icon: HiUser, href: "#", current: false },
];

// const homeConvers = [
//   { name: 'All Conversations', icon: BsChat, href: '#', current: true },
//   { name: 'Mentions', icon: HiOutlineAtSymbol, href: '#', current: false },
//   { name: 'Approvals', icon: AiOutlineCheckCircle, href: '#', current: false },
// ]
// const teamSection = [
//   { name: 'Arabic Team',  href: '#', current: false },
//   { name: 'English only Team',  href: '#', current: false },
//   { name: 'Arabic and English Team',  href: '#', current: false },
// ]

// const smartSection = [
//   { name: 'Requests', icon: FaRegFolder, href: '#', current: false },
//   { name: 'Complaints', icon: FaRegFolder, href: '#', current: false },
//   { name: 'DM Messages', icon: FaRegFolder, href: '#', current: false },
// ]

// function Home({closeIcon,plusIcon,firstBlockTitle,firstBlock,secondBlockTitle,secondBlock,thirdBlockTitle,thirdBlock,fourthBlockTitle,fourthBlock,fiveBlock, fiveBlockTitle, searchIcon}:NavigationSidebarType) {
function Home({
  firstBlockTitle,
  firstBlock,
  secondBlockTitle,
  secondBlock,
  thirdBlockTitle,
  thirdBlock,
  fourthBlockTitle,
  fourthBlock,
  fiveBlock,
  fiveBlockTitle,
}) {
  const [selected, setSelected] = useState(false);
  // console.log(selected);

  const handleSelect = (item) => {
    if (item) {
      // setSelected(true)
      // console.log("true", item)
    }
  };
  return (
    <div className="flex flex-col flex-grow border-r border-t border-gray-200 pt-5 pb-4 bg-white overflow-y-auto w-60">
      {/* first block */}
      <div className="mb-2">
        <div className="flex justify-between items-center font-Inter">
          <h3 className="font-semibold text-slate-800 px-3">
            {firstBlockTitle}
          </h3>
          <IoClose className="text-xl text-gray-400 cursor-pointer mr-3" />
        </div>
        {!!fiveBlockTitle && (
          <div className="my-2 flex justify-between items-center font-Inter border-t border-gray-200">
            <h3 className="font-semibold text-slate-800 px-3 mt-2">
              {fiveBlockTitle}
            </h3>
            <FiSearch className="text-xl text-gray-400 cursor-pointer mr-3" />
          </div>
        )}
        <div
          className={`${
            !!fiveBlockTitle ? "mt-0" : "mt-5 flex-grow flex flex-col"
          }`}
        >
          <nav className="flex-1 bg-white space-y-1" aria-label="Sidebar">
            {firstBlock?.map((item, index) =>
              !item.children ? (
                <a
                  key={item.name}
                  // href={item.href}
                  onClick={() => handleSelect(item.current)}
                  className={`group flex items-center px-3 py-2 text-sm font-Inter font-medium cursor-pointer border-l-2 ${
                    item.current
                      ? "bg-indigo-50 border-blue-600 text-blue-600"
                      : "border-transparent bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:border-l-2 hover:border-blue-600"
                  }`}
                >
                  <item.icon
                    className={`mr-3 flex-shrink-0 h-5 w-5 ${
                      item.current
                        ? "text-blue-500 hover:text-blue-500"
                        : "text-gray-400 group-hover:text-blue-500"
                    }`}
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ) : (
                <Accordion
                  type="single"
                  key={item.name}
                  collapsible
                  className="space-y-1"
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger
                      onClick={() => handleSelect(item.current)}
                      className={`${
                        item.current
                          ? "bg-indigo-50 border-blue-600 text-blue-600"
                          : "border-transparent bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:border-l-2 hover:border-blue-600"
                      } group w-full flex items-center px-3 py-2 text-left text-sm font-medium focus:outline-none border-l-2`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${
                          item.current
                            ? "text-blue-500 hover:text-blue-500"
                            : "text-gray-400 group-hover:text-blue-500"
                        }`}
                        aria-hidden="true"
                      />
                      <span className="flex-1">{item.name}</span>
                      <MdOutlineKeyboardArrowRight
                        className={`ml-3 flex-shrink-0 h-5 w-5 transform group-hover:text-gray-400 transition-colors ease-in-out duration-150 ${
                          open ? "text-gray-400 rotate-90" : "text-gray-300"
                        }`}
                      />
                    </AccordionTrigger>
                    <div className="space-y-1 border-l-2 border-gray-300 ml-5">
                      {item.children?.map((subItem, index) => (
                        <AccordionContent
                          key={subItem.name}
                          className="group w-full flex items-center pl-11 pr-2 py-2 text-sm font-medium text-grayCustom hover:text-blueCustom hover:bg-blueCustom/10 border-l-2 border-transparent hover:border-blueCustom"
                        >
                          <a href={subItem.href}>{subItem.name}</a>
                        </AccordionContent>
                      ))}
                    </div>
                  </AccordionItem>
                </Accordion>
              )
            )}
          </nav>
        </div>
      </div>
      {/* second block */}
      <div
        className={`${secondBlockTitle ? "border-t border-gray-200" : ""} mb-2`}
      >
        <div className="flex justify-between items-center font-Inter mt-3">
          <h3 className="font-semibold text-slate-800 px-3">
            {secondBlockTitle}
          </h3>
          <BiPlus className="text-xl text-blue-700 cursor-pointer mr-3" />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 bg-white space-y-1" aria-label="Sidebar">
            {secondBlock?.map((item) => (
              <a
                key={item.name}
                // href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-Inter font-medium cursor-pointer border-l-2 ${
                  item.current
                    ? "bg-indigo-50 border-blue-600 text-blue-600"
                    : "border-transparent bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 hover:border-l-2 hover:border-blue-600"
                }`}
              >
                {/* <item.icon
                    className={classNames(
                      item.current ? 'text-blue-500 hover:text-blue-500' : `${item.name==="Twitter" ? "bg-blue-500 text-white rounded-full text-xl p-1" : item.name==="Whatsapp" ? "text-white bg-green-500 text-xl p-1 rounded-full" 
                      : item.name==="Facebook" ? "text-blue-700 text-xl" : item.name==="Instagram" ? "bg-instagram text-white rounded-full h-5 w-5 p-1"
                      : item.name==="mail" ? "bg-orange-400 text-white h-5 w-5 p-1 rounded-full" : "" } `,
                      `mr-3 flex-shrink-0`
                    )}
                    aria-hidden="true"
                  /> */}
                {secondBlockTitle === "Need Attention" ? (
                  ""
                ) : (
                  <div>
                    {item.name === "Twitter" && (
                      <p className="bg-blue-500 h-6 w-6 rounded-full flex justify-center items-center mr-3">
                        <item.icon
                          className={`${
                            item.current
                              ? "text-blue-500 hover:text-blue-500"
                              : "text-lg text-white  flex-shrink-0"
                          }`}
                          aria-hidden="true"
                        />
                      </p>
                    )}
                    {item.name === "Whatsapp" && (
                      <p className="bg-green-500 h-6 w-6 rounded-full flex justify-center items-center mr-3">
                        <item.icon
                          className={`${
                            item.current
                              ? "text-blue-500 hover:text-blue-500"
                              : "text-lg text-white "
                          }`}
                          aria-hidden="true"
                        />
                      </p>
                    )}
                    {item.name === "Facebook" && (
                      <item.icon
                        className={`${
                          item.current
                            ? "text-blue-500 hover:text-blue-500"
                            : "text-lg text-blue-700 h-6 w-6 mr-3"
                        }`}
                        aria-hidden="true"
                      />
                    )}
                    {item.name === "Instagram" && (
                      <p className="bg-rose-600 h-6 w-6 rounded-full flex justify-center items-center mr-3">
                        <item.icon
                          className={`${
                            item.current
                              ? "text-blue-500 hover:text-blue-500"
                              : "text-lg text-white "
                          }`}
                          aria-hidden="true"
                        />
                      </p>
                    )}
                    {item.name === "Mail" && (
                      <p className="bg-orange-400 h-6 w-6 rounded-full flex justify-center items-center mr-3">
                        <item.icon
                          className={`${
                            item.current
                              ? "text-blue-500 hover:text-blue-500"
                              : "text-lg text-white "
                          }`}
                          aria-hidden="true"
                        />
                      </p>
                    )}
                  </div>
                )}

                <span className="flex-1">{item.name}</span>
                {item.count ? (
                  <span
                    className={`ml-3 inline-flex justify-center items-center h-5 w-5 text-xs font-medium rounded-full ${
                      item.current
                        ? "bg-white"
                        : "text-blue-500 bg-blue-100 group-hover:bg-blue-200"
                    }`}
                  >
                    {item.count}
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {/* third block */}
      <div
        className={`${thirdBlockTitle ? "border-t border-gray-200" : ""} mb-2`}
      >
        <div className="flex justify-between items-center font-Inter mt-3">
          <h3 className="font-semibold text-slate-800 px-3">
            {thirdBlockTitle}
          </h3>
          <BiPlus className="text-xl text-blue-700 cursor-pointer mr-3" />
        </div>
        <div
          className={`${
            thirdBlockTitle === "Tagged with"
              ? "mt-5"
              : "mt-5 flex-grow flex flex-col"
          }`}
        >
          <nav
            className={`${
              thirdBlockTitle === "Tagged with"
                ? "bg-white flex flex-wrap"
                : "flex-1 bg-white space-y-1"
            }`}
            aria-label="Sidebar"
          >
            {thirdBlock?.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`
                  ${
                    thirdBlockTitle === "Tagged with"
                      ? "px-2 py-1 text-sm font-Inter font-medium text-gray-600"
                      : item.current
                      ? "bg-indigo-50 border-blue-600 text-blue-600"
                      : "border-transparent bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 border-l-2 hover:border-blue-600"
                  }    'group flex items-center px-3 py-2 text-sm font-Inter font-medium cursor-pointer' `}
              >
                {item.color === "red" && (
                  <p className="border-4 border-red-600 rounded-full mr-3"></p>
                )}
                {item.color === "yellow" && (
                  <p className="border-4 border-yellow-400 rounded-full mr-3"></p>
                )}
                {item.color === "blue" && (
                  <p className="border-4 border-blue-600 rounded-full mr-3"></p>
                )}
                {item.color === "gray" && (
                  <p className="border-4 border-slate-300 rounded-full mr-3"></p>
                )}
                {item.color === "green" && (
                  <p className="border-4 border-green-600 rounded-full mr-3"></p>
                )}

                {thirdBlockTitle === "Tagged with" ? (
                  <div
                    className={`${
                      item.current
                        ? "bg-blue-600 text-white py-1 px-3 rounded-full b"
                        : "border border-gray-300 py-1 px-3 rounded-full text-slate-700 hover:bg-blue-600 hover:text-white"
                    }`}
                  >
                    {item.name}
                  </div>
                ) : (
                  item.name
                )}
              </a>
            ))}
          </nav>
        </div>
      </div>
      {/* four block */}
      <div className={`${fourthBlockTitle ? "border-t border-gray-200" : ""}`}>
        <div className="flex justify-between items-center font-Inter mt-3">
          <h3 className="font-semibold text-slate-800 px-3">
            {fourthBlockTitle}
          </h3>
          <BiPlus className="text-xl text-blue-700 cursor-pointer mr-3" />
        </div>
        <div className="mt-5 flex-grow flex flex-col">
          <nav className="flex-1 bg-white space-y-1" aria-label="Sidebar">
            {fourthBlock?.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center px-3 py-2 text-sm font-Inter font-medium cursor-pointer ${
                  item.current
                    ? "border-transparent text-blue-600 hover:bg-blue-50 border-l-2 hover:border-blue-600"
                    : "border-transparent bg-white text-gray-600 hover:text-blue-600 hover:bg-blue-50 border-l-2 hover:border-blue-600"
                }`}
              >
                <item.icon
                  className={`mr-3 flex-shrink-0 h-5 w-5 ${
                    item.current
                      ? "bg-white text-blue-700 rounded-md"
                      : "text-gray-400 group-hover:text-blue-500"
                  }`}
                  aria-hidden="true"
                />

                {item.name}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Home;
