import classes from "./style/CurrencyCard.module.css";
import { BsCurrencyExchange } from "react-icons/bs";
import MenuItem from "@mui/material/MenuItem";
import { TextField } from "@mui/material";
import Zoom from "@mui/material/Zoom";

export default function CurrencyCard({
  cardRef,
  card1Ref,
  card3Ref,
  setCard1Open,
  card2Open,
  setCard2Open,
  setCard3Open,
  currency,
  updateCurrency,
  currencies,
  checked,
}) {
  const card2Handler = (e) => {
    setCard1Open(false);
    setCard3Open(false);
    card1Ref.current.style.pointerEvents = "none";
    card3Ref.current.style.pointerEvents = "none";
    if (card2Open) {
      card1Ref.current.style.pointerEvents = "auto";
      card3Ref.current.style.pointerEvents = "auto";
    }

    return setCard2Open((prev) => !prev);
  };
  const handleChange = (event) => {
    const newCurrency = event.target.value;
    return updateCurrency(newCurrency);
  };

  return (
    <Zoom in={checked} style={{ transitionDelay: checked ? "200ms" : "0ms" }}>
      {!card2Open ? (
        <div ref={cardRef} onClick={card2Handler} className={classes.card2}>
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
    </Zoom>
  );
}
