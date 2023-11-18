import React from 'react';
import { SubtitleTypes } from './Subtitle.types';

function Subtitle({ title, length, upArrow }: SubtitleTypes) {
  return (
    <div className="max-w-sm space-y-3 w-1/4 px-3 py-2">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center justify-center gap-3">
          <p className="text-slate-800 font-medium">{title}</p>
          <p className="bg-blue-50 text-blue-700 h-4 w-4 p-3 text-xs rounded-full flex justify-center items-center">
            {length}
          </p>
        </div>
        <span className="text-gray-400 mt-3">{upArrow}</span>
      </div>
    </div>
  );
}

export default Subtitle;
