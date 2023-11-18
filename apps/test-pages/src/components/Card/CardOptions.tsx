import React, { ReactElement } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiLockAlt } from "react-icons/bi";
import { CiRepeat } from "react-icons/ci";
import { CRMCustomerData } from "@pages/api/crm/customer";

interface CardOptionsType {
  id: number;
  title: string;
  icon: ReactElement;
}

const optionsData: CardOptionsType[] = [
  {
    id: 1,
    title: "permanent stop",
    icon: (
      <AiOutlineCloseCircle className="text-2xl text-blueCustom cursor-pointer" />
    ),
  },
  {
    id: 2,
    title: "replacement",
    icon: <CiRepeat className="text-2xl text-blueCustom cursor-pointer" />,
  },
  {
    id: 3,
    title: "temporary lock",
    icon: <BiLockAlt className="text-2xl text-blueCustom cursor-pointer" />,
  },
  // { id: 0, title: "request physical", icon: <BiLockAlt className="text-2xl text-blueCustom cursor-pointer" /> }, //UI is not given now so id seted as default, will be replaces later
];

const CardOptions = ({
  selectedCard,
  setScreen,
}: {
  selectedCard: CRMCustomerData["cardDetails"]["data"][0];
  setScreen: (value) => void;
}) => {
  return (
    <div>
      <div className="my-5 flex justify-center px-5">
        {selectedCard?.type === 2
          ? optionsData
              .filter((i) => i.id !== 2)
              .map((card) => {
                return (
                  // <div className="w-32 text-center cursor-pointer" key={card.id}>
                  <div
                    className="w-32 text-center cursor-pointer"
                    key={card.id}
                    onClick={() => setScreen(card.id)}
                  >
                    <div className="w-11 h-11 mx-auto rounded-full bg-[#F7F9FF] flex justify-center items-center">
                      {card.icon}
                    </div>
                    <p className="text-sm capitalize">{card.title}</p>
                  </div>
                );
              })
          : selectedCard?.type === 1
          ? optionsData
              .filter((i) => i.id !== 0)
              .map((card) => {
                return (
                  <div
                    className="w-32 text-center cursor-pointer"
                    key={card.id}
                    onClick={() => setScreen(card.id)}
                  >
                    <div className="w-11 h-11 mx-auto rounded-full bg-[#F7F9FF] flex justify-center items-center">
                      {card.icon}
                    </div>
                    <span className="text-sm capitalize">{card.title}</span>
                  </div>
                );
              })
          : optionsData.map((card) => {
              return (
                <div
                  className="w-32 text-center cursor-pointer"
                  key={card.id}
                  onClick={() => setScreen(card.id)}
                >
                  <div className="w-11 h-11 mx-auto rounded-full bg-[#F7F9FF] flex justify-center items-center">
                    {card.icon}
                  </div>
                  <span className="text-sm capitalize">{card.title}</span>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default CardOptions;
