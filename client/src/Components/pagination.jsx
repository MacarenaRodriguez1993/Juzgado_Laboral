import React from "react";
import { Link } from "react-router-dom";

const Pagination = () => {
  return (
    <>
      <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item pe-2">
            <Link class="page-link" href="#" aria-label="Previous">
              <i class="bi bi-backspace"></i>
            </Link>
          </li>
          {`Pagina x de x`}
          <li class="page-item ps-2">
            <Link class="page-link" href="#" aria-label="Previous">
              <i class="bi bi-backspace-reverse"></i>
            </Link>
          </li>
        </ul>
      </nav>
    </>
  );
};
export default Pagination;
