require("dotenv").config();

const mongoose = require("mongoose");
console.log(process.env.MONGODB_URI);
console.log(process.env.NODE_ENV);
console.log("process.env");

mongoose
  .connect(process.env.MONGODB_URI || process.env.NODE_ENV.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((x) => console.log("connect to DB successfully"))
  .catch((e) => console.log(e));
