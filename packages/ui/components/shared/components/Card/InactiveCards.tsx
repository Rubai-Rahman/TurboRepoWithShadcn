import { CRMCustomerData } from "@pages/api/crm/customer";
import { Button } from "@shadcn/button";
import React from "react";
import { GrClose } from "react-icons/gr";

const InactiveCards = ({
  displayedCard,
  setScreen,
  setSelectedCard,
}: {
  displayedCard: CRMCustomerData["cardDetails"]["data"];
  setScreen: (value) => void;
  setSelectedCard: (value) => void;
}) => {
  return (
    <div className="h-full w-full overflow-y-auto focus:outline-none">
      <div className="flex justify-between items-center py-5 px-5 border-b">
        <h3 className="text-darkCustom text-sm ">
          Inactive Cards (
          {displayedCard?.filter((item) => item.status === 2).length})
        </h3>
        <div className="cursor-pointer" onClick={() => setScreen(0)}>
          <GrClose className="text-grayCustom" />
        </div>
      </div>
      <div className="p-5">
        {displayedCard
          ?.filter((item) => item.status === 2)
          ?.map((item) => {
            return (
              <div
                key={item?.token}
                onClick={() => {
                  setScreen(6), setSelectedCard(item);
                }}
                className="flex justify-around items-end my-1 w-full h-[14rem] bg-[url('/images/mcard.svg')] bg-no-repeat bg-cover pb-4 cursor-pointer border border-blueCustom rounded-lg"
              >
                <div>
                  <h2 className="text-2xl">{item?.cardNumber || "-"}</h2>
                  {/* <p className="text-darkCustom text-xl">01/24</p> */}
                  <p className="text-darkCustom text-xl">
                    {item?.cardHolderName || "-"}
                  </p>
                </div>
                {/* <button className="px-2.5 py-2.5 bg-white rounded-lg uppercase">Physical</button> */}
                <Button className="px-2.5 py-2.5 bg-white rounded-lg uppercase">
                  {item.type === 0
                    ? "UNSPECIFIED"
                    : item.type === 1
                    ? "PHYSICAL"
                    : item.type === 2
                    ? "VIRTUAL"
                    : null}
                </Button>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default InactiveCards;
