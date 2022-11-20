import classes from "./style/PaymentCard.module.css";
import Zoom from "@mui/material/Zoom";
import { useState } from "react";
import { MdPayments } from "react-icons/md";
import { TextField } from "@mui/material";
export default function PaymentCard({
  card3Open,
  setCard1Open,
  setCard2Open,
  setCard3Open,
  cardRef,
  card1Ref,
  card2Ref,
  payment,
  currency,
  updatePayment,
  checked,
}) {
  const [error, setError] = useState("");

  const card3Handler = () => {
    setCard1Open(false);
    setCard2Open(false);

    card2Ref.current.style.pointerEvents = "none";
    card1Ref.current.style.pointerEvents = "none";

    if (card3Open) {
      card1Ref.current.style.pointerEvents = "auto";
      card2Ref.current.style.pointerEvents = "auto";
    }

    setCard3Open((prev) => !prev);
    setError("");
  };

  function savePaymentHandler(e) {
    const value = e.target.value;

    if (isNaN(+value) || value <= 0)
      return setError("Payment must be a valid number");

    if (!isNaN(+value)) setError("");

    return updatePayment(value);
  }

  return (
    <Zoom in={checked} style={{ transitionDelay: checked ? "400ms" : "0ms" }}>
      {!card3Open ? (
        <div ref={cardRef} onClick={card3Handler} className={classes.card3}>
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
    </Zoom>
  );
}
