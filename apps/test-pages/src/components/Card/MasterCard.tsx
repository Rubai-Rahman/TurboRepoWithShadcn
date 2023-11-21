import React from 'react';
import { Button } from '@shadcn/button';
import CustomAccordion from '@localShared/CustomAccordion/CustomAccordion';
import { CRMCustomerData } from '@pages/api/crm/customer';

export interface MasterCardType {
  name: string;
  cardType: string;
  cardNumber: string;
  expiration: string;
  inactiveCause?: string;
}

const MasterCard = ({
  displayedCard,
  setScreen,
  setSelectedCard,
}: {
  displayedCard: CRMCustomerData['cardDetails']['data'];
  setScreen: (value) => void;
  setSelectedCard: (value) => void;
}) => {
  return (
    <div className="space-y-3 h-full flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-center py-5 px-5 border-b">
          <h3 className="text-darkCustom text-sm ">
            Active Cards (
            {displayedCard?.filter((item) => item.status === 1).length})
          </h3>
          {/* <div className="cursor-pointer" onClick={() => setScreen(0)}>
            <GrClose className="text-grayCustom" />
          </div> */}
        </div>
        <div className="p-5">
          {displayedCard
            ?.filter((item) => item.status === 1)
            ?.map((item) => {
              return (
                <div
                  onClick={() => {
                    setScreen(6), setSelectedCard(item);
                  }}
                  key={item?.token}
                  className="flex my-1 justify-around items-end w-full h-[14rem] bg-[url('/images/mcard.svg')] bg-no-repeat bg-cover pb-4 cursor-pointer border border-blueCustom rounded-lg"
                >
                  <div>
                    <h2 className="text-2xl">{item?.cardNumber || '-'}</h2>
                    {/* <p className="text-darkCustom text-xl">01/24</p> */}
                    <p className="text-darkCustom text-xl">
                      {item?.cardHolderName || '-'}
                    </p>
                  </div>
                  {/* <button className="px-2.5 py-2.5 bg-white rounded-lg uppercase">Physical</button> */}
                  <Button className="px-2.5 py-2.5 bg-white rounded-lg uppercase">
                    {item.type === 0
                      ? 'UNSPECIFIED'
                      : item.type === 1
                      ? 'PHYSICAL'
                      : item.type === 2
                      ? 'VIRTUAL'
                      : null}
                  </Button>
                </div>
              );
            })}
        </div>
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
      <div className="border-t pb-5">
        <CustomAccordion
          title={`Inactive Cards (${displayedCard?.filter(
            (item) => item.status === 2
          ).length})`}
          titleClass="font-thin text-sm"
        >
          <div className="px-5 py-0">
            {displayedCard
              ?.filter((item) => item.status === 2)
              ?.map((item) => {
                return (
                  <div
                    key={item?.token}
                    className="flex justify-around items-end w-full h-[14rem] bg-[url('/images/mcard.svg')] bg-no-repeat bg-cover pb-4 border border-blueCustom rounded-lg"
                  >
                    <div>
                      <h2 className="text-2xl">{item?.cardNumber || '-'}</h2>
                      <p className="text-darkCustom text-xl">
                        {item?.cardHolderName || '-'}
                      </p>
                    </div>
                    <Button className="px-2.5 py-2.5 bg-white rounded-lg uppercase">
                      {item.type === 0
                        ? 'UNSPECIFIED'
                        : item.type === 1
                        ? 'PHYSICAL'
                        : item.type === 2
                        ? 'VIRTUAL'
                        : null}
                    </Button>
                  </div>
                );
              })}
          </div>
        </CustomAccordion>
      </div>
    </div>
  );
};

export default MasterCard;
