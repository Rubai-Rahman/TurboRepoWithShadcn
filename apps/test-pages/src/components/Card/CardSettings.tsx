import React, { useState, ReactElement } from "react";
import { CRMCustomerData } from "@pages/api/crm/customer";
import { FaMoneyBillWave } from "react-icons/fa";
import { IoWifi } from "react-icons/io5";
import { MdFlight } from "react-icons/md";
import { RiShoppingBag3Line } from "react-icons/ri";
import CustomSwitch from "@shared/components/CustomSwitch/CustomSwitch";

interface CardSettingsType {
  id: number;
  title: string;
  cardSwitch?: boolean;
  icon: ReactElement;
}

const CardSettings = ({
  selectedCard,
  setScreen,
}: {
  selectedCard: CRMCustomerData["cardDetails"]["data"][0];
  setScreen: (value) => void;
}) => {
  const [enabled, setEnabled] = useState(true);
  const handleSwitch = (option) => {
    setEnabled(option);
  };
  const madaSwitch = selectedCard?.isContactlessEnabled;
  const paySwitch = selectedCard?.isEcommerceEnabled;
  const atmSwitch = selectedCard?.isAtmWithdrawalEnabled;
  const roamSwitch = selectedCard?.isPaymentAbroadEnabled;

  const cardSettingsData: CardSettingsType[] = [
    {
      id: 1,
      title: "Mada Atheer",
      cardSwitch: madaSwitch,
      icon: <IoWifi className="text-xl rotate-90" />,
    },
    {
      id: 2,
      title: "Online Payment",
      cardSwitch: paySwitch,
      icon: <RiShoppingBag3Line className="text-xl" />,
    },
    {
      id: 3,
      title: "ATM withdrwal",
      cardSwitch: atmSwitch,
      icon: <FaMoneyBillWave className="text-xl" />,
    },
    {
      id: 4,
      title: "Roaming",
      cardSwitch: roamSwitch,
      icon: <MdFlight className="text-xl" />,
    },
  ];

  return (
    <div className="">
      <div className="border-b my-5 px-5">
        <h3 className="text-xl text-darkCustom my-3">Card Settings</h3>
        {cardSettingsData.map((card) => {
          return (
            <div
              key={card.id}
              className="flex justify-between items-center gap3"
            >
              <div className="flex justify-center items-center gap-3 text-sm font-medium text-darkCustom my-5">
                <p>{card.icon}</p>
                <p>{card.title}</p>
              </div>
              <div className="pointer-events-none">
                <CustomSwitch
                  checked={card.cardSwitch}
                  handler={() => handleSwitch(card.cardSwitch)}
                />
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="border-b flex justify-between items-center py-5 px-5 text-sm">
        <p>2 Inactive Cards</p>
        <p className="flex items-center cursor-pointer" onClick={() => setScreen(5)}>
          View all
          <span className="flex justify-center items-center">
            <MdKeyboardArrowRight className="h-5 w-5" />
          </span>
        </p>
      </div> */}

      {/* <div className="border-b flex justify-between items-center py-5 px-5 text-sm">
        <p>{selectedCard?.filter((item) => item.status === 2).length} Inactive Cards</p>
        <p className="flex items-center cursor-pointer" onClick={() => setScreen(5)}>
          View all
          <span className="flex justify-center items-center">
            <MdKeyboardArrowRight className="h-5 w-5" />
          </span>
        </p>
      </div> */}
    </div>
  );
};

export default CardSettings;
