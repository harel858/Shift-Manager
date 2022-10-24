import NavigationBar from "../navbar/NavigationBar.js";
import classes from "./style/ClockLayout.module.css";
function ClockLayout(props) {
  /* const body = document.querySelector(`body`);
  body.className = classes.body; */
  return (
    <>
      <NavigationBar />
      <main className={classes.mainClock}>{props.children}</main>
    </>
  );
}
export default ClockLayout;
