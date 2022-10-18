import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style/login.module.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { TextField } from "@mui/material";
import ShiftContext from "../context/shiftContext";

export default function Register() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
  const { setLoginError } = useContext(ShiftContext);
  const navigate = useNavigate();

  async function loginHandler(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: userEmail,
          password: userPassword,
        }),
      });

      if (response.ok) {
        setLoginError(null);
        navigate("/newShift", { replace: true });
      } else {
        const res = await response.json();
        console.log(error);
        setError(res);
      }
    } catch ({ err }) {
      console.error(err);
      //handle error
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

        <button type="button" className={classes.btn} onClick={loginHandler}>
          Click Here
        </button>
      </form>
      <p className={classes.error}>{error}</p>
      <div className={classes.register}>
        <h5>Don't have an account yet?</h5>
        <Nav className={classes.navLink} as={Link} to="/register">
          Click here to register
        </Nav>
      </div>
    </div>
  );
}
