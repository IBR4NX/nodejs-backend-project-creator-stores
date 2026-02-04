import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import modelUser from "../../database/models/modelUser";
import { generateTokens } from "./token";
import { validateEmail, validatePassword } from "../../core/validate";


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    res.status(400);
    validateEmail(email);
    validatePassword(password);
    const user = await modelUser.findOne({ email: email, status: true } as any)
    .select("+password +role")
    .lean()
    .exec();
    res.status(401);
    if (!user) throw new Error(" email or password is incorrect");
    
    // console.log(user,"login");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error(" email or password is incorrect");

    const { accessToken, refreshToken } = generateTokens(user);
    await modelUser.findByIdAndUpdate(user._id, { refreshToken }, { new: true }).exec()
    .then(() => {
    res.status(200).json({
      message: "Login Success",
      name: user.name,
      email: user.email,
      token: accessToken,
      refreshToken: refreshToken,
    });
  })
  });

export default login;
