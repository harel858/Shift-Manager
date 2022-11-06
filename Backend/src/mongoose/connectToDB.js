const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || MONGODB_URI)
  .then((x) => console.log("connect to DB successfuly"))
  .catch((e) => console.log(e));
