import React, { useContext, Fragment } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { signOut, useSession } from "next-auth/react";
import { DrawerNavContext } from "@layout/MainLayout";
import { MainNav } from "@layout/utils/ActiveNavLists";
import { RxCross1 } from "react-icons/rx";
import { BiArea } from "react-icons/bi";
import { HiOutlineUser } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";
import { AiOutlinePlus } from "react-icons/ai";
import { Button } from "@shadcn/button";
import { IoLanguageOutline, IoLogOutOutline } from "react-icons/io5";
import { GoBell } from "react-icons/go";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@shadcn/accordion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@shadcn/dropdown-menu";

// import logo from "../../assets/diwan_logo.png";
// import avatar from "../../assets/user_avatar.png";

// const user = {
//   name: "Tom Cook",
//   email: "tom@example.com",
//   imageUrl: avatar,
// };

const userNavigation = [
  { name: "Your Profile", href: "#" },
  { name: "Settings", href: "#" },
  { name: "Sign out", href: "#" },
];
// const publishingOptions = [
//   { title: "Create New", description: "This job posting can be viewed by anyone who has the link.", current: true },
//   { title: "Add New", description: "This job posting will no longer be publicly accessible.", current: false },
// ];

const Navbar = ({
  avatar,
  statusHandler,
  status,
}: {
  avatar: string;
  statusHandler: (status: number) => void;
  status: any;
}) => {
  // const [selected, setSelected] = useState(publishingOptions[0]);
  const session = useSession();
  const router = useRouter();
  const { t } = useTranslation("navigation");
  const { pathname, query, asPath, locales } = router;
  const { navShow, setNavShow } = useContext(DrawerNavContext);

  const userSignOut = () => {
    signOut({ redirect: true, callbackUrl: router.asPath });
  };

  return (
    <>
      <Accordion type="single" collapsible className="bg-white h-16 border-b">
        <AccordionItem value="item-1">
          <div className="w-full px-5 sm:px-6 lg:px-5">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <AccordionTrigger className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    {open ? (
                      <RxCross1 className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <BiArea className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </AccordionTrigger>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  {/* {!navShow && <Image onClick={toggleNav} width={40} height={40} className="block lg:hidden" src={"/images/logo.png"} alt="Dewan" />} */}
                  {!navShow && (
                    <Image
                      onClick={() => setNavShow(true)}
                      width={28}
                      height={28}
                      src={"/images/h_logo.png"}
                      alt="logo_Fluent"
                    />
                  )}
                  {navShow && (
                    <Image
                      width={28}
                      height={28}
                      src={"/images/h_logo.png"}
                      alt="logo_Fluent"
                    />
                  )}
                </div>
                <div className="hidden md:ml-8 md:flex md:space-x-8">
                  <MainNav
                    routerPathname={router.pathname}
                    activeRole={session?.data?.user?.role}
                  />
                  {/* Current: "border-indigo-500 text-gray-900", Default: "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700" */}
                  {/* <a href="/dashboard" className="inline-flex items-center border-b-2 border-primary px-1 pt-1 text-sm font-medium text-third">
                      Home
                    </a> */}
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0 flex items-center gap-2">
                  {/* <button
                      type="button"
                      className="relative inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      <span>New Job</span>
                    </button> */}

                  {router.pathname.startsWith("/tickets") && (
                    <Link
                      href={`${
                        router.pathname.includes("tickets")
                          ? "/tickets/create"
                          : router.pathname.includes("inboxes")
                          ? "/settings/inboxes/new"
                          : router.pathname
                      }`}
                    >
                      <Button
                        type="button"
                        className="flex justify-center bg-blueCustom text-white font-semibold text-sm px-6 py-2 rounded-md border border-gray-300"
                      >
                        <span>{t("NAVIGATION.main.ticketButton")}</span>
                        <AiOutlinePlus
                          className="-mr-1 ml-2 h-5 w-5"
                          aria-hidden="true"
                        />
                      </Button>
                    </Link>
                  )}
                  {/* <button type="button" className="text-blueCustom font-semibold text-sm px-6 py-2 rounded-md border border-gray-300">
                    Break for 20 min
                  </button> */}
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
                  {/* <button
                    type="button"
                    className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <span className="sr-only">View notifications</span>
                    <BellIcon className="h-6 w-6" aria-hidden="true" />
                  </button> */}

                  {/* Profile dropdown */}
                  {/* menu will be here */}
                  <div className="relative ml-3">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        className={`relative h-7 w-7 flex rounded-full bg-white text-sm ring-2 ${
                          status === 1
                            ? "ring-blueCustom"
                            : status === 0
                            ? "ring-grayCustom"
                            : ""
                        } ring-offset-2`}
                      >
                        {session?.data?.user?.avatar_url ? (
                          <img
                            className="h-7 w-7 rounded-full"
                            src={session.data.user?.avatar_url}
                            alt=""
                          />
                        ) : (
                          <span className="flex h-full w-full items-center justify-center text-xl text-slate-400 bg-slate-100 rounded-full capitalize">
                            {session?.data?.user?.name?.slice(0, 1)}
                          </span>
                        )}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="absolute right-0 z-50 mt-2 w-60 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <p
                              className={`[data-state=checked]:bg-gray-100 block px-4 py-2 text-sm text-blueCustom w-full`}
                            >
                              {session?.data?.user?.name}
                              <span className="block text-gray-700">
                                {session?.data?.user?.email}
                              </span>
                            </p>
                          </DropdownMenuItem>

                          <DropdownMenuGroup>
                            {/* <DropdownMenuItem>
                              <Link href="#">
                                <a
                                  className={`[data-state=checked]:bg-pastelBlueCustom text-sm text-gray-700 w-32 ml-4 py-0.5 rounded-md block`}
                                >
                                  <div className="flex items-center px-3">
                                    <p className="w-3 h-3 bg-[#FF9901] rounded-full"></p>
                                    <span className="mx-2 inline-block">
                                      Break
                                    </span>
                                  </div>
                                </a>
                              </Link>
                            </DropdownMenuItem> */}
                            <p className="px-4 py-2 text-sm text-blueCustom font-bold">
                              Version-tweeq-2.2.10
                            </p>
                            <p className="px-4 py-2 text-sm text-gray-700">
                              Change my Status
                            </p>
                            <DropdownMenuItem>
                              <Button
                                onClick={() => statusHandler(1)}
                                className={`block text-sm w-52 ml-4 my-2 py-0.5 text-gray-700 rounded-md ${
                                  status === 1 ? "bg-greenCustom/25" : ""
                                }`}
                              >
                                <div className="flex items-center px-3">
                                  <p className="w-3 h-3 bg-greenCustom rounded-full"></p>
                                  <span className="mx-2 inline-block">
                                    {t("NAVIGATION.userMenu.online")}
                                  </span>
                                </div>
                              </Button>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                              <Link href="#">
                                <a
                                  className={`[data-state=chedked]:bg-pastelBlueCustom block text-sm w-32 ml-4 my-2 py-0.5 text-gray-700 rounded-md`}
                                >
                                  <div className="flex items-center px-3">
                                    <p className="w-3 h-3 bg-[#01A4FF] rounded-full"></p>
                                    <span className="mx-2 inline-block">
                                      Couching
                                    </span>
                                  </div>
                                </a>
                              </Link>
                            </DropdownMenuItem> */}
                            <DropdownMenuItem>
                              <Button
                                onClick={() => statusHandler(0)}
                                className={`block w-52 ml-4 text-sm my-2 py-0.5 text-gray-700 rounded-md ${
                                  status === 0 ? "bg-grayCustom/25" : ""
                                }`}
                              >
                                <div className="flex items-center px-3">
                                  <p className="w-3 h-3 bg-[#555555] rounded-full"></p>
                                  <span className="mx-2 inline-block">
                                    {t("NAVIGATION.userMenu.offline")}
                                  </span>
                                </div>
                              </Button>
                            </DropdownMenuItem>
                            {/* <DropdownMenuItem>
                            <Link href="#"  >
                              <a className={`[data-state=checked]:bg-gray-100 block px-4 py-2 text-sm text-gray-700`}>
                                {router.locale === "ar" ? (
                                  <button onClick={() => router.push({ pathname, query }, asPath, { locale: `en` })}>English (en)</button>
                                ) : (
                                  <button onClick={() => router.push({ pathname, query }, asPath, { locale: `ar` })}>العربية (ar)</button>
                                )}
                              </a>
                              </Link>
                            </DropdownMenuItem> */}
                          </DropdownMenuGroup>

                          <DropdownMenuItem>
                            <div
                              className={`[data-state=checked]:bg-gray-100 w-full text-sm text-gray-700  px-4 py-2 flex justify-start items-center gap-2`}
                            >
                              <IoLanguageOutline className="text-lg" />
                              {router.locale === "ar" ? (
                                <Button
                                  className="h-full w-full flex justify-start"
                                  onClick={() =>
                                    router.push({ pathname, query }, asPath, {
                                      locale: `en`,
                                    })
                                  }
                                >
                                  English (en)
                                </Button>
                              ) : (
                                <Button
                                  className="h-full w-full flex justify-start"
                                  onClick={() =>
                                    router.push({ pathname, query }, asPath, {
                                      locale: `ar`,
                                    })
                                  }
                                >
                                  العربية (ar)
                                </Button>
                              )}
                            </div>
                          </DropdownMenuItem>

                          <DropdownMenuItem>
                            <Link
                              href="/profile-settings"
                              className={`[data-state=checked]:bg-gray-100 block px-4 py-2 text-sm text-gray-700`}
                            >
                              <div className="flex items-center gap-2">
                                <HiOutlineUser className="text-lg" />{" "}
                                {t("NAVIGATION.userMenu.profileSettings")}
                              </div>
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <div
                              onClick={userSignOut}
                              className={`[data-state=checked]:bg-gray-100 cursor-pointer block px-4 py-2 text-sm text-gray-700`}
                            >
                              <div className="flex items-center gap-2">
                                <IoLogOutOutline className="text-lg" />{" "}
                                {t("NAVIGATION.userMenu.logout")}
                              </div>
                            </div>
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <AccordionContent className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              {/* Current: "bg-indigo-50 border-indigo-500 text-indigo-700", Default: "border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700" */}
              <AccordionTrigger>
                <a
                  href="#"
                  className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
                >
                  Dashboard
                </a>
              </AccordionTrigger>
              <AccordionTrigger>
                <a
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Team
                </a>
              </AccordionTrigger>
              <AccordionTrigger>
                <a
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Projects
                </a>
              </AccordionTrigger>
              <AccordionTrigger>
                <a
                  href="#"
                  className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
                >
                  Calendar
                </a>
              </AccordionTrigger>
            </div>
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src={avatar} alt="" />
                </div>
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    Tom Cook
                  </div>
                  <div className="text-sm font-medium text-gray-500">
                    tom@example.com
                  </div>
                </div>
                <Button
                  type="button"
                  className="ml-auto flex-shrink-0 rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  <span className="sr-only">View notifications</span>
                  <GoBell className="h-6 w-6" aria-hidden="true" />
                </Button>
              </div>
              <div className="mt-3 space-y-1">
                <AccordionTrigger>
                  <a
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                  >
                    Your Profile
                  </a>
                </AccordionTrigger>
                <AccordionTrigger>
                  <a
                    href="#"
                    className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                  >
                    Settings
                  </a>
                </AccordionTrigger>
                <AccordionTrigger>
                  <div>
                    <button
                      className="block px-4 py-2 text-base font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-800 sm:px-6"
                      onClick={() => userSignOut()}
                    >
                      Sign out
                    </button>
                  </div>
                </AccordionTrigger>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Navbar;
