const operations = require("../../mongoose/userOperations");
const validateUser = require("../../joi/userValidation");
const userModel = require("../../mongoose/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//registar Handler

async function registarHandler(req, res) {
  const { name, email, phone, password } = req.body;
  const user = await userModel.find({ email: email });

  if (user) {
    return res
      .status(400)
      .send(`It seems that user with this email is already registered`);
  }
  const { error } = validateUser({ name, email, phone, password });

  if (error) return res.status(400).send({ error: error.details[0].message });
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
    return res.status(500).json("somthing went wrong");
  }
}

//get all user Handler

async function getAllUsers(req, res) {
  try {
    const users = await operations.getUsers();
    console.log(users);
    return res.json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).send("something went wrong");
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
    return res.status(400).send(`email and password are required`);
  }
  const user = await operations.getUserByEmail(email);
  if (!user) {
    return res
      .status(400)
      .send(`we couldn't find an account matching the login info`);
  }
  let pass = await bcrypt.compare(password, user.password);

  if (!pass) {
    return res.status(400).send(`incorrect email or password`);
  }

  const token = jwt.sign({ userId: user._id }, "Harelha123");
  return res.json(token);
}

module.exports = {
  registarHandler,
  getAllUsers,
  updateUserHandler,
  deleteUserHandler,
  signIn,
};
