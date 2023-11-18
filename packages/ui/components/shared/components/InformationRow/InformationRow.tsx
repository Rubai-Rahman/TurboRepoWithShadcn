import React from 'react';
import { BsEnvelope } from 'react-icons/bs';

const InformationRow = () => {
   const row = {
     icon: <BsEnvelope />,
     email: 'jese@mail.com',
   };
  return (
    <div className="w-1/4 text-slate-700 flex items-center space-x-7 px-3">
      <p className="flex items-center text-slate-700">{row.icon}</p>
      <p>{row.email}</p>
    </div>
  );
};

export default InformationRow;
