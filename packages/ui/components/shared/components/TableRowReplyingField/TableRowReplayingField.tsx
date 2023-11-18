import { Input } from "@shadcn/input";
import { AiFillExclamationCircle } from "react-icons/ai";
import { BiPieChartAlt } from "react-icons/bi";
import { BsPieChartFill } from "react-icons/bs";

const data = [
  {
    id: 4541,
    complain: "Complaint",
    account: "Account",
    problem: `Can't login`,
    remaining_time: "7h 13 min",
    priority: "High",
  },
];

const TableRowReplyingField = () => {
  return (
    <div>
      <div className="overflow-x-auto relative">
        <table className="w-full">
          <tbody className="text-sm">
            <div className="px-4">
              <tr className="border-b border-gray-300 text-black font-medium flex justify-between">
                {data.map((item, index) => (
                  <>
                    <td className="py-4 text-center">
                      <span className="flex items-center gap-x-2">
                        <Input type="checkbox" name="" id="" />#{item.id}
                      </span>
                    </td>
                    <td className="py-4 text-center">{item.complain}</td>
                    <td className="py-4 text-center">{item.account}</td>
                    <td className="py-4 text-center">{item.problem}</td>
                    <td className="py-4 text-center">
                      <p className="flex gap-x-2 items-center">
                        <BsPieChartFill
                          className={`text-xl text-newSuccess `}
                        />
                        {item.remaining_time}
                      </p>
                    </td>
                    <td className="py-4 text-center">
                      {item.priority.toLowerCase() === "high" && (
                        <p className="flex gap-x-2 items-center">
                          <AiFillExclamationCircle className="text-red-500 text-base" />{" "}
                          {item.priority}
                        </p>
                      )}
                    </td>
                  </>
                ))}
              </tr>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRowReplyingField;
