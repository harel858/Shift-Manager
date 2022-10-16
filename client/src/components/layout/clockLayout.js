import NavBar from "../navbar/navbar.js";
import classes from "./style/ClockLayout.module.css";
function ClockLayout(props) {
  return (
    <>
      <NavBar />
      <main className={classes.mainClock}>{props.children}</main>
    </>
  );
}
export default ClockLayout;
