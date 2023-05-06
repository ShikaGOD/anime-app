import ReactPaginate from "react-paginate";
import classes from "./Paginate.module.css";

function Paginate({ setCurrentPage, currentPage }) {
  function handlePageClick( {selected} ) {
    setCurrentPage(selected);
    console.log(currentPage);
  }

  return (
    <>
      <ReactPaginate
        breakLabel="..."
        nextLabel={<span className={classes.nextLabel}>next</span>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={100}
        previousLabel={<span className={classes.nextLabel}>previous</span>}
        containerClassName={classes.paginateContainer}
        pageClassName={classes.paginateLi}
        renderOnZeroPageCount={null}
      />
    </>
  );
}

export default Paginate;
