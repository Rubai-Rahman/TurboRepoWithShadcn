import React from "react";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BsCheckCircle } from "react-icons/bs";
import { RxCrossCircled } from "react-icons/rx";

const Boarding = () => {
  return (
    <div>
      <p className="text-darkCustom text-base leading-6 py-3 px-4">
        Pre-Onboarding
      </p>

      <div className="my-8 p-4">
        <div className="flex gap-x-4 items-center my-4">
          <div className="bg-[#3460FB]/[0.04] h-11 w-11 rounded-full flex items-center justify-center">
            <BsCheckCircle className="text-[#34C759]" />
          </div>
          <div>
            <p className="font-medium text-normal leading-5 text-blueCustom">
              Mobile Verified
            </p>
            <p className="font-medium text-small leading-5 text-grayCustom">
              10/10/2000 10:00 PM
            </p>
          </div>
        </div>

        <div className="flex gap-x-4 items-center my-4">
          <div className="bg-[#3460FB]/[0.04] h-11 w-11 rounded-full flex items-center justify-center">
            <BsCheckCircle className="text-[#34C759]" />
          </div>
          <div>
            <p className="font-medium text-normal leading-5 text-blueCustom">
              In Waitlist
            </p>
            <p className="font-medium text-small leading-5 text-grayCustom">
              10/10/2000 10:00 PM
            </p>
          </div>
        </div>

        <div className="flex gap-x-4 items-center my-4">
          <div className="bg-[#3460FB]/[0.04] h-11 w-11 rounded-full flex items-center justify-center">
            <BsCheckCircle className="text-[#34C759]" />
          </div>
          <div>
            <p className="font-medium text-normal leading-5 text-blueCustom">
              ID verified
            </p>
            <p className="font-medium text-small leading-5 text-grayCustom">
              10/10/2000 10:00 PM
            </p>
          </div>
        </div>

        <div className="flex gap-x-4 items-center my-4">
          <div className="bg-[#000000]/[0.04] h-11 w-11 rounded-full flex items-center justify-center">
            <RxCrossCircled className="text-redCustom" />
          </div>
          <p className="font-medium text-normal leading-5 text-darkCustom">
            Nafath completed
          </p>
        </div>

        <div className="flex gap-x-4 items-center my-4">
          <div className="bg-[#000000]/[0.04] h-11 w-11 rounded-full flex items-center justify-center">
            <AiOutlineClockCircle className="text-black" />
          </div>
          <p className="font-medium text-normal leading-5 text-darkCustom">
            Pending screening
          </p>
        </div>
      </div>

      <div className="space-y-4 p-4">
        <p className="font-medium text-small leading-4 text-grayCustom">
          Status Details
        </p>
        <p className="font-medium text-normal leading-6 text-darkCustom">
          The customer is trying to verify Nafath while his ID is expired
        </p>
      </div>
    </div>
  );
};

export default Boarding;
