import React from "react";
import "../Style/Navbar.css";

// Instead of using anker tag we are using Link from dom
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <>
      <header className="header">
        <Link to="/">
          <h1 className="logo">Recursive vs Dynamic vs Iterative</h1>
        </Link>
        <ul className="main-nav">
          <Link to="/dec2binary">
            <li>Dec2Binary</li>
          </Link>
          <Link to="/fibonacci">
            <li>Fibonacci</li>
          </Link>
          <Link to="/foobar">
            <li>Google Foobar</li>
          </Link>
          {/* <Link to="/contact">
            <li>Contact</li>
          </Link> */}
        </ul>
      </header>
    </>
  );
};

export default Navbar;
