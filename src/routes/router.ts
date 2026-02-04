import express from "express";
import path from "path";
import bcrypt from "bcrypt";
import asyncHandler from "express-async-handler";
const router = express.Router();
// router.use(express.static(path.join(__dirname, "../views")));
const users = [];
import signup from "./user/signup";
import login from "./user/login";
import profile from "./user/profile";
import auth from '../auth/jwt'
router.post("/signup", signup);
router.post("/login", login);
import { refreshAccessToken } from "./user/token";
import { uptime } from "process";
router.post('/refresh-token',refreshAccessToken);
// import logout from "";
// import admin from "./admin/display";
// router.use("/admin",auth, admin);
router.get("/my",auth,profile.my);
router.put("/update",auth,profile.update);
// import addproduct from "./products/add";
// import displayProducts from './products/display'
// router.post('/addProduct',auth, addproduct)
// router.get('/displayProducts',auth, displayProducts)
router.get('/check',auth,asyncHandler( async (req, res)=>{
  res.status(200).json({message:"Token is valid",status:"OK"})
}));
router.get('/health',asyncHandler( async (req, res)=>{
  res.status(200).json({message:"Server is healthy",status:"OK"
    ,cookies:req.cookies,query:req.query,body:req.body,params:req.params
    ,time:new Date().toISOString(),
    uptime: process.uptime()
  });
}));

router.use(/.*/, auth,asyncHandler( async (req:any, res:any)=>{
  console.log("Access to restricted path:", req.originalUrl);
    res.status(200).json({message: 'Access to this path is not allowed',status:req.user,cookies:req.cookies,query:req.query,body:req.body,params:req.params});
}));
export default router;
