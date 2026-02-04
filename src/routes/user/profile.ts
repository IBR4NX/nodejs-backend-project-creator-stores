import asyncHandler from "express-async-handler";
import modelUser from "../../database/models/modelUser";


const my = asyncHandler(async (req:any, res:any) => {
  const user = await modelUser.findById(req.user.id).select("-password").lean().exec();
   console.log("my ",req.user);
  res.json(user);
});

const update = asyncHandler(async (req:any, res:any) => {
  const { name, email } = req.body;
  const updatedUser = await modelUser.findByIdAndUpdate(
    req.user.id,
    { name, email },
    { new: true }
  ).select("-password").lean().exec();
  res.json(updatedUser);
});

export default { my, update };


