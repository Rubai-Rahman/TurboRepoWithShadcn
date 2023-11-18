import { CRMCustomerData } from "@pages/api/crm/customer";
import React from "react";
import { Button } from "@shadcn/button";
import CardOptions from "./CardOptions";
import CardSettings from "./CardSettings";

const CardDetails = ({
  setScreen,
  selectedCard,
  displayedCard,
}: {
  setScreen: (value) => void;
  selectedCard: CRMCustomerData["cardDetails"]["data"][0];
  displayedCard: CRMCustomerData["cardDetails"]["data"];
}) => {
  return (
    <div className="h-full w-full overflow-y-auto focus:outline-none">
      <div className="flex justify-between items-center py-5 px-5 border-b">
        <h3 className="text-darkCustom text-sm ">Active Card Details</h3>
        <div
          onClick={() => setScreen(0)}
          className="cursor-pointer float-right rounded-lg bg-blueCustom/10 hover:bg-blueCustom/20 px-3 py-1.5"
        >
          <span className="text-darkCustom text-sm">All Cards</span>
        </div>
      </div>
      <div className="p-5">
        {selectedCard ? (
          <>
            <div
              key={selectedCard?.token}
              className="flex flex-col justify-between items-center my-1 w-full h-[14rem] bg-[url('/images/mcard.svg')] bg-no-repeat bg-cover py-4 border border-blueCustom rounded-lg"
            >
              <div className="w-full flex justify-end">
                <p className="my-1.5 mr-6 bg-blueCustom/10 p-2.5 rounded-lg ">
                  {selectedCard?.status === 0
                    ? "UNSPECIFIED"
                    : selectedCard?.status === 1
                    ? "ACTIVE"
                    : selectedCard?.status === 2
                    ? "INACTIVE"
                    : selectedCard?.status === 3
                    ? "LOST"
                    : selectedCard?.status === 4
                    ? "STOLEN"
                    : selectedCard?.status === 5
                    ? "EXPIRED"
                    : selectedCard?.status === 6
                    ? "VOID"
                    : selectedCard?.status === 7
                    ? "RESTRICTED"
                    : ""}
                </p>
              </div>
              <div className="w-full flex justify-between items-center px-6">
                <div>
                  <h2 className="text-2xl">
                    {selectedCard?.cardNumber || "-"}
                  </h2>
                  <p className="text-darkCustom text-xl">
                    {selectedCard?.cardHolderName || "-"}
                  </p>
                </div>
                <Button className="h-fit px-2.5 py-2.5 bg-white rounded-lg uppercase">
                  {selectedCard?.type === 0
                    ? "UNSPECIFIED"
                    : selectedCard?.type === 1
                    ? "PHYSICAL"
                    : selectedCard?.type === 2
                    ? "VIRTUAL"
                    : null}
                </Button>
              </div>
            </div>
            <CardOptions selectedCard={selectedCard} setScreen={setScreen} />
            <CardSettings selectedCard={selectedCard} setScreen={setScreen} />
          </>
        ) : (
          <p>No card selected</p>
        )}
      </div>

      {/* <div className="border-b border-t flex justify-between items-center py-5 px-5 text-sm">
        <p>{displayedCard?.filter((item) => item.status === 2).length} Inactive Cards</p>
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

export default CardDetails;
