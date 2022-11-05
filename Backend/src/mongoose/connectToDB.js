const mongoose = require("mongoose");
const dev_db_url =
  "mongodb://mongo:4DEBvGroVWzlh4LLz5T6@containers-us-west-109.railway.app:7880";

mongoose
  .connect(process.env.MONGODB_URI || dev_db_url)
  .then((x) => console.log("connect to DB successfuly"))
  .catch((e) => console.log(e));
