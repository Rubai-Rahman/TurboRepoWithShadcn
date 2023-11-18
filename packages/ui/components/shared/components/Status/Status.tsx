import React from 'react';
import { StatusTypes } from './Status.types';

const Status = ({ text, className }: StatusTypes) => {
  return (
    <div>
      <p
        className={`w-fit px-4 py-1 rounded-full text-xs font-medium ${className} ${
          text?.toLowerCase() === 'resolved'
            ? 'bg-primary/10 text-textGray'
            : text?.toLowerCase() === 'low'
            ? 'bg-newSuccess/10 text-newSuccess'
            : text?.toLowerCase() === 'urgent'
            ? 'bg-danger/10 text-danger'
            : text?.toLowerCase() === 'high'
            ? 'bg-newSecondary/10 text-newSecondary'
            : 'bg-textGray/10 text-primary'
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default Status;
