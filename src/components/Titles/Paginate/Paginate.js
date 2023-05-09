import ReactPaginate from "react-paginate";
import classes from "./Paginate.module.css";

function Paginate({ currentPage, onPageChange, totalPages }) {

  const handlePageClick = (data) => {
    onPageChange(data);
  };

  const handleBreakLabelClick = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <ReactPaginate
        breakLabel={<a href='#' onClick={handleBreakLabelClick}>...</a>}
        nextLabel={<span className={classes.nextLabel}>next</span>}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel={<span className={classes.nextLabel}>previous</span>}
        containerClassName={classes.paginateContainer}
        pageClassName={classes.paginateLi}
        renderOnZeroPageCount={null}
        forcePage={currentPage  - 1}
      />
    </>
  );
}

export default Paginate;
