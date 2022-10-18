import classes from "./style/settings.module.css";
import { BsCurrencyExchange, BsFillClockFill } from "react-icons/bs";
import { MdPayments } from "react-icons/md";
import { useState, useContext, useRef } from "react";
import ShiftContext from "../context/shiftContext.js";
import { TextField } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import Hamburger from "hamburger-react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";

const label = { inputProps: { "aria-label": "Switch demo" } };

function Settings() {
  const shiftCtx = useContext(ShiftContext);
  const {
    payment,
    currencies,
    updatePayment,
    currency,
    updateCurrency,
    overTime,
    updateOvertime,
    loginError,
    user,
  } = shiftCtx;

  const [card1Open, setCard1Open] = useState(false);
  const [card2Open, setCard2Open] = useState(false);
  const [card3Open, setCard3Open] = useState(false);
  const [isOpen] = useState(true);
  const card1 = useRef();
  const card2 = useRef();
  const card3 = useRef();
  const [error, setError] = useState("");
  console.log(user);
  function savePaymentHandler(e) {
    const value = e.target.value;
    console.log(!isNaN(+value));
    if (isNaN(+value)) {
      return setError("Payment must be a valid number");
    }
    if (!isNaN(+value)) {
      setError("");
      return updatePayment(value);
    }
  }
  const card1Handler = () => {
    setCard2Open(false);
    setCard3Open(false);
    card2.current.style.pointerEvents = "none";
    card3.current.style.pointerEvents = "none";
    if (card1Open) {
      card2.current.style.pointerEvents = "auto";
      card3.current.style.pointerEvents = "auto";
    }
    return setCard1Open((prev) => !prev);
  };
  const card2Handler = (e) => {
    setCard1Open(false);
    setCard3Open(false);
    card1.current.style.pointerEvents = "none";
    card3.current.style.pointerEvents = "none";
    if (card2Open) {
      card1.current.style.pointerEvents = "auto";
      card3.current.style.pointerEvents = "auto";
    }
    setCard2Open((prev) => !prev);
  };

  const card3Handler = () => {
    setCard1Open(false);
    setCard2Open(false);
    card2.current.style.pointerEvents = "none";
    card1.current.style.pointerEvents = "none";
    if (card3Open) {
      card1.current.style.pointerEvents = "auto";
      card2.current.style.pointerEvents = "auto";
    }
    setCard3Open((prev) => !prev);
    setError("");
  };

  const handleChange = (event) => {
    const newCurrency = event.target.value;
    updateCurrency(newCurrency);
  };
  const handelOvertime = () => {
    return updateOvertime(!overTime);
  };

  if (loginError) {
    console.log(loginError);
    return (
      <div className={classes.errorContainer}>
        <header className={classes.header}>
          <h1>{loginError}</h1>
        </header>
        <Nav className={classes.navLink} as={Link} to="/">
          Click Here to Log In
        </Nav>
        <h3>Not registered yet?</h3>
        <Nav className={classes.navLink} as={Link} to="/register">
          Register Now
        </Nav>
      </div>
    );
  }

  return (
    <>
      <h1 className={classes.h1Settings}>Edit Settings</h1>
      <div className={classes.btnContainer}>
        {!card1Open ? (
          <div ref={card1} onClick={card1Handler} className={classes.card1}>
            <div className={classes.innerContainer}>
              <h2 className={classes.card_h2}>Overtime</h2>
              <BsFillClockFill className={classes.cardIcon} />
            </div>
            <h3>{overTime ? "Calculated" : "Not Calculated"}</h3>
          </div>
        ) : (
          <div className={classes.card1Open}>
            <button onClick={card1Handler} className={classes.exitButton}>
              <Hamburger toggled={isOpen} />
            </button>

            <div className={classes.innerContainer}>
              <h2 className={classes.card_h2}>Overtime</h2>
              <BsFillClockFill className={classes.cardOpenIcon} />
              <Switch onChange={handelOvertime} {...label} />
            </div>
            <h3>{overTime ? "Calculated" : "Not Calculated"}</h3>
          </div>
        )}
        {!card2Open ? (
          <div ref={card2} onClick={card2Handler} className={classes.card2}>
            <div className={classes.innerContainer}>
              <h2 className={classes.card_h2}>Currency</h2>
              <BsCurrencyExchange className={classes.cardIcon} />
            </div>
            <h3>
              {currency.value}
              <span className={classes.currencyLabel}>{currency.label}</span>
            </h3>
          </div>
        ) : (
          <div onClick={card2Handler} className={classes.card2Open}>
            <div className={classes.innerContainer}>
              <h2 className={classes.card_h2}>Currency</h2>
              <BsCurrencyExchange className={classes.cardOpenIcon} />
              <TextField
                className={classes.currencyInput}
                id="outlined-select-currency"
                select
                label="Select"
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
            <h3>
              {currency.value}
              <span className={classes.currencyLabel}>{currency.label}</span>
            </h3>
          </div>
        )}

        {!card3Open ? (
          <div ref={card3} onClick={card3Handler} className={classes.card3}>
            <div className={classes.innerContainer}>
              <h2 className={classes.card_h2}>Payment</h2>
              <MdPayments className={classes.cardIcon} />
            </div>
            <h3>
              {payment}
              <span className={classes.currencyLabel}>{currency.label}</span>
            </h3>
          </div>
        ) : (
          <div className={classes.card3Open}>
            <div className={classes.innerContainer}>
              <h2 className={classes.card_h2}>Payment</h2>
              <MdPayments className={classes.cardOpenIcon} />
              <TextField
                id="payment"
                label={`${payment}${currency.label} Per Hour`}
                required
                variant="filled"
                onChange={savePaymentHandler}
                className={classes.editInputContainer}
              />
            </div>
            <button onClick={card3Handler} className={classes.btn}>
              Save Changes
            </button>
            <p className={classes.cardError}>{error}</p>
          </div>
        )}
      </div>
    </>
  );
}
export default Settings;
