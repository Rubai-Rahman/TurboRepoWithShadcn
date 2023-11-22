import React from "react";
import { MdOutlinePermDeviceInformation } from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { Button } from "@shadcn/button";

const LinkedDevices = ({ setUserAccount }:any) => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-5">
        <p className="text-normal leading-6 font-normal text-darkCustom">
          Linked Devices
        </p>
        <RxCross1
          onClick={() => setUserAccount("close")}
          className="cursor-pointer font-thin h-5 w-5"
        />
      </div>

      <div className="my-4">
        <p className="text-grayCustom leading-6 text-normal font-normal">
          Unlink devices connected to your account
        </p>
        <div className="px-2 my-6">
          <div className="flex gap-x-4 items-center">
            <div className="h-12 w-[50px] flex justify-center items-center rounded-full bg-blueCustom/5">
              <MdOutlinePermDeviceInformation className="text-blueCustom text-2xl" />
            </div>
            <div className="w-full flex justify-between items-center">
              <div>
                <p className="text-darkCustom font-medium text-normal leading-6">
                  Ahmed&apos;s iPhone
                </p>
                <p className="text-grayCustom font-medium text-small leading-4">
                  Last login Sep20 @ 12:00 PM
                </p>
              </div>
              <Button
                type="button"
                className="bg-blueCustom text-white font-medium text-small leading-4 rounded py-2 px-4"
              >
                unlink
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-x-4 justify-between">
          <Button
            type="submit"
            className="w-full rounded py-2 bg-lineBlueCustom text-grayCustom font-semibold text-normal leading-6 hover:text-blueCustom"
            onClick={() => setUserAccount("close")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="w-full rounded py-2 bg-blueCustom text-white font-semibold text-normal leading-6"
          >
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LinkedDevices;
