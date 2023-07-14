import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Nav from "./common/Nav";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [navigate, setNavigate] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:7000/api/auth/view/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data?.accessToken}`;

      console.log(data); // Handle the response as needed

      if (data?.error === false) {
        setNavigate(true);
      }

      // Store the refresh token in session storage
      sessionStorage.setItem("refreshToken", data.refreshToken);
    } catch (error) {
      console.error(error);
    }
  };

  if (navigate) {
    return <Navigate to={"/"} />;
  }

  return (
    <div className="loginForm">
      <h1>LogIn Form</h1>
      <Nav />
      <form onSubmit={handleLogin} className="loginForm">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
