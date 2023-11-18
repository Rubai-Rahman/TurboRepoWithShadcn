const data = [
  'Ticket ID #',
  'Classification',
  'Category',
  'Subcategory',
  'Resolution time',
  'Priority',
];

const TableHeaderReplyingField = () => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full">
        <thead className="text-xs">
          <div className="bg-primary/5">
            <tr className="flex justify-between">
              {data.map((item, index) => (
                <th
                  key={index}
                  scope="col"
                  className="py-3 px-6 text-textGray text-xs font-medium"
                >
                  {item}
                </th>
              ))}
            </tr>
          </div>
        </thead>
        {/* <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Apple MacBook Pro 17"
                </th>
                <td className="py-4 px-6">
                    Sliver
                </td>
                <td className="py-4 px-6">
                    Laptop
                </td>
                <td className="py-4 px-6">
                    $2999
                </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Microsoft Surface Pro
                </th>
                <td className="py-4 px-6">
                    White
                </td>
                <td className="py-4 px-6">
                    Laptop PC
                </td>
                <td className="py-4 px-6">
                    $1999
                </td>
            </tr>
            <tr className="bg-white dark:bg-gray-800">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    Magic Mouse 2
                </th>
                <td className="py-4 px-6">
                    Black
                </td>
                <td className="py-4 px-6">
                    Accessories
                </td>
                <td className="py-4 px-6">
                    $99
                </td>
            </tr>
        </tbody> */}
      </table>
    </div>
  );
};

export default TableHeaderReplyingField;
