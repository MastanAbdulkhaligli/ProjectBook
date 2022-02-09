import React from "react";
import { Link, Outlet } from "react-router-dom";

const Products = () => {
  return (
    <>
      <div>
        <h1>Products</h1>
        <input type="search" />
      </div>

      <nav>
        <ul>
          <Link to="featured">
            <li>Featured</li>
          </Link>
          <Link to="new">
            <li>New</li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Products;
