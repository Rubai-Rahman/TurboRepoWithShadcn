import { GET_CONVERSATION_BY_IDQuery } from '@api-lib/gql/graphql';
import { useConversationAgentAssign } from '@api-lib/graphql';
import AgentSelection from '@module/conversations/components/AgentSelection';
import { ToastMessage } from '@module/shared/Toastify';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Button } from '@shadcn/button';

function WorkingSpaceHeader({
  conversationDataById,
  isFetching,
  showActivity,
  toggleActivity,
}: {
  conversationDataById: GET_CONVERSATION_BY_IDQuery['payload'];
  isFetching: boolean;
  showActivity: boolean;
  toggleActivity: () => void;
}) {
  const { data: sessionData } = useSession();
  const queryClient = useQueryClient();

  const { mutate: assignAgent } = useConversationAgentAssign({
    onSuccess: (data:any) => {
      ToastMessage('success', `conversation is successfully unassigned`);
      queryClient.invalidateQueries(['message_list', data.id]);
      queryClient.invalidateQueries(['conversation_details', data.id]);
      queryClient.invalidateQueries(['conversation_counts']);
    },
    onError: () => {
      ToastMessage('error', 'Conversation unassign failed');
    },
  });

  const handleSelectChange = () => {
    assignAgent({
      conversation_id: conversationDataById.id,
      agent_id: null,
      team_id: null,
    });
  };
  return (
    // <div className="w-full flex justify-between items-center border-b border-lineGrayCustom 2xl:h-[7.4rem] 4xl:h-[5.3rem]">
    <div className="w-full flex justify-between items-center border-b border-lineGrayCustom h-12 max-h-12">
      <div className="flex items-center gap-3 h-full w-full">
        <div className="flex flex-col h-full">
          <p className="text-grayCustom text-sm px-4">
            #{conversationDataById.id}
          </p>
          {/* <CustomAccordion title="Assigned to Ahmed / DM Team" /> */}
          {isFetching ? (
            <div className="w-80 py-1 flex justify-start items-center">
              <p className="w-72 h-3.5  rounded-md animate-pulse bg-blueCustom/20 ml-4" />
            </div>
          ) : (
            <AgentSelection
              conversationId={conversationDataById.id}
              inboxId={conversationDataById.inbox_id}
              {...(conversationDataById.assigned_team_member && {
                defaultData: {
                  agent: {
                    id: conversationDataById.assigned_team_member?.user?.id,
                    name: conversationDataById.assigned_team_member?.user?.name,
                  },
                  team: {
                    id: conversationDataById.assigned_team_member?.team?.id,
                    name: conversationDataById.assigned_team_member?.team?.name,
                  },
                },
              })}
            />
          )}
        </div>
        {conversationDataById.assigned_team_member !== null &&
          sessionData.role !== 'agent' && (
            <div className="h-12 flex items-end mb-3">
              <Button
                className="bg-blueCustom/20 text-blueCustom h-1/2 px-2 rounded "
                onClick={handleSelectChange}
              >
                Unassign
              </Button>
            </div>
          )}
      </div>
      <div className="flex justify-end items-center gap-5 px-4">
        {/* <BsStopwatch className="h-6 w-6" /> */}
        {!showActivity ? (
          <span className="cursor-pointer" onClick={toggleActivity}>
            <AiOutlineEye className="h-7 w-7 text-grayCustom" />
          </span>
        ) : (
          <span className="cursor-pointer" onClick={toggleActivity}>
            <AiOutlineEyeInvisible
              className="h-7 w-7 text-grayCustom"
              onClick={toggleActivity}
            />
          </span>
        )}
        {/* <AiOutlineClockCircle className="h-6 w-6" /> */}
        {/* {rightSideTabIndex > 0 && <RxCross1 onClick={() => setRightSideTabIndex(0)} className="h-5 w-5 cursor-pointer" />} */}
      </div>
      {/* <div className="flex justify-between items-center">
        <div className="flex items-center"></div>
      </div>
      <div className="flex gap-x-2 items-center text-textGray text-lg font-medium"></div> */}
    </div>
  );
}

export default WorkingSpaceHeader;
