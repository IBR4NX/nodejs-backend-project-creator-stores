import asyncHandler from "express-async-handler";
import { Router } from "express";
import auth from '../../auth/jwt'
import Authorization from "../../database/models/modelToken";
const router = Router();


router.post("/logout", auth, async (req, res) => {
  
  await Authorization.updateOne({ user: req.user.id } , { status: false });
  res.status(200).json({ message: "Logged out successfully" });
});

export default router;
