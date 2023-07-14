import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <input type="checkbox" id="flip" />
      <div className="cover">
        <div className="front">
          <img src="/assets/Background.png" alt="login/img" />
          <div className="text">
            <span className="text-1">
              Every new friend is a <br></br> new adventure
            </span>
            <span className="text-2">Let's get connected</span>
          </div>
        </div>
        <div className="back">
          <img className="backImg" src="/assets/Background.png" alt="bg/img" />
          <div className="text">
            <span className="text-1">
              Complete miles of journey <br></br> with one step
            </span>
            <span className="text-2">Let's get started</span>
          </div>
        </div>
      </div>

      <div className="forms">
        <div className="form-content">
          <div className="login-form">
            <div className="title">Login</div>
            <form action="#">
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input type="text" placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="text">
                  <Link to="/">Forgot password?</Link>
                </div>
                <div className="button input-box">
                  <input type="submit" value="Sumbit" />
                </div>
                <div className="text sign-up-text">
                  Don't have an account? <label htmlFor="flip">Sigup now</label>
                </div>
              </div>
            </form>
          </div>
          <div className="signup-form">
            <div className="title">Signup</div>
            <form action="#">
              <div className="input-boxes">
                <div className="input-box">
                  <i className="fas fa-user"></i>
                  <input type="text" placeholder="Enter your name" required />
                </div>
                <div className="input-box">
                  <i className="fas fa-envelope"></i>
                  <input type="text" placeholder="Enter your email" required />
                </div>
                <div className="input-box">
                  <i className="fas fa-lock"></i>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <div className="button input-box">
                  <input type="submit" value="Sumbit" />
                </div>
                <div className="text sign-up-text">
                  Already have an account?
                  <label htmlFor="flip">Login now</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
