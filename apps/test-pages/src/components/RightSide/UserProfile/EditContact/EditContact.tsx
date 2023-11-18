import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import { Label } from "@shadcn/label";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { AiFillTwitterCircle } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { GET_CONTACT_BY_IDQuery } from "@api-lib/gql/graphql";
import { useUpdateContactById } from "@api-lib/graphql";
import { useQueryClient } from "@tanstack/react-query";
import {
  FixedToastMessage,
  ToastMessage,
} from "@shared/components/Toastify/Toastify";

const EditContact = ({
  setSelected,
  contactData,
}: {
  setSelected: any;
  contactData: GET_CONTACT_BY_IDQuery["payload"];
}) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation("rightSide");
  const [modifySocial, setModifySocial] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const toggleModifySocial = () => {
    setModifySocial(!modifySocial);
  };
  const mutation = useUpdateContactById({
    onSuccess: () => {
      // queryClient.invalidateQueries(["conversation_details", conversationDetails.id]);
      queryClient.invalidateQueries(["contact_details"]);
      ToastMessage("success", "Contact Updated Successfully");
      setSelected("close");
    },
    onError: (error) => {
      if (error[0]?.extensions?.code === "constraint-violation") {
        if (
          error[0]?.message?.includes("contacts_phone_number_account_id_key")
        ) {
          setError("phone_number", {
            type: "custom",
            message: "Another contact with this phone number already exists",
          });
        }
        if (error[0]?.message?.includes("contacts_email_account_id_key")) {
          setError("email", {
            type: "custom",
            message: "Another contact with this email already exists",
          });
        }
      } else FixedToastMessage("error", "Something went wrong!", "colored");
    },
  });

  const onSubmit = (formData) => {
    const code = "+966";
    const newFormData = {
      contact_id: contactData.id,
      name: formData.name,
      phone_number: code + formData.phone_number,
      ...(formData.email !== "" && { email: formData.email }),
      gender: formData.gender,
      city: formData.city,
      preferred_language: formData.preferred_language,
      social_profiles: {
        ...contactData.social_profiles,
        twitter: formData.twitter,
      },
    };
    // console.log(contactData?.social_profiles?.twitter, formData, newFormData);
    mutation.mutate(newFormData);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-start justify-between mb-5">
        <h3 className="text-darkCustom text-xl font-semibold">
          {t("rightSide.editContact.title")}
        </h3>
        <div
          onClick={() => setSelected("close")}
          className="cursor-pointer float-right rounded-3xl hover:bg-sky-100 p-2 -mt-1.5"
        >
          <GrClose className="!text-grayCustom" />
        </div>
      </div>

      {/*       <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mt-4 space-y-4">
          <div className="mt-4 space-y-4">
            <p className="font-medium text-small leading-4 text-grayCustom px-4">Shortcut</p>
            <input
              type="text"
              placeholder="add #shortcut for response"
              className="focus:outline-none border border-lineGrayCustom w-full px-3 rounded py-1 placeholder:font-medium
         placeholder:text-normal placeholder:leading-6 placeholder:text-grayCustom text-darkCustom"
              {...register("short_code", { required: true })}
            />
          </div>

          <div className="my-4">
            <p className="font-medium text-small leading-4 text-grayCustom px-4">Response</p>
            <textarea
              rows={4}
              cols={50}
              className="border rounded w-full py-3 px-3 text-grayCustom leading-tight focus:outline-none focus:shadow-outline mt-3"
              {...register("content", { required: true })}
              placeholder="Please enter a content"
            />
          </div>

          <div className="flex gap-x-2">
            <button type="submit" className="bg-blueCustom text-white w-full rounded py-1 font-semibold text-normal leading-6">
              Create
            </button>
            <button type="button" className="bg-pastelBlueCustom text-grayCustom w-full rounded py-1 font-semibold text-normal leading-6 hover:text-blueCustom">
              Cancel
            </button>
          </div>
        </div>
      </form> */}

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* name */}
        <div className="my-3">
          <p className="text-sm leading-4 font-medium text-grayCustom px-5">
            {t("rightSide.editContact.fields.name")}
          </p>
          <Input
            type="text"
            className="border border-lineGrayCustom px-5 py-2 my-2 rounded w-full text-sm leading-6 font-medium text-darkCustom focus:outline-none"
            defaultValue={contactData.name}
            placeholder={!contactData.name && "No name found"}
            {...register("name")}
          />
        </div>

        {/* phone number */}
        {/* <div className="my-3">
          <p className="text-md leading-4 font-medium text-grayCustom px-5">{t("rightSide.editContact.fields.phone")}</p>
          <input
            type="text"
            className="border border-lineGrayCustom rounded px-4 py-2 my-2 w-full text-normal leading-6 font-medium text-darkCustom focus:outline-none"
            defaultValue={contactData.phone_number}
            placeholder={!contactData.phone_number && "No phone number found"}
            {...register("phone_number", {
              required: true,
              minLength: { value: 13, message: "minimum length is 13" },
              maxLength: { value: 13, message: "maximum length is 13" },
            })}
          />
          <p>
            {errors.phone_number && (
              <span className="text-red-500 text-sm inline-block mt-1.5">{(errors.phone_number && (errors.phone_number.message as string)) || "Phone number is required"}</span>
            )}
          </p>
        </div> */}
        <div className="my-3">
          <div>
            <Label
              htmlFor="phone-number"
              className="block text-sm font-medium text-grayCustom mb-1 px-5"
            >
              {t("rightSide.editContact.fields.phone")}
            </Label>

            <div className="mt-1 relative rounded border">
              <div className="absolute inset-y-0 left-0 flex items-center">
                <Label htmlFor="country_code" className="sr-only">
                  Country
                </Label>
                <Input
                  type="number"
                  name="country_code"
                  id="country_code"
                  className="outline-none block pl-2 sm:text-sm rounded-md w-14 py-1 border-r-2 border-lineGrayCustom border-l-0 border-b-0 border-t-0 rounded-r-none bg-transparent"
                  value="+966"
                  placeholder="+966"
                  readOnly
                />
              </div>
              <Input
                type="number"
                className="px-5 pl-16 py-1.5 border-lineGrayCustom focus:ring-0 rounded text-sm leading-6 font-medium text-darkCustom focus:outline-none w-full"
                defaultValue={contactData?.phone_number?.slice(4, 13)}
                placeholder={
                  !contactData.phone_number && "No phone number found"
                }
                {...register("phone_number", {
                  required: true,
                  minLength: { value: 9, message: "minimum length is 9" },
                  maxLength: { value: 9, message: "maximum length is 9" },
                })}
              />
            </div>
            <p>
              {errors.phone_number && (
                <span className="text-red-500 text-sm inline-block mt-1.5">
                  {(errors.phone_number &&
                    (errors.phone_number.message as string)) ||
                    "Phone number is required"}
                </span>
              )}
            </p>
          </div>
        </div>
        {/* email */}
        <div className="my-3">
          <p className="text-sm leading-4 font-medium text-grayCustom px-5">
            {t("rightSide.editContact.fields.email")}
          </p>
          <Input
            type="email"
            className="border border-lineGrayCustom rounded py-2 px-4 my-2 text-sm w-full leading-6 font-medium text-darkCustom focus:outline-none"
            defaultValue={contactData.email}
            placeholder={!contactData.email && "No email found"}
            {...register("email")}
          />
          <p>
            {errors.email && (
              <span className="text-red-500 text-sm inline-block mt-1.5">
                {errors.email && (errors.email.message as string)}
              </span>
            )}
          </p>
          {/* <p className="text-small leading-4 font-semibold text-blueCustom px-5">Add New Email</p> */}
        </div>

        {/* gender */}
        <div className="my-3">
          <p className="text-sm leading-4 font-medium text-grayCustom px-5">
            {t("rightSide.editContact.fields.gender")}
          </p>
          <div className="my-2 w-full">
            <select
              className="border border-lineGrayCustom rounded py-3 px-4 my-1 text-sm bg-transparent w-full leading-4 text-darkCustom outline-none focus:outline-none"
              defaultValue={contactData.gender}
              {...register("gender")}
            >
              <option disabled>Select a Gender</option>
              {contactData.gender === null && (
                <option value={null}>No Result Found</option>
              )}
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        {/* city */}
        {/* <div className="my-4">
          <p className="text-small leading-4 font-medium text-grayCustom px-5">City</p>
          <input
            type="text"
            className="border border-lineGrayCustom px-5 py-1 my-2 rounded w-full text-normal leading-6 font-medium text-darkCustom focus:outline-none"
            defaultValue={contactData.city}
            {...register("city")}
          />
        </div> */}

        {/* language */}
        <div className="my-3">
          <p className="text-sm leading-4 font-medium text-grayCustom px-5">
            {t("rightSide.editContact.fields.language")}
          </p>
          <div className="my-2 w-full">
            <select
              className="border border-lineGrayCustom rounded py-3 px-4 my-1 text-sm bg-transparent w-full leading-4 text-darkCustom outline-none focus:outline-none"
              defaultValue={contactData?.preferred_language}
              {...register("preferred_language")}
            >
              <option disabled>Select a Language</option>
              <option value="en">English</option>
              <option value="ar">Arabic</option>
            </select>
          </div>
        </div>

        {/* social profile */}
        {contactData.social_profiles && (
          <>
            {contactData.social_profiles.twitter && (
              <>
                <p className="text-normal leading-6 font-semibold text-darkCustom">
                  {t("rightSide.editContact.fields.social.title")}
                </p>
                <div className="my-4">
                  <p className="capitalize text-small leading-4 font-medium text-grayCustom px-5">
                    {t("rightSide.editContact.fields.social.mediaName")}
                  </p>
                  <div className="w-full rounded border border-lineGrayCustom px-5 my-2 flex justify-start items-center gap-x-4">
                    <AiFillTwitterCircle className="text-twitter text-2xl" />
                    <div
                      className={`flex justify-start items-center ${
                        modifySocial ? "cursor-auto" : "cursor-not-allowed"
                      }`}
                    >
                      <p>/</p>
                      <input
                        type="text"
                        readOnly={!modifySocial}
                        className={`w-full text-darkCustom text-small leading-4 font-medium focus:outline-none ${
                          modifySocial ? "cursor-auto" : "cursor-not-allowed"
                        }`}
                        defaultValue={contactData.social_profiles.twitter}
                        {...register("twitter")}
                      />
                    </div>
                  </div>
                  <Button
                    className={`ml-auto flex justify-end items-center text-sm ${
                      modifySocial ? "text-redCustom" : "text-blueCustom"
                    } `}
                    onClick={toggleModifySocial}
                  >
                    {modifySocial ? "finish modify" : "edit profile"}
                  </Button>
                </div>
              </>
            )}

            {/* <p className="text-small leading-4 font-semibold text-blueCustom px-5">Add New Profile</p> */}
          </>
        )}

        <div className="flex justify-end gap-x-4 items-center w-full">
          <Button
            type="submit"
            className="w-1/2 rounded py-2 bg-blueCustom text-white font-medium text-normal leading-6"
          >
            {t("rightSide.editContact.button.update")}
          </Button>
          <Button
            onClick={() => setSelected("close")}
            type="button"
            className="w-1/2 rounded py-2 bg-lineBlueCustom text-grayCustom font-medium text-normal leading-6 hover:text-blueCustom"
          >
            {t("rightSide.editContact.button.cancel")}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
