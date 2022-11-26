import classes from "./style/settings.module.css";
import { useState, useContext, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import OvertimeCard from "../components/ui/OvertimeCard.js";
import CurrencyCard from "../components/ui/CurrencyCard.js";
import PaymentCard from "../components/ui/PaymentCard.js";
import UserContext from "../context/userContext.js";

function Settings() {
  const {
    payment,
    currencies,
    updatePayment,
    currency,
    updateCurrency,
    overTime,
    updateOvertime,
    loginError,
  } = useContext(UserContext);
  const [checked, setChecked] = useState(false);
  const [card1Open, setCard1Open] = useState(false);
  const [card2Open, setCard2Open] = useState(false);
  const [card3Open, setCard3Open] = useState(false);
  const card1Ref = useRef();
  const card2Ref = useRef();
  const card3Ref = useRef();

  useEffect(() => {
    setTimeout(() => {
      setChecked(true);
    }, 50);
  }, []);

  if (loginError) {
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

  return (
    <>
      <header className={classes.headerSettings}>
        <h1>Edit Your Settings</h1>
      </header>
      <div className={classes.btnContainer}>
        <PaymentCard
          checked={checked}
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

        <CurrencyCard
          checked={checked}
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
        <OvertimeCard
          checked={checked}
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
      </div>
    </>
  );
}
export default Settings;
