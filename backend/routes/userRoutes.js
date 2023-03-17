import express from "express";

import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.route("/").get(getUsers).post(createUser);
router.route("/:_id").get(getUser).put(updateUser).patch(deleteUser);

export default router;
