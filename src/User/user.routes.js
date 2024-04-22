const express = require("express");
const router = express.Router();
const userController = require("../User/user.controller");

router.post("/", userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/countUsers", userController.getUserCount); 
router.get("/name", userController.getUserByName);
router.get("/email", userController.getUserByEmail);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);
router.post("/login", userController.checkUserExistsByEmailAndPassword);

module.exports = router;