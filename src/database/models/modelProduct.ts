
import mongoose from "mongoose";
import convert from '../../core/convert.js';
const { DOCUMENT_NAME, COLLECTION_NAME } = convert("product");
const schema = new mongoose.Schema({
    user : { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: String, required: true },
    purchasePrice: { type: String, required: true },
    quantity: { type: String, required: true },
    code: { type: String, required: true },
    type: { type: String, required: true },
    image: { type: String, default:"" },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
}); 

const Product = mongoose.model(DOCUMENT_NAME, schema, COLLECTION_NAME); 
export default Product;
