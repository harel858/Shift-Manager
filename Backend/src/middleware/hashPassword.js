const bcrypt = require("bcrypt");

async function hashPassword(req, res, next) {
  //hashed password
  const { password } = req.body;

  if (!password) {
    return res.status(400).send(`password is required`);
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10, (err) => {
      if (err) {
        return res.status(500).send(err);
      }
    });
    req.body.password = hashedPassword;
  } catch (err) {
    console.log(err);

    return res.status(500).send(`hashing password goes wrong`);
  }
  next();
}

module.exports = hashPassword;
