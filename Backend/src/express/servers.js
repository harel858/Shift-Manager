const { json } = require("express");
const express = require("express");
const cors = require("cors");
/* const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session); */
const cookieSession = require("cookie-session");
const app = express();
const userRouter = require("./routers/usersRouters");
const shiftRouter = require("./routers/shiftRouters");
/* const store = new MongoDBSession({
  uri: process.env.MONGODB_URI,
  collection: "mySession",
});
 */
app.use(
  cors({
    credentials: true,
    origin: "https://kindly-mint-production.up.railway.app",
  })
);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);
/* 
app.use(
  session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: false,
    store: store,
  })
); */

app.use("/user", userRouter);
app.use("/shifts", shiftRouter);
app.get("/", (req, res) => {
  res.status(200).send("app is running");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port: ${port}`));
