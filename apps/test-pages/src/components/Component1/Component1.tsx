import CustomComboBox from '@localShared/CustomComboBox/CustomComboBox';
import React from 'react';
import { IoLanguage } from 'react-icons/io5';

const Component1 = () => {
  type DataType = {
    value: string;
    label: string;
  }[];
  const data: DataType = [
    { value: 'Arabic', label: 'Arabic' },
    { value: 'English', label: 'English' },
    { value: 'French', label: 'French' },
    { value: 'Urdu', label: 'Urdu' },
  ];
  return (
    <div className="flex gap-x-2 items-center">
      <IoLanguage className="text-textDark" />
      <CustomComboBox
        data={data}
        buttonClass="border-0 w-1/4 text-textDark"
        showSelectedIcon={false}
      />
    </div>
  );
};

export default Component1;
