const operations = require("../../mongoose/userOperations");
const validateUser = require("../../joi/userValidation");
const userModel = require("../../mongoose/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//register Handler

async function registerHandler(req, res) {
  const { name, email, phone } = req.body;
  const { password } = req;

  const user = await operations.getUserByEmail(email);
  console.log(user);
  console.log([name, email, phone, password]);

  if (user) {
    return res
      .status(400)
      .json(`It seems that user with this email is already registered`);
  }
  const { error } = validateUser({ name, email, phone, password });

  if (error) {
    const err = error.details[0].message;
    console.log({ err });
    return res.status(400).json(err);
  }
  if (!name || !email || !phone || !password) {
    return res.status(400).send(`there are some missing values`);
  }

  try {
    const newUser = await operations.addUser({
      name,
      email,
      phone,
      password,
      isManager: false,
    });
    return res.status(201).json(newUser);
  } catch (err) {
    console.log(err);
    return res.status(500).json("something went wrong");
  }
}

//get all user Handler

async function getUserDetails(req, res) {
  const { userId } = req;
  try {
    const user = await operations.getUserById(userId);
    return res.json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json("something went wrong");
  }
}

//update user Handler

async function updateUserHandler(req, res) {
  const { filter, option } = req.query;
  const { userId } = req;

  let user = await operations.getUserById(userId);
  if (user == null) {
    return res.status(500).send(`user not found`);
  }

  try {
    const [value] = user;
    console.log(value);
    const userObj = {
      name: value.name,
      email: value.email,
      password: value.password,
    };

    const keys = Object.keys(userObj);
    const pass = operations.updateValidation(keys, value, option, filter);

    if (pass != null) {
      return res.status(400).send(`${pass}`);
    }

    const updateSuccess = await operations.updateUserHandler(
      id,
      filter,
      option
    );

    if (updateSuccess.acknowledged == false || !option)
      return res.status(400).send("one or more details are not legal");
  } catch (err) {
    console.log(err);
    return res.status(500).send("something went wrong");
  }

  return res.status(201).send(`user ${filter} changed to ${option} `);
}

// delete User

async function deleteUserHandler(req, res) {
  const { id } = req;
  const result = await operations.deleteUser(id);
  console.log(result);
  if (!result) {
    return res.status(500).send(`something went wrong`);
  }
  return res.status(201).send(`user has been deleted`);
}

//login user

async function signIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ err: `email and password are required` });
  }
  const user = await operations.getUserByEmail(email);
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .json(`we couldn't find an account matching the login info`);
  }
  let pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    return res.status(400).json(`incorrect email or password`);
  }

  const token = jwt.sign({ userId: user._id }, "Harelha123");

  req.session = { token };

  res.status(200).json(user);
}

module.exports = {
  registerHandler,
  getUserDetails,
  updateUserHandler,
  deleteUserHandler,
  signIn,
};
