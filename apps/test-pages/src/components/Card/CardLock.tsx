import React from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { Label } from "@shadcn/label";
import { Textarea } from "@shadcn/textarea";
import { Button } from "@shadcn/button";
import { CRMCustomerData } from "@pages/api/crm/customer";
import { useCRMTempLockCard } from "@api-lib/requests";
import { ToastMessage } from "@shared/components/Toastify/Toastify";

const CardLock = ({
  crmData,
  selectedCard,
  setScreen,
}: {
  crmData: CRMCustomerData;
  selectedCard: CRMCustomerData["cardDetails"]["data"][0];
  setScreen: (value) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useCRMTempLockCard();

  const onSubmit = (data) => {
    // console.log("test", data);

    mutate(
      {
        customerId: crmData.customerDetails.data.id,
        cardToken: selectedCard?.token,
        reason: data.reason,
        comments: data.comment,
      },
      {
        onSuccess: (data) => {
          data.data !== null &&
            ToastMessage("success", "Card Lock successfully");
          data.data === null &&
            data.error.code > 0 &&
            ToastMessage("error", "Card Lock failed");
        },
        onError: (err) => {
          ToastMessage("error", "Card Lock failed");
        },
      }
    );
  };

  return (
    <div className="">
      <div className="flex justify-between items-center py-5 px-5 border-b">
        <h3 className="text-darkCustom text-sm">Temporary card lock</h3>
        <div
          onClick={() => setScreen(6)}
          className="cursor-pointer float-right rounded-3xl hover:bg-sky-100 p-2"
        >
          <GrClose className="!text-grayCustom" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5">
        <p className="text-md my-5 text-grayCustom">
          Please specify reason for Temporary stop
        </p>

        <div id="select">
          <div className="mb-2 block">
            {/* <Label
              htmlFor="reason"
              className="text-grayCustom ml-3"
              value="Reason"
              placeholder="Select stop reason"
            /> */}
            <Label htmlFor="reason" className="text-grayCustom ml-3">
              Select stop reason
            </Label>
          </div>
          {/* <Select
            id="reason"
            required={true}
            {...register("reason")}
            style={{ background: "none" }}
          >
            <option value={0}>UNSPECIFIED</option>
            <option value={1}>MISPLACEMENT</option>
            <option value={2}>CUSTOMER_WISH</option>
          </Select> */}

          <select
            id="reason"
            required={true}
            {...register("reason")}
            style={{ background: "none" }}
          >
            <option value={0}>UNSPECIFIED</option>
            <option value={1}>MISPLACEMENT</option>
            <option value={2}>CUSTOMER_WISH</option>
          </select>
        </div>
        <span className="text-darkCustom text-sm inline-block my-5">
          Note: if you block the card will customer can’t use it and can’t
          recover
        </span>
        <div id="textarea">
          <div className="mb-2 block ">
            <Label htmlFor="comment" className="text-grayCustom ml-3">
              Reason Comment
            </Label>
          </div>
          <Textarea
            id="comment"
            className="px-3 py-3 bg-transparent"
            placeholder="Write text here..."
            required={true}
            rows={4}
            {...register("comment")}
          ></Textarea>
        </div>
        <div className="flex justify-center items-center gap-3 mt-5">
          <Button
            onClick={() => setScreen(6)}
            className="text-grayCustom font-medium px-10 py-2 bg-lineBlueCustom"
          >
            Cancel
          </Button>

          <Button type="submit" className="font-medium px-10 py-2">
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CardLock;
