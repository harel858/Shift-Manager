const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI || process.RAILWAY_ENVIRONMENT.MONGODB_URI)
  .then((x) => console.log("connect to DB successfuly"))
  .catch((e) => console.log(e));
