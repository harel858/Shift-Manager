import { useContext } from "react";
import UserContext from "../../context/userContext.js";
import LinearColor from "../ui/loading.js";
import NavigationBar from "../navbar/NavigationBar.js";
import classes from "./style/ClockLayout.module.css";
function ClockLayout(props) {
  const { loading } = useContext(UserContext);

  if (loading) return <LinearColor />;
  return (
    <>
      <NavigationBar />
      <main className={classes.mainClock}>{props.children}</main>
    </>
  );
}
export default ClockLayout;
