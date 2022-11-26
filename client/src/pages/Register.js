import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style/register.module.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import UserContext from "../context/userContext.js";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currency, payment, setLoginError, setUser, overTime } =
    useContext(UserContext);

  async function registerHandler(e) {
    e.preventDefault();
    if (userPassword !== confirmPassword)
      return setError("The entered passwords doesn't match");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_KEY}/user/register`,
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: userName,
            lastName: userLastName,
            email: userEmail.toLocaleLowerCase(),
            phone: userPhone,
            currency: currency,
            overTime: overTime,
            payment: payment,
            password: userPassword,
          }),
        }
      );

      if (res.ok) {
        const user = await res.json();
        setError(null);
        setLoginError(null);
        console.log(user);
        setUser({ ...user });
        navigate("/settings", { replace: true });
      } else {
        const response = await res.json();
        console.log(response);
        setError(response);
      }
    } catch (err) {
      throw err;
    }
  }

  return (
    <div className={classes.main}>
      <h1>Register user</h1>
      <form className={classes.form}>
        <TextField
          id="name"
          label="Enter Name"
          required
          variant="filled"
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          className={classes.inputContainer}
        />
        <TextField
          id="lastName"
          label="Enter Last Name"
          required
          variant="filled"
          onChange={(e) => {
            setUserLastName(e.target.value);
          }}
          className={classes.inputContainer}
        />

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
          id="phone"
          label="Enter Phone"
          variant="filled"
          required
          onChange={(e) => {
            setUserPhone(e.target.value);
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

        <TextField
          className={classes.inputContainer}
          id="Confrim-password"
          type="password"
          label="Confirm password"
          variant="filled"
          required
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
        />
      </form>
      <div className={classes.registerBtnContainer}>
        <p className={classes.error}>{error}</p>
        <button type="button" className={classes.btn} onClick={registerHandler}>
          Register Now
        </button>
      </div>
      <div className={classes.login}>
        <h5>Already have an account?</h5>
        <Nav className={classes.navLink} as={Link} to="/">
          Click Here to Log In
        </Nav>
      </div>
    </div>
  );
}
