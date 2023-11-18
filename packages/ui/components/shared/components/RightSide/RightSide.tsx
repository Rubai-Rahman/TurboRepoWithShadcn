import React, { useEffect, useState } from "react";
import { useContactById } from "@api-lib/graphql";
import UserProfile from "./UserProfile/UserProfile";
import KnowledgeBase from "./KnowledgeBase/KnowledgeBase";
import ResponsePanel from "./ResponsePanel/ResponsePanel";
import UserAccccount from "./UserAccount/UserAccccount";
import Transaction from "./Transaction/Transaction/Transaction";
import TicketProperties from "./TicketProperties/TicketProperties";
import ProfileSkeleton from "./UserProfile/Profile.skeleton";
import { IoCardOutline } from "react-icons/io5";
import { BiTransfer, BiUserCircle } from "react-icons/bi";
import { AiOutlineThunderbolt, AiOutlineUser } from "react-icons/ai";
import { Knowledge_base_icon } from "@shared/icons/knowledgeBaseIcon";
import { useRouter } from "next/router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@shadcn/tabs";
import { TbArrowsCross } from "react-icons/tb";
import { CRMCustomerData } from "@pages/api/crm/customer";
import Cards from "@components/Card/Cards";

const RightSide = ({ contactId }) => {
  const router = useRouter();
  const {
    data: contactData,
    isLoading: contactLoading,
    status: contactStatus,
  } = useContactById(contactId, { enabled: !!contactId });
  const [crmData, setCrmData] = useState<CRMCustomerData>(null);
  const handleCrmData = (data: CRMCustomerData) => {
    setCrmData(data);
  };
  useEffect(() => {
    setCrmData(null);
  }, [contactId]);

  const appData = [
    {
      section: "user",
      icon: <AiOutlineUser className="h-6 w-6" />,
    },
    {
      section: "knowledge",
      icon: <Knowledge_base_icon fill="green" />,
    },
    /*   {
      section: "guided-workflow",
      icon: <TbDeviceWatch className="h-6 w-6" />,
      panel: <GuidedWorkflow />,
    }, */
    {
      section: "response",
      icon: <AiOutlineThunderbolt className="h-6 w-6" />,
    },
  ];

  const crmTabsData =
    crmData !== null
      ? [
          {
            section: "account",
            icon: <BiUserCircle className="h-6 w-6" />,
          },
          {
            section: "transaction",
            icon: <BiTransfer className="h-6 w-6" />,
          },
          {
            section: "failed transaction",
            icon: <TbArrowsCross className="h-6 w-6" />,
          },
          {
            section: "Cards",
            icon: <IoCardOutline className="h-6 w-6" />,
          },
          // {
          //   section: "beneficiaries",
          //   icon: <CiMoneyBill className="h-6 w-6" />,
          // },
          // {
          //   section: "boarding",
          //   icon: <BoardingIcon width={24} height={24} color="#6B7280" />,
          // },
          // {
          //   section: "notification",
          //   icon: <NotificationIcon className="h-6 w-6" />,
          // },
          // {
          //   section: "activity-log",
          //   icon: <RiFileList2Line className="h-6 w-6" />,
          // },
        ]
      : [];

  const tabData = [...appData, ...crmTabsData];

  return (
    <div className="h-full flex justify-end border-l border-lineGrayCustom">
      <Tabs defaultValue="Tab-0" orientation="vertical">
        <TabsList className="flex flex-col order-last border border-lineGrayCustom h-full w-16">
          {tabData.map((tab, index) => (
            <TabsTrigger
              key={index}
              value={`Tab-${index}`}
              className="flex justify-center items-center overflow-hidden p-3 [data-state=active]:text-blueCustom [data-state=active]:bg-blueCustom/10 [data-state=active]:border-l-2 [data-state=active]:border-blueCustom [data-state=active]:outline-none [data-state=inactive]:border-l-2 [data-state=inactive]:text-grayCustom [data-state=inactive]:border-transparent [data-state=inactive]:outline-none"
            >
              {tab.icon}
            </TabsTrigger>
          ))}
          {router.pathname.includes("/tickets") && (
            <TabsTrigger
              value="Tab-t"
              className="flex justify-center items-center overflow-hidden p-3 focus:outline-none [data-state=active]:text-blueCustom [data-state=active]:bg-blueCustom/10 [data-state=active]:border-l-2 [data-state=active]:border-blueCustom [data-state=inactive]:border-l-2 [data-state=inactive]:text-grayCustom [data-state=inactive]:border-transparent"
            >
              <p className="font-semibold text-xl">t</p>
            </TabsTrigger>
          )}
        </TabsList>
        <div className="h-full overflow-hidden">
          <>
            <TabsContent
              value="Tab-0"
              className="max-w-md w-[30rem] h-full overflow-hidden hover:overflow-y-auto"
            >
              {contactStatus === "loading" ? (
                <ProfileSkeleton />
              ) : contactStatus === "error" ? (
                <p>data error</p>
              ) : (
                <UserProfile
                  contactData={contactData}
                  handleCrmData={handleCrmData}
                  crmData={crmData}
                />
              )}
            </TabsContent>
            <TabsContent
              value="Tab-1"
              className="max-w-md w-[30rem] h-full overflow-hidden hover:overflow-y-auto"
            >
              <KnowledgeBase />
            </TabsContent>
            {/* <TabsContent value="Tab-2" className="max-w-md w-[30rem] h-full">
            <GuidedWorkflow />
          </TabsContent> */}
            <TabsContent
              value="Tab-3"
              className="max-w-md w-[30rem] h-full overflow-hidden hover:overflow-y-auto"
            >
              <ResponsePanel />
            </TabsContent>

            {crmData !== null && (
              <>
                <TabsContent
                  value="Tab-4"
                  className="max-w-md w-[30rem] h-full overflow-hidden hover:overflow-y-auto"
                >
                  {crmData?.customerDetails?.data === null ||
                  crmData?.customerDetails?.error ? (
                    <p className="text-sm text-red-500 text-center py-3">
                      {crmData?.customerDetails?.error?.details}
                    </p>
                  ) : (
                    <UserAccccount crmData={crmData} />
                  )}
                </TabsContent>

                <TabsContent
                  value="Tab-5"
                  className="max-w-md w-[30rem] h-full overflow-hidden hover:overflow-y-auto"
                >
                  {crmData?.accountDetails?.data?.length > 0 ? (
                    <Transaction accountData={crmData.accountDetails.data} />
                  ) : crmData?.accountDetails?.error ? (
                    <p className="text-sm text-red-500 text-center py-3">
                      {crmData?.accountDetails?.error?.details}
                    </p>
                  ) : (
                    <p className="text-sm text-yellow-500 text-center py-3">
                      No transactions were found for this customer.
                    </p>
                  )}
                </TabsContent>

                <TabsContent
                  value="Tab-6"
                  className="max-w-md w-[30rem] h-full"
                >
                  {crmData?.cardDetails?.data?.length > 0 ? (
                    <Cards crmData={crmData} />
                  ) : crmData?.cardDetails?.error ? (
                    <p className="text-sm text-red-500 text-center py-3">
                      {crmData?.cardDetails?.error?.details}
                    </p>
                  ) : (
                    <p className="text-sm text-yellow-500 text-center py-3">
                      No cards were found for this customer.
                    </p>
                  )}
                </TabsContent>

                {/* <TabsContent value="Tab-7" className="max-w-md w-[30rem] h-full">
                  <Beneficiaries />
                </TabsContent>

                <TabsContent value="Tab-8" className="max-w-md w-[30rem] h-full">
                  <Boarding />
                </TabsContent>

                <TabsContent value="Tab-9" className="max-w-md w-[30rem] h-full overflow-hidden hover:overflow-y-auto">
                  <Notifications />
                </TabsContent>

                <TabsContent value="Tab-10" className="max-w-md w-[30rem] h-full overflow-hidden hover:overflow-y-auto">
                  <ActivityLog />
                </TabsContent> */}
              </>
            )}

            {router.pathname.includes("/tickets") && (
              <TabsContent
                value="Tab-11"
                className="max-w-md w-[30rem] h-full overflow-hidden hover:overflow-y-auto"
              >
                <TicketProperties />
              </TabsContent>
            )}
          </>
        </div>
      </Tabs>
    </div>
  );
};

export default RightSide;
