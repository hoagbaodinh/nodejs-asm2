const User = require("../models/user.js");

// Create User
exports.addUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      return res.status(400).json("Username already in use");
    }
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json("Created user successfully");
  } catch (err) {
    console.log(err);
  }
};

// Read User
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    if (users) {
      res.status(200).json(users);
    } else {
      res.status(404).json("No users found");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getNumOfUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users.length);
  } catch (err) {
    console.log(err);
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

// Update User

exports.updateUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndUpdate(userId, { $set: req.body });
    return res.status(200).json("User has been updated");
  } catch (error) {
    console.log(error);
  }
};

// Delete User

exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    await User.findByIdAndDelete(userId);
    req.status(200).json("User has been deleted");
  } catch (err) {
    console.log(err);
  }
};
