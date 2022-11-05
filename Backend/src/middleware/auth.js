const jwt = require("jsonwebtoken");

async function authenticateUser(req, res, next) {
  const { token } = req.session;

  if (!token) {
    return res.status(400).json(`you must log in to continue`);
  }
  try {
    const data = jwt.verify(token, "Harelha123");
    req.userId = data.userId;

    next();
  } catch {
    return res.status(401).json({ message: "token is illegal" });
  }
}
module.exports = authenticateUser;
