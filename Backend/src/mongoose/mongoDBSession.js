const session = require("express-session");
const MongoDBSession = require("connect-mongodb-session")(session);

const currentShift = new MongoDBSession({
  uri: process.env.MONGODB_URI,
  collection: "mySession",
});

module.exports = currentShift;
