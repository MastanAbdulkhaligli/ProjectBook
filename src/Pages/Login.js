import React from "react";
import { auth, provider } from "../Config";
import { signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";

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
      <p>Sign in with Google to Post</p>
      <button
        onClick={() => {
          signIn();
        }}
      >
        {" "}
        Sign in with Google
      </button>
    </div>
  );
};

export default Login;
