import React from "react";

const LogIn = () => {
  return (
    <div className="login-box">
      <form>
        <div className="user-box">
          <input type="text" name="" required="" />
          <label>Username</label>
        </div>
        <div className="user-box">
          <input type="password" name="" required="" />
          <label>Password</label>
        </div>
        <center>
          <a href="#">
            SEND
            <span></span>
          </a>
        </center>
      </form>
    </div>
  );
};

export default LogIn;
