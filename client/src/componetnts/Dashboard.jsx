import axios from "axios";
import React, { useEffect, useState } from "react";
import Nav from "./common/Nav";

const Dashboard = () => {
  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      const response = await axios.get("dashboard");
      setName(response.data?.message);
    })();
  }, []);

  return (
    <div className="loginForm">
      <Nav />
      <h2>Dashboard</h2>
      <h1>Here is your User Name: {name} </h1>
    </div>
  );
};

export default Dashboard;
