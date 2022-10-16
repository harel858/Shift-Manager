import NavBar from "../navbar/navbar.js";
import classes from "./style/layout.module.css";
function Layout(props) {
  return (
    <>
      <NavBar />
      <main className={classes.mainShifts}>{props.children}</main>
    </>
  );
}
export default Layout;
