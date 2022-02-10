import React from "react";
import { Link, Outlet } from "react-router-dom";
import "../Style/Admin.css";

const Admin = () => {
  return (
    <>
      <header>
        <nav>
          <ul className="nav-area">
            <Link to="addbook">
              <li>AddBook</li>
            </Link>
            <Link to="deletebook">
              <li>Delete Book</li>
            </Link>
            <Link to="download">
              <li>Download</li>
            </Link>
            <Link to="request">
              <li>Requests</li>
            </Link>
          </ul>
        </nav>
      </header>
      <Outlet />
    </>
  );
};

export default Admin;
