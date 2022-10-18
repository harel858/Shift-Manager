import NavBar from "../navbar/navbar";
import classes from "./style/settingsLayout.module.css";

export default function SettingsLayout(props) {
  return (
    <div className={classes.background}>
      <NavBar />
      <main className={classes.mainSettings}>{props.children}</main>
    </div>
  );
}
