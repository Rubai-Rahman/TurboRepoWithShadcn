import moment from "moment";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const SingleTicketHeader = ({
  ticketId,
  createdAt,
  ticketTitle,
  showActivity,
  toggleActivity,
}: {
  ticketId: number;
  createdAt: string;
  ticketTitle: string;
  showActivity: boolean;
  toggleActivity: () => void;
}) => {
  return (
    <div className="border-b border-lineGrayCustom px-4 py-1 flex justify-between items-center max-h-12">
      <div className="flex flex-col">
        <div className="flex items-center gap-x-1 text-grayCustom text-xs leading-4">
          <p>#{ticketId}</p>
          <p>/</p>
          <p>{moment(createdAt).format("Do MMM YYYY - h:mm a")}</p>
        </div>
        <p className="text-sm font-semibold leading-[17px] text-darkCustom">
          {ticketTitle ? ticketTitle : "Ticket Title"}
        </p>
      </div>
      <div className="flex justify-between items-center">
        <div className="flex gap-x-8 items-center text-grayCustom text-xl">
          {/* <FiPrinter /> */}
          {!showActivity ? (
            <span onClick={toggleActivity} className="cursor-pointer">
              <AiOutlineEye className="h-6 w-6" />
            </span>
          ) : (
            <span onClick={toggleActivity} className="cursor-pointer">
              <AiOutlineEyeInvisible
                className="h-6 w-6"
                onClick={toggleActivity}
              />
            </span>
          )}
          {/* <FiEdit2 />
          <RxTrash className="text-redCustom" /> */}
        </div>
      </div>
    </div>
  );
};

export default SingleTicketHeader;
