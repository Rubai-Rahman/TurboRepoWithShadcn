import { Button } from "@shadcn/button";
import { Input } from "@shadcn/input";
import React, { useRef } from "react";
import { FiFolder, FiSearch } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { VscListFilter } from "react-icons/vsc";

const SearchBlock = ({
  maxWidth,
  placeholder,
  setSearchTermFunc,
  searchTerm,
  openFilterModal,
  clearFilter,
  queryBuilderImplemented,
  setModalType,
}: {
  maxWidth?: string;
  placeholder?: string;
  searchTerm: string;
  setSearchTermFunc: (term: string) => void;
  openFilterModal: () => void;
  clearFilter: () => void;
  queryBuilderImplemented: boolean;
  setModalType: (value: "filter" | "saveFilter") => void;
}) => {
  const inputRef = useRef(null);

  return (
    <div
      className={`${maxWidth} flex justify-end gap-2 items-center border-b border-gray-300 h-12`}
    >
      {!queryBuilderImplemented && (
        <div className="grow flex justify-start items-center relative h-full group">
          {/* {!searchTerm &&  */}
          <FiSearch className="text-grayCustom text-xl absolute left-4 group-focus:hidden pointer-events-none" />
          {/* } */}
          <Input
            type="text"
            onChange={(e) => setSearchTermFunc(e.target.value)}
            ref={inputRef}
            className="border-none ring-0 focus:ring-0 focus:outline-none outline-none pl-12 w-full h-full text-sm font-medium text-grayCustom focus:placeholder:hidden placeholder:text-xs placeholder:font-semibold transition-all"
            placeholder={placeholder ? placeholder : "Search for Conversation"}
          />
        </div>
      )}
      {queryBuilderImplemented && (
        <>
          <Button
            onClick={() => (setModalType("saveFilter"), openFilterModal())}
            className="group flex justify-center items-center transition-transform bg-grayCustom/10 py-0.5 px-2 rounded-md"
          >
            <FiFolder className="cursor-pointer h-4 w-4 mr-1 text-greenCustom" />
            <span className="text-sm transition-transform text-greenCustom">
              Save as Smart Folder
            </span>
          </Button>
          <Button
            onClick={clearFilter}
            className="group flex justify-center items-center transition-transform bg-grayCustom/10 py-0.5 px-2 rounded-md"
          >
            <RxCross2 className="cursor-pointer h-4 w-4 text-redCustom" />
            <span className="text-sm transition-transform text-redCustom">
              Clear Filter
            </span>
          </Button>
        </>
      )}
      {!!searchTerm && (
        <RxCross2
          onClick={() => (setSearchTermFunc(""), (inputRef.current.value = ""))}
          className="text-grayCustom cursor-pointer h-6 w-6"
        />
      )}

      <div className="mr-4">
        <VscListFilter
          onClick={() => (setModalType("filter"), openFilterModal())}
          className="text-grayCustom cursor-pointer h-6 w-6 shrink-0"
        />
      </div>
    </div>
  );
};

export default SearchBlock;
