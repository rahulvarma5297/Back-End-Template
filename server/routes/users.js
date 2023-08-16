const express = require("express");
const usersController = require("../controller/users.js");

const router = express.Router();

router.get("/", usersController.getAll);
router.get("/:id", usersController.getById);
router.post("/", usersController.create);
router.put("/:id", usersController.replace);
router.patch("/:id", usersController.update);
router.delete("/:id", usersController.delete);

module.exports = router;
