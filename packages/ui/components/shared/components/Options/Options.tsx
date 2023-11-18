import { IconOptionsType } from './Options.types';

function Options({
  conversationIcon,
  secondIcon,
  ticketIcon,
  editIcon,
  closeIcon,
}: IconOptionsType) {
  return (
    <div className="max-w-sm space-y-3 w-1/4 shadow-sm px-3 py-2">
      <div className="flex justify-between gap-3">
        <div className="inline-flex gap-2">
          <p className="bg-blue-50 text-blue-700 h-8 w-8 rounded-full flex justify-center items-center">
            {conversationIcon}
          </p>
          <p className="bg-blue-50 text-blue-700 h-8 w-8 rounded-full flex justify-center items-center">
            {secondIcon}
          </p>
          <p className="bg-blue-50 text-blue-700 h-8 w-8 rounded-full flex justify-center items-center -rotate-45">
            {ticketIcon}
          </p>
          <p className="bg-blue-50 text-blue-700 h-8 w-8 rounded-full flex justify-center items-center">
            {editIcon}
          </p>
        </div>
        <div>
          <p className=" text-gray-500 h-8 w-8 rounded-full flex justify-center items-center">
            {closeIcon}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Options;
