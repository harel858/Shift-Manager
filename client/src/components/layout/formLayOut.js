import classes from "./style/formLayout.module.css";
import NavBar from "../navbar/navbar";
const body = document.querySelector(`body`);
body.className = classes.body;
export default function FormLayOut(props) {
  return (
    <>
      <NavBar />
      {props.children}
    </>
  );
}
