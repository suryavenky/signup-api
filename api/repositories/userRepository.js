const mongoose = require('mongoose');
const User = mongoose.model('User');

function validateUser(email, password) {
  return new Promise((resolve, reject) => {
    User.find({ email: email, password: password }, (err, doc) => {
      if (!err) {
        if (doc == '') {
          resolve(false);
        }
        console.log('successful login');
        resolve(doc);
      } else {
        console.log('Error retrieving the data...!!' + err);
        reject(err);
      }
    });
  });
}

async function findAUser(obj) {
  return await User.findOne(obj);
}

async function findUserById(id) {
  return await User.findById(id);
}

async function createUser(obj) {
  try {
    const newUser = new User({
      obj,
    });
    await newUser.save();
    return true;
  } catch (err) {
    return err;
  }
}

module.exports = {
  validateUser,
  findAUser,
  findUserById,
  createUser,
};
