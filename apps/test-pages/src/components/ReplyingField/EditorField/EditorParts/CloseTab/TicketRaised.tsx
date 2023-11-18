import { useTicketsByContactId } from "@api-lib/graphql";
import { Input } from "@shadcn/input";
import React from "react";
import { AiFillExclamationCircle } from "react-icons/ai";

const header = [
  "Ticket ID #",
  "Classification",
  "Category",
  "Subcategory",
  "Resolution time",
  "Priority",
];

const TicketRaised = ({ contactId, updater }) => {
  const { data } = useTicketsByContactId(contactId);
  return (
    // <div>
    //   <TableHeader />
    // <TableRowReplyingField />
    //   <TableRowReplyingField />
    // </div>
    <div className="h-28 overflow-auto relative">
      <table className="w-full">
        <thead className="bg-blueCustom/10">
          {/* <div className="bg-primary/5"> */}
          <tr className="flex justify-between w-full">
            {header.map((item, index) => (
              <th
                key={index}
                scope="col"
                className="py-2 px-6 text-textGray text-sm font-medium w-1/6"
              >
                {item}
              </th>
            ))}
          </tr>
          {/* </div> */}
        </thead>
        <tbody className="text-sm ">
          {/* <div className="px-4"> */}
          {data?.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 text-black font-medium flex  justify-between w-full"
            >
              <td className="py-2 flex justify-center items-center w-1/6">
                <span className="flex items-center gap-x-2">
                  <Input
                    type="radio"
                    value={item.id}
                    name="selectedTicket"
                    onChange={() =>
                      updater({
                        type: "SET_SELECTED_TICKET_ID",
                        payload: item.id,
                      })
                    }
                  />
                  #{item.id}
                </span>
              </td>
              <td className="py-2 text-center w-1/6">{item.type}</td>
              <td className="py-2 text-center w-1/6">
                {item.form_value.category}
              </td>
              <td className="py-2 text-center w-1/6">
                {item.form_value.category}
              </td>
              <td className="py-2 text-center w-1/6">
                <p>-</p>
                {/* <p className="flex gap-x-2 items-center">
                  <BsPieChartFill className={`text-xl text-newSuccess `} />
                  {item.remaining_time}
                </p> */}
              </td>
              <td className="py-2 flex justify-center items-center w-1/6">
                {/* {item.priority.toLowerCase() === "high" && ( */}
                <p className="flex gap-x-2 items-center">
                  <AiFillExclamationCircle className="text-red-500 text-base" />{" "}
                  {item.priority === 0
                    ? "Low"
                    : item.priority === 1
                    ? "Medium"
                    : item.priority === 2
                    ? "High"
                    : item.priority === 3
                    ? "Urgent"
                    : null}
                </p>
                {/* )} */}
              </td>
            </tr>
          ))}
          {/* </div> */}
        </tbody>
      </table>
    </div>
  );
};

export default TicketRaised;
