import NavBar from "../navbar/navbar.js";
import classes from "./ClockLayout.module.css";
function ClockLayout(props) {
  console.log(props);
  return (
    <>
      <NavBar />
      <main className={classes.mainClock}>{props.children}</main>
    </>
  );
}
export default ClockLayout;
