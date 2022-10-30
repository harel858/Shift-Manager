const userModel = require("./userModel");
const validateUser = require("../joi/userValidation");

async function addUser(userDetails) {
  return await new userModel(userDetails).save();
}
async function updatePayment(id, payment) {
  return await userModel.findOneAndUpdate({ _id: id }, { $set: { payment } });
}
async function updateOverTime(id, overTime) {
  try {
    const newOvertime = await userModel.findOneAndUpdate(
      { _id: id },
      { $set: { overTime: overTime } }
    );
    console.log(newOvertime);
    return newOvertime;
  } catch (err) {
    console.log(err);
  }
}

// update workplaces
async function updateWorkPlaces(_id, workPlaces) {
  try {
    const newWorkPlaces = await userModel.findOneAndUpdate(
      { _id },
      { $set: { workPlaces } }
    );
    console.log(newOvertime);
    return newWorkPlaces;
  } catch (err) {
    console.log(err);
  }
}

async function updateCurrency(id, currency) {
  return await userModel.findOneAndUpdate({ _id: id }, { $set: { currency } });
}
async function getUsers() {
  return await userModel.find();
}

async function getUserById(id) {
  try {
    return await userModel.find({ _id: id });
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function updateUserHandler(id, filter, option) {
  return await userModel.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        [filter]: option,
      },
    }
  );
}

function updateValidation(key, obj, option, filter) {
  console.log(`keys: ${key[1]} filter: ${filter}`);
  switch (key) {
    case filter == key[0]:
      const nameError = validateUser({
        name: option,
        email: obj.email,
        password: obj.password,
      });
      if (nameError.error) {
        console.log(nameError.error.details[0].message);
        return `${nameError.error.details[0].message}`;
      }
      break;
    case filter == key[1]:
      const emailError = validateUser({
        name: obj.name,
        email: option,
        password: obj.password,
      });
      if (emailError.error) {
        console.log(emailError.error.details[0].message);
        return `${emailError.error.details[0].message}`;
      }
      break;
    case filter == key[2]:
      const passwordError = validateUser({
        name: obj.name,
        email: obj.email,
        password: option,
      });
      if (passwordError.error) {
        console.log(passwordError.error.details[0].message);
        return `${passwordError.error.details[0].message}`;
      }
      break;
  }

  return null;
}

async function deleteUser(id) {
  try {
    return await userModel.findByIdAndDelete({ _id: id });
  } catch (err) {
    console.log(err);
    return null;
  }
}

async function getUserByEmail(email) {
  try {
    return await userModel.findOne({ email: email });
  } catch (err) {
    console.log(err);
    return null;
  }
}

module.exports = {
  addUser,
  getUsers,
  updateUserHandler,
  getUserById,
  updateValidation,
  deleteUser,
  getUserByEmail,
  updatePayment,
  updateCurrency,
  updateOverTime,
  updateWorkPlaces,
};
