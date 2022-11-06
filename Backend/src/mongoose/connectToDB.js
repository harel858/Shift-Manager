require("dotenv").config(NODE_ENV);

const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI);
console.log(process.env.NODE_ENV);
console.log(process.env.NODE_ENV.MONGODB_URI);
console.log(process.env.NODE_ENV.MONGODB_URI);
mongoose
  .connect(process.env.MONGODB_URI || process.env.NODE_ENV.MONGODB_URI)
  .then((x) => console.log("connect to DB successfully"))
  .catch((e) => console.log(e));
