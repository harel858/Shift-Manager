import classes from "./shiftsCss/listContainer.module.css";
import CssBaseline from "@mui/material/CssBaseline";
import { Stack } from "@mui/material";
import Container from "@mui/material/Container";
import ShiftItem from "./ShiftItem.js";

export default function ShiftList2(props) {
  console.log("ShiftList2");
  return (
    <>
      <CssBaseline />
      <Container maxWidth="xl" className={classes.listContainer}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="stretch"
          spacing={3}
        >
          {props.shiftList.map((shift, i) => (
            <ShiftItem index={i} key={i} shift={shift} />
          ))}
        </Stack>
      </Container>
    </>
  );
}
