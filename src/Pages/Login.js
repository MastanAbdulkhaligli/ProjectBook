import React from "react";
import { auth, provider } from "../Config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../Style/Login.css";

const Login = ({ setIsAuth }) => {
  let navigate = useNavigate();

  const signIn = () => {
    signInWithPopup(auth, provider).then((result) => {
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      navigate("/");
    });
  };

  return (
    <div>
      <h2>Sign in with Google to Acces Admin Dashboard</h2>
      <button
        className="login-with-google-btn"
        onClick={() => {
          signIn();
        }}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
