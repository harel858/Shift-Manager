import NavBar from "../navbar/navbar";
import classes from "./style/settingsLayout.module.css";

export default function SettingsLayout(props) {
  return (
    <div className={classes.background}>
      <NavBar />
      <main className={classes.mainSettings}>
        <h1>Edit Settings</h1>
        {props.children}
      </main>
    </div>
  );
}
