import classes from "./style/settings.module.css";
import { BsCurrencyExchange, BsFillClockFill } from "react-icons/bs";
import { MdPayments, MdCancel } from "react-icons/md";
import { useState, useContext } from "react";
import ShiftContext from "../context/shiftContext.js";
import { TextField } from "@mui/material";
import { Sling as Hamburger } from "hamburger-react";

function Settings() {
  const shiftCtx = useContext(ShiftContext);
  const payment = shiftCtx.payment;
  const setPayment = shiftCtx.setPayment;
  const currency = shiftCtx.currency;
  const overTime = shiftCtx.overTime;
  const [card3Open, setCard3Open] = useState(false);
  const [isOpen, setOpen] = useState(true);

  const card3Handler = () => {
    setCard3Open((prev) => !prev);
  };
  return (
    <>
      <div className={classes.btnContainer}>
        <div className={classes.card1}>
          <div className={classes.innerContainer}>
            <h2 className={classes.card_h2}>Overtime</h2>
            <BsFillClockFill className={classes.cardIcon} />
          </div>
          <h3>{overTime ? "calculated" : "Not Calculated"}</h3>
        </div>
        <div className={classes.card2}>
          <div className={classes.innerContainer}>
            <h2 className={classes.card_h2}>Currency</h2>
            <BsCurrencyExchange className={classes.cardIcon} />
          </div>
          <h3>{currency}</h3>
        </div>

        {!card3Open ? (
          <div onClick={card3Handler} className={classes.card3}>
            <div className={classes.innerContainer}>
              <h2 className={classes.card_h2}>Payment</h2>
              <MdPayments className={classes.cardIcon} />
            </div>
            <h3>{payment}</h3>
          </div>
        ) : (
          <div className={classes.card3Open}>
            <button className={classes.closingBtn}>
              <MdCancel onClick={card3Handler} />
            </button>
            <div className={classes.innerContainer}>
              <h2 className={classes.card_h2}>Payment</h2>
              <MdPayments className={classes.cardOpenIcon} />
              <TextField
                id="name"
                label={`${payment} Per Hour`}
                required
                variant="filled"
                onChange={(e) => {
                  setPayment(e.target.value);
                }}
                className={classes.editInputContainer}
              />
            </div>
            <button className={classes.btn}>Save Changes</button>
          </div>
        )}
      </div>
    </>
  );
}
export default Settings;
