const { json } = require("express");
const express = require("express");
const cors = require("cors");
const cookieSession = require("cookie-session");
const app = express();
const userRouter = require("./routes/usersRoutes");
const shiftRouter = require("./routes/shiftRouters");

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
app.use("/user", userRouter);
app.use("/shifts", shiftRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port: ${port}`));
