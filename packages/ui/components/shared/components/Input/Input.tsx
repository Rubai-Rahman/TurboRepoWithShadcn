import React from 'react';
import { InputTypes } from './Input.types';
import CustomComboBox from '@localShared/components/CustomComboBox/CustomComboBox';

const Input = ({
  label,
  data,
  buttonClass,
  labelClass,
  showIcon,
  maxWidth = 'w-1/4',
}: InputTypes) => {
  return (
    <div className={maxWidth}>
      <CustomComboBox
        label={label}
        data={data}
        buttonClass={buttonClass}
        labelClass={labelClass}
        maxWidth="w-full"
        dropdownClass="w-full"
        showIcon={showIcon}
      />
    </div>
  );
};

export default Input;
