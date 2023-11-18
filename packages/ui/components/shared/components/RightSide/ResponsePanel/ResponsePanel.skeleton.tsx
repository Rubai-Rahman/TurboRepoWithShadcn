import React from "react";

const CannedSkeleton = () => {
  return (
    <>
      {[...new Array(1)].map((_, k) => (
        <div
          key={k}
          className="animate-pulse shadow-[0_0px_10px_-5px_rgba(0,0,0,0.3)] rounded-xl p-3 w-full"
        >
          <div className="p-3 rounded-lg">
            <div className="rounded w-2/4 h-4 bg-slate-200 my-3"></div>
            <div className="rounded w-3/4 h-6 bg-slate-200 my-3"></div>
            <div className="rounded w-full h-4 bg-slate-200 my-2"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CannedSkeleton;
