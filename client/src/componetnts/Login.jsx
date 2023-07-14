import React from "react";
import Nav from "./common/Nav";

const Login = () => {
  return (
    <div className="loginForm">
      <Nav />
      Login
      <div className="loginForm">
        <h1>Login Form</h1>
        <form className="loginForm">
          <input type="email" />
          <input type="password" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
