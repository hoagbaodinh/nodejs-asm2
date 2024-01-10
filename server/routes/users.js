const express = require("express");

const router = express.Router();

const userController = require("../controllers/user");

router.get("/all-users", userController.getUsers);
router.get("/num-of-users", userController.getNumOfUser);
router.post("/add-user", userController.addUser);
router.get("/get-user/:id", userController.getUser);
router.put("/update-user/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

module.exports = router;
