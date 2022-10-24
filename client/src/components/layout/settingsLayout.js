import NavigationBar from "../navbar/NavigationBar.js";
import classes from "./style/settingsLayout.module.css";

export default function SettingsLayout(props) {
  return (
    <div className={classes.background}>
      <NavigationBar />
      <main className={classes.mainSettings}>{props.children}</main>
    </div>
  );
}
