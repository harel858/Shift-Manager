import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style/login.module.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import UserContext from "../context/userContext.js";

export default function Register() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");

  const { setLoginError, setUser, setCurrency, setPayment, setOvertime } =
    useContext(UserContext);
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();
    try {
      const res = await fetch(
        "https://shift-manager-production.up.railway.app/user/login",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userEmail,
            password: userPassword,
          }),
        }
      );

      if (res.ok) {
        const userData = await res.json();
        setUser(userData);
        setCurrency(userData.currency);
        setPayment(userData.payment);
        setOvertime(userData.overTime);
        setLoginError(null);
        navigate("/newShift", { replace: true });
      } else {
        //handle error
        const resError = await res.json();
        setError(resError);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className={classes.main}>
      <form className={classes.loginForm}>
        <h1>login user</h1>
        <TextField
          className={classes.inputContainer}
          id="email"
          label="Enter Email"
          variant="filled"
          required
          onChange={(e) => {
            setUserEmail(e.target.value);
          }}
        />
        <TextField
          className={classes.inputContainer}
          id="password"
          label="Enter Password"
          type="password"
          required
          variant="filled"
          onChange={(e) => {
            setUserPassword(e.target.value);
          }}
        />
        <div className={classes.loginBtnContainer}>
          <p className={classes.error}>{error}</p>
          <button type="button" className={classes.btn} onClick={loginHandler}>
            Click Here
          </button>
        </div>
      </form>

      <div className={classes.register}>
        <h5>Don't have an account yet?</h5>
        <Nav className={classes.navLink} as={Link} to="/register">
          Click here to register
        </Nav>
      </div>
    </div>
  );
}
