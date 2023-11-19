import { GET_CONTACT_BY_IDQuery } from '@api-lib/gql/graphql';
import { useTicketsByContactId } from '@api-lib/graphql';
import PreviousTicketPreview from '@components/TicketPreview/PreviousTicketPreview';
import CustomAccordion from '@localShared/components/CustomAccordion/CustomAccordion';
import { useTranslation } from 'next-i18next';

const information = [
  {
    title: 'Ticket Title',
    ticketId: 25685,
    status: 'Open',
    priority: 'Medium',
    remaining_time: '15 min',
    text: 'Is inquiry no he several excited am. Called though excuse length ye needed it he having.',
    team: 'Operation Team',
  },
];

const PreviousTickets = ({
  maxWidth,
  contactData,
}: {
  maxWidth: string;
  contactData: GET_CONTACT_BY_IDQuery['payload'];
}) => {
  const contactId = +contactData.id;
  const {
    data: ticketDataByContactId,
    isLoading,
    status,
  } = useTicketsByContactId(contactId, { enabled: !!contactId });
  const { t } = useTranslation('rightSide');
  return (
    // <div className="px-4">
    //   <CustomAccordion
    //     from="previous-tickets"
    //     title="Previous Tickets"
    //     data={information}
    //     maxWidth={maxWidth ? maxWidth : "w-1/4"}
    //   />
    // </div>

    <div className={`${maxWidth}`}>
      <CustomAccordion
        title={t('rightSide.previousTicket')}
        titleClass="font-thin"
      >
        {ticketDataByContactId?.length > 0 ? (
          <div className="flex flex-col justify-start items-start py-2">
            {ticketDataByContactId.slice(0, 5).map((ticket) => (
              <PreviousTicketPreview
                maxWidth="w-full"
                key={ticket.id}
                ticket={ticket}
              />
            ))}
          </div>
        ) : (
          <p className="py-2 px-4">No previous tickets</p>
        )}
      </CustomAccordion>
    </div>
  );
};

export default PreviousTickets;
