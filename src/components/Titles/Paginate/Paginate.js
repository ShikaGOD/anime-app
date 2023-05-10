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
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        containerClassName={classes.paginateContainer}
        pageClassName={classes.paginateLi}
        renderOnZeroPageCount={null}
        activeClassName={classes.active}
        breakClassName={classes.breakLabel}
        nextClassName={classes.nextLabel}
        previousClassName={classes.previousLabel}
        forcePage={currentPage  - 1}
      />
    </>
  );
}

export default Paginate;
