import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { GrClose } from "react-icons/gr";
import { toast } from "react-toastify";
import { Button } from "@shadcn/button";
import { useGetCRMUserData } from "@api-lib/requests";
import { Input } from "@shadcn/input";

const GetUserCardInfo = ({ closeModal, contactNumber, handleCrmData }) => {
  const { t } = useTranslation("rightSide");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: getCRM } = useGetCRMUserData();

  const onSubmit = (data) => {
    const { mobile, last4Digit } = data;
    getCRM(
      { mobile, last4Digit },
      {
        onSuccess: (data) => {
          data.customerDetails.data !== null
            ? (handleCrmData(data), closeModal())
            : toast.error(data?.customerDetails?.error?.details);
        },
        onError: (err) => {
          toast.error(err as string);
        },
      }
    );
  };

  return (
    <div>
      <div className="flex justify-between items-start">
        <h3 className="text-darkCustom text-xl font-semibold mt-1.5">
          {t("rightSide.tweeqInfo.title")}
        </h3>
        <div
          onClick={closeModal}
          className="cursor-pointer float-right rounded-3xl hover:bg-sky-100 p-2"
        >
          <GrClose className="!text-grayCustom" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7">
        <div className="my-3">
          <p className="text-md leading-4 font-medium text-grayCustom px-5">
            {t("rightSide.tweeqInfo.contact")}
          </p>
          <Input
            type="text"
            className="border border-lineGrayCustom px-5 py-2 my-2 rounded w-full text-normal leading-6 font-medium text-darkCustom outline-0 focus:outline-0"
            value={contactNumber}
            placeholder="Contact number is not available"
            {...register("mobile", { required: true })}
            readOnly
          />
          {/* {errors.mobile && <span className="text-md text-red-500">This field is required</span>} */}
        </div>
        <div className="my-3">
          <p className="text-md leading-4 font-medium text-grayCustom px-5">
            {t("rightSide.tweeqInfo.digit")}
          </p>
          <Input
            type="number"
            className="border border-lineGrayCustom px-5 py-2 my-2 rounded w-full text-normal leading-6 font-medium text-darkCustom focus:ring-0 focus:outline-none"
            placeholder="Enter your last 4 digit"
            {...register("last4Digit", {
              maxLength: { value: 4, message: "Max length is 4" },
            })}
          />
          {errors.last4Digit && (
            <span className="text-md text-red-500 pt-2">
              {errors.last4Digit.message as string}
            </span>
          )}
        </div>
        <div className="flex justify-end gap-x-4 items-center w-full">
          <Button
            onClick={closeModal}
            type="button"
            className="w-28 rounded py-2 bg-lineBlueCustom text-grayCustom font-medium text-normal leading-6 hover:text-blueCustom"
          >
            {t("rightSide.tweeqInfo.button.cancel")}
          </Button>
          <Button
            type="submit"
            className="rounded py-2 px-2 bg-blueCustom text-white font-medium text-normal leading-6"
          >
            {t("rightSide.tweeqInfo.button.crmData")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default GetUserCardInfo;
