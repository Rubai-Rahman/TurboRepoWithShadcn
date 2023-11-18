const RecentConversationSkeleton = () => {
  return (
    <>
      {[...new Array(3)].map((_, k) => (
        <div
          key={k}
          className="animate-pulse shadow-[0_0px_10px_-5px_rgba(0,0,0,0.3)] rounded-xl p-3 w-full"
        >
          <div className="flex justify-start items-center gap-3 w-full h-20">
            <div>
              <div className="rounded-full w-14 h-14 bg-slate-200 my-2"></div>
            </div>
            <div className="w-full">
              <div className="rounded w-20 h-6 bg-slate-200 my-2"></div>
              <div className="rounded w-1/3 h-4 bg-slate-200 my-2"></div>
            </div>
          </div>
          <div className="flex justify-between">
            <div className="rounded w-1/3 h-4 bg-slate-200 my-2"></div>
            <div className="rounded w-1/3 h-4 bg-slate-200 my-2"></div>
          </div>
          <div className="rounded w-1/3 h-4 bg-slate-200 my-2"></div>
        </div>
      ))}
    </>
  );
};

export default RecentConversationSkeleton;
