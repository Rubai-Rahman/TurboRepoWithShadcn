import React, { Fragment, useState } from "react";
import { IoChevronDownCircleOutline } from "react-icons/io5";
import moment from "moment";
import LinkedDevices from "./LinkedDevices";
import CustomAccordion from "@shared/components/CustomAccordion/CustomAccordion";
import { CRMCustomerData } from "@pages/api/crm/customer";
import InfoIcon from "@shared/assets/icons/InfoIcon";

const UserAccccount = ({ crmData }: { crmData: CRMCustomerData }) => {
  const [userAccount, setUserAccount] = useState("close");
  const { accountDetails, cardDetails, customerDetails } = crmData;
  // console.log("crmData", crmData);
  const account = accountDetails?.data[0];
  const card = cardDetails?.data[0];
  const customer = customerDetails.data;

  const currency =
    account?.currency === "682"
      ? " SAR"
      : account?.currency === "840"
      ? " USD"
      : null;
  const registrationStatus =
    customer.registrationStatus === 0
      ? "UNSPECIFIED"
      : customer.registrationStatus === 1
      ? "WAITING_FOR_NAFATH"
      : customer.registrationStatus === 2
      ? "SCREENING_REJECTED"
      : customer.registrationStatus === 3
      ? "PENDING_SCREENING"
      : customer.registrationStatus === 5
      ? "NAFATH_COMPLETED"
      : customer.registrationStatus === 6
      ? "COMPLETED"
      : customer.registrationStatus === 7
      ? "MOBILE_USED_BY_OTHER_CUSTOMER"
      : customer.registrationStatus === 8
      ? "READY_TO_SET_PASSCODE"
      : customer.registrationStatus === 9
      ? "DEVICE_LIMIT"
      : customer.registrationStatus === 10
      ? "OLD_MOBILE_VERIFIED"
      : customer.registrationStatus === 11
      ? "MOBILE_REPLACED_WITH_OLD"
      : customer.registrationStatus === 12
      ? "DIFFERENT_MOBILE"
      : customer.registrationStatus === 13
      ? "ID_VERIFIED"
      : customer.registrationStatus === 14
      ? "SHORTLISTED"
      : customer.registrationStatus === 15
      ? "IN_WAITLIST"
      : customer.registrationStatus === 16
      ? "MOBILE_VERIFIED"
      : customer.registrationStatus === 17
      ? "INIT"
      : customer.registrationStatus === 18
      ? "NAFATH_AUTH_FAILED"
      : customer.registrationStatus === 19
      ? "NAFATH_NATIONAL_ID_DIFFERENT_FROM_SESSION_ID_NUMBER"
      : customer.registrationStatus === 20
      ? "PENDING_FOR_VOICE_AUTHZ"
      : customer.registrationStatus === 21
      ? "VOICE_AUTHZ_FAILED"
      : "-";

  return (
    <div>
      {userAccount === "close" && (
        <Fragment>
          <CustomAccordion
            title="Saudi Riyal account"
            titleClass="text-darkCustom text-base leading-6"
            buttonClass="px-4 py-2 border-b border-lineGrayCustom w-full flex items-center justify-between"
            rightSideIcon={
              <IoChevronDownCircleOutline className="text-xl h-6 w-6 text-grayCustom" />
            }
            imageSrc="/images/SoudiArabia.png"
            imageHeight={24}
            imageWidth={24}
          >
            <div className="p-4 border-b border-lineGrayCustom">
              <div className="flex gap-x-4 items-center">
                <div className="w-full h-24 border border-blueCustom/30 rounded-lg flex flex-col p-2">
                  <p className="font-medium text-normal leading-6 text-grayCustom">
                    Available Balance
                  </p>
                  <p className="font-semibold text-2xl leading-8 text-blueCustom my-1 pt-2">
                    {account?.availableBalance
                      ? (account?.availableBalance / 100).toFixed(2)
                      : "-"}
                    <span className="text-base">{currency}</span>
                  </p>
                </div>

                <div className="w-full h-24 border border-blueCustom/30 rounded-lg flex flex-col p-2">
                  <p className="font-medium text-normal leading-6 text-grayCustom">
                    Current Balance
                  </p>
                  <p className="font-semibold text-2xl leading-8 text-blueCustom my-1 pt-2">
                    {account?.currentBalance
                      ? (account?.currentBalance / 100).toFixed(2)
                      : "-"}
                    <span className="text-base">{currency}</span>
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4 items-center my-4">
                <div className="w-full h-24 border border-blueCustom/30 rounded-lg flex flex-col p-2">
                  <p className="font-medium text-normal leading-6 text-grayCustom">
                    Account Status
                  </p>
                  <p className="font-semibold text-2xl leading-8 text-darkCustom my-1">
                    {account?.status === 0
                      ? "Unspecified"
                      : account?.status === 1
                      ? "Active"
                      : account?.status === 2
                      ? "Closed"
                      : account?.status === 3
                      ? "Frozen"
                      : "-"}
                  </p>
                  <p className="font-normal text-smaller leading-5 text-grayCustom">
                    Updated{" "}
                    {moment(crmData?.lastUpdated)
                      .format("DD-MM-YYYY - hh:mm A")
                      .toString()}
                  </p>
                </div>

                {/* <div className="w-full h-28 border border-lineGrayCustom rounded-lg flex flex-col p-2">
                  <p className="font-medium text-normal leading-6 text-grayCustom">Last Login</p>
                  <p className="font-semibold text-2xl leading-8 text-darkCustom my-2">Yesterday</p>
                  <p className="font-normal text-smaller leading-5 text-grayCustom">12:00PM - 10-10-2023</p>
                </div> */}

                {/* </div>

              <div className="flex gap-x-4 items-center mb-4">
                <div className="w-full h-28 border border-lineGrayCustom rounded-lg flex flex-col p-2">
                  <p className="font-medium text-normal leading-6 text-grayCustom">Last Transaction</p>
                  <p className="font-semibold text-2xl leading-8 text-darkCustom my-2">12H 30M</p>
                  <p className="font-normal text-smaller leading-5 text-grayCustom">Updated 10-10-2023 - 12:00PM</p>
                </div> */}

                <div className="w-full h-24 border border-blueCustom/30 rounded-lg flex flex-col p-2">
                  <p className="font-medium text-normal leading-6 text-grayCustom">
                    Risk Rating
                  </p>
                  <p className="font-semibold text-2xl leading-8 text-darkCustom my-1">
                    {customer?.riskAssessmentRating === 0
                      ? "Unspecified"
                      : customer?.riskAssessmentRating === 1
                      ? "Low"
                      : customer?.riskAssessmentRating === 2
                      ? "Medium"
                      : customer?.riskAssessmentRating === 3
                      ? "High"
                      : "-"}
                  </p>
                  <p className="font-normal text-smaller leading-5 text-grayCustom">
                    Updated{" "}
                    {moment(crmData?.lastUpdated)
                      .format("DD-MM-YYYY - hh:mm A")
                      .toString()}
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4 items-center">
                <div className="w-full h-24 border border-blueCustom/30 rounded-lg flex flex-col p-2">
                  <p className="font-medium text-normal leading-6 text-grayCustom">
                    Account Status Reason
                  </p>
                  <p className="font-semibold text-2xl leading-8 text-darkCustom my-1 pt-2">
                    {crmData?.accountDetails?.data[0]?.statusReason || "-"}
                  </p>
                </div>
                <div className="w-full h-24 border border-blueCustom/30 rounded-lg flex flex-col p-2">
                  <p className="font-medium text-normal leading-6 text-grayCustom">
                    Registration Status
                  </p>
                  <p className="font-semibold text-2xl leading-8 text-darkCustom my-1 pt-2">
                    {registrationStatus ? registrationStatus : "-"}
                  </p>
                </div>
              </div>

              <div className="flex gap-x-4 pt-4">
                <div className="w-full flex justify-between items-center">
                  <p className="font-semibold text-small leading-5 text-black pt-1">
                    SAR{" "}
                    {account?.onHoldBalance
                      ? (account?.onHoldBalance / 100).toFixed(2)
                      : "-"}{" "}
                    <span className="text-redCustom"> On hold</span>
                  </p>
                  <InfoIcon style="text-grayCustom" height={16} width={16} />
                </div>
                <div className="w-full flex justify-between items-center">
                  <p className="font-semibold text-small leading-5 text-black pt-1">
                    ID Expires on
                    <span className="pl-1">
                      {customer?.idExpiryDate?.day || "-"}
                    </span>
                    /<span>{customer?.idExpiryDate?.month || "-"}</span>/
                    {customer?.idExpiryDate?.year || "-"}
                  </p>
                  <InfoIcon style="text-grayCustom" height={16} width={16} />
                </div>
              </div>
            </div>
          </CustomAccordion>

          <CustomAccordion
            title="Contact Details"
            titleClass="font-normal text-normal leading-6 text-darkCustom"
            buttonClass="px-4 py-3 border-b border-lineGrayCustom w-full flex justify-between items-center"
          >
            <div className="p-4 border-b border-lineGrayCustom">
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Full Name (AR)
                </p>
                <p className="text-darkCustom font-medium text-bigger leading-6 px-4">
                  {customer?.nameArabic || "-"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Full Name (ER)
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.nameEnglish || "-"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Date of Birth
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  <span>{customer?.dateOfBirth?.day || "-"}-</span>
                  <span>{customer?.dateOfBirth?.month || "-"}</span>
                  {-customer?.dateOfBirth?.year || "-"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Place of Birth
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.placeOfBirth || "-"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Nationality
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.nationality || "-"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  ID Expiry Date
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  <span>{customer?.idExpiryDate?.day || "-"}-</span>
                  <span>{customer?.idExpiryDate?.month || "-"}</span>
                  {-customer?.idExpiryDate?.year || "-"}
                </p>
              </div>

              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  ID Tag
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.tag ? customer.tag : "no-tag"}
                </p>
              </div>

              <div className="">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  ID Number
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.idNumber || "-"}
                </p>
              </div>
            </div>
          </CustomAccordion>

          <CustomAccordion
            title="Work Info"
            titleClass="font-normal text-normal leading-6 text-darkCustom"
            buttonClass="px-4 py-3 border-b border-lineGrayCustom w-full flex justify-between items-center"
          >
            <div className="p-4 border-b border-lineGrayCustom">
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Monthly Income
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  -
                </p>
                {/* <p className="text-darkCustom font-medium text-normal leading-6 px-4">Between SAR 5,000 and 10,000</p> */}
              </div>
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Occupation Status
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.occupation?.employmentStatus === 0
                    ? "Unspecified"
                    : customer?.occupation?.employmentStatus === 1
                    ? "Private Sector Employee"
                    : customer?.occupation?.employmentStatus === 2
                    ? "Government Sector Employee"
                    : customer?.occupation?.employmentStatus === 3
                    ? "Both Salaried and Self employed"
                    : customer?.occupation?.employmentStatus === 4
                    ? "Hafiz"
                    : customer?.occupation?.employmentStatus === 5
                    ? "Housewife OR Dependant"
                    : customer?.occupation?.employmentStatus === 6
                    ? "Retired"
                    : customer?.occupation?.employmentStatus === 7
                    ? "Self Employed"
                    : customer?.occupation?.employmentStatus === 8
                    ? "Student"
                    : customer?.occupation?.employmentStatus === 9
                    ? "Unemployed"
                    : "-"}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Profession
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  -
                </p>
                {/* <p className="text-darkCustom font-medium text-normal leading-6 px-4">Central Controller</p> */}
              </div>
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Sponsor Name
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.occupation?.sponsorName || "-"}
                </p>
              </div>
            </div>
          </CustomAccordion>

          <CustomAccordion
            title="National Address"
            titleClass="font-normal text-normal leading-6 text-darkCustom"
            buttonClass="px-4 py-3 border-b border-lineGrayCustom w-full flex justify-between items-center"
          >
            <div className="p-4 border-b border-lineGrayCustom">
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  City
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.nationalAddress?.city || "-"}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  District
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.nationalAddress?.district || "-"}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Building Number
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.nationalAddress?.buildingNumber || "-"}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Unit Number
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.nationalAddress?.unitNumber || "-"}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Street
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.nationalAddress?.streetName || "-"}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Postal Code
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.nationalAddress?.postalCode || "-"}
                </p>
              </div>
              <div className="mb-3">
                <p className="text-grayCustom font-semibold text-normal leading-6">
                  Additional Number
                </p>
                <p className="text-darkCustom font-medium text-normal leading-6 px-4">
                  {customer?.nationalAddress?.additionalNumber || "-"}
                </p>
              </div>
            </div>
          </CustomAccordion>

          {/* <CustomAccordion
            title="Privacy &amp; Security"
            titleClass="font-normal text-normal leading-6 text-darkCustom"
            buttonClass="px-4 py-3 border-b border-lineGrayCustom w-full flex justify-between items-center"
          >
            <div className="p-4 border-b border-lineGrayCustom">
              <div className="flex gap-x-4 items-center">
                <PrivacyImageIcon />
                <div className="w-full flex justify-between items-center">
                  <div>
                    <p className="text-grayCustom font-semibold text-normal leading-6">Face ID</p>
                    <p className="text-darkCustom font-medium text-normal leading-6">Enabled</p>
                  </div>
                  <CustomSwitch />
                </div>
              </div>

              <div className="flex gap-x-3 items-center my-2">
                <div className="h-12 w-[50px] flex justify-center items-center rounded-full bg-blueCustom/5">
                  <M3PasswordIcon />
                </div>
                <div className="w-full flex justify-between items-center">
                  <div>
                    <p className="text-grayCustom font-semibold text-normal leading-6">Passcode</p>
                    <p className="text-darkCustom font-medium text-normal leading-6">Active</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-x-4 items-center cursor-pointer" onClick={() => setUserAccount("linked")}>
                <div className="h-12 w-[50px] flex justify-center items-center rounded-full bg-blueCustom/5">
                  <MdOutlinePermDeviceInformation className="text-blueCustom text-2xl" />
                </div>
                <div className="w-full flex justify-between items-center">
                  <div>
                    <p className="text-grayCustom font-semibold text-normal leading-6">Linked Devices</p>
                    <p className="text-darkCustom font-medium text-normal leading-6">1</p>
                  </div>
                  <p className="text-blueCustom leading-6 font-semibold text-normal">View</p>
                </div>
              </div>
            </div>
          </CustomAccordion> */}
        </Fragment>
      )}

      {userAccount === "linked" && (
        <LinkedDevices setUserAccount={setUserAccount} />
      )}
    </div>
  );
};

export default UserAccccount;
