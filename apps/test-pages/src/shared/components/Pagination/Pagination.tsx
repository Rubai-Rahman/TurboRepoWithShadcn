import { GET_CONTACT_COUNTQuery } from "@api-lib/gql/graphql";
import React, { useState } from "react";
import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
} from "react-icons/bs";
import ReactPaginate from "react-paginate";

const Pagination = ({
  totalCount,
  limit,
  setOffset,
  pages,
  initialPage,
}: {
  totalCount: GET_CONTACT_COUNTQuery["payload"]["aggregate"]["count"];
  limit;
  setOffset;
  pages;
  initialPage;
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const handlePageClick = (event) => {
    setOffset(event.selected * limit);
    setCurrentPage(event.selected);
  };

  return (
    <div className="fixed bottom-0 w-10/12 bg-white border-t-2 px-12">
      <div className="flex justify-between items-center gap-x-3 py-3">
        <div className="text-gray-500 italic">
          Showing{" "}
          <span className="font-bold">
            {totalCount ? currentPage * limit + 1 : totalCount}
          </span>{" "}
          to{" "}
          <span className="font-bold">
            {totalCount < 20
              ? totalCount
              : (currentPage + 1) * limit > totalCount
              ? totalCount
              : (currentPage + 1) * limit}
          </span>{" "}
          of <span className="font-bold">{totalCount}</span> results
        </div>

        <ReactPaginate
          breakLabel="..."
          forcePage={initialPage}
          nextLabel={
            <BsFillArrowRightCircleFill className={`text-primary text-2xl`} />
          }
          onPageChange={(e) => handlePageClick(e)}
          pageRangeDisplayed={5}
          pageCount={pages}
          previousLabel={
            <BsFillArrowLeftCircleFill className={`text-primary text-2xl`} />
          }
          renderOnZeroPageCount={null}
          className="flex justify-center items-center gap-x-3"
          pageClassName=" text-gray-500 rounded px-2"
          activeLinkClassName="bg-primary text-white px-2 rounded"
        />
      </div>
    </div>
  );
};

export default Pagination;
