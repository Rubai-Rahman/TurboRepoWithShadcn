import React from "react";
import { useCRMStopCard } from "@api-lib/requests";
import { CRMCustomerData } from "@pages/api/crm/customer";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { Label } from "@shadcn/label";
import { Input } from "@shadcn/input";
import { Textarea } from "@shadcn/textarea";
import { Button } from "@shadcn/button";

const PermanentStop = ({
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
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate } = useCRMStopCard();

  const onSubmit = (data) => {
    console.log("test", data);

    // mutate(
    //   {
    //     customerId: crmData.customerDetails.data.id,
    //     cardToken: selectedCard?.token,
    //     reason: data.reason,
    //     comments: data.comment,
    //     requestReplacement: data.requestReplacement,
    //   },
    //   {
    //     onSuccess: (data) => {
    //       data.data !== null && ToastMessage("success", "Card Lock successfully");
    //       data.data === null && data.error.code > 0 && ToastMessage("error", "Card Lock failed");
    //     },
    //     onError: (err) => {
    //       ToastMessage("error", "Card Lock failed");
    //     },
    //   }
    // );
  };

  return (
    <div className="h-full">
      <div className="flex justify-between items-center py-5 px-5 border-b">
        <h3 className="text-darkCustom text-sm">Permanent Stop</h3>
        <div
          onClick={() => setScreen(6)}
          className="cursor-pointer float-right rounded-3xl hover:bg-sky-100 p-2"
        >
          <GrClose className="!text-grayCustom" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5">
        <p className="text-md my-5 text-grayCustom">
          Please specify reason for permanent stop
        </p>

        <div id="select">
          <div className="mb-2 block">
            {/* <Label
              htmlFor="reason"
              className="text-grayCustom ml-3"
              value="Reason"
              placeholder="Select stop reason"
            /> */}
            <Label
              htmlFor="reason"
              className="text-grayCustom ml-3"
              placeholder="Select stop reason"
            ></Label>
          </div>
          {/* <Select
            id="reason"
            required={true}
            {...register("reason")}
            style={{ background: "none" }}
          >
            <option value={0}>UNSPECIFIED</option>
            <option value={1}>LOST</option>
            <option value={2}>STOLEN</option>
            <option value={3}>DAMAGED</option>
            <option value={4}>FRAUD_OR_SECURITY_CONCERN</option>
            <option value={5}>CUSTOMER_WISH</option>
          </Select> */}

          <select
            id="reason"
            required={true}
            {...register("reason")}
            style={{ background: "none" }}
          >
            <option value={0}>UNSPECIFIED</option>
            <option value={1}>LOST</option>
            <option value={2}>STOLEN</option>
            <option value={3}>DAMAGED</option>
            <option value={4}>FRAUD_OR_SECURITY_CONCERN</option>
            <option value={5}>CUSTOMER_WISH</option>
          </select>
        </div>
        <div className="flex items-center gap-5 mt-5">
          <Input
            type="checkbox"
            name="request"
            placeholder="request"
            value="request"
            {...register("request")}
          />
          <Label htmlFor="request" className="text-darkCustom">
            Send request a new card
          </Label>
        </div>
        <span className="text-darkCustom text-sm inline-block my-3">
          Note: if you block the card will customer can’t use it and can’t
          recover
        </span>
        <div id="textarea">
          <div className="mb-2 block ">
            {/* <Label
              htmlFor="comment"
              className="text-grayCustom ml-3"
              value="Reason Comment"
            /> */}
            <Label htmlFor="comment" className="text-grayCustom ml-3">
              Reason Comment
            </Label>
          </div>
          <Textarea
            id="comment"
            className="px-3 py-3 bg-transparent"
            placeholder="Write text here ..."
            required={true}
            rows={4}
            {...register("comment")}
          />
        </div>
        <div className="flex justify-center items-center gap-3 mt-5">
          {/* <Button
            onClick={() => setScreen(6)}
            text="Cancel"
            icon={null}
            className="text-grayCustom font-medium"
            padding="px-10 py-2"
            colors="bg-lineBlueCustom"
          /> */}
          <Button
            onClick={() => setScreen(6)}
            className="text-grayCustom font-medium px-10 py-2 bg-lineBlueCustom"
          >
            Cancel
          </Button>
          {/* <Button
            type="submit"
            text="Block & Send"
            icon={null}
            padding="px-10 py-2"
            className="font-medium"
          /> */}
          <Button type="submit" className="font-medium px-10 py-2">
            Block & Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PermanentStop;
