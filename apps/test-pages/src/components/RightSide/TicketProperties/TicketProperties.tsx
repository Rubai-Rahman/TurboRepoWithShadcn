import {
  useLinkConversationToTicket,
  useTeamByMemberId,
  useTeamByUserId,
  useTeamDetailsById,
  useTeamList,
  useTicketById,
  useTicketFormList,
  useUpdateTicket,
} from '@api-lib/graphql';
import { FixedToastMessage, ToastMessage } from '@module/shared/Toastify';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BiSave } from 'react-icons/bi';
import { BsBoxArrowUpRight } from 'react-icons/bs';
import { RxCross2, RxPencil1 } from 'react-icons/rx';
import { Model } from 'survey-core';
import 'survey-core/defaultV2.min.css';
import { Survey } from 'survey-react';
import 'survey-react/survey.min.css';
import { Button } from '@shadcn/button';
import { Input } from '@shadcn/input';
import EditIcon from '@localShared/icons/EditIcon';
import CustomDialog from '@localShared/components/CustomDialog/CustomDialog';

const surveyCss = {
  root: 'bg-white',
  container: 'w-full',
  body: 'w-full mx-0 pr-2',
  // container: "ml-5",
  // row: "",
  // pageRow: "w-full",
  // header: "bg-white",
  page: {
    root: 'pb-4',
  },
  question: {
    // content: "my-3 bg-red-500",
    title: 'text-sm font-medium text-grayCustom py-1',
    asCell: 'w-full bg-red-500',
    number: 'hidden',
    input: 'bg-red-500',
  },
  dropdown: {
    root: 'border-none shadow-none',
    control:
      'border-2 border-lineGrayCustom rounded p-2 flex justify-center items-center text-grayCustom sd-dropdown',
  },
  text: {
    root: 'border-2 border-lineGrayCustom rounded p-2 flex justify-center items-center text-grayCustom sd-text',
  },
  panel: {
    title: 'text-md font-medium text-slate-700 py-1',
  },
};

