import React from 'react';
import { TweeqUserData } from './TweeqInfo.types';
import CustomAccordion from '@localShared/components/CustomAccordion/CustomAccordion';

const TweeqInfo = ({ tweeqData }: { tweeqData: TweeqUserData }) => {
  return (
    <div className="w-full">
      <CustomAccordion title="Tweeq Info" titleClass="font-normal">
        <div className="px-4 text-small space-y-2 pb-4">
          <p>
            <span className="text-blueCustom font-medium mr-2">Tweeq ID:</span>
            {tweeqData?.tweeqId}
          </p>
          <p>
            <span className="text-blueCustom font-medium mr-2">Name:</span>
            {tweeqData?.firstName?.english} {tweeqData?.lastName?.english} (
            {tweeqData?.firstName?.arabic} {tweeqData?.lastName?.arabic})
          </p>
        </div>
      </CustomAccordion>
    </div>
  );
};

export default TweeqInfo;
