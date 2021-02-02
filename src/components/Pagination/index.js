import React, { useEffect, useState } from "react";
import "./style.scss";

const Pagination = ({ list, limit, handler, ...otherProps }) => {
  const [page, setPage] = useState(1);
  const [numPages, setNumPages] = useState([]);

  const paginateList = (nr) => {
    const startIndex = (nr - 1) * limit;
    const totalItems = list.length;
    const endIndex = Math.min(startIndex + limit - 1, totalItems - 1);
    const arr = list.slice(startIndex, endIndex + 1);
    handler(arr);
  };

  const getNextPage = (nr) => {
    if (nr === 0) return;
    else setPage(nr);
    paginateList(nr);
  };

  const getPrevPage = (nr) => {
    if (nr > numPages) return;
    setPage(nr);
    paginateList(nr);
  };

  useEffect(() => {
    const pages = Math.ceil(list.length / limit);
    setNumPages(pages);
    paginateList(1);
  }, [list]);

  return (
    <div className="pagination mt-2">
      <div className="pagination_body">
        <button
          className="btn--default pagination_btn "
          onClick={() => getPrevPage(1)}
        >
          First Page
        </button>
        <button
          className="btn--default pagination_btn pagination_btn"
          onClick={() => getNextPage(page - 1)}
          disabled={page === 1}
        >
          Prev Page
        </button>
        <span className="page_current">{page}</span>
        <button
          className="btn--default pagination_btn"
          onClick={() => getPrevPage(page + 1)}
          disabled={page === numPages}
        >
          Next Page
        </button>
      </div>
    </div>
  );
};

export default Pagination;
