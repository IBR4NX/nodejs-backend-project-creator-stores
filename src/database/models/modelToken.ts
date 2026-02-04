
import mongoose from 'mongoose';
import convert from "../../core/convert.js";



const { DOCUMENT_NAME, COLLECTION_NAME } = convert("Token");

const schema = new mongoose.Schema({
  _id: { type: String, required: true},
  agent: { type: String, required: true },
  ip: { type: String, required: true },
  refreshToken:{type:String,required:true},
  expiresAt: { type: Date, required: true },
  status:{type:Boolean,default:true},
  // access_token:{type:String,required:true},
});

const Token = mongoose.model(DOCUMENT_NAME, schema, COLLECTION_NAME)
export default Token;