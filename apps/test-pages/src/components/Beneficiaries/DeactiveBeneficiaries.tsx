import React from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { Label } from '@shadcn/label';
import { Textarea } from '@shadcn/textarea';
import { Button } from '@shadcn/button';

const DeactiveBeneficiaries = ({ seOpen }) => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log("test", data);
  };
  return (
    <div className="">
      <div className="flex justify-between items-center py-5 px-5 border-b">
        <h3 className="text-darkCustom text-sm">Deactivate a beneficiary</h3>
        <div className="cursor-pointer" onClick={() => seOpen("default")}>
          <GrClose className="text-grayCustom" />
        </div>
      </div>
      <form className="px-5">
        <p className="text-md my-5 text-grayCustom">
          Please specify reason for deactivating the beneficiary
        </p>

        <div id="select" className="my-3">
          <div className="mb-2 block">
            <Label htmlFor="reason" className="text-grayCustom ml-3">
              Select deactivating reason
            </Label>
          </div>
          <select
            style={{ background: "none" }}
            id="reason"
            required={true}
            {...register("reason")}
          >
            <option selected>Select deactivating reason</option>
            <option>Replace</option>
            <option>Block</option>
            <option>Test</option>
          </select>
        </div>

        <div id="textarea">
          <div className="mb-2 block">
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
          <Button className="text-grayCustom font-medium px-10 py-2 bg-lineBlueCustom">
            Cancel
          </Button>
          <Button type="submit" className="font-medium px-10 py-2">
            Deactivate
          </Button>
        </div>
      </form>
    </div>
  );
};

export default DeactiveBeneficiaries;
