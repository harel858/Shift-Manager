import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style/register.module.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  async function registerHandler(e) {
    e.preventDefault();
    if (userPassword !== confirmPassword)
      return setError("The entered passwords doesn't match");

    try {
      const res = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          phone: userPhone,
          password: userPassword,
        }),
      });
      if (res.ok) {
        navigate("/newShift", { replace: true });
      } else {
        const response = await res.json();
        setError(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
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
        <button type="button" className={classes.btn} onClick={registerHandler}>
          Click Here
        </button>
        <p className={classes.error}> {error}</p>
        <div className={classes.login}>
          <h5>Already have an account?</h5>
          <Nav className={classes.navLink} as={Link} to="/">
            Click Here to Log In
          </Nav>
        </div>
      </div>
    </>
  );
}
