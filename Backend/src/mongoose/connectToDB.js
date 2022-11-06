const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI);
console.log(process.NODE_ENV.MONGODB_URI);
console.log(process.env.NODE_ENV);
mongoose
  .connect(process.env.MONGODB_URI || process.env.NODE_ENV)
  .then((x) => console.log("connect to DB successfuly"))
  .catch((e) => console.log(e));
