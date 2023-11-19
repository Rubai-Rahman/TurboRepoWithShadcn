import { GET_TEAMSQuery, GET_TEAM_BY_IDQuery } from '@api-lib/gql/graphql';
import {
  useCreateTicket,
  useTeamDetailsById,
  useTeamList,
  useTicketFormList,
} from '@api-lib/graphql';
import { yupResolver } from '@hookform/resolvers/yup';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslation } from 'next-i18next';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
import { GrClose } from 'react-icons/gr';
import { RxTrash } from 'react-icons/rx';
import { TiTick } from 'react-icons/ti';
import Select from 'react-select';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import { Survey } from 'survey-react';
import * as yup from 'yup';
import { FormValues, NewTicketTypes } from './NewTicket.types';
import {
  FixedToastMessage,
  ToastMessage,
} from '@localShared/components/ToastMessage/ToastMessage';
import { Button } from '@shadcn/button';
import { Input } from '@shadcn/input';
import Icon from '@localShared/components/Icon/Icon';
import { Label } from '@shadcn/label';
import { DropdownIndicator } from '@localShared/DropdownIndicator';
import { Textarea } from '@shadcn/textarea';

type FormValues = {
  subject: string;
  assigned_team: { value: number; label: string };
  assigned_agent: { value: number; label: string };
  source: string;
  description: string;
  priority: number;
  status: number;
};
const requiredMessage = 'This field is required!';

const schema = yup
  .object({
    source: yup.string().required(requiredMessage),
    priority: yup.number().integer(requiredMessage).required(requiredMessage),
    // assigned_agent: yup.string().required(requiredMessage),
    assigned_team: yup
      .object({
        value: yup.number().required(requiredMessage),
        label: yup.string().required(requiredMessage),
      })
      .required(requiredMessage),
    subject: yup.string().required(requiredMessage),
    description: yup.string().required(requiredMessage),
  })
  .required();

// StylesManager.applyTheme("defaultV2");

