const User = require("../models/user");

exports.postRegister = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    // const users = await User.find();
    // const user = users.find((u) => u.username === username);
    const user = User.findOne({ username: username });
    if (user) {
      return res.status(400).json("Username already exists");
    } else {
      const newUser = new User({
        username: username,
        password: password,
        fullName: username,
        phoneNumber: "+84981231234",
        email: `${username}@gmail.com`,
        isAdmin: false,
      });
      await newUser.save();
      console.log("user saved");

      return res.status(200).json("User has been created");
    }
  } catch (error) {
    console.log(error);
  }
};

exports.postLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.status(400).json("User not found");
    } else {
      if (user.password !== password) {
        return res.status(400).json("Password is incorrect");
      } else {
        return res.status(200).json(user);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
