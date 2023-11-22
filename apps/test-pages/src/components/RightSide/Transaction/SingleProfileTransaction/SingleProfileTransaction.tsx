import React from 'react';
import { FaApple } from 'react-icons/fa';
import { FiArrowDownLeft, FiArrowUpRight } from 'react-icons/fi';
import { TransactionDataType } from './SingleProfileTransaction.types';
import { RxCross1 } from 'react-icons/rx';
import moment from 'moment';
import CustomAccordion from '@localShared/CustomAccordion/CustomAccordion';


const SingleProfileTransaction = ({
  setSingleTransaction,
  activeTransactionData,
}: {
  setSingleTransaction: (value:any) => void;
  activeTransactionData: TransactionDataType;
}) => {
  // console.log(activeTransactionData);
  const transactionIcon = (item: TransactionDataType) => {
    return item.type === 'INCOMING_P2P_TRANSFER' ? (
      <div className="h-[70px] w-20 rounded-full flex justify-center items-center bg-[#3AB545]/10">
        <FiArrowDownLeft className="text-[#3AB545] text-5xl font-semibold " />
      </div>
    ) : item.type === 'OUTGOING_P2P_TRANSFER' ? (
      <div className="h-[70px] w-20 rounded-full flex justify-center items-center bg-[#3AB545]/10">
        <FiArrowUpRight className="text-blueCustom text-5xl font-semibold " />
      </div>
    ) : item.type === 'NOON_TOPUP_VISA_APPLE_PAY' ? (
      <div className="h-[70px] w-20 rounded-full flex justify-center items-center bg-black">
        <FaApple className="text-white text-5xl font-semibold -mt-1" />
      </div>
    ) : // : item.detailsMap?.scheme_acceptor_name === "AMAZON" ? (
    //   <div className="w-20">
    //     <div className="w-12 h-12 rounded-full flex justify-center items-center bg-[#3AB545]/10">
    //       <FiArrowUpRight className="text-[#3AB545] text-5xl font-semibold " />
    //     </div>
    //   </div>
    // )
    item.type === 'NOON_TOPUP_MASTERCARD_CARD' ? (
      <div className="h-[70px] w-20 rounded-full flex justify-center items-center bg-[#3AB545]/10">
        <FiArrowDownLeft className="text-[#3AB545] text-5xl font-semibold " />
      </div>
    ) : null;
  };

  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <p className="font-normal text-normal leading-6 text-darkCustom">
          Transaction details
        </p>
        <RxCross1
          onClick={() => setSingleTransaction('close')}
          className="cursor-pointer font-thin h-5 w-5"
        />
      </div>

      <div className="mt-5 pb-5 flex flex-col gap-y-6 justify-center items-center border-b border-lineGrayCustom">
        {transactionIcon(activeTransactionData)}
        <div className="flex flex-col gap-y-3 justify-center items-center">
          <p className="font-bold text-2xl leading-6 text-darkCustom">
            {activeTransactionData?.detailsMap?.sender_first_name_english}{' '}
            {activeTransactionData?.detailsMap?.sender_last_name_english}
            {/* {activeTransactionData?.detailsMap?.scheme_acceptor_name} */}
            {activeTransactionData.type === 'NOON_TOPUP_MASTERCARD_CARD' && (
              <span className="uppercase">Topup Amount</span>
            )}
            {activeTransactionData.detailsMap?.scheme_acceptor_name}
          </p>
          <p className="font-medium text-normal leading-5 text-grayCustom">
            {/* {activeTransactionData?.detailsMap?.funds_transfer_tx_created_at && moment(activeTransactionData?.detailsMap?.funds_transfer_tx_created_at).format("DD MMMM, hh:mm a")} */}
            {moment
              .unix(activeTransactionData?.createdAt?.seconds)
              .format('DD MMMM, hh:mm a')}
          </p>
          <p
            className={`${
              !activeTransactionData.isDebit
                ? 'font-medium text-big leading-5 text-[#3AB545]'
                : 'font-medium text-big leading-5 text-red-500'
            }`}
          >
            {activeTransactionData?.detailsMap?.cr_currency === '682'
              ? 'SAR'
              : activeTransactionData?.detailsMap?.cr_currency === '840'
              ? 'USD'
              : activeTransactionData?.detailsMap?.scheme_tx_currency === '682'
              ? 'SAR'
              : activeTransactionData?.detailsMap?.scheme_tx_currency === '840'
              ? 'USD'
              : null}
            <span className="text-bigger font-semibold pl-1">
              {(activeTransactionData?.amount / 100).toFixed(2)}
            </span>
          </p>
        </div>
      </div>

      <div className="border-b border-lineGrayCustom">
        <CustomAccordion
          title="Transaction details"
          titleClass="font-normal text-normal leading-5"
          buttonClass="flex justify-between items-center p-4"
          rightSideIconClass="text-blueCustom font-semibold text-xl"
        >
          <div className="px-4">
            <div className="py-2">
              <strong>transaction type: </strong>
              <p>{activeTransactionData.type}</p>
            </div>

            {Object.keys(activeTransactionData.detailsMap).map((key) => (
              <div key={key} className="py-2">
                <strong>{key.replaceAll('_', ' ')}: </strong>
                <p>{activeTransactionData.detailsMap[key]}</p>
              </div>
            ))}
          </div>
        </CustomAccordion>
      </div>

      {/* <div className="my-4">
        <p className="font-medium text-big leading-6 text-darkCustom my-3 px-4">Similar Transactions</p>

        <p className="font-normal text-normal leading-6 text-darkCustom px-4 my-4">Today</p>

        <div className="border-b border-lineGrayCustom pb-3">
          <CustomAccordion
            title="Khalid Ali"
            titleClass="font-medium text-normal leading-6 text-darkCustom"
            subTitle="Money received"
            subTitleClass="font-medium text-small leading-4 text-grayCustom"
            rightSideIcon={<MdOutlineKeyboardArrowRight className="font-bold text-2xl text-grayCustom" />}
            leftSideIcon={<FiArrowDownLeft className="text-[#3AB545] text-4xl font-semibold " />}
            leftSideIconParentClass="h-[48px] w-[50px] rounded-full flex justify-center items-center bg-[#3AB545]/10"
            rightSideTitle="180.00"
            rightSideTitleClass="font-bold text-normal leading-6 text-darkCustom"
            rightSideIconRotation="rotate-90"
          >
            <div className="px-4">
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Date &amp; time</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Today 09:55 PM</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Reference</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">TW-98734567890-30</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Description</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Cash withdrawal - ANB ATM Alyassmn</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Type</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Cash withdrawal</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Currency</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">SAR</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Amount</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">103.20</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Status</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Success</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Device</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">1139993-CV</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Account</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Saudi Riyal</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Card</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">**** **** **** 9988</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Reason</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Null</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Closing Balance</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">39650.50 SAR</p>
              </div>
            </div>
          </CustomAccordion>
        </div>

        <div className="border-b border-lineGrayCustom pb-3">
          <CustomAccordion
            title="Khalid Ali"
            titleClass="font-medium text-normal leading-6 text-darkCustom"
            subTitle="Money sent"
            subTitleClass="font-medium text-small leading-4 text-grayCustom"
            rightSideIcon={<MdOutlineKeyboardArrowRight className="font-bold text-2xl text-grayCustom" />}
            leftSideIcon={<FiArrowUpRight className="text-[#156FFF] text-4xl font-semibold " />}
            leftSideIconParentClass="h-[48px] w-[50px] rounded-full flex justify-center items-center bg-[#156FFF]/10"
            rightSideTitle="180.00"
            rightSideTitleClass="font-bold text-normal leading-6 text-darkCustom"
            rightSideIconRotation="rotate-90"
          >
            <div className="px-4">
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Date &amp; time</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Today 09:55 PM</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Reference</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">TW-98734567890-30</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Description</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Cash withdrawal - ANB ATM Alyassmn</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Type</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Cash withdrawal</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Currency</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">SAR</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Amount</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">103.20</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Status</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Success</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Device</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">1139993-CV</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Account</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Saudi Riyal</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Card</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">**** **** **** 9988</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Reason</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Null</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Closing Balance</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">39650.50 SAR</p>
              </div>
            </div>
          </CustomAccordion>
        </div>

        <div className="border-b border-lineGrayCustom pb-3">
          <p className="font-normal text-normal leading-6 text-darkCustom px-4 my-4">Last Week</p>

          <CustomAccordion
            title="Khalid Ali"
            titleClass="font-medium text-normal leading-6 text-darkCustom"
            subTitle="Money received"
            subTitleClass="font-medium text-small leading-4 text-grayCustom"
            rightSideIcon={<MdOutlineKeyboardArrowRight className="font-bold text-2xl text-grayCustom" />}
            leftSideIcon={<FiArrowDownLeft className="text-[#3AB545] text-4xl font-semibold " />}
            leftSideIconParentClass="h-[48px] w-[50px] rounded-full flex justify-center items-center bg-[#3AB545]/10"
            rightSideTitle="180.00"
            rightSideTitleClass="font-bold text-normal leading-6 text-darkCustom"
            rightSideIconRotation="rotate-90"
          >
            <div className="px-4">
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Date &amp; time</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Today 09:55 PM</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Reference</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">TW-98734567890-30</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Description</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Cash withdrawal - ANB ATM Alyassmn</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Type</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Cash withdrawal</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Currency</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">SAR</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Amount</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">103.20</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Status</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Success</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Device</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">1139993-CV</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Account</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Saudi Riyal</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Card</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">**** **** **** 9988</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Reason</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">Null</p>
              </div>
              <div className="my-2">
                <p className="text-grayCustom leading-6 text-small font-medium">Closing Balance</p>
                <p className="text-darkCustom leading-6 text-normal font-medium">39650.50 SAR</p>
              </div>
            </div>
          </CustomAccordion>
        </div>
      </div> */}
    </div>
  );
};

export default SingleProfileTransaction;
