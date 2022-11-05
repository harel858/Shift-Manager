const mongoose = require("mongoose");
const dev_db_url = "mongodb://localhost/shiftManager";

mongoose
  .connect(process.env.MONGODB_URI || dev_db_url)
  .then((x) => console.log("connect to DB successfuly"))
  .catch((e) => console.log(e));