const TicketProperties = () => {
  const { query } = useRouter();
  const { t } = useTranslation('ticket');
  const ticketId = +query.ticketId;
  const queryClient = useQueryClient();
  const [selectedTeamId, setSelectedTeamId] = useState<number>();
  const [currentState, setCurrentState] = useState<'preview' | 'edit'>(
    'preview'
  );
  const [formValuesArr, setFormValuesArr] = useState<any[]>([]);
  const { data: surveyFormData, isLoading } = useTicketFormList();
  const surveyForm = surveyFormData && surveyFormData[0];
  const survey = useMemo(
    () => new Model(surveyForm?.survey_form),
    [surveyFormData]
  );
  survey.showNavigationButtons = false;
  survey.showCompletedPage = false;
  const [modalOpen, setModalOpen] = useState(false);
  const { handleSubmit, register, setValue } = useForm();
  const closeModal = () => {
    setModalOpen(false);
  };

  const {
    data,
    isLoading: ticketDataLoading,
    status: ticketDataStatus,
  } = useTicketById(ticketId, {
    onSuccess: (data) => {
      const arr = Object.entries(data.form_value).map(([key, value]) => ({
        key,
        value,
      }));
      setFormValuesArr(arr);
      setSelectedTeamId(data?.team?.id);
    },
  });
  survey.data = data.form_value;
  // console.log("asdfasdf", (survey.data = data.form_value));

  const { mutate: updateTicketMutation } = useUpdateTicket({
    onSuccess: () => {
      queryClient.invalidateQueries(['tickets_by_id', ticketId]);
      queryClient.invalidateQueries(['filtered_tickets']);
      ToastMessage('success', 'Ticket updated successfully');
    },
    onError: () => {
      ToastMessage('error', 'Ticket update failed');
    },
  });
  const { mutate: updateConversationId } = useLinkConversationToTicket({
    onSuccess: () => {
      queryClient.invalidateQueries(['filtered_tickets']);
      queryClient.invalidateQueries(['tickets_by_id', ticketId]);
      closeModal();
      ToastMessage('success', 'Conversation successfully linked to ticket.');
    },
    onError: () => {
      ToastMessage('error', 'Conversation link failed');
    },
  });

  //conversationId add update submit
  const onConversationIdChange = (data) => {
    updateConversationId({ ticketId, conversationId: +data.conversation_id });
  };

  // const { data: agentData, isLoading: agentDataLoading } = useAgentById(+sessionData?.user?.id, {
  //   enabled: !!sessionData,
  //   onSuccess: (data) => {
  //     setSelectedTeamId(data[0]?.info?.team?.id);
  //     setTeamIdFromSession(+data[0]?.info?.team?.id);
  //     setUserIdFromSession(+data[0]?.info?.user_id);
  //   },
  // });

  const { data: teamList } = useTeamList();

  const { data: teamSingle } = useTeamDetailsById(selectedTeamId, {
    enabled: !!selectedTeamId,
  });

  const session = useSession();
  const currentUserId = session?.data?.user?.id;
  const currentUserRole = session?.data?.user?.role;

  // console.log("ticket assigned to", data);
  // console.log("currentUserId", currentUserId);
  // console.log("currentUserRole", currentUserRole);

  const { data: teamsByUserID, isLoading: teamByAgentIDLoading } =
    useTeamByUserId(currentUserId);
  const teamsID = teamsByUserID?.payload.map((team) => team.id);

  // full form submit
  const onSubmit = (data) => {
    const newData = {
      id: ticketId,
      source: data.source,
      priority: +data.priority,
      status: +data.status,
      ...(data.assigned_agent !== ''
        ? { assigned_agent: +data.assigned_agent }
        : { assigned_agent: null }),
      assigned_team: +data.assigned_team,
      form_value: { ...survey.data },
    };
    // survey.completeLastPage();
    if (Object.keys(survey?.data).length === 0) {
      FixedToastMessage('error', 'Please fill-up surveyJS form', 'colored');
    } else {
      survey.onCompleting.add(updateTicketMutation(newData));
    }
    survey.clear(false);
    setCurrentState('preview');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-between items-center border-b border-lineGrayCustom px-4 py-1.5">
          <p className="text-big font-semibold leading-6 text-darkCustom">
            {t('ticket.ticketProperties.title')}
          </p>
          {currentState === 'edit' && (
            <div className="flex justify-center items-center gap-2">
              <Button
                type="submit"
                className="bg-greenCustom/10 rounded-full p-2"
              >
                <BiSave className="h-5 w-5 text-greenCustom" />
              </Button>
              <Button
                onClick={() => setCurrentState('preview')}
                className="bg-redCustom/10 rounded-full p-2"
              >
                <RxCross2 className="h-5 w-5 text-redCustom" />
              </Button>
            </div>
          )}

          {currentUserRole === 'agent' &&
            currentUserId === data?.agent?.id &&
            currentState === 'preview' && (
              <Button
                className="w-8 h-8 rounded-full bg-blueCustom/10 flex justify-center items-center cursor-pointer"
                onClick={() => setCurrentState('edit')}
              >
                <EditIcon color="#3460FB" />
              </Button>
            )}

          {currentUserRole === 'supervisor' &&
            teamsID?.includes(data?.team?.id) &&
            currentState === 'preview' && (
              <Button
                className="w-8 h-8 rounded-full bg-blueCustom/10 flex justify-center items-center cursor-pointer"
                onClick={() => setCurrentState('edit')}
              >
                <EditIcon color="#3460FB" />
              </Button>
            )}

          {currentUserRole === 'administrator' &&
            currentState === 'preview' && (
              <Button
                className="w-8 h-8 rounded-full bg-blueCustom/10 flex justify-center items-center cursor-pointer"
                onClick={() => setCurrentState('edit')}
              >
                <EditIcon color="#3460FB" />
              </Button>
            )}
        </div>

        <div className="px-4 py-4 border-b border-lineGrayCustom">
          {/* <div className="flex justify-between items-center">
            <div>
              <p className="text-big font-semibold leading-4 text-darkCustom mb-2">{data?.subject}</p>
              <div className="flex items-center text-textGray">
                <p className="text-small font-medium leading-4 text-grayCustom">#{data?.id}/</p>
                <div className="flex gap-x-2 items-center ml-1">
                  {data.status === 0 && (
                    <>
                      <Dot dotColor="bg-redCustom" />
                      <p className="text-small font-medium leading-4 text-grayCustom">Open</p>
                    </>
                  )}
                  {data.status === 1 && (
                    <>
                      <Dot dotColor="bg-orangeCustom" />
                      <p className="text-small font-medium leading-4 text-grayCustom">On Progress</p>
                    </>
                  )}
                  {data.status === 2 && (
                    <>
                      <Dot dotColor="bg-blueCustom" />
                      <p className="text-small font-medium leading-4 text-grayCustom">Waiting for Customer Reply</p>
                    </>
                  )}
                  {data.status === 3 && (
                    <>
                      <Dot dotColor="bg-greenCustom" />
                      <p className="text-small font-medium leading-4 text-grayCustom">Resolved</p>
                    </>
                  )}
                  {data.status === 4 && (
                    <>
                      <Dot dotColor="bg-grayCustom" />
                      <p className="text-small font-medium leading-4 text-grayCustom">Closed</p>
                    </>
                  )}
                </div>
              </div>
            </div>

            {data.priority === 0 && <p className={`px-3 py-0.5 rounded-full text-small font-medium leading-4 bg-greenCustom/10 text-greenCustom`}>Low</p>}
            {data.priority === 1 && <p className={`px-3 py-0.5 rounded-full text-small font-medium leading-4 bg-orangeCustom/10 text-orangeCustom`}>Medium</p>}
            {data.priority === 2 && <p className={`px-3 py-0.5 rounded-full text-small font-medium leading-4 bg-blueCustom/10 text-blueCustom`}>High</p>}
            {data.priority === 3 && <p className={`px-3 py-0.5 rounded-full text-small font-medium leading-4 bg-redCustom/10 text-redCustom`}>Urgent</p>}
          </div>
          <p className="font-medium text-small leading-4 text-darkCustom my-3">{data.description}</p> */}

          <div>
            <p className="text-small leading-4 font-medium text-grayCustom">
              {t('ticket.ticketProperties.fields.title')}
            </p>
            <p className="text-bigger font-semibold leading-6 text-darkCustom">
              {data.subject}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-small leading-4 font-medium text-grayCustom">
              {t('ticket.ticketProperties.fields.created')}
            </p>
            <p className="text-normal leading-6 font-medium text-darkCustom">
              {data.created_user?.name}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-small leading-4 font-medium text-grayCustom">
              {t('ticket.ticketProperties.fields.date')}
            </p>
            <p className="text-normal leading-6 font-medium text-darkCustom">
              {moment(data.created_at).format('DD MMM YYYY - hh:mm a')}
            </p>
          </div>

          <div className="mt-5">
            <p className="text-small leading-4 font-medium text-grayCustom">
              {t('ticket.ticketProperties.fields.breached')}
            </p>
            <p className="text-normal leading-6 font-medium text-darkCustom">
              -
            </p>
          </div>
          <div className="mt-5">
            <p className="text-small leading-4 font-medium text-grayCustom">
              {t('ticket.ticketProperties.fields.conversation.title')}
            </p>
            <p className="text-normal leading-6 font-medium text-darkCustom">
              {!!data.conversation_id ? (
                <>
                  <Link
                    href={`/conversations/${data.conversation_id}`}
                    target="_blank"
                    className="text-blueCustom underline underline-offset-2 cursor-pointer"
                  >
                    {data.conversation_id}
                  </Link>
                  <span
                    className="ml-3 text-blueCustom cursor-pointer"
                    onClick={() => setModalOpen(true)}
                  >
                    {t('ticket.ticketProperties.fields.conversation.change')}
                  </span>
                </>
              ) : (
                <span
                  className="text-blueCustom cursor-pointer"
                  onClick={() => setModalOpen(true)}
                >
                  {t(
                    'ticket.ticketProperties.fields.conversation.linkConversation'
                  )}
                </span>
              )}
            </p>
          </div>

          <div className="my-3">
            <p className="font-medium text-small leading-4 text-grayCustom mt-3">
              {' '}
              {t('ticket.ticketProperties.fields.source')}
            </p>
            {currentState === 'preview' && (
              <p className="text-normal leading-6 font-medium text-darkCustom capitalize">
                {data.source}
              </p>
            )}
            {currentState === 'edit' && (
              <select
                className="border border-lineGrayCustom bg-transparent py-3 px-4 my-2 rounded w-full leading-4 text-grayCustom placeholder:text-grayCustom outline-none focus:outline-none"
                defaultValue={data.source}
                {...register('source', { required: true })}
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
            )}
          </div>

          <div className="my-3">
            <p className="font-medium text-small leading-4 text-grayCustom mt-3">
              {t('ticket.ticketProperties.fields.status')}
            </p>
            {currentState === 'preview' && (
              <p className="text-normal leading-6 font-medium text-darkCustom capitalize">
                {data.status === 4
                  ? 'closed'
                  : data.status === 3
                  ? 'resolved'
                  : data.status === 2
                  ? 'waiting for customer reply'
                  : data.status === 1
                  ? 'progress'
                  : data.status === 0
                  ? 'open'
                  : '-'}
              </p>
            )}
            {currentState === 'edit' && (
              <select
                className="border border-lineGrayCustom bg-transparent capitalize py-3 px-4 my-2 rounded w-full leading-4 text-grayCustom placeholder:text-grayCustom outline-none focus:outline-none"
                defaultValue={data.status}
                {...register('status', { required: true })}
              >
                <option value="" disabled>
                  Select Source
                </option>
                <option value={0} className="text-darkCustom">
                  open
                </option>
                <option value={1} className="text-darkCustom">
                  progress
                </option>
                <option value={2} className="text-darkCustom">
                  waiting for customer reply
                </option>
                <option value={3} className="text-darkCustom">
                  resolved
                </option>
                <option value={4} className="text-darkCustom">
                  closed
                </option>
              </select>
            )}
          </div>

          <div className="my-3">
            <p className="font-medium text-small leading-4 text-grayCustom mt-3">
              {t('ticket.ticketProperties.fields.priority')}
            </p>
            {currentState === 'preview' && (
              <p className="text-normal leading-6 font-medium text-darkCustom capitalize">
                {data.priority === 3
                  ? 'urgent'
                  : data.priority === 2
                  ? 'high'
                  : data.priority === 1
                  ? 'medium'
                  : data.priority === 0
                  ? 'low'
                  : '-'}
              </p>
            )}
            {currentState === 'edit' && (
              <select
                className="border border-lineGrayCustom text-grayCustom bg-transparent capitalize py-3 px-4 my-2 rounded w-full leading-4 placeholder:text-grayCustom outline-none focus:outline-none"
                defaultValue={data.priority}
                {...register('priority', { required: true })}
              >
                <option value="" disabled>
                  Select Source
                </option>
                <option value={0} className="text-darkCustom">
                  low
                </option>
                <option value={1} className="text-darkCustom">
                  medium
                </option>
                <option value={2} className="text-darkCustom">
                  high
                </option>
                <option value={3} className="text-darkCustom">
                  urgent
                </option>
              </select>
            )}
          </div>
        </div>
        <div className="flex justify-between items-center border-b border-lineGrayCustom px-4 py-3">
          <p className="text-big font-semibold leading-6 text-darkCustom">
            {t('ticket.ticketProperties.fields.assignDetails')}
          </p>
        </div>

        <div className="my-3 px-4">
          <div>
            <p className="font-medium text-small leading-4 text-grayCustom mt-3">
              {t('ticket.ticketProperties.fields.assignTeam')}
            </p>
            {currentState === 'preview' && (
              <p className="text-normal leading-6 font-medium text-darkCustom capitalize">
                {data?.team?.name || 'No team Assigned'}
              </p>
            )}
            {currentState === 'edit' && (
              // <select
              //   className="w-full border-2 rounded-md border-lineGrayCustom focus:outline-none py-2"
              //   defaultValue={data.priority}
              //   {...register("priority", { required: true })}
              // >
              //   <option value="">Select Source</option>
              //   <option value={0}>low</option>
              //   <option value={1}>medium</option>
              //   <option value={2}>high</option>
              //   <option value={3}>urgent</option>
              // </select>
              <select
                className="border border-lineGrayCustom text-grayCustom bg-transparent capitalize py-3 px-4 my-2 rounded w-full leading-4 placeholder:text-grayCustom outline-none focus:outline-none"
                defaultValue={data?.team?.id}
                {...register('assigned_team', { required: true })}
                onChange={(e) => {
                  setSelectedTeamId(+e.target.value),
                    setValue('assigned_agent', '');
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
            )}
          </div>

          <div className="mt-5">
            <p className="font-medium text-small leading-4 text-grayCustom mt-3">
              {t('ticket.ticketProperties.fields.assignTo')}
            </p>
            {currentState === 'preview' && (
              <p className="text-normal leading-6 font-medium text-darkCustom capitalize">
                {data?.agent?.name || 'No agent assigned'}
              </p>
            )}
            {currentState === 'edit' && !!teamSingle && (
              // <select
              //   className="w-full border-2 rounded-md border-lineGrayCustom focus:outline-none py-2"
              //   defaultValue={data.priority}
              //   {...register("priority", { required: true })}
              // >
              //   <option value="">Select Source</option>
              //   <option value={0}>low</option>
              //   <option value={1}>medium</option>
              //   <option value={2}>high</option>
              //   <option value={3}>urgent</option>
              // </select>
              <select
                className="border border-lineGrayCustom text-grayCustom bg-transparent capitalize py-3 px-4 my-2 rounded w-full leading-4 placeholder:text-grayCustom outline-none focus:outline-none"
                defaultValue={data?.agent?.id}
                {...register('assigned_agent')}
              >
                <option value="">Select a Agent</option>
                {teamSingle.team_members.map((agent) => (
                  <option key={+agent.user.id} value={+agent.user.id}>
                    {agent.user.name}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </form>

      <div className="flex justify-between items-center border-b border-lineGrayCustom px-4 py-2">
        <p className="text-big font-semibold leading-6 text-darkCustom">
          {t('ticket.ticketProperties.fields.contactDetails.title')}
        </p>
        <Link
          href={`/contacts/${data.contact_id}`}
          className="bg-blueCustom/10 rounded-full p-2"
        >
          <BsBoxArrowUpRight className="h-5 w-5 text-blueCustom" />
        </Link>
      </div>

      <div className="border-b border-lineGrayCustom py-6">
        <div className="px-4 flex flex-col gap-y-4">
          <div>
            <p className="text-small leading-4 font-medium text-grayCustom">
              {t('ticket.ticketProperties.fields.contactDetails.name')}
            </p>
            <p className="text-normal leading-6 font-medium text-darkCustom">
              {data.contact?.name}
            </p>
          </div>
          <div>
            <p className="text-small leading-4 font-medium text-grayCustom">
              {t('ticket.ticketProperties.fields.contactDetails.email')}
            </p>
            <p className="text-normal leading-6 font-medium text-darkCustom">
              {data.contact.email ? data.contact.email : '-'}
            </p>
          </div>
          <div>
            <p className="text-small leading-4 font-medium text-grayCustom">
              {t('ticket.ticketProperties.fields.contactDetails.phone')}
            </p>
            <p className="text-normal leading-6 font-medium text-darkCustom">
              {data.contact.phone_number ? data.contact.phone_number : '-'}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center border-b border-lineGrayCustom px-4 py-2">
        <p className="text-big font-semibold leading-6 text-darkCustom">
          {t('ticket.ticketProperties.fields.survey.title')}
        </p>
        {/* <Link href={`/contacts/${data.contact_id}`}>
          <a className="bg-blueCustom/10 rounded-full p-2">
            <BsBoxArrowUpRight className="h-5 w-5 text-blueCustom" />
          </a>
        </Link> */}
      </div>

      {/* <div className="border-b border-lineGrayCustom py-6">
        <div className="px-4 flex flex-col gap-y-4">
          <div>
            <p className="text-small leading-4 font-medium text-grayCustom">Source Channel</p>
            <p className="text-normal leading-6 font-medium text-darkCustom">{data.source ? data.source : "No Source Added"}</p>
          </div>
          <div>
            <p className="text-small leading-4 font-medium text-grayCustom">Assigned Agent</p>
            <p className="text-normal leading-6 font-medium text-darkCustom">{data.assigned_agent ? data.assigned_agent : "No Agent Assigned"}</p>
          </div>
          <div>
            <p className="text-small leading-4 font-medium text-grayCustom">Group</p>
            <p className="text-normal leading-6 font-medium text-darkCustom">{data?.team?.name ? data?.team?.name : "No Team Assigned"}</p>
          </div>
        </div>
      </div> */}

      {/*<div className="pt-6 px-4 flex flex-col gap-y-4">
        <div>
          <p className="text-small leading-4 font-medium text-grayCustom">Type of Ticket</p>
          <p className="text-normal leading-6 font-medium text-darkCustom">{data.type ? data.type : "-"}</p>
        </div>
        <div>
          <p className="text-small leading-4 font-medium text-grayCustom">Category</p>
          <p className="text-normal leading-6 font-medium text-darkCustom">
            {data?.form_value?.Category ? data.form_value.Category : data?.form_value?.category ? data.form_value.category : "-"}
          </p>
        </div>
        <div>
          <p className="text-small leading-4 font-medium text-grayCustom">Sub Category</p>
          <p className="text-normal leading-6 font-medium text-darkCustom">
            {data?.form_value?.subCategory ? data.form_value.subCategory : data?.form_value?.sub_category ? data.form_value.sub_category : "-"}
          </p>
        </div>
        <div>
          <p className="text-small leading-4 font-medium text-grayCustom">Sub Sub Category</p>
          <p className="text-normal leading-6 font-medium text-darkCustom">
            {data?.form_value?.subSubCategory ? data.form_value.subSubCategory : data.form_value.sub_sub_category ? data.form_value.sub_sub_category : "-"}
          </p>
        </div>
      </div>*/}

      {currentState === 'preview' && (
        <div className="py-6 px-4 flex flex-col gap-y-4">
          {formValuesArr.length > 0 ? (
            formValuesArr?.map((item, index) => (
              <div key={index}>
                <p className="text-small leading-4 font-medium text-grayCustom">
                  {item.key}
                </p>
                <p className="text-normal leading-6 font-medium text-darkCustom">
                  {item.value}
                </p>
              </div>
            ))
          ) : (
            <p className="text-normal leading-6 font-medium text-darkCustom">
              {t('ticket.ticketProperties.fields.survey.emptySurvey')}
            </p>
          )}
        </div>
      )}

      {currentState === 'edit' && (
        <div className="pt-6 px-4 flex flex-col gap-y-4">
          <Survey model={survey} css={surveyCss} />
        </div>
      )}

      <CustomDialog closeModal={closeModal} isOpen={modalOpen}>
        {modalOpen && (
          <form
            onSubmit={handleSubmit(onConversationIdChange)}
            className="flex flex-col gap-3"
          >
            <h2>
              {t('ticket.ticketProperties.fields.conversationLink.title')}
            </h2>
            <Input
              required={true}
              type="number"
              {...register('conversation_id', { required: 'true' })}
              placeholder="Place conversation ID here (only number)"
              style={{ outline: 'none' }}
            />
            <Button type="submit">
              {t('ticket.ticketProperties.fields.conversationLink.buttonText')}
            </Button>
          </form>
        )}
      </CustomDialog>
    </div>
  );
};

export default TicketProperties;
