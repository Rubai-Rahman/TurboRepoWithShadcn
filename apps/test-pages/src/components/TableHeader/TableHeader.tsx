import React from 'react';

const TableHeader = ({ data }: any) => {
  return (
    <div className="overflow-x-auto relative">
      <table className="w-full">
        <thead className="text-xs">
          <div className="bg-primary/5">
            <tr className="flex justify-between">
              {data.map((item: any, index: number) => (
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
      </table>
    </div>
  );
};

export default TableHeader;
