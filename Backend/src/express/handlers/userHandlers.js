const operations = require("../../mongoose/userOperations");
const validateUser = require("../../joi/userValidation");
const userModel = require("../../mongoose/userModel.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//update User Payment
async function updateUserPayment(req, res) {
  const { payment } = req.body;
  const { userId } = req;
  if (isNaN(+payment))
    return res.status(400).json(`${payment} is not a number`);
  await operations.updatePayment(userId, payment);
  return res.status(204).json(payment);
}
//overtime Update Handler
async function overtimeUpdateHandler(req, res) {
  try {
    const { overTime } = req.body;
    const { userId } = req;

    const response = await operations.updateOverTime(userId, overTime);

    return res.status(204).json(overTime);
  } catch (err) {
    console.log(err);
  }
}
//workPlace update
async function updateWorkPlaces(req, res) {
  try {
    const { workPlaces } = req.body;
    const { userId } = req;
    const response = await operations.updateWorkPlaces(userId, workPlaces);
    if (!response || response.acknowledged == false) {
      return res.status(500).json(`someThing went wrong`);
    }
    return res.status(204).json(workPlaces);
  } catch (err) {
    console.log(err);
  }
}
// update User Currency
async function updateCurrencyHandler(req, res) {
  try {
    const { currency } = req.body;
    const { userId } = req;
    await operations.updateCurrency(userId, currency);
    return res.status(204).json(currency);
  } catch (err) {
    console.log(err);
  }
}

//register Handler
async function registerHandler(req, res) {
  const {
    name,
    lastName,
    workPlace,
    email,
    phone,
    currency,
    payment,
    overTime,
  } = req.body;

  const { password } = req;

  const user = await operations.getUserByEmail(email);

  if (user) {
    return res
      .status(400)
      .json(`It seems that user with this email is already registered`);
  }
  const { error } = validateUser({
    name,
    lastName,
    email,
    phone,
    password,
    currency,
    payment,
    workPlace,
    overTime,
  });

  if (error) {
    const err = error.details[0].message;

    return res.status(400).json(err);
  }
  if (
    !name ||
    !lastName ||
    !workPlace ||
    !email ||
    !phone ||
    !password ||
    !workPlace ||
    !currency ||
    !payment
  ) {
    return res.status(400).json(`there are some missing values`);
  }

  try {
    const newUser = await operations.addUser({
      name,
      lastName,
      workPlaces: [workPlace],
      email,
      phone,
      currency,
      payment,
      overTime,
      password,
      isManager: false,
    });
    console.log(newUser);
    const token = jwt.sign({ userId: newUser._id }, "Harelha123");

    req.session = { token };

    return res.status(201).json(newUser);
  } catch (err) {
    return res.status(500).json({ err });
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

    const userObj = {
      name: value.name,
      email: value.email,
      password: value.password,
      phone: value.phone,
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

  if (!result) {
    return res.status(500).send(`something went wrong`);
  }
  return res.status(201).send(`user has been deleted`);
}

//login user

async function signIn(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json(`email and password are required`);
  }
  const user = await operations.getUserByEmail(email);
  console.log(user);
  if (!user) {
    return res
      .status(400)
      .json(`we couldn't find an account matching this Email`);
  }
  let pass = await bcrypt.compare(password, user.password);

  if (pass === false) {
    return res.status(400).json(`incorrect email or password`);
  }

  const token = jwt.sign({ userId: user._id }, "Harelha123");

  req.session = { token };

  res.status(200).json(user);
}
async function logOut(req, res) {
  try {
    req.session = null;
    res.status(204).end();
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  registerHandler,
  getUserDetails,
  updateUserHandler,
  deleteUserHandler,
  signIn,
  updateUserPayment,
  updateCurrencyHandler,
  overtimeUpdateHandler,
  updateWorkPlaces,
  logOut,
};
