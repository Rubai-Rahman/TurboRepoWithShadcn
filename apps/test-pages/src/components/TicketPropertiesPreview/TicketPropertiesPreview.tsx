import React from 'react';

const TicketPropertiesPreview = () => {
  return (
    <div className="bg-background w-full flex  items-center px-6 py-2">
      <div className="w-1/2">
        <div className="text-xs font-medium text-textGray flex ">
          <p className="w-1/3">Show All Properties</p>
          <p className="w-1/3">Created by</p>
          <p className="w-1/3">Source</p>
        </div>
        <div className="text-xs font-semibold flex ">
          <p className="w-1/3">Wrong Password</p>
          <p className="w-1/3">Theresa Miller</p>
          <p className="w-1/3">Twitter</p>
        </div>
      </div>
      <div className="w-1/2 flex justify-end">
        <p className="text-xs font-medium text-primary">Show All Properties</p>
      </div>
    </div>
  );
};

export default TicketPropertiesPreview;
