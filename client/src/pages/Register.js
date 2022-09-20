import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./pagesCss/register.module.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function Register({ setUser }) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const history = useNavigate();

  async function registerHandler(e) {
    e.preventDefault();
    if (userPassword !== repeatPassword)
      return setError("The entered passwords don't match");

    try {
      const res = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          phone: userPhone,
          password: userPassword,
        }),
      });
      const user = await res.json();
      if (res.ok) {
        setUser(user);
        history("/login", { replace: true });
      } else {
        throw user;
      }
    } catch (err) {
      setError({ err });
    }
  }

  return (
    <>
      <div className={classes.main}>
        <form>
          <h1>register user</h1>
          <div className={classes.inputContainer}>
            <label>Enter Name: </label>
            <input
              placeholder="Enter Name"
              type="text"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.inputContainer}>
            <label>Enter Email: </label>
            <input
              placeholder="Enter Email"
              type="text"
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.inputContainer}>
            <label>Enter phone: </label>
            <input
              placeholder="Enter Phone"
              type="text"
              onChange={(e) => {
                setUserPhone(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.inputContainer}>
            <label>Enter password: </label>
            <input
              placeholder="Enter Password"
              type="password"
              onChange={(e) => {
                setUserPassword(e.target.value);
              }}
            ></input>
          </div>
          <div className={classes.inputContainer}>
            <label>Repeat Password: </label>
            <input
              placeholder="Repeat Password"
              type="password"
              onChange={(e) => {
                setRepeatPassword(e.target.value);
              }}
            ></input>
          </div>
          <button
            type="button"
            className={classes.btn}
            onClick={registerHandler}
          >
            Click Here
          </button>
        </form>
        <p className={classes.error}>{error.err ? error.err : error}</p>
        <div className={classes.login}>
          <h5>Already have an account?</h5>
          <Nav className={classes.navLink} as={Link} to="/login">
            Click Here to Log In
          </Nav>
        </div>
      </div>
    </>
  );
}
