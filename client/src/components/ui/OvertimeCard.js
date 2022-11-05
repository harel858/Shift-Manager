import classes from "./style/OvertimeCard.module.css";
import Switch from "@mui/material/Switch";
import { BsFillClockFill } from "react-icons/bs";

export default function OvertimeCard({
  overTime,
  cardRef,
  card1Open,
  setCard1Open,
  setCard2Open,
  setCard3Open,
  card2Ref,
  card3Ref,
  updateOvertime,
}) {
  const card1Handler = () => {
    setCard2Open(false);
    setCard3Open(false);
    card2Ref.current.style.pointerEvents = "none";
    card3Ref.current.style.pointerEvents = "none";
    if (card1Open) {
      card2Ref.current.style.pointerEvents = "auto";
      card3Ref.current.style.pointerEvents = "auto";
    }
    return setCard1Open((prev) => !prev);
  };
  const handelOvertime = () => updateOvertime(!overTime);

  return (
    <>
      {!card1Open ? (
        <div ref={cardRef} onClick={card1Handler} className={classes.card1}>
          <div className={classes.innerContainer}>
            <h2 className={classes.card_h2}>Overtime</h2>
            <BsFillClockFill className={classes.cardIcon} />
          </div>
          <h3>{overTime ? "Calculated" : "Not Calculated"}</h3>
        </div>
      ) : (
        <div className={classes.card1Open}>
          <div className={classes.innerContainer}>
            <h2 className={classes.card_h2}>Overtime</h2>
            <BsFillClockFill className={classes.cardOpenIcon} />
            <Switch
              checked={overTime}
              onChange={handelOvertime}
              inputProps={{ "aria-label": "controlled" }}
            />
          </div>
          <h3>{overTime ? "Calculated" : "Not Calculated"}</h3>
          <button onClick={card1Handler} className={classes.btn}>
            Save Changes
          </button>
        </div>
      )}
    </>
  );
}
