import React from "react";
import { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import avatar from "../../assets/profile.png";
import styles from "../../styles/Username.module.css";

const Register = () => {
  return (
    <div className="container mx-auto">
      <Toaster position="top-center" reverseOrder={false}></Toaster>

      <div className="flex justify-center items-center h-screen">
        <div
          className={styles.glass}
          style={{ width: "45%", paddingTop: "3em" }}
        >
          <div className="title flex flex-col items-center">
            <h4 className="text-5xl font-bold">Register</h4>
            <span className="py-4 text-xl w-2/3 text-center text-gray-500">
              Happy to join you!
            </span>
          </div>

          <form className="py-1" onSubmit={() => {}}>
            <div className="profile flex justify-center py-4">
              <label htmlFor="profile">
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </label>

              <input
                onChange={() => {}}
                type="file"
                id="profile"
                name="profile"
              />
            </div>

            <div className="textbox flex flex-col items-center gap-6">
              <input
                className={styles.textbox}
                type="text"
                placeholder="Email*"
              />
              <input
                className={styles.textbox}
                type="text"
                placeholder="Username*"
              />
              <input
                className={styles.textbox}
                type="text"
                placeholder="Password*"
              />
              <button className={styles.btn} type="submit">
                Register
              </button>
            </div>

            <div className="text-center py-4">
              <span className="text-gray-500">
                Already Register?
                <Link className="text-red-500" to="/">
                  Login Now
                </Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
