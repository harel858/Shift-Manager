import classes from "./formLayout.module.css";
const body = document.querySelector(`body`);
body.className = classes.body;
export default function FormLayOut(props) {
  return <>{props.children}</>;
}
