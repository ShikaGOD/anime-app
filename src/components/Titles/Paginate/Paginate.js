import { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import classes from "./Paginate.module.css";

function Paginate() {
  return (
    <>
      {/* <Items currentItems={currentItems} /> */}
      <ReactPaginate
        breakLabel="..."
        nextLabel={<span className={classes.nextLabel}>next</span>}
        // onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={100}
        previousLabel={<span className={classes.nextLabel}>previous</span>}
        containerClassName={classes.paginateContainer}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Paginate;
