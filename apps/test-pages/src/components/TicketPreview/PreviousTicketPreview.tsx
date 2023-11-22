import { GET_TICKET_BY_CONTACT_IDQuery } from '@api-lib/gql/graphql';
import Dot from '@localShared/CustomDot/CustomDot';
import Link from 'next/link';
import React from 'react';
import { BsPieChartFill } from 'react-icons/bs';

const PreviousTicketPreview = ({
  maxWidth = 'w-full',
  ticket,
  selected,
}: {
  maxWidth?: string;
  ticket: GET_TICKET_BY_CONTACT_IDQuery['payload'][0];
  selected?: boolean;
}) => {
  return (
    <Link href={`/tickets/${ticket.id}`} className="w-full">
      <div
        className={`border-l-2 border-b py-4 px-4 cursor-pointer hover:bg-blueCustom/10 ${maxWidth} ${
          selected
            ? 'bg-blueCustom/10 border-l-blueCustom'
            : 'border-l-transparent'
        }`}
      >
        <div className="flex justify-between">
          <div>
            <p className="text-small font-semibold leading-6 text-darkCustom">
              {ticket?.subject}
            </p>
            <div className="flex items-center text-grayCustom">
              <p className="text-small font-medium leading-4">#{ticket.id} /</p>
              <div className="flex gap-x-2 items-center ml-1">
                <p className="w-1.5 h-1.5 rounded-full bg-orangeCustom"></p>
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
          <p className="bg-redCustom/10 px-2 py-1 rounded-full text-small font-medium leading-4 text-[#F3451E] capitalize">
            {ticket.priority === 0
              ? 'low'
              : ticket.priority === 1
              ? 'medium'
              : ticket.priority === 2
              ? 'high'
              : ticket.priority === 3
              ? 'urgent'
              : null}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PreviousTicketPreview;
