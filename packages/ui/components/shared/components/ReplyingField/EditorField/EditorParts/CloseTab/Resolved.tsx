import { useContactReasonList } from "@api-lib/graphql";
import React, { useEffect, useMemo } from "react";
import { Model } from "survey-core";
import { Survey } from "survey-react";

const surveyCss = {
  root: "bg-transparent w-full",
  body: "w-[41rem] mx-0",
  // container: "ml-5 w-7/12",
  container: "",
  // row: "w-1/4",
  // pageRow: "w-1/4",
  // header: "bg-white",
  page: {
    root: "w-full flex justify-center items-center",
  },
  rowMultiple: "sd-row--multiple",
  row: "w-1/3",
  pageRow: "",
  question: {
    root: "w-1/3",
    control: "w-1/3",
    // content: "my-3",
    title: "text-md font-medium text-darkCustom py-1 text-slate-700",
    // asCell: "w-fit",
  },
  dropdown: {
    root: "border-none shadow-none w-full",
    control:
      "w-52 border border-lineGrayCustom rounded p-1 flex justify-center items-center text-grayCustom sd-dropdown",
  },
  text: {
    root: "border border-lineGrayCustom rounded p-2 flex justify-center items-center text-grayCustom sd-text",
  },
  panel: {
    title: "text-md font-medium text-slate-700 py-1 text-slate-700",
  },
};

const Resolved = ({ updater, reducerData, conversationData }) => {
  const surveyData = reducerData?.contactReasonData;
  const { data: contactReasonList, status: ContactReasonStatus } =
    useContactReasonList();

  const survey = useMemo(
    () => new Model(contactReasonList && contactReasonList[0].categories),
    [reducerData?.contactReasonData, surveyData, contactReasonList]
  );
  survey.showNavigationButtons = false;
  survey.showCompletedPage = false;
  survey.focusFirstQuestionAutomatic = false;

  survey.onValueChanged.add((sender, options) => {
    updater({ type: "SET_CONTACT_REASON_DATA", payload: sender.data });
  });

  useEffect(() => {
    survey.data = surveyData;
  }, [surveyData, contactReasonList]);

  return (
    <div className="bg-primary/10">
      <div className="flex gap-x-4 items-center py-1.5 px-2">
        <h1 className="font-medium text-sm text-textGray whitespace-nowrap">
          Contact Reason:
        </h1>
        <div className="max-h-10">
          <Survey model={survey} css={surveyCss} data={surveyData} />
        </div>
      </div>
    </div>
  );
};

export default Resolved;
