import Dot from '@localShared/components/CustomDot/CustomDot';
import { GET_TICKET_BY_CONTACT_IDQuery } from '@api-lib/gql/graphql';
import React from 'react';
import { BsPieChartFill } from 'react-icons/bs';
import { useRouter } from 'next/router';
import Link from 'next/link';

const TicketPreview = ({
  maxWidth = 'w-full',
  ticket,
  selected,
}: {
  maxWidth?: string;
  ticket: GET_TICKET_BY_CONTACT_IDQuery['payload'][0];
  selected?: boolean;
}) => {
  const router = useRouter();
  const smartFolderId = +router.query.smartFolderId;
  const pathUrl = (cnvId: number) => {
    return router.pathname.includes('/smart-folder')
      ? `/tickets/smart-folder/${smartFolderId}/ticket/${cnvId}`
      : `/tickets/${cnvId}`;
  };

  const ticketPriority =
    ticket.priority === 0
      ? {
          text: 'low',
          bgColor: 'bg-greenCustom',
          textColor: 'text-greenCustom',
        }
      : ticket.priority === 1
      ? {
          text: 'medium',
          bgColor: 'bg-violetCustom',
          textColor: 'text-violetCustom',
        }
      : ticket.priority === 2
      ? {
          text: 'high',
          bgColor: 'bg-orangeCustom',
          textColor: 'text-orangeCustom',
        }
      : ticket.priority === 3
      ? { text: 'urgent', bgColor: 'bg-redCustom', textColor: 'text-redCustom' }
      : null;

  if (ticket.id === +router.query.ticketId) {
    selected = true;
  } else {
    selected = false;
  }

  return (
    <Link href={pathUrl(ticket.id)}>
      <div
        className={`border-l-2 border-b cursor-pointer py-4 px-4 hover:bg-blueCustom/10 ${maxWidth} ${
          selected
            ? 'bg-blueCustom/20 border-l-blueCustom'
            : 'border-l-transparent'
        }`}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-big font-semibold leading-6 text-darkCustom">
              {ticket?.subject}
            </p>
            <div className="flex items-center text-grayCustom">
              <p className="text-small font-medium leading-4">#{ticket.id} /</p>
              <div className="flex gap-x-2 items-center ml-1">
                <p
                  className={`w-1.5 h-1.5 rounded-full ${
                    ticket.status === 0
                      ? 'bg-orangeCustom'
                      : ticket.status === 1
                      ? 'bg-redCustom'
                      : ticket.status === 2
                      ? 'bg-blueCustom'
                      : ticket.status === 3
                      ? 'bg-grayCustom'
                      : ticket.status === 4
                      ? 'bg-greenCustom'
                      : null
                  }`}
                ></p>
                <p className="text-small font-medium leading-4">
                  {ticket.status === 0
                    ? 'open'
                    : ticket.status === 1
                    ? 'On Progress'
                    : ticket.status === 2
                    ? 'Waiting for Customer Reply'
                    : ticket.status === 3
                    ? 'Resolved'
                    : ticket.status === 4
                    ? 'Closed'
                    : null}
                </p>
              </div>
            </div>
          </div>
          <div className="flex gap-x-2 items-center">
            <BsPieChartFill
              className={`text-big text-greenCustom ${
                selected && 'text-grayCustom'
              }`}
            />
            <p className="text-grayCustom text-small font-medium leading-4">
              15 min
            </p>
          </div>
        </div>
        <p className="text-small text-darkCustom font-semibold leading-4 my-2">
          {ticket.description}
        </p>
        <div className="flex justify-between">
          <div className="flex gap-x-2 items-center">
            <Dot dotColor="bg-greenCustom" />
            <p className="text-small font-medium leading-4 text-grayCustom">
              {ticket?.agent?.name ? ticket?.agent?.name : 'no agent assigned'}
            </p>
          </div>
          {/* <p className={`bg-redCustom/10 px-2 py-1 rounded-full text-small font-medium leading-4 text-[#F3451E] capitalize`}> */}
          <p
            className={`${ticketPriority.bgColor}/10 px-2 py-1 rounded-full text-small font-medium leading-4 ${ticketPriority.textColor} capitalize`}
          >
            {/* {ticket.priority === 0 ? "low" : ticket.priority === 1 ? "medium" : ticket.priority === 2 ? "high" : ticket.priority === 3 ? "urgent" : null} */}
            {ticketPriority.text}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default TicketPreview;
