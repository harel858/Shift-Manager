import { useContext } from "react";
import UserContext from "../../context/userContext.js";
import LinearColor from "../ui/loading.js";
import NavigationBar from "../navbar/NavigationBar.js";
import Alerts from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import { Link } from "react-router-dom";
import classes from "./style/ClockLayout.module.css";
function ClockLayout(props) {
  const { loading, user, loginError } = useContext(UserContext);

  if (loading) return <LinearColor />;

  if (!user) {
    return (
      <Alerts className={classes.noShiftAlert} severity="error">
        <AlertTitle>ERROR</AlertTitle>
        <strong>{loginError}</strong>
        <Link className={classes.navLink} as={Link} to="/">
          Click Here to Log In
        </Link>
        <h3>Not registered yet?</h3>
        <Link className={classes.navLink} as={Link} to="/register">
          Register Now
        </Link>
      </Alerts>
    );
  }

  return (
    <>
      <NavigationBar />
      <main className={classes.mainClock}>{props.children}</main>
    </>
  );
}
export default ClockLayout;
