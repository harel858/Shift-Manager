import { useContext } from "react";
import { Link } from "react-router-dom";
import ShiftContext from "../../context/shiftContext.js";
import UserContext from "../../context/userContext.js";
import NavigationBar from "../navbar/NavigationBar.js";
import LinearColor from "../ui/loading.js";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import classes from "./style/layout.module.css";
function Layout(props) {
  const { loading } = useContext(ShiftContext);
  const { user, loginError } = useContext(UserContext);

  if (loading) return <LinearColor />;

  if (!user) {
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
    <>
      <NavigationBar />
      <main className={classes.mainShifts}>{props.children}</main>
    </>
  );
}
export default Layout;