const NewTicket = ({ contactData, setSelected }: NewTicketTypes) => {
  const router = useRouter();
  const { t } = useTranslation('rightSide');
  const queryClient = useQueryClient();
  const [phone, setPhone] = useState('');
  const [newTicketId, setNewTicketId] = useState<number>();
  const [show, setShow] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const [teamList, setTeamList] = useState<GET_TEAMSQuery['payload']>();
  const [agentList, setAgentList] =
    useState<GET_TEAM_BY_IDQuery['payload']['team_members']>();
  const [currentState, setCurrentState] = useState(false);

  const { data: surveyFormData, isLoading } = useTicketFormList();
  // const surveyForm = surveyFormData?.find((e) => e.id === 29);
  const surveyFrom = surveyFormData && surveyFormData[0];
  const survey = useMemo(
    () => new Model(surveyFrom?.survey_form),
    [surveyFormData]
  );
  survey.showNavigationButtons = false;
  survey.showCompletedPage = false;

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    control,
    formState: { errors, touchedFields },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });
  const teamOptionsList: { value: number; label: string }[] = teamList?.map(
    (item) => {
      return { value: +item.id, label: item.name };
    }
  );
  const { data: teamListData } = useTeamList(Infinity, 0, {
    onSuccess: (data) => {
      setTeamList(data.payload);
    },
  });

  const { mutate, isLoading: mutationLoading } = useCreateTicket({
    onSuccess: (data) => {
      const ticketId = data.id;
      setCurrentState(true);
      setNewTicketId(ticketId);
      survey.clear(true);
      queryClient.invalidateQueries(['filtered_tickets']);
      reset();
      // const tickets = router.push(`/tickets/${ticketId}`);
      // queryClient.invalidateQueries("tickets_list");
      // ToastMessage("success", "Successfully Created The Ticket ");
    },
    onError: () => {
      ToastMessage('error', 'Failed To Create Ticket');
    },
  });

  const handleContact = () => {
    const id = contactData.id;
    const phone_number = phone;
    if (phone_number?.length >= 9 && phone_number?.length <= 15) {
      if (contactData?.phone_number) {
        setSelected({ ...contactData, phone_number: phone_number });
      } else {
        // mutate({ id, phone_number });
        // console.log("data", id, phone_number);
      }
      setSelected({ ...contactData, phone_number: phone_number });
    } else {
      FixedToastMessage('error', 'Invalid input! min: 9 max: 15', 'colored');
    }
  };

  const selectedTeamId2: { value: number; label: string } =
    watch('assigned_team');

  const { data: teamSingleData } = useTeamDetailsById(selectedTeamId2?.value, {
    onSuccess: (data) => {
      setAgentList(data.team_members);
    },
    enabled: !!selectedTeamId2?.value,
  });
  const agentOptionsList: { value: number; label: string }[] =
    teamSingleData?.team_members?.map((item) => {
      return { value: +item.user.id, label: item.user.name };
    });

  const surveyCss = {
    root: 'bg-white',
    container: 'w-full',
    body: 'w-full mx-0',
    // container: "ml-5",
    // row: "",
    // pageRow: "w-full",
    // header: "bg-white",
    page: {
      root: 'pb-4',
    },
    question: {
      // content: "my-3 bg-red-500",
      title: 'text-sm font-medium text-grayCustom py-1 pl-4',
      asCell: 'w-full bg-red-500',
      number: 'hidden',
      input: 'bg-red-500',
    },
    dropdown: {
      root: 'border-none shadow-none',
      control:
        'border border-lineGrayCustom rounded p-2 flex justify-center items-center text-grayCustom sd-dropdown',
    },
    text: {
      root: 'border border-lineGrayCustom rounded p-2 flex justify-center items-center text-grayCustom sd-text',
    },
    panel: {
      title: 'text-md font-medium text-slate-700 py-1',
    },
  };

  const onSubmit = (formValues) => {
    if (!contactData?.id) {
      FixedToastMessage('error', 'Please select a contact', 'colored');
    } else {
      const ticketDetails = {
        source: formValues.source,
        priority: +formValues.priority,
        assigned_agent: +formValues?.assigned_agent?.value,
        assigned_team: +formValues.assigned_team.value,
        subject: formValues.subject,
        description: formValues.description,
        type: survey.data.Type,
        ticket_form_id: surveyFrom.id,
      };
      const newData = {
        ...ticketDetails,
        contact_id: contactData?.id,
        ...(router.query.conversationId && {
          conversation_id: router.query.conversationId,
        }),
        form_value: survey.data,
        messages: {
          data: {
            content: formValues.description,
            message_type: 4,
          },
        },
      };
      // survey.completeLastPage();
      if (Object.keys(survey?.data).length === 0) {
        FixedToastMessage('error', 'Please fill-up surveyJS form', 'colored');
      } else {
        survey.onCompleting.add(mutate(newData));
      }
    }
  };

  return (
    <div className="w-full h-full p-4">
      {currentState ? (
        <div className="flex flex-col justify-center items-center h-full">
          <p className="text-xl font-medium text-green-500">
            {t('rightSide.newTicket.message.success')}
          </p>
          <Link
            href={`/tickets/${newTicketId}`}
            target="_blank"
            className="text-xl text-blueCustom my-3"
          >
            <p>
              Ticket Id: <span className="underline">{newTicketId}</span>{' '}
            </p>
          </Link>
          <Button
            className="text-xl text-red-500 border px-3 py-1.5 rounded-md"
            onClick={() => setCurrentState(false)}
          >
            Go Back
          </Button>
        </div>
      ) : (
        <div>
          <div className="flex items-center justify-between">
            <h3 className="text-darkCustom text-xl font-semibold">
              {t('rightSide.newTicket.title')}
            </h3>
            <div
              onClick={() => setSelected('close')}
              className="cursor-pointer float-right rounded-3xl hover:bg-sky-100 p-2 -mt-1.5"
            >
              <GrClose className="!text-grayCustom" />
            </div>
          </div>

          <div className="flex justify-start items-start gap-3 text-darkCustom mt-5 max-w-2xl md:w-[28rem]">
            <div className="relative rounded-full bg-sky-200 w-16 h-16 flex justify-center items-center overflow-hidden">
              {contactData?.profile_image ? (
                <Image
                  className="rounded-full"
                  layout="fill"
                  src={contactData?.profile_image}
                  alt={contactData.name}
                  priority
                />
              ) : contactData?.source?.profile_image ? (
                <Image
                  className="rounded-full"
                  layout="fill"
                  src={contactData?.source.profile_image}
                  alt={contactData.name}
                  priority
                />
              ) : (
                <span className="text-lg text-blue-400 ">
                  {contactData?.name?.slice(0, 1)}
                </span>
              )}
            </div>
            <div className="text-darkCustom text-justify w-3/5 inline-block">
              <p className="text-slate-700 truncate block">
                {contactData?.name || 'no data found'}
              </p>
              <p className="italic text-sm">
                {contactData?.email || 'no email found'}
              </p>
              <div className="italic text-sm inline-flex">
                {!show && (
                  <>
                    <span>
                      {' '}
                      {contactData?.phone_number || 'no number found'}
                    </span>
                    <span>
                      {' '}
                      {
                        <Icon
                          name={FiEdit}
                          className="hover:text-greenCustom cursor-pointer inline-block ml-2"
                          onClick={() => setShow(true)}
                        />
                      }
                    </span>
                  </>
                )}
                {show && (
                  <div>
                    <div className="flex items-center">
                      {/* <InputWithLabel
                        inputType="number"
                        inputClass="bg-white border border-gray-300 py-1.5 rounded-lg !outline-none"
                        containerClass="my-3 w-6/12"
                        placeholder="Enter your number"
                        onChange={(e) => setPhone(e.target.value)}
                        defaultValue={contactData?.phone_number}
                      /> */}
                      <Input
                        type="text"
                        className="border border-lineGrayCustom px-2 py-1 my-2 rounded w-4/5 text-normal leading-6 font-medium text-darkCustom focus:outline-none"
                        onChange={(e) => setPhone(e.target.value)}
                        defaultValue={contactData?.phone_number}
                        placeholder="Enter your number"
                        maxLength={13}
                      />
                      <div className="flex">
                        <Button className="p-1" onClick={handleContact}>
                          <Icon
                            name={TiTick}
                            className="text-disabled text-3xl hover:text-green-500"
                            onClick={() => setShow(false)}
                          />
                        </Button>
                        <Button className="p-1 flex">
                          <RxTrash
                            className="cursor-pointer rounded-3xl hover:text-green-500 text-red-500 text-2xl font-bold p-0.5"
                            onClick={() => setShow(false)}
                          />
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col gap-x-4">
                {/* <div className="w-full">
                  <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Source Channel
                    <span className="text-redCustom">{errors.source?.message && errors.source?.message}</span>
                  </p>
                  <div className="border border-lineGrayCustom rounded px-4">
                    <select className="w-full focus:outline-none py-2 bg-transparent" {...register("source", { required: true })}>
                      <option value="">Select Source</option>
                      <option value="twitter">Twitter</option>
                      <option value="email">Email</option>
                      <option value="chat">Chat</option>
                      <option value="call">Call</option>
                    </select>
                  </div>
                </div> */}
                {/* <div className="my-3 w-full">
                  <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-3 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Source Channel
                    <span className="text-redCustom">{errors.source?.message && errors.source?.message}</span>
                  </p>
                  <select
                    className="border border-lineGrayCustom bg-transparent py-1.5 px-4 my-2 rounded w-full leading-4 text-grayCustom placeholder:text-grayCustom outline-none focus:outline-none"
                    {...register("source", { required: true })}
                  >
                    <option value="">Select Source</option>
                    <option value="twitter" className="text-darkCustom">
                      Twitter
                    </option>
                    <option value="email" className="text-darkCustom">
                      Email
                    </option>
                    <option value="chat" className="text-darkCustom">
                      Chat
                    </option>
                    <option value="call" className="text-darkCustom">
                      Call
                    </option>
                  </select>
                </div> */}
                <div className="my-3 w-full">
                  <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-3 after:content-['*'] after:ml-0.5 after:text-red-500 block">
                    Source
                  </p>
                  <span className="text-redCustom">
                    {errors.source?.message && errors.source?.message}
                  </span>
                  <div>
                    <select
                      className="border border-lineGrayCustom py-3 px-4 my-2 rounded bg-transparent block w-full leading-4 text-grayCustom placeholder:text-grayCustom outline-none focus:outline-none"
                      {...register('source', { required: true })}
                    >
                      <option value="" disabled>
                        Select Source
                      </option>
                      <option value="twitter" className="text-darkCustom">
                        Twitter
                      </option>
                      <option value="email" className="text-darkCustom">
                        Email
                      </option>
                      <option value="chat" className="text-darkCustom">
                        Chat
                      </option>
                      <option value="call" className="text-darkCustom">
                        Call
                      </option>
                    </select>
                  </div>
                </div>

                <div className="w-full">
                  <p className="font-medium text-small leading-4 text-grayCustom px-5 after:content-['*'] after:ml-0.5 after:text-red-500">
                    Priority
                    <span className="text-redCustom">
                      {errors.priority?.message && errors.priority?.message}
                    </span>
                  </p>
                  <div className="px-3 py-2 w-full flex justify-between">
                    <div className="flex gap-x-2 items-center">
                      <Input
                        type="radio"
                        id="low"
                        name="priority"
                        value={0}
                        defaultChecked
                        {...register('priority', { required: true })}
                      />
                      <Label htmlFor="low">Low</Label>
                    </div>

                    <div className="flex gap-x-2 items-center">
                      <Input
                        type="radio"
                        id="medium"
                        name="priority"
                        value={1}
                        {...register('priority', { required: true })}
                      />
                      <Label htmlFor="medium">Medium</Label>
                    </div>

                    <div className="flex gap-x-2 items-center">
                      <Input
                        type="radio"
                        id="high"
                        name="priority"
                        value={2}
                        {...register('priority', { required: true })}
                      />
                      <Label htmlFor="high">High</Label>
                    </div>

                    <div className="flex gap-x-2 items-center">
                      <Input
                        type="radio"
                        id="urgent"
                        name="priority"
                        value={3}
                        {...register('priority', { required: true })}
                      />
                      <Label htmlFor="urgent">Urgent</Label>
                    </div>
                  </div>
                </div>
              </div>
              {/*               
              <div className="flex flex-col w-full gap-x-4">
                <div className="w-full">
                  {!!teamList && !!teamIdFromSession ? (
                    <>
                      <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                        Team
                        <span className="text-redCustom">{errors.assigned_team?.message && errors.assigned_team?.message}</span>
                      </p>
                      <div className="border border-lineGrayCustom rounded px-4">
                        <select
                          className="w-full focus:outline-none py-2 bg-transparent"
                          defaultValue={teamIdFromSession}
                          {...register("assigned_team", { required: true })}
                          onChange={(e) => {
                            setSelectedTeamId(+e.target.value), setValue("assigned_agent", "");
                          }}
                        >
                          <option>Select a Team</option>
                          {teamList &&
                            teamList.payload.map((team) => (
                              <option key={team.id} value={+team.id}>
                                {team.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </>
                  ) : (
                    <div>
                      <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Team</p>
                      <div className="border border-lineGrayCustom rounded px-4">
                        <select className="w-full focus:outline-none py-2" disabled>
                          <option value="" disabled>
                            wait a little
                          </option>
                        </select>
                      </div>
                    </div>
                  )}
                </div>

                <div className="w-full">
                  {teamSingle && teamList && allDetailsCond ? (
                    <Fragment>
                      <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2">
                        Assigned Agent
                        <span className="text-redCustom">{errors.assigned_agent?.message && errors.assigned_agent?.message}</span>
                      </p>
                      <div className="border border-lineGrayCustom rounded px-4">
                        <select className="w-full focus:outline-none py-2 bg-transparent" defaultValue={userIdFromSession} {...register("assigned_agent", { required: true })}>
                          <option value="">Select a Agent</option>
                          {teamSingle.team_members.map((agent) => (
                            <option key={+agent.user.id} value={+agent.user.id}>
                              {agent.user.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </Fragment>
                  ) : (
                    <>
                      <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Assigned Agent</p>
                      <div className="border border-lineGrayCustom rounded px-4">
                        <select className="w-full focus:outline-none py-2" defaultValue={userIdFromSession} {...register("assigned_agent", { required: true })} disabled>
                          <option value="" disabled>
                            wait a little
                          </option>
                        </select>
                      </div>
                    </>
                  )}
                </div>
              </div> */}
              <div className="flex flex-col gap-x-4">
                {/* team */}
                <div className="w-full">
                  {/* {!!teamList ? ( */}
                  <>
                    <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                      Team
                      <span className="text-redCustom">
                        {errors.assigned_team?.message}
                      </span>
                    </p>
                    <div className="rounded">
                      <Controller
                        name="assigned_team"
                        control={control}
                        rules={{ required: true }}
                        render={({ field }) => {
                          return (
                            <Select
                              styles={{
                                indicatorSeparator: (base, state) => ({
                                  ...base,
                                  width: 0,
                                }),
                                valueContainer: (base, state) => ({
                                  ...base,
                                  // paddingTop: ".4rem",
                                  // paddingBottom: ".4rem",
                                }),
                                control: (base, state) => ({
                                  ...base,
                                  boxShadow: 'none',
                                  background: 'transparent',
                                  overflow: 'hidden',
                                }),
                              }}
                              components={{ DropdownIndicator }}
                              className="w-full"
                              {...field}
                              options={teamOptionsList}
                              placeholder="Select a team"
                            />
                          );
                        }}
                      />
                    </div>
                    {/* <div className="border border-lineGrayCustom rounded px-4">
                        <select
                          className="w-full focus:outline-none py-2"
                          {...register("assigned_team", { required: true })}
                          onChange={(e) => {
                            setSelectedTeamId(+e.target.value), setValue("assigned_agent", "");
                          }}
                        >
                          <option>Select a Team</option>
                          {teamList &&
                            teamList.map((team) => (
                              <option key={team.id} value={+team.id}>
                                {team.name}
                              </option>
                            ))}
                        </select>
                      </div> */}
                  </>
                  {/* ) : (
                    <div>
                      <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Team</p>
                      <div className="border border-lineGrayCustom rounded px-4">
                        <select className="w-full focus:outline-none py-2">
                          <option value="">wait a little</option>
                        </select>
                      </div>
                    </div>
                  )} */}
                </div>

                {/* agent */}
                <div className="w-full">
                  {/* {!!agentList && !!teamList ? (
                    <Fragment> */}
                  <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2">
                    Assigned Agent
                    {/* <span className="text-redCustom">{errors.assigned_agent?.message && errors.assigned_agent?.message}</span> */}
                  </p>
                  {/* <div className="border border-lineGrayCustom rounded px-4">
                        <select className="w-full focus:outline-none py-2" {...register("assigned_agent", { required: true })}>
                          <option value="">Select a Agent</option>
                          {agentList.map((agent) => (
                            <option key={+agent.user.id} value={+agent.user.id}>
                              {agent.user.name}
                            </option>
                          ))}
                        </select>
                      </div> */}
                  <div className="rounded">
                    <Controller
                      name="assigned_agent"
                      control={control}
                      render={({ field }) => {
                        return (
                          <Select
                            styles={{
                              indicatorSeparator: (base, state) => ({
                                ...base,
                                width: 0,
                              }),
                              valueContainer: (base, state) => ({
                                ...base,
                                paddingTop: '.4rem',
                                paddingBottom: '.4rem',
                              }),
                              control: (base, state) => ({
                                ...base,
                                boxShadow: 'none',
                                background: 'transparent',
                                overflow: 'hidden',
                              }),
                            }}
                            className="w-full"
                            {...field}
                            components={{ DropdownIndicator }}
                            options={agentOptionsList}
                            placeholder={
                              !selectedTeamId2
                                ? 'Select a team for agent list'
                                : 'Select a agent'
                            }
                          />
                        );
                      }}
                    />
                    {/* <select className="w-full focus:outline-none py-2" {...register("assigned_agent", { required: true })}>
                        <option value="">Select a Agent</option>
                        {agentList.map((agent) => (
                          <option key={+agent.user.id} value={+agent.user.id}>
                            {agent.user.name}
                          </option>
                        ))}
                      </select> */}
                  </div>
                  {/* </Fragment>
                  ) : !!teamList && !agentList ? (
                    <>
                      <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Assigned Agent</p>
                      <div className="border border-lineGrayCustom rounded px-4">
                        <select className="w-full focus:outline-none py-2">
                          <option value="">select a team for teams agent list</option>
                        </select>
                      </div>
                    </>
                  ) : (
                    <>
                      <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">Assigned Agent</p>
                      <div className="border border-lineGrayCustom rounded px-4">
                        <select className="w-full focus:outline-none py-2">
                          <option value="">wait a little</option>
                        </select>
                      </div>
                    </>
                  )} */}
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <Survey model={survey} css={surveyCss} />
              </div>

              <div className="w-full">
                <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                  Ticket Title
                  <span className="text-redCustom">
                    {errors.subject?.message && errors.subject?.message}
                  </span>
                </p>
                <div className="w-full">
                  <Input
                    type="text"
                    className="w-full focus:outline-none border border-lineGrayCustom rounded px-4 py-2"
                    {...register('subject', { required: true })}
                  />
                </div>
              </div>

              <div className="w-full">
                <p className="font-medium text-small leading-4 text-grayCustom px-5 mt-4 mb-2 after:content-['*'] after:ml-0.5 after:text-red-500">
                  Ticket Description
                  <span className="text-redCustom">
                    {errors.description?.message && errors.description?.message}
                  </span>
                </p>
                <div className="w-full">
                  <Textarea
                    rows={5}
                    className="w-full placeholder:text-grayCustom focus:outline-none border border-lineGrayCustom rounded px-4 py-2 focus:ring-0"
                    placeholder="Write text here ..."
                    {...register('description', { required: true })}
                  ></Textarea>
                </div>
              </div>
              <div className="flex gap-x-4 items-center my-4 w-full pb-4">
                <Button
                  type="submit"
                  className="w-2/4 rounded py-2 bg-blueCustom text-white font-medium text-normal leading-6"
                >
                  {t('rightSide.newTicket.button.create')}
                </Button>
                <Button
                  onClick={() => setSelected('close')}
                  type="button"
                  className="w-2/4 rounded py-2 bg-lineBlueCustom text-grayCustom font-medium text-normal leading-6 hover:text-blueCustom"
                >
                  {t('rightSide.newTicket.button.cancel')}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewTicket;
