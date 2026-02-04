
import { Schema, model, Types } from 'mongoose';

import convert from '../../core/convert';
const { DOCUMENT_NAME, COLLECTION_NAME } = convert("user");

const schema = new Schema(
  { 
    
    name: { type: String, required: [true,"  required"] },
    
    email: { type: String, required: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email address"],
      unique: true,lowercase: true,trim: true,
    },
    password: { type: String, required: true,select: false,
      minLength: [6, "Password must be at least 6 characters long"],
    },
    role: { type: String, required: true,select:true,
      enum:["user", "admin", "superadmin", "guest"] ,
      default: "user", 
    },
    status: { type: Boolean, default: true, select: false},
    refreshToken: { type: String,default:"", select: false },
    verified: { type: Boolean, default: false ,select:false},
    createdAt: { type: Date, default: Date.now, select: false },
    updatedAt: { type: Date, default: Date.now, select: false },
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'createdAt' },
  });
  
  schema.index({ _id: 1, status: 1 });
  schema.index({ status: 1 });
  const modelUser = model(DOCUMENT_NAME, schema, COLLECTION_NAME) 
  export default modelUser;  