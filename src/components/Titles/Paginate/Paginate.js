import ReactPaginate from "react-paginate";
import classes from "./Paginate.module.css";

function Paginate({ changePage, page, totalPages, onBreakLabelClick  }) {

  const handleBreakLabelClick = (e) => {
    e.preventDefault();
    onBreakLabelClick(page + 1); // переходити до наступної сторінки в діапазоні
  };

  return (
    <>
      <ReactPaginate
        breakLabel={<a href="/" onClick={handleBreakLabelClick}>...</a>}
        nextLabel={<span className={classes.nextLabel}>next</span>}
        onPageChange={(e) => {
          if (e.selected > page - 1) {
            changePage("next");
          } else {
            changePage("previous");
          }
        }}
        pageRangeDisplayed={3}
        marginPagesDisplayed={2}
        pageCount={totalPages}
        previousLabel={<span className={classes.nextLabel}>previous</span>}
        containerClassName={classes.paginateContainer}
        pageClassName={classes.paginateLi}
        renderOnZeroPageCount={null}
        forcePage={page - 1}
      />
    </>
  );
}

export default Paginate;
