import classes from "./style/settingsLayout.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import NavigationBar from "../navbar/NavigationBar.js";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import UserContext from "../../context/userContext";
import LinearColor from "../ui/loading";

export default function SettingsLayout(props) {
  const { user, loginError, loading } = useContext(UserContext);
  if (loading) return <LinearColor />;
  if (!user && loginError) {
    return (
      <Alert className={classes.noShiftAlert} severity="error">
        <AlertTitle>ERROR</AlertTitle>
        <strong>{loginError}</strong>
        <br />
        <Link className={classes.navLink} as={Link} to="/">
          Click Here to Log In
        </Link>
        <br />
        <strong>Not registered yet?</strong>
        <br />
        <Link className={classes.navLink} as={Link} to="/register">
          Register Now
        </Link>
      </Alert>
    );
  }

  return (
    <div className={classes.background}>
      <NavigationBar />
      <main className={classes.mainSettings}>{props.children}</main>
    </div>
  );
}
