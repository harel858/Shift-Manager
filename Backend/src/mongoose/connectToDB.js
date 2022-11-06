const mongoose = require("mongoose");
const MONGODB_URI =
  "mongodb://mongo:4DEBvGroVWzlh4LLz5T6@containers-us-west-109.railway.app:7880/shiftManager";
mongoose
  .connect(process.env.MONGODB_URI || MONGODB_URI)
  .then((x) => console.log("connect to DB successfuly"))
  .catch((e) => console.log(e));
