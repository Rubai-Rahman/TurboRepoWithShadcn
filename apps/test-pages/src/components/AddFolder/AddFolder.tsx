import React from 'react';
import { Button } from '@shadcn/button';
import { Input } from '@shadcn/input';

interface Foldertype {
  maxWidth: string;
  placeholder: string;
  cancelBtnText: string;
  saveBtnText: string;
}

function AddFolder({
  maxWidth,
  placeholder,
  cancelBtnText,
  saveBtnText,
}: Foldertype) {
  return (
    <div className={`${maxWidth} space-y-3 max-h-12 shadow-sm py-2 px-3`}>
      <div className="flex items-center justify-between">
        <Input
          className="w-7/12 py-1 outline-none border-none placeholder:text-gray-400 placeholder:text-sm"
          id=""
          name=""
          placeholder={placeholder}
          type="text"
        />
        <div className="space-x-3">
          <Button className="text-gray-400 text-xs font-Inter font-medium">
            {cancelBtnText}
          </Button>
          <Button className="bg-blue-700 text-white text-xs font-Inter font-medium rounded-md py-2 px-3">
            {saveBtnText}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddFolder;
