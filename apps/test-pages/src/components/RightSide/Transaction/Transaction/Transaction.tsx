import React, { useState, useRef } from "react";
import { DetailsMap, TransactionDataType } from "./Transaction.types";
import { FiArrowDownLeft, FiArrowUpRight, FiSearch } from "react-icons/fi";
import { FaApple } from "react-icons/fa";
import moment from "moment";
import { CiSearch } from "react-icons/ci";
import SingleProfileTransaction from "../SingleProfileTransaction/SingleProfileTransaction";
import TransactionProfile from "../TransactionProfile/TransactionProfile";
import { useGetCRMTransactionData } from "@api-lib/requests";
import { CRMCustomerData } from "@pages/api/crm/customer";
import { Button } from "@shadcn/button";
import { RxCross2 } from "react-icons/rx";

const Transaction = ({
  accountData,
}: {
  accountData: CRMCustomerData["accountDetails"]["data"];
}) => {
  const [pageToken, setPageToken] = useState();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef(null);
  const [singleTransaction, setSingleTransaction] = useState("close");
  const [activeTransactionData, setActiveTransactionData] =
    useState<TransactionDataType>();
  const { data, isLoading } = useGetCRMTransactionData({
    crmAccountId: accountData[0]?.id,
    pageToken,
    reference: searchTerm,
    pageSize: 20,
  });

  const setSearchTermFunc = (term) => {
    setSearchTerm(term);
  };

  const transactionIcon = (item: TransactionDataType) => {
    return item?.type === "INCOMING_P2P_TRANSFER" ? (
      <div className="w-20">
        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#3AB545]/10">
          <FiArrowDownLeft className="text-[#3AB545] text-3xl font-semibold " />
        </div>
      </div>
    ) : item?.type === "OUTGOING_P2P_TRANSFER" ? (
      <div className="w-20">
        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#3AB545]/10">
          <FiArrowUpRight className="text-blueCustom text-3xl font-semibold " />
        </div>
      </div>
    ) : item?.type === "NOON_TOPUP_VISA_APPLE_PAY" ? (
      <div className="w-20">
        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-black">
          <FaApple className="text-white text-2xl font-semibold -mt-1" />
        </div>
      </div>
    ) : // ) : item?.detailsMap?.scheme_acceptor_name === "AMAZON" ? (
    //   <div className="w-20">
    //     <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#3AB545]/10">
    //       <FiArrowUpRight className="text-[#3AB545] text-3xl font-semibold " />
    //     </div>
    //   </div>
    item?.type === "NOON_TOPUP_MASTERCARD_CARD" ? (
      <div className="w-20">
        <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#3AB545]/10">
          <FiArrowDownLeft className="text-[#3AB545] text-3xl font-semibold " />
        </div>
      </div>
    ) : null;
  };

  // const today = moment().startOf("day");
  // const yesterday = moment().subtract(1, "day");
  // const lastWeek = moment().subtract(8, "day").startOf("day");
  // const lastMonth = moment().subtract(37, "day").startOf("day");

  const transactionData: TransactionDataType[] = data?.data?.map((item) => {
    const detailsObj = item?.detailsMap?.reduce((acc, [key, value]) => {
      acc[key] = value;
      return acc;
    }, {} as DetailsMap);
    return { ...item, detailsMap: detailsObj };
  });

  const sortedTransactionData =
    transactionData &&
    transactionData.sort(
      (a: TransactionDataType, b: TransactionDataType) =>
        b?.createdAt?.seconds - a?.createdAt?.seconds
    );

  // const filteredToday = sortedTransactionData?.filter((item) => {
  //   const createdAt = moment.unix(item.createdAt.seconds);
  //   return createdAt.isSame(today, "day");
  // });
  // const filteredWeek = sortedTransactionData?.filter((item) => {
  //   const createdAt = moment.unix(item.createdAt.seconds);
  //   return createdAt.isBetween(lastWeek, yesterday, "day", "[]");
  // });
  // const filteredMonth = sortedTransactionData?.filter((item) => {
  //   const createdAt = moment.unix(item.createdAt.seconds);
  //   return createdAt.isBetween(lastMonth, lastWeek, "day", "[]");
  // });

  // const allPrevious = sortedTransactionData?.filter((item) => {
  //   const createdAt = moment.unix(item.createdAt.seconds);
  //   return !!createdAt.isSameOrBefore(lastMonth, "day");
  // });

  return (
    <>
      {singleTransaction === "close" && (
        <div className="rounded h-full">
          {/* <div className="border-b border-lineGrayCustom">
          <div className="flex items-center gap-x-2 h-10">
            <CiSearch className="ml-2 text-grayCustom text-3xl" />
            <input
              type="text"
              className="border-0 h-full focus:outline-none w-full text-small font-medium leading-4 placeholder:text-grayCustom"
              placeholder="Search for transactions"
            />
            <TransactionFilterIcon />
          </div>
        </div> */}

          <div>
            <div className="grow flex justify-start items-center relative h-full group border-0 border-b border-lineGrayCustom">
              <FiSearch className="text-grayCustom text-xl absolute left-4 group-focus:hidden pointer-events-none" />
              <input
                type="text"
                onChange={(e) => setSearchTermFunc(e.target.value)}
                ref={inputRef}
                className="border-none ring-0 focus:ring-0 focus:outline-none outline-none pl-12 w-full h-full text-sm font-medium text-grayCustom focus:placeholder:hidden placeholder:text-xs placeholder:font-semibold transition-all"
                placeholder="Search for Transaction"
              />
              {searchTerm.length > 0 && (
                <RxCross2
                  onClick={() => (
                    setSearchTermFunc(""), (inputRef.current.value = "")
                  )}
                  className="text-grayCustom absolute right-4 cursor-pointer h-6 w-6"
                />
              )}
            </div>
          </div>

          {isLoading ? (
            <p>loading...</p>
          ) : (
            sortedTransactionData?.length > 0 && (
              <div className="border-b border-lineGrayCustom outline-none">
                <div className="p-4">
                  {/* <p className="font-semibold leading-6 text-darkCustom">Today</p> */}
                  {sortedTransactionData?.map((item) => {
                    return (
                      <TransactionProfile
                        key={item?.id}
                        item={item}
                        setActiveTransactionData={setActiveTransactionData}
                        setSingleTransaction={setSingleTransaction}
                        transactionIcon={transactionIcon}
                      />
                    );
                  })}
                </div>
              </div>
            )
          )}
          {/* {filteredWeek?.length > 0 && (
          <div className="border-b border-lineGrayCustom">
            <div className="p-4">
              <p className="font-semibold text-md leading-6 text-darkCustom">Last 7 days</p>
              {filteredWeek?.map((item) => {
                return (
                  <TransactionProfile
                    key={item.id}
                    item={item}
                    setActiveTransactionData={setActiveTransactionData}
                    setSingleTransaction={setSingleTransaction}
                    transactionIcon={transactionIcon}
                  />
                );
              })}
            </div>
          </div>
        )} */}
          {/* {filteredMonth?.length > 0 && (
          <div className="border-b border-lineGrayCustom">
            <div className="p-4">
              <p className="font-semibold text-md leading-6 text-darkCustom">Previous 30 days</p>
              {filteredMonth?.map((item) => {
                return (
                  <TransactionProfile
                    key={item.id}
                    item={item}
                    setActiveTransactionData={setActiveTransactionData}
                    setSingleTransaction={setSingleTransaction}
                    transactionIcon={transactionIcon}
                  />
                );
              })}
            </div>
          </div>
        )} */}
          {/* {allPrevious?.length > 0 && (
          <div className="border-b border-lineGrayCustom">
            <div className="p-4">
              <p className="font-semibold text-md leading-6 text-darkCustom">Older Transactions</p>
              {allPrevious?.map((item) => {
                return (
                  <TransactionProfile
                    key={item.id}
                    item={item}
                    setActiveTransactionData={setActiveTransactionData}
                    setSingleTransaction={setSingleTransaction}
                    transactionIcon={transactionIcon}
                  />
                );
              })}
            </div>
          </div>
        )} */}
          {!!transactionData && (
            <div className="flex justify-center items-center ">
              <button
                onClick={() => setPageToken(+data?.nextPageToken)}
                className="px-4 py-1 bg-blueCustom/60 hover:bg-blueCustom rounded text-white my-2"
              >
                {data?.nextPageToken !== "" ? "Load More" : "Reset"}
              </button>
            </div>
          )}
          {!isLoading && !transactionData && (
            <p className="flex justify-center text-red-400">
              No transaction found
            </p>
          )}
          {/* <div className="border-b border-lineGrayCustom">
          <div className="p-4">
            <div>
              <p className="font-normal text-normal leading-6 text-darkCustom">This Week</p>

              <div className="flex gap-x-4 items-center my-6 cursor-pointer">
                <div className="h-9 w-10 rounded-full flex justify-center items-center bg-black">
                  <BsApple className="text-white text-2xl font-semibold " />
                </div>
                <div className="w-full flex items-center justify-between">
                  <div>
                    <p className="font-medium text-normal leading-6 text-darkCustom">Apple</p>
                    <p className="font-medium text-small leading-4 text-grayCustom">Shop</p>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    <p className="font-bold text-normal leading-6 text-darkCustom">1,180.00</p>
                    <MdOutlineKeyboardArrowRight className="font-bold text-2xl text-grayCustom" />
                  </div>
                </div>
              </div>

              <div className="flex gap-x-4 items-center my-6 cursor-pointer">
                <BsSpotify className="text-black text-4xl font-semibold " />

                <div className="w-full flex items-center justify-between">
                  <div>
                    <p className="font-medium text-normal leading-6 text-darkCustom">Spotify</p>
                    <p className="font-medium text-small leading-4 text-grayCustom">Cash withdrawal</p>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    <p className="font-bold text-normal leading-6 text-darkCustom">011,00</p>
                    <MdOutlineKeyboardArrowRight className="font-bold text-2xl text-grayCustom" />
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="font-normal text-normal leading-6 text-darkCustom">April</p>

              <div className="flex gap-x-4 items-center my-6 cursor-pointer">
                <Image src="/images/centerpoint-logo.png" height={40} width={40} />
                <div className="w-full flex items-center justify-between">
                  <div>
                    <p className="font-medium text-normal leading-6 text-darkCustom">Centerpoint</p>
                    <p className="font-medium text-small leading-4 text-grayCustom">Shop</p>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    <p className="font-bold text-normal leading-6 text-darkCustom">322.00</p>
                    <MdOutlineKeyboardArrowRight className="font-bold text-2xl text-grayCustom" />
                  </div>
                </div>
              </div>

              <div className="flex gap-x-4 items-center my-6 cursor-pointer">
                <div className="h-9 w-10 rounded-full flex justify-center items-center bg-[#3AB545]/10">
                  <BsPlusLg className="text-[#3AB545] text-2xl font-semibold " />
                </div>

                <div className="w-full flex items-center justify-between">
                  <div>
                    <p className="font-medium text-normal leading-6 text-darkCustom">Salary Payment</p>
                    <p className="font-medium text-small leading-4 text-grayCustom">Cash withdrawal</p>
                  </div>
                  <div className="flex gap-x-4 items-center">
                    <p className="font-bold text-normal leading-6 text-[#3AB545]">+4,011,00</p>
                    <MdOutlineKeyboardArrowRight className="font-bold text-2xl text-grayCustom" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
        </div>
      )}

      {singleTransaction === "active" && (
        <SingleProfileTransaction
          setSingleTransaction={setSingleTransaction}
          activeTransactionData={activeTransactionData}
        />
      )}
    </>
  );
};

export default Transaction;
