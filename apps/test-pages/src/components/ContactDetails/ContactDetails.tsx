import React, { useState } from 'react';
import { ContactDetailsType } from './ContactDetails.types';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { BsInstagram, BsPieChartFill } from 'react-icons/bs';

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from 'ui/components/shadcn/tabs';
import Image from 'next/image';

const ContactDetails = ({ categories }: ContactDetailsType) => {
  let [contactCategory] = useState(categories);
  return (
    <div className="w-full max-w-md px-2 pb-16 py-5 border-l sm:px-0">
      <Tabs>
        <TabsList className="flex space-x-1 border-b">
          {Object.keys(contactCategory).map((category, index) => (
            <TabsTrigger
              value={`Tab-${index}`}
              key={category}
              className={`w-full py-2.5 text-sm font-medium leading-5 text-blue-700 capitalize",
                  "focus:outline-none",
                  selected
                     [data-state=active]:"bg-white [data-state=active]:border-b-2 [data-state=active]:border-blue-700"
                    [data-state=inactive]:"text-slate-700`}
            >
              <span className="inline-flex gap-3">
                {category}
                {category === 'conversations' && (
                  <p className="h-5 w-5 text-blue-700 bg-blue-50 rounded-full">
                    {contactCategory.conversations?.length}
                  </p>
                )}
                {category === 'tickets' && (
                  <p className="h-5 w-5 text-blue-700 bg-blue-50 rounded-full">
                    {contactCategory.tickets?.length}
                  </p>
                )}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={`Tab-0`} className="mt-2">
          {Object.values(contactCategory).map((posts, idx) => (
            <div
              key={idx}
              className={`rounded-xl bg-white p-3',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2`}
            >
              {posts.map((post, index) => (
                <div
                  className={`w-full px-4 py-2 flex gap-x-3 border-b`}
                  key={index}
                >
                  {post.tag && (
                    <div className="w-fit flex flex-col gap-y-2">
                      <Image
                        className="w-10 h-10 rounded-full bg-white"
                        src={`${
                          post?.profileUrl
                            ? post.profileUrl
                            : '../../assets/user_avatar1.png'
                        }`}
                        alt="Rounded avatar"
                      />
                      <div className="flex justify-center mt-1">
                        {post?.channel === 'twitter' && (
                          <AiFillTwitterCircle className="text-2xl text-twitter" />
                        )}
                        {post?.channel === 'instagram' && (
                          <p className="flex justify-center items-center bg-rose-600 h-5 w-5 rounded-full">
                            <BsInstagram className="text-xs text-white" />
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="w-5/6 flex flex-col gap-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xl text-slate-800 font-semibold leading-6">
                          {post.title === 'Ticket Title'
                            ? post.title
                            : post.name}
                        </p>
                        <p className="text-xs text-gray-400 font-medium">
                          {post.tag && post?.username}
                          {post.priority === 0 && (
                            <p className=" text-gray-400">
                              {' '}
                              #{post.id} /{' '}
                              <span className="border-4 rounded-full border-red-500 inline-block mr-1"></span>{' '}
                              New
                            </p>
                          )}
                          {post.priority === 1 && (
                            <p className="text-gray-400">
                              {' '}
                              #{post.id} /{' '}
                              <span className="border-4 rounded-full border-yellow-400 inline-block mr-1"></span>{' '}
                              Open
                            </p>
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-x-2">
                        {post.status === 3 && post.date && (
                          <p className="px-3 py-1 rounded-full bg-selectedBG/10 text-xs font-medium text-textGray">
                            Resolved
                          </p>
                        )}

                        {post.title === 'Ticket Title' &&
                          post?.channel === 'twitter' && (
                            <>
                              <AiFillTwitterCircle className="text-2xl text-twitter" />{' '}
                              <p className="text-sm text-gray-400 font-medium">
                                {post.duration}
                              </p>
                            </>
                          )}
                        {post.title === 'Ticket Title' &&
                          post?.channel === '' && (
                            <>
                              <BsPieChartFill className="text-xl text-success" />{' '}
                              <p className="text-sm text-gray-400 font-medium">
                                {post.duration}
                              </p>
                            </>
                          )}
                      </div>
                    </div>
                    <p className="font-medium text-xs text-slate-800">
                      {post.title === 'Ticket Title'
                        ? post.subject
                        : post?.title}
                    </p>

                    {post.date && (
                      <div className="flex justify-between text-xs font-medium text-textGray">
                        <p>{post?.tag}</p>
                        <p>{post.date}</p>
                      </div>
                    )}
                    {post.title === 'Ticket Title' && (
                      <div className="flex justify-between text-xs font-medium text-textGray">
                        <p>
                          <span className="border-4 border-green-500 rounded-full mr-2 inline-block"></span>
                          {post.name}
                        </p>
                        {post.status === 0 && (
                          <p className="text-red-500 bg-red-50 px-3 py-1 rounded-full">
                            Urgent
                          </p>
                        )}
                        {post.status === 1 && (
                          <p className="text-yellow-400 bg-yellow-50 px-3 py-1 rounded-full">
                            High
                          </p>
                        )}
                        {post.status === 2 && (
                          <p className="text-green-500 bg-green-50 px-3 py-1 rounded-full">
                            Low
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContactDetails;
