import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./pagesCss/login.module.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

export default function Register() {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [error, setError] = useState("");
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
        navigate("/newShift", { replace: true });
      } else {
        const res = await response.json();
        throw res;
      }
    } catch ({ err }) {
      console.error(err);
      //handle error
      setError(err);
    }
  }

  return (
    <div className={classes.main}>
      <form className={classes.form}>
        <h1>login user</h1>
        <div className={classes.inputContainer}>
          <label htmlFor="mail">Enter mail: </label>
          <input
            value={userEmail}
            type="text"
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          ></input>
        </div>
        <div className={classes.inputContainer}>
          <label htmlFor="password">Enter password: </label>
          <input
            value={userPassword}
            type="password"
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          ></input>
        </div>
        <button type="button" className={classes.btn} onClick={loginHandler}>
          Click Here
        </button>
      </form>
      <p className={classes.error}>{error}</p>
      <div className={classes.register}>
        <h5>Don't have an account yet?</h5>
        <Nav className={classes.navLink} as={Link} to="/">
          Click here to register
        </Nav>
      </div>
    </div>
  );
}
