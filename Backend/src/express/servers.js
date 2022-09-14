const { json } = require("express");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(json());
app.use("/user", require("./routes/usersRoutes"));
app.use("/shifts", require("./routes/shiftRouters"));

app.listen(port, () => console.log(`server is running on port: ${port}`));
