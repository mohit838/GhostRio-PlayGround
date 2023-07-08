import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="container mx-auto">
      <div className="text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <h1 className="">404</h1>

        <h3 className="">Look like you're lost</h3>

        <p>the page you are looking for not avaible!</p>

        <Link to="/" className="">
          Go to Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
