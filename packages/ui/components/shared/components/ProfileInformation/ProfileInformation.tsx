import React, { useState } from "react";
import { ProfileInformationTypes } from "./ProfileInformation.types";
import { useRouter } from "next/router";
import { AiOutlineMail } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import { IoMdFemale, IoMdMale } from "react-icons/io";
import { TbPhone, TbTicket } from "react-icons/tb";
import { Button } from "@shadcn/button";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import GetUserCardInfo from "./GetUserCardInfo";
import CustomDialog from "@shared/components/CustomDialog/CustomDialog";

const profileOptions = [
  // { item: "chat", icon: BsChat },
  // { item: "arrow", icon: TbArrowMerge },
  { item: "ticket", icon: TbTicket },
  { item: "edit", icon: FiEdit2 },
];

const ProfileInformation = ({
  maxWidth = "w-1/4",
  setSelected,
  contactData,
  handleCrmData,
  crmData,
}: ProfileInformationTypes) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation("rightSide");
  const closeModal = () => {
    setIsOpen(false);
  };
  const handleClick = (item) => {
    setSelected(item);
  };
  return (
    <div className={`${maxWidth}`}>
      <div className="flex justify-start items-center gap-x-3 px-4 py-1">
        {profileOptions.map((option, index) =>
          option.item === "ticket" ? (
            <div
              key={option.item}
              className="w-10 h-10 bg-blueCustom/10 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => handleClick(option.item)}
            >
              <option.icon className="text-blueCustom font-medium text-2xl" />
            </div>
          ) : (
            <div
              key={option.item}
              className="w-10 h-10 bg-blueCustom/10 rounded-full flex items-center justify-center cursor-pointer"
              onClick={() => handleClick(option.item)}
            >
              <option.icon className="text-blueCustom font-medium text-2xl" />
            </div>
          )
        )}
      </div>

      <div className="flex justify-start items-center gap-x-3 px-4 h-12 my-3">
        <div className="relative">
          {contactData?.profile_image ? (
            // <Image width={55} height={55} className="rounded-full ring-2 ring-green-900" src={contactData?.profile_image} alt={contactData?.name} />
            <img
              className="rounded-full h-12 w-12"
              src={contactData?.profile_image}
              alt={contactData?.name}
            />
          ) : (
            <div className="rounded-full cursor-pointer h-12 w-12 bg-sky-200 flex justify-center items-center">
              <span className="text-lg text-blue-400 shrink-0">
                {contactData?.name?.slice(0, 1)}
              </span>
            </div>
          )}

          {/* {contactData?.profile_image ? (
            <div className="relative rounded-full border-4 border-disabled flex justify-center items-center overflow-hidden">
              <AvatarImage height={30} width={30} className="rounded-full" src={contactData.profile_image} alt={contactData.name} />
            </div>
          ) : (
            <div className="rounded-full cursor-pointer h-24 w-24 bg-sky-200 flex justify-center items-center">
              <span className="text-lg text-blue-400 shrink-0">{contactData?.name?.slice(0, 1)}</span>
            </div>
          )} */}

          {contactData?.gender && (
            <div className="flex justify-center items-center w-6 h-6 bg-blueCustom rounded-full absolute -top-1.5 right-0">
              {contactData.gender?.toLowerCase() === "male" && (
                <IoMdMale className="text-sm font-bold text-white" />
              )}
              {contactData.gender?.toLowerCase() === "female" && (
                <IoMdFemale className="text-sm font-bold text-white" />
              )}
            </div>
          )}
        </div>

        <div className="text-darkCustom text-justify w-full inline-block">
          <h5 className="flex items-center text-big font-normal leading-6 text-darkCustom capitalize min-w-0">
            <Link href={`/contacts/${contactData.id}`}>
              <span className="cursor-pointer">
                <BsBoxArrowUpRight className="h-4 w-4 text-grayCustom mr-2" />
              </span>
            </Link>
            <span className="line-clamp-1">{contactData?.name}</span>
          </h5>
          <p className="font-medium leading-4 text-small text-grayCustom">
            {contactData?.city ? contactData.city : "No Address Available"}
          </p>
        </div>
      </div>

      {/* <div className="flex gap-x-1.5 px-4">
        <button type="button" className="border border-lineGrayCustom rounded-full text-small font-medium leading-4 px-6 py-1.5">
          Product
        </button>
        <button type="button" className="border border-lineGrayCustom rounded-full text-small font-medium leading-4 px-6 py-1.5">
          Sales
        </button>
        <button type="button" className="border border-lineGrayCustom rounded-full text-big font-medium px-2.5">
          +
        </button>
      </div> */}

      <div className="px-4 space-y-4 pt-8 pb-4">
        <div className="flex gap-x-3 items-center mb-1">
          <TbPhone className="text-grayCustom text-xl" />
          <p className="text-blueCustom font-semibold text-small leading-4">
            {contactData?.phone_number
              ? contactData?.phone_number
              : "No phone number available"}
          </p>
          <Button
            disabled={!!crmData}
            onClick={() => setIsOpen(true)}
            className="outline-none px-3 py-1 text-sm border rounded-md  text-blueCustom hover:text-grayCustom disabled:text-grayCustom font-medium"
          >
            {t("rightSide.tweeqInfo.buttonName")}
          </Button>
        </div>
        <div className="flex gap-x-3 items-center mt-1">
          <AiOutlineMail className="text-grayCustom text-xl" />
          <p className="font-semibold text-small leading-4 text-darkCustom">
            {contactData?.email ? contactData?.email : "No Email available"}
          </p>
        </div>
      </div>
      <CustomDialog maxWidth="max-w-xl" isOpen={isOpen} closeModal={closeModal}>
        <GetUserCardInfo
          closeModal={closeModal}
          contactNumber={contactData?.phone_number}
          handleCrmData={handleCrmData}
        />
      </CustomDialog>
    </div>
  );
};

export default ProfileInformation;
