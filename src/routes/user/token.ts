import { JWT_REFRESH_SECRET, JWT_ACCESS_SECRET } from "../../config";
import asyncHandler from "express-async-handler";
import modelUser from "../../database/models/modelUser" // نموذج المستخدم
import jwt from "jsonwebtoken";
import { ObjectId,Types } from "mongoose";

const refreshAccessToken = asyncHandler(async (req, res) => {
  const { refreshTokenRequest } = req.body; // أو من Cookie
  console.log(refreshTokenRequest ,"router/user/token");
  res.status(403);
  if (!refreshTokenRequest) throw new Error("Refresh Token مطلوب")

  try {
    const user = jwt.verify(refreshTokenRequest, JWT_REFRESH_SECRET);
    // const user = await modelUser.findById(decoded.id as ObjectId).select("+refreshToken").exec();
    if (!user || typeof user === "string") {
      res.status(403);
      throw new Error("Refresh Token is not recognized");
    }else{
      // إصدار Access Token جديد
      const { accessToken, refreshToken } = generateTokens(user);
      await modelUser.findByIdAndUpdate(user._id, { refreshToken }, { new: true }).exec();
      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 60, // 1 دقيقة
      });
      res.status(201).json({ token:accessToken,refreshToken });
      res.end();
    }                       
  } catch (err) {
    throw new Error("Refresh Token غير صالح أو منتهي");
    res.end();
}
});

const generateTokens = (user:any) => {
  // console.log(user);
  const accessToken = jwt.sign(
    { id: user._id, role: user.role, email: user.email },
    JWT_ACCESS_SECRET,
    { expiresIn: "30m" }  // 
  );
 
  const refreshToken = jwt.sign(
    { id: user._id, type: "refresh" },
    JWT_REFRESH_SECRET,
    { expiresIn: "7d" }
  );

  return { accessToken, refreshToken };
};

export { refreshAccessToken, generateTokens };
