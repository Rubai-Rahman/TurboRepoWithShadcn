
import React from 'react';
import { BiCommentDetail } from 'react-icons/bi';
import { IoIosNotificationsOutline } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdOutlineEmail } from 'react-icons/md';
import { TbFaceId } from 'react-icons/tb';
 

const dataNotify = [
  {
    date: '16 April, 10:56 am',
    faceId: '',
    content: 'Your device ae-lahmar iPhone has been unlinked from your account',
    type: 'sms',
    status: 'successful',
  },
  {
    date: '14 April, 10:56 am',
    faceId: '',
    content: 'Money added By: **0007 ;mada Amount: SAR 29.00 ...',
    type: 'sms',
    status: 'pending',
  },
  {
    date: '13 April, 10:56 am',
    faceId: '',
    content: 'Use **** verification code to register in Tweeq',
    type: 'email',
    status: 'successful',
  },
  {
    date: '10 April, 10:56 pm',
    faceId: '98734567890-098765',
    content: 'Your device ae-lahmar iPhone has been unlinked from your account',
    type: 'push',
    status: 'successful',
  },
];

function Notifications() {
  return (
    <div>
      <div className="flex justify-between items-center px-4 border-b py-[8.3px]">
        <h3 className="text-base leading-6 text-darkCustom">Notifications</h3>
        <div className="cursor-pointer">
          <IoClose className="text-grayCustom text-2xl" />
        </div>
      </div>
      {dataNotify.map((notify) => {
        return (
          <div className="border-b px-4 py-3 space-y-3" key={notify.type}>
            <div className="flex justify-between items-center">
              <div
                className={`text-grayCustom text-sm flex items-center gap-3`}
              >
                <span
                  className={`${
                    (notify.status === 'successful' && notify.type === 'sms') ||
                    notify.type === 'push'
                      ? 'h-2 w-2 bg-green-500 rounded-full'
                      : ''
                  }`}
                ></span>{' '}
                <p>{notify.date}</p>
              </div>
              <div className="text-darkCustom text-sm flex items-center gap-2">
                {notify.type === 'push' ? (
                  <TbFaceId className="text-darkCustom text-xl" />
                ) : (
                  ''
                )}{' '}
                <span>{notify.faceId}</span>
              </div>
            </div>
            <p className="text-darkCustom">{notify.content}</p>
            <div className="flex justify-between items-center">
              <div className="text-darkCustom font-medium border px-4 py-1.5 rounded-md flex justify-center items-center gap-1 w-24 h-8">
                {notify.type === 'sms' ? (
                  <BiCommentDetail className="text-xl" />
                ) : notify.type === 'email' ? (
                  <MdOutlineEmail className="text-xl" />
                ) : notify.type === 'push' ? (
                  <IoIosNotificationsOutline
                    className="text-xl text-darkCustom"
                    stroke="black"
                  />
                ) : (
                  ''
                )}
                <p
                  className={`${
                    notify.type === 'sms' ? 'mt-0' : ' mt-1'
                  } uppercase text-sm`}
                >
                  {notify.type}
                </p>
              </div>
              <p
                className={`${
                  notify.status === 'pending'
                    ? 'text-red-500 bg-red-500/5'
                    : 'text-blueCustom bg-blueCustom/5 '
                } font-medium rounded-md text-sm capitalize px-3 py-1.5 w-24 h-8 text-center`}
              >
                {notify.status}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Notifications;
