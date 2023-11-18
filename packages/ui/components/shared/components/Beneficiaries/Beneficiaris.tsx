import React, { useState } from 'react';
import DeactiveBeneficiaries from './DeactiveBeneficiaries';
import { beneficiariesType } from './Beneficiaries.types';
import { Button } from '@shadcn/button';
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@shadcn/accordion';

const beneficiariesData: beneficiariesType[] = [
  {
    id: 1,
    imgUrl:
      'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
    name: 'Ali Khaled AlGamdi',
    status: true,
    accountNo: 'SA7846212371238123',
    bankName: 'AlRajhi Bank',
    addedData: '10-10-2023 - 10:00 PM',
    activeData: '11-10-2023 - 10:00 PM',
  },
  {
    id: 2,
    imgUrl:
      'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
    name: 'Ali Khaled AlGamdi',
    status: true,
    accountNo: 'SA7846212371238123',
    bankName: 'AlRajhi Bank',
    addedData: '10-10-2023 - 10:00 PM',
    activeData: '11-10-2023 - 10:00 PM',
  },
  {
    id: 3,
    imgUrl:
      'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
    name: 'Ali Khaled AlGamdi',
    email: 'khuzimah@tweeq.sa',
    status: false,
    bankName: 'AlRajhi Bank',
    addedData: '10-10-2023 - 10:00 PM',
    activeData: '11-10-2023 - 10:00 PM',
  },
  {
    id: 4,
    imgUrl:
      'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png',
    name: 'Ali Khaled AlGamdi',
    status: true,
    bankName: 'AlRajhi Bank',
    phone: '966 56 896 6230',
    addedData: '10-10-2023 - 10:00 PM',
    activeData: '11-10-2023 - 10:00 PM',
  },
];

const Beneficiaris = () => {
  const [open, seOpen] = useState('null');
  return (
    <div className="w-full h-full overflow-hidden">
      {open === 'null' && (
        <div className="h-full overflow-y-auto ">
          <h3 className="text-darkCustom text-base leading-6 py-3 px-4">
            Beneficiaries
          </h3>
          <div className="w-full">
            <div className="mx-auto w-full max-w-md bg-white">
              <Accordion type="multiple">
                {beneficiariesData.map((user) => {
                  return (
                    <AccordionItem key={user.id} value={`card-${user.id}`}>
                      <AccordionTrigger>
                        <>
                          <div
                            className="flex justify-between gap-3"
                            key={user.id}
                          >
                            <Image
                              src={user.imgUrl}
                              width={40}
                              height={40}
                              alt=""
                            />
                            <div>
                              <p className="text-darkCustom">{user.name}</p>
                              <p className="text-grayCustom">
                                {user
                                  ? user.accountNo || user.phone || user.email
                                  : null}
                              </p>
                            </div>
                          </div>
                        </>
                      </AccordionTrigger>
                      <AccordionContent
                        className={`px-5 py-5 text-sm text-gray-500 space-y-5 border-b`}
                      >
                        <div className="flex flex-col gap-y-2">
                          <div>
                            <span className="text-grayCustom">Bank</span>
                            <p className="text-darkCustom font-semibold">
                              {user.bankName}
                            </p>
                          </div>
                          <div>
                            <span className="text-grayCustom">Added Date</span>
                            <p className="text-darkCustom font-semibold">
                              {user.addedData}
                            </p>
                          </div>
                          <div>
                            <span className="text-grayCustom">
                              Activation Date
                            </span>
                            <p className="text-darkCustom font-semibold">
                              {user.activeData}
                            </p>
                          </div>
                          <div>
                            <span className="text-grayCustom">Status</span>
                            <p className="text-darkCustom font-semibold">
                              {' '}
                              {user.status ? 'active' : 'open'}
                            </p>
                          </div>

                          <Button
                            onClick={() => seOpen('deactivate')}
                            className="text-center py-2 text-darkCustom rounded-lg w-full bg-lineBlueCustom"
                          >
                            {user.status ? 'Deactivate' : 'Activate'}
                          </Button>
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                })}
              </Accordion>
            </div>
          </div>
        </div>
      )}
      {open === 'deactivate' && <DeactiveBeneficiaries seOpen={seOpen} />}
    </div>
  );
};

export default Beneficiaris;
