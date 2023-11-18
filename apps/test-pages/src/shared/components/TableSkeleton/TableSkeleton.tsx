import { useRouter } from "next/router";
import React from "react";

function TableSkeleton({ tHead, row, rowSkeleton, switchVal, action }: { tHead: number; row: number; rowSkeleton: number; switchVal: number; action: number }) {
  const router = useRouter();
  const switchAction = () => {
    return (
      <>
        {router.pathname === "/settings/workflows/contact-reason" ? null : router.pathname === "/settings/workflows/ticket-form" ? null : (
          <div className="w-28 h-6 my-2">
            {[...new Array(switchVal)].map((_, k) => (
              <div key={k} className="rounded-full w-11 h-6 bg-slate-200"></div>
            ))}
          </div>
        )}
        <div className="flex gap-x-2 justify-start items-start w-28 my-2">
          {[...new Array(action)].map((_, k) => (
            <div key={k} className="rounded-full w-8 h-8 bg-slate-200"></div>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="animate-pulse rounded-xl w-full">
      <div className="flex justify-between gap-3 py-1 px-5 bg-lineBlueCustom">
        {[...new Array(tHead)].map((_, k) => (
          <div key={k} className="rounded w-28 h-5 bg-slate-300 my-2"></div>
        ))}
      </div>
      {[...new Array(row)].map((_, k) => (
        <div key={k} className="flex justify-between gap-3 py-5 px-5 border-b">
          {[...new Array(rowSkeleton)].map((_, k) => (
            <div key={k} className="rounded w-28 h-6 bg-slate-200 my-2"></div>
          ))}
          {router.pathname === "/settings/agents" && switchAction()}
          {router.pathname === "/settings/teams" && switchAction()}
          {router.pathname === "/settings/workflows/contact-reason" && switchAction()}
          {router.pathname === "/settings/workflows/ticket-form" && switchAction()}
          {router.pathname === "/settings/inboxes" && switchAction()}
          {router.pathname === "/settings/agent-productivity/tags" && switchAction()}
          {router.pathname === "/settings/knowledge-base/categories" && switchAction()}
          {router.pathname === "/settings/knowledge-base/articles" && switchAction()}
          {router.pathname === "/settings/canned-responses/categories" && switchAction()}
          {router.pathname === "/settings/canned-responses/list" && switchAction()}
        </div>
      ))}
    </div>
  );
}
export default TableSkeleton;
