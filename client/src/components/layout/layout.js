import NavigationBar from "../navbar/NavigationBar.js";
import classes from "./style/layout.module.css";
function Layout(props) {
  return (
    <>
      <NavigationBar />
      <main className={classes.mainShifts}>{props.children}</main>
    </>
  );
}
export default Layout;
