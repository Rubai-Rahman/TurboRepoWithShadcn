import React from "react";
import { useForm } from "react-hook-form";
import { GrClose } from "react-icons/gr";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import { Button } from "@shadcn/button";

const ReplaceCard = ({ setScreen }) => {
  const {
    register,
    control,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="">
      <div className="flex justify-between items-center py-5 px-5 border-b">
        <h3 className="text-darkCustom text-sm ">Replace Card</h3>
        <div className="cursor-pointer" onClick={() => setScreen(1)}>
          <GrClose className="text-grayCustom" />
        </div>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="px-5">
        <p className="text-md my-5 text-grayCustom">
          Please select what reason for replacement
        </p>
        <div className="flex items-center gap-5">
          <Input
            type="checkbox"
            name="damaged"
            placeholder="damaged"
            value="damaged"
            {...register("damaged")}
          />
          <Label htmlFor="damaged">Damaged Card</Label>
        </div>
        <div className="flex items-center gap-5 my-5">
          <Input
            type="checkbox"
            name="lost"
            placeholder="lost"
            value="lost"
            {...register("lost")}
          />
          <Label htmlFor="lost">Lost Card</Label>
        </div>
        <div className="flex items-center gap-5">
          <Input
            type="checkbox"
            name="stolen"
            placeholder="stolen"
            value="stolen"
            {...register("stolen")}
          />
          <Label htmlFor="stolen">Stolen Card</Label>
        </div>
        <div className="flex justify-start items-center gap-3 mt-5">
          <Button
            onClick={() => setScreen(1)}
            className="text-grayCustom font-medium"
            colors="bg-lineBlueCustom px-10 py-2"
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

export default ReplaceCard;
