import { CRMCustomerData } from "@pages/api/crm/customer";
import React, { useState } from "react";
import CardDetails from "./CardDetails";
import PermanentStop from "./PermanentStop";
import ReplaceCard from "./ReplaceCard";
import CardLock from "./CardLock";
import InactiveCards from "./InactiveCards";
import CardsList from "./CardsList";

const Cards = ({ crmData }: { crmData: CRMCustomerData }) => {
  const [screen, setScreen] = useState(0);
  // const [cardType, setCartType] = useState("digital");
  const screenFunc = (option) => setScreen(option);
  const [selectedCard, setSelectedCard] = useState<
    CRMCustomerData["cardDetails"]["data"][0]
  >(crmData?.cardDetails?.data?.filter((i) => i?.status === 1)[0]);

  // console.log("displayedCard", displayedCard);

  return (
    <div className="w-full h-full overflow-hidden outline-none">
      {/* {screen === 0 && (
          <div className="h-full overflow-y-auto">
            <MasterCard displayedCard={crmData?.cardDetails?.data} setScreen={setScreen} setSelectedCard={setSelectedCard} />
            <CardOptions displayedCard={displayedCard} setScreen={screenFunc} />
            <CardSettings displayedCard={displayedCard} setScreen={screenFunc} />
          </div>
        )} */}
      {screen === 0 && (
        <CardsList
          setScreen={screenFunc}
          setSelectedCard={setSelectedCard}
          selectedCard={selectedCard}
          displayedCard={crmData?.cardDetails?.data}
        />
      )}
      {screen === 1 && (
        <CardDetails
          setScreen={screenFunc}
          selectedCard={selectedCard}
          displayedCard={crmData?.cardDetails?.data}
        />
      )}
      {screen === 2 && (
        <PermanentStop
          crmData={crmData}
          selectedCard={selectedCard}
          setScreen={screenFunc}
        />
      )}
      {screen === 3 && <ReplaceCard setScreen={screenFunc} />}
      {screen === 4 && (
        <CardLock
          crmData={crmData}
          selectedCard={selectedCard}
          setScreen={screenFunc}
        />
      )}
      {screen === 5 && null}
      {screen === 6 && (
        <InactiveCards
          setScreen={screenFunc}
          displayedCard={crmData?.cardDetails?.data}
          setSelectedCard={setSelectedCard}
        />
      )}
    </div>
  );
};

export default Cards;
