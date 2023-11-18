import React from "react";
import { TransactionDataType } from "../Transaction/Transaction.types";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

const TransactionProfile = ({
  item,
  setSingleTransaction,
  setActiveTransactionData,
  transactionIcon,
}: {
  item: TransactionDataType;
  setSingleTransaction: any;
  setActiveTransactionData: any;
  transactionIcon: any;
}) => {
  return (
    <div
      key={item.id}
      className="flex items-center py-4 cursor-pointer w-full"
      onClick={() => {
        setSingleTransaction("active"), setActiveTransactionData(item);
      }}
    >
      {transactionIcon(item)}

      <div className="w-full flex items-center justify-between">
        <div>
          {/* <p className="font-medium text-normal leading-6 text-darkCustom">adnan</p> */}
          <p className="font-medium text-normal leading-6 text-darkCustom hover:text-blueCustom">
            {/* {item.detailsMap.sender_first_name_english} {item.detailsMap.sender_last_name_english} */}
            {item.type === "INCOMING_P2P_TRANSFER" &&
              `${item?.detailsMap?.sender_first_name_english} ${item?.detailsMap?.sender_last_name_english}`}
            {item.type === "OUTGOING_P2P_TRANSFER" &&
              `${item?.detailsMap?.receiver_first_name_english} ${item?.detailsMap?.receiver_last_name_english}`}
            {item.type === "NOON_TOPUP_VISA_APPLE_PAY" &&
              `${item?.detailsMap?.payment_plugin_name}`}
            {item.type === "NOON_TOPUP_MASTERCARD_CARD" && (
              <span className="uppercase">Topup Amount</span>
            )}
            {item?.detailsMap?.scheme_acceptor_name === "AMAZON" &&
              `${item?.detailsMap?.scheme_acceptor_name}`}
            {item?.detailsMap?.scheme_acceptor_name
              ? item?.detailsMap?.scheme_acceptor_name
              : `type-${item?.type.replaceAll("_", " ")}`}
          </p>
          <p className="font-medium text-small leading-4 text-grayCustom">
            {item?.type === "INCOMING_P2P_TRANSFER" && "Incoming transfer"}
            {item?.type === "OUTGOING_P2P_TRANSFER" && "Outgoing transfer"}
            {item?.type === "NOON_TOPUP_VISA_APPLE_PAY" && "Topup ApplePay"}
            {item?.type === "NOON_TOPUP_MASTERCARD_CARD" && "Topup ApplePay"}
            {item?.detailsMap?.scheme_acceptor_name === "AMAZON" &&
              "Topup ApplePay"}
          </p>
        </div>
        <div className="flex gap-x-4 items-center">
          <p
            className={`font-bold text-normal leading-6 ${
              !!item.isDebit ? "text-redCustom" : "text-greenCustom"
            } text-darkCustom`}
          >
            {item?.detailsMap?.cr_currency === "682"
              ? "SAR-"
              : item?.detailsMap?.cr_currency === "840"
              ? "USD-"
              : item?.detailsMap?.scheme_tx_currency === "682"
              ? "SAR-"
              : item?.detailsMap?.scheme_tx_currency === "840"
              ? "USD-"
              : null}
            {(item?.amount / 100).toFixed(2)}
          </p>
          <MdOutlineKeyboardArrowRight className="font-bold text-2xl text-grayCustom" />
        </div>
      </div>
    </div>
  );
};

export default TransactionProfile;
