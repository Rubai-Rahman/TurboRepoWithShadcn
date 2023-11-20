import { IoClose } from 'react-icons/io5';
import { RiFileList2Line } from 'react-icons/ri';

const activityLogs = [
  {
    date: 'Today, 10:56 am',
    authorName: 'Mishal Bin Slimah',
    content:
      'Change account status from Active to Freeze. ID expiry date not updated for 90 days',
    note: 'Note is Shown Here',
  },
  {
    date: '13 April, 10:56 am',
    authorName: 'Customer',
    content:
      'Change account status from Active to Freeze. ID expiry date not updated for 90 days',
    note: 'Note is Shown Here',
  },
  {
    date: '10 April, 10:56 pm',
    authorName: 'Ali AlAhmar',
    content:
      'Change account status from Active to Freeze. ID expiry date not updated for 90 days',
    note: 'Note is Shown Here',
  },
];

function ActivityLog() {
  return (
    <div>
      <div className="flex justify-between items-center py-[8.3px] px-4 border-b">
        <h3 className="text-darkCustom text-base leading-6">Activity Logs</h3>
        <div className="cursor-pointer">
          <IoClose className="text-grayCustom text-2xl" />
        </div>
      </div>
      {activityLogs.map((logs) => {
        return (
          <div className="border-b px-4 py-4 space-y-3" key={logs.authorName}>
            <div className="flex justify-between items-center">
              <div className="text-grayCustom text-sm flex items-center gap-3">
                <p>{logs.date}</p>
              </div>
              <p className="text-darkCustom text-sm flex items-center gap-2">
                By: {logs.authorName}
              </p>
            </div>
            <p className="text-darkCustom text-md">{logs.content}</p>
            <div className="flex items-center gap-2">
              <RiFileList2Line className="text-2xl" />
              <p className="text-grayCustom text-sm">{logs.note}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ActivityLog;
