import React from "react";

const ProfileSkeleton = () => {
  return (
    <>
      <div className="animate-pulse shadow-[0_0px_10px_-5px_rgba(0,0,0,0.3)] rounded-xl p-3 w-full h-full">
        <div className="flex gap-x-2 justify-start items-start mr-10">
          {[...new Array(2)].map((_, k) => (
            <div key={k} className="rounded-full w-8 h-8 bg-slate-200"></div>
          ))}
        </div>
        <div className="flex justify-start items-center gap-3 my-3 w-full">
          <div className="rounded-full w-12 h-12 bg-slate-200 my-2"></div>
          <div className="flex flex-col">
            <div className="rounded w-32 h-4 bg-slate-200 my-1"></div>
            <div className="rounded w-32 h-4 bg-slate-200 my-1"></div>
          </div>
        </div>
        <div className="flex justify-start items-center gap-3 ml-1">
          <div className="rounded w-4 h-6 -rotate-45 bg-slate-200 my-2 mr-1"></div>
          <div className="rounded w-32 h-5 bg-slate-200 my-2"></div>
          <div className="rounded w-32 h-5 bg-slate-200 my-2"></div>
        </div>
        <div className="flex justify-start items-center gap-3">
          <div className="rounded w-6 h-5 bg-slate-200 my-2"></div>
          <div className="rounded w-32 h-5 bg-slate-200 my-2"></div>
        </div>
        <div className="rounded w-full h-5 bg-slate-200 my-16"></div>
        <div className="rounded w-full h-5 bg-slate-200 my-16"></div>
        <div className="rounded w-full h-5 bg-slate-200 my-16"></div>
      </div>
    </>
  );
};

export default ProfileSkeleton;
