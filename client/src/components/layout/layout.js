import NavBar from "../navbar/navbar.js";
import classes from "./layout.module.css";
function Layout(props) {
  console.log(props);
  return (
    <>
      <NavBar />
      <main className={classes.main}>{props.children}</main>
    </>
  );
}
export default Layout;
