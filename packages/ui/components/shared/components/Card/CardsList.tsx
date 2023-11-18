import { CRMCustomerData } from "@pages/api/crm/customer";
import React from "react";
import { Button } from "@shadcn/button";
import CustomAccordion from "@shared/components/CustomAccordion/CustomAccordion";

function CardsList({
  setScreen,
  setSelectedCard,
  selectedCard,
  displayedCard,
}: {
  setScreen: (value) => void;
  setSelectedCard: (value) => void;
  selectedCard: CRMCustomerData["cardDetails"]["data"][0];
  displayedCard: CRMCustomerData["cardDetails"]["data"];
}) {
  return (
    <div className="h-full w-full overflow-y-auto focus:outline-none">
      <div className="flex justify-between items-center py-5 px-5 border-b">
        <h3 className="text-darkCustom text-sm ">
          Cards Lists ({displayedCard?.length})
        </h3>
        {/* <div onClick={() => setScreen(0)} className="cursor-pointer float-right rounded-3xl hover:bg-sky-100 p-2">
          <GrClose className="!text-grayCustom" />
        </div> */}
      </div>

      <div className="border-t py-1">
        <CustomAccordion
          title={`Active Cards (${
            displayedCard?.filter((item) => item?.status === 1).length
          })`}
          titleClass="font-thin text-sm"
        >
          <div className="px-5 pt-2">
            {displayedCard
              ?.filter((item) => item?.status === 1)
              ?.map((item, index) => {
                return (
                  <Button
                    key={index}
                    className="w-full pb-2"
                    onClick={() => {
                      setSelectedCard(item), setScreen(1);
                    }}
                  >
                    <div
                      key={item?.token}
                      className="flex flex-col justify-between items-center my-1 w-full h-[14rem] bg-[url('/images/mcard.svg')] bg-no-repeat bg-cover py-4 border border-blueCustom rounded-lg"
                    >
                      <div className="w-full flex justify-end">
                        <p className="my-1.5 mr-6 bg-blueCustom/10 p-2.5 rounded-lg ">
                          {item?.status === 0
                            ? "UNSPECIFIED"
                            : item?.status === 1
                            ? "ACTIVE"
                            : item?.status === 2
                            ? "INACTIVE"
                            : item?.status === 3
                            ? "LOST"
                            : item?.status === 4
                            ? "STOLEN"
                            : item?.status === 5
                            ? "EXPIRED"
                            : item?.status === 6
                            ? "VOID"
                            : item?.status === 7
                            ? "RESTRICTED"
                            : ""}
                        </p>
                      </div>
                      <div className="w-full flex justify-between items-center px-6">
                        <div>
                          <h2 className="text-2xl">
                            {item?.cardNumber || "-"}
                          </h2>
                          <p className="text-darkCustom text-xl">
                            {item?.cardHolderName || "-"}
                          </p>
                        </div>
                        <Button className="h-fit px-2.5 py-2.5 bg-white rounded-lg uppercase">
                          {item?.type === 0
                            ? "UNSPECIFIED"
                            : item?.type === 1
                            ? "PHYSICAL"
                            : item?.type === 2
                            ? "VIRTUAL"
                            : null}
                        </Button>
                      </div>
                    </div>
                  </Button>
                );
              })}
          </div>
        </CustomAccordion>
      </div>
      <div className="border-t py-1">
        <CustomAccordion
          title={`Inactive Cards (${
            displayedCard?.filter((item) => item?.status === 2).length
          })`}
          titleClass="font-thin text-sm"
        >
          <div className="px-5 pt-2">
            {displayedCard
              ?.filter((item) => item?.status === 2)
              ?.map((item, index) => {
                return (
                  <Button
                    key={index}
                    className="w-full pb-2"
                    onClick={() => {
                      setSelectedCard(item), setScreen(1);
                    }}
                  >
                    <div
                      key={item?.token}
                      className="flex flex-col justify-between items-center my-1 w-full h-[14rem] bg-[url('/images/mcard.svg')] bg-no-repeat bg-cover py-4 border border-blueCustom rounded-lg"
                    >
                      <div className="w-full flex justify-end">
                        <p className="my-1.5 mr-6 bg-blueCustom/10 p-2.5 rounded-lg ">
                          {item?.status === 0
                            ? "UNSPECIFIED"
                            : item?.status === 1
                            ? "ACTIVE"
                            : item?.status === 2
                            ? "INACTIVE"
                            : item?.status === 3
                            ? "LOST"
                            : item?.status === 4
                            ? "STOLEN"
                            : item?.status === 5
                            ? "EXPIRED"
                            : item?.status === 6
                            ? "VOID"
                            : item?.status === 7
                            ? "RESTRICTED"
                            : ""}
                        </p>
                      </div>
                      <div className="w-full flex justify-between items-center px-6">
                        <div>
                          <h2 className="text-2xl">
                            {item?.cardNumber || "-"}
                          </h2>
                          <p className="text-darkCustom text-xl">
                            {item?.cardHolderName || "-"}
                          </p>
                        </div>
                        <Button className="h-fit px-2.5 py-2.5 bg-white rounded-lg uppercase">
                          {item?.type === 0
                            ? "UNSPECIFIED"
                            : item?.type === 1
                            ? "PHYSICAL"
                            : item?.type === 2
                            ? "VIRTUAL"
                            : null}
                        </Button>
                      </div>
                    </div>
                  </Button>
                );
              })}
          </div>
        </CustomAccordion>
      </div>
      <div className="border-t border-b py-1">
        <CustomAccordion
          title={`Other Cards (${
            displayedCard?.filter(
              (item) => item?.status > 2 || item?.status === 0
            ).length
          })`}
          titleClass="font-thin text-sm"
        >
          <div className="px-5 pt-2">
            {displayedCard
              ?.filter((item) => item?.status > 2 || item?.status === 0)
              ?.map((item, index) => {
                return (
                  <Button
                    key={index}
                    className="w-full pb-2"
                    onClick={() => {
                      setSelectedCard(item), setScreen(1);
                    }}
                  >
                    <div
                      key={item?.token}
                      className="flex flex-col justify-between items-center my-1 w-full h-[14rem] bg-[url('/images/mcard.svg')] bg-no-repeat bg-cover py-4 border border-blueCustom rounded-lg"
                    >
                      <div className="w-full flex justify-end">
                        <p className="my-1.5 mr-6 bg-blueCustom/10 p-2.5 rounded-lg ">
                          {item?.status === 0
                            ? "UNSPECIFIED"
                            : item?.status === 1
                            ? "ACTIVE"
                            : item?.status === 2
                            ? "INACTIVE"
                            : item?.status === 3
                            ? "LOST"
                            : item?.status === 4
                            ? "STOLEN"
                            : item?.status === 5
                            ? "EXPIRED"
                            : item?.status === 6
                            ? "VOID"
                            : item?.status === 7
                            ? "RESTRICTED"
                            : ""}
                        </p>
                      </div>
                      <div className="w-full flex justify-between items-center px-6">
                        <div>
                          <h2 className="text-2xl">
                            {item?.cardNumber || "-"}
                          </h2>
                          <p className="text-darkCustom text-xl">
                            {item?.cardHolderName || "-"}
                          </p>
                        </div>
                        <Button className="h-fit px-2.5 py-2.5 bg-white rounded-lg uppercase">
                          {item?.type === 0
                            ? "UNSPECIFIED"
                            : item?.type === 1
                            ? "PHYSICAL"
                            : item?.type === 2
                            ? "VIRTUAL"
                            : null}
                        </Button>
                      </div>
                    </div>
                  </Button>
                );
              })}
          </div>
        </CustomAccordion>
      </div>
    </div>
  );
}

export default CardsList;
