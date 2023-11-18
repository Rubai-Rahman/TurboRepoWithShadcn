import React from 'react';
import { AiFillTwitterCircle, AiOutlineMail } from 'react-icons/ai';
import { IoLogoWhatsapp } from 'react-icons/io';
import { RiInstagramFill } from 'react-icons/ri';

const TableRow = ({ data }) => {
  return (
    <div>
      <div className="overflow-x-auto relative">
        <table className="w-full">
          <tbody className="text-sm">
            <div className="px-4">
              <tr className="border-b border-gray-300 text-black font-medium flex justify-between">
                {data.map((item, index) => (
                  <>
                    {item.id && (
                      <td className="py-4 text-center">#{item.id}</td>
                    )}
                    {item.toInbox && (
                      <td className="py-4 text-center">{item.toInbox}</td>
                    )}
                    {item.from && (
                      <td className="py-4 text-center">{item.from}</td>
                    )}
                    {item.assignedTo && (
                      <td className="py-4 text-center">{item.assignedTo}</td>
                    )}
                    {item.status && (
                      <td className="py-4 text-center">
                        <p className="px-4 py-1 rounded-full text-center bg-newSuccess/10 text-newSuccess">
                          {item.status}
                        </p>
                      </td>
                    )}
                    {item.type && (
                      <td className="py-4 text-center">{item.type}</td>
                    )}
                    {item.category && (
                      <td className="py-4 text-center">{item.category}</td>
                    )}
                    {item.subCategory && (
                      <td className="py-4 text-center">{item.subCategory}</td>
                    )}
                    {item.name && (
                      <td className="py-4 text-center">{item.name}</td>
                    )}
                    {item.phone_number && (
                      <td className="py-4 text-center">
                        <p className="text-primary">{item.phone_number}</p>
                      </td>
                    )}
                    {item.email && (
                      <td className="py-4 text-center">
                        <p className="text-primary">{item.email}</p>
                      </td>
                    )}
                    {item.location && (
                      <td className="py-4 text-center">{item.location}</td>
                    )}
                    {item.last_activity && (
                      <td className="py-4 text-center">{item.last_activity}</td>
                    )}
                    {item.social_profiles && (
                      <td className="py-4 text-center flex gap-x-3 text-base">
                        {item.social_profiles.map((account, index) => (
                          <p key={index}>
                            {account.channel_name.toLowerCase() ===
                              'twitter' && (
                              <AiFillTwitterCircle className="text-twitter" />
                            )}
                            {account.channel_name.toLowerCase() ===
                              'whatsapp' && (
                              <IoLogoWhatsapp className="text-whatsapp" />
                            )}
                            {account.channel_name.toLowerCase() === 'email' && (
                              <AiOutlineMail className="text-black" />
                            )}
                            {account.channel_name.toLowerCase() ===
                              'instagram' && (
                              <RiInstagramFill className="text-instagram" />
                            )}
                          </p>
                        ))}
                      </td>
                    )}
                    {item.conversations && (
                      <td className="py-4 text-center">{item.conversations}</td>
                    )}
                    {item.tickets && (
                      <td className="py-4 text-center">{item.tickets}</td>
                    )}
                  </>
                ))}
              </tr>
            </div>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableRow;
