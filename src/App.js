import "./App.css";
import Home from "./Pages/Home";
import CreatePost from "./Pages/CreatePost";
import Login from "./Pages/Login";
import { useEffect, useState } from "react";
import "./Style/Navbar.css";
import { signOut } from "firebase/auth";
import { auth } from "./Config";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Routes,
  useNavigate,
} from "react-router-dom";
import Require from "./Pages/Require";

// npm install react-router-dom@5.2.0

function App() {
  const [isAuth, setIsAuth] = useState(false);

  const SignOut = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  return (
    <Router>
      <header className="header">
        <Link to="/">
          <li className="logo">Home</li>
        </Link>
        <ul className="main-nav">
          {!isAuth ? (
            <Link to="/login">
              <li>Login</li>
            </Link>
          ) : (
            <>
              <Link to="/createpost">
                <li>Create Post</li>
              </Link>
              <button
                className="logout"
                onClick={() => {
                  SignOut();
                }}
              >
                Log Out
              </button>
            </>
          )}

          {isAuth === false ? <Link to="/require"> Require Book</Link> : false}
        </ul>
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createpost" element={<CreatePost isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/require" element={<Require />} />
      </Routes>
    </Router>
  );
}

export default App;
