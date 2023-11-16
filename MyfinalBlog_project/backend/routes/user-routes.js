import express from "express";
import { deleteuser, getAllUser, login, signup,updateuser } from "../controllers/user-controller";

const router = express.Router();

router.get("/", getAllUser);
router.post("/signup", signup);
router.post("/login", login);
router.put("/update/:id", updateuser);
router.delete("/:id", deleteuser);

export default router;