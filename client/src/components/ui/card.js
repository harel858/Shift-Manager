import classes from "./card.module.css";
export default function Card(props) {
  return <ul className={classes.shiftItem}>{props.children}</ul>;
}
