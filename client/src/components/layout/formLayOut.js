import classes from "./style/formLayout.module.css";

const body = document.querySelector(`body`);
body.className = classes.body;
export default function FormLayOut(props) {
  return <main className={classes.registerMain}>{props.children}</main>;
}
