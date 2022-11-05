import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./style/register.module.css";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import { TextField, Select, InputLabel } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import UserContext from "../context/userContext.js";

export default function Register() {
  const [userName, setUserName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [workPlace, setWorkPlace] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const {
    currency,
    setCurrency,
    payment,
    setPayment,
    setLoginError,
    setUser,
    currencies,
    overTime,
    setOvertime,
  } = useContext(UserContext);

  async function registerHandler(e) {
    e.preventDefault();
    if (userPassword !== confirmPassword)
      return setError("The entered passwords doesn't match");

    try {
      const res = await fetch(
        "https://shift-manager-production.up.railway.app/user/register",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workPlace,
            name: userName,
            lastName: userLastName,
            email: userEmail,
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
        setUser({ ...user });
        navigate("/newShift", { replace: true });
      } else {
        const response = await res.json();
        throw Error(response);
      }
    } catch (err) {
      throw Error({ message: err });
    }
  }

  const handleChange = (event) => {
    const newCurrency = event.target.value;

    setCurrency(newCurrency);
  };

  function savePaymentHandler(e) {
    const value = e.target.value;

    if (isNaN(+value) || +value <= 0) {
      return setError("Payment must be a valid number");
    }
    if (!isNaN(+value)) {
      setError("");
      setPayment(+value);
    }
  }
  function handleOverTime(e) {
    if (e.target.value === "Calculated") {
      return setOvertime(true);
    }
    if (e.target.value === "Not Calculated") {
      return setOvertime(false);
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
          id="workPlace"
          label="Enter your work place name"
          required
          variant="filled"
          onChange={(e) => {
            setWorkPlace(e.target.value);
          }}
          className={classes.inputContainer}
        />
        <TextField
          id="payment"
          label={`${payment}${currency.label} Per Hour`}
          required
          variant="filled"
          onChange={savePaymentHandler}
          className={classes.inputContainer}
        />

        <div className={classes.selectInputContainer}>
          <InputLabel id="demo-simple-select-label">
            OverTime Calculate
          </InputLabel>
          <Select
            className={classes.selectInput}
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={overTime ? "Calculated" : "Not Calculated"}
            label="overTime Calculate"
            onChange={handleOverTime}
          >
            <MenuItem value={"Calculated"}>Calculated</MenuItem>
            <MenuItem value={"Not Calculated"}>Not Calculated</MenuItem>
          </Select>
        </div>
        <div className={classes.selectInputContainer}>
          <InputLabel id="outlined-select-currency">Select Currency</InputLabel>
          <TextField
            className={classes.inputContainer}
            id="outlined-select-currency"
            select
            value={currency}
            onChange={handleChange}
            helperText="Please select your currency"
          >
            {currencies.map((option) => (
              <MenuItem key={option.value} value={option}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </div>

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
          Click Here
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
