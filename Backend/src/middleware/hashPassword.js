const bcrypt = require("bcrypt");

async function hashPassword(req, res, next) {
  //hashed password
  const { password } = req.body;
  console.log(password);

  if (!password) {
    return res.status(400).json(`password is required`);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    req.password = hashedPassword;
  } catch (err) {
    console.log(err);

    return res.status(500).json(`hashing password goes wrong`);
  }
  next();
}

module.exports = hashPassword;
