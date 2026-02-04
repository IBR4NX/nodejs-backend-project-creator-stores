import asyncHandler from "express-async-handler";
import bcrypt from "bcrypt";
import modelUser from "../../database/models/modelUser";

import { validateEmail, validatePassword } from "../../core/validate";

const signup = asyncHandler(async (req, res) => {
    res.status(400);
    const {name,email ,password,confirmPassword}=req.body;
    if(!name || !email || !password || !confirmPassword) throw new Error(" All fields are required");
    validateEmail(email);
    validatePassword(password);
    const findByEmail = await modelUser.findOne({ email: email });
    if (findByEmail) throw new Error(" User already registered");
    if(password !== confirmPassword) throw new Error(" Passwords do not match");
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await modelUser.create({
      name: name,
      email: email,
      password: passwordHash,
    });
    res.status(201).json({ message: "Signup Successful", name: newUser.name, email: newUser.email });
    return;
  });


export default signup;
