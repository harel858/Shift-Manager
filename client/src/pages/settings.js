import classes from "./style/settings.module.css";

import { useState, useContext, useRef } from "react";
import ShiftContext from "../context/shiftContext.js";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import OvertimeCard from "../components/ui/OvertimeCard.js";
import CurrencyCard from "../components/ui/CurrencyCard.js";
import PaymentCard from "../components/ui/PaymentCard.js";

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
  const card1Ref = useRef();
  const card2Ref = useRef();
  const card3Ref = useRef();

  console.log(user);

  if (loginError) {
    console.log(loginError);
    return (
      <div className={classes.errorContainer}>
        <header className={classes.header}>
          <h2>{loginError}</h2>
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
  console.log(currency);
  return (
    <>
      <header className={classes.headerSettings}>
        <h1>Edit Settings</h1>
      </header>
      <div className={classes.btnContainer}>
        <OvertimeCard
          overTime={overTime}
          cardRef={card1Ref}
          card2Ref={card2Ref}
          card3Ref={card3Ref}
          card1Open={card1Open}
          setCard1Open={setCard1Open}
          setCard2Open={setCard2Open}
          setCard3Open={setCard3Open}
          updateOvertime={updateOvertime}
        />

        <CurrencyCard
          cardRef={card2Ref}
          card1Ref={card1Ref}
          card3Ref={card3Ref}
          setCard1Open={setCard1Open}
          setCard2Open={setCard2Open}
          setCard3Open={setCard3Open}
          card2Open={card2Open}
          currency={currency}
          updateCurrency={updateCurrency}
          currencies={currencies}
        />

        <PaymentCard
          cardRef={card3Ref}
          card1Ref={card1Ref}
          card2Ref={card2Ref}
          setCard1Open={setCard1Open}
          setCard2Open={setCard2Open}
          setCard3Open={setCard3Open}
          card3Open={card3Open}
          payment={payment}
          currency={currency}
          updatePayment={updatePayment}
        />
      </div>
    </>
  );
}
export default Settings;
