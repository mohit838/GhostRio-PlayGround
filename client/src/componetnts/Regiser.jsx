import React from "react";
import Nav from "./common/Nav";

const Regiser = () => {
  return (
    <div className="loginForm">
      <Nav />
      Regiser
      <div className="loginForm">
        <h1>Regiser Form</h1>
        <form className="loginForm">
          <input type="text" />
          <input type="text" />
          <input type="text" />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Regiser;
