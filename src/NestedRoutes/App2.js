import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import React from "react";

import Home from "./Home";
import About from "./About";
import Products from "./Products";
import Featured from "./Featured";
import { New } from "./New";
import NoMatch from "./NoMatch";

const App2 = () => {
  return (
    <Router>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="/about">
          <li>About</li>
        </Link>
        <Link to="/product">
          <li>Products</li>
        </Link>
      </ul>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/product" element={<Products />}>
          <Route path="featured" element={<Featured />}></Route>
          <Route path="new" element={<New />}></Route>
        </Route>
        <Route path="*" element={<NoMatch />}></Route>
      </Routes>
    </Router>
  );
};

export default App2;
