import Card from "../ui/card.js";
import classes from "./shiftsCss/shiftItem.module.css";
import { useState } from "react";

export default function ShiftItem({ shift, index }) {
  const [editor, setEditor] = useState(false);

  return (
    <>
      <Card
        key={shift._id}
        shift={shift}
        editor={editor}
        setEditor={setEditor}
        index={index}
      >
        <li className={classes.data}>
          <p> start: </p>
          {editor ? (
            <input
              type="datetime-local"
              className={classes.editorInput}
              placeholder={`${shift.start}`}
            ></input>
          ) : (
            <p> {shift.start} </p>
          )}
        </li>
        <li className={classes.data}>
          <p> end: </p>
          {editor ? (
            <input
              type="datetime-local"
              placeholder={`${shift.end}`}
              className={classes.editorInput}
            ></input>
          ) : (
            <p> {shift.end} </p>
          )}
        </li>
        <li className={classes.data}>
          <p> Amount of time: </p>
          <p> {shift.timeSpend} </p>
        </li>
        <li className={classes.data}>
          <p> Total profit: </p>
          <p> {shift.totalProfit} </p>
        </li>
      </Card>
    </>
  );
}
