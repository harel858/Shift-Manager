const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI);
console.log(process.env.NODE_ENV);
console.log("process.env");

mongoose
  .connect(process.env.NODE_ENV.MONGODB_URI)
  .then((x) => console.log("connect to DB successfully"))
  .catch((e) => console.log(e));
