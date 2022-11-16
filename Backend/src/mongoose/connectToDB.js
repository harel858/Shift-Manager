const mongoose = require("mongoose");
console.log(`${process.env.MONGODB_URI}`);
mongoose
  .connect(`${process.env.MONGODB_URI}`)
  .then((x) => console.log("connect to DB successfully"))
  .catch((e) => console.log(e));
