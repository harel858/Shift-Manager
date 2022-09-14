const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/shiftManager")
  .then((x) => console.log("connect to DB successfuly"))
  .catch((e) => console.log(e));
