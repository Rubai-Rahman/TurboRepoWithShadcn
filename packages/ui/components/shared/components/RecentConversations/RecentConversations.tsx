import { GET_CONTACT_BY_IDQuery } from '@api-lib/gql/graphql';
import { useConversationByContactId } from '@api-lib/graphql';
import { useTranslation } from 'next-i18next';
import React from 'react';
import RecentConversationSkeleton from './RecentConversations.skeleton';
import CustomAccordion from '@localShared/components/CustomAccordion/CustomAccordion';
import RecentConversationPreview from '@components/RecentConversationPreview/RecentConversationPreview';

const RecentConversations = ({
  maxWidth,
  contactData,
}: {
  maxWidth: string;
  contactData: GET_CONTACT_BY_IDQuery['payload'];
}) => {
  const { data: contactConversations, status } = useConversationByContactId(
    contactData?.id
  );
  const { t } = useTranslation('rightSide');

  return (
    <div className="w-full">
      <CustomAccordion title={t('rightSide.recent')} titleClass="font-thin">
        <div className="h-full overflow-hidden">
          {status === 'error' ? (
            <p>error - something went wrong</p>
          ) : status === 'loading' ? (
            <div className="flex flex-col h-full overflow-hidden hover:overflow-y-auto justify-start items-start">
              <RecentConversationSkeleton />
            </div>
          ) : contactConversations.length > 0 ? (
            <div className="flex flex-col h-full overflow-hidden hover:overflow-y-auto justify-start items-start">
              {contactConversations.slice(0, 5).map((conversation) => (
                <RecentConversationPreview
                  maxWidth="w-full"
                  key={conversation.id}
                  conversation={conversation}
                />
              ))}
            </div>
          ) : (
            <p className="py-2 px-4">No recent conversations</p>
          )}
        </div>
      </CustomAccordion>
    </div>
  );
};

export default RecentConversations;
