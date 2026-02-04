import asyncHandler from "express-async-handler";
import Product from "../../database/models/Product.js";
const displayProducts = asyncHandler(async (req, res) => {
    const products = await Product.find().populate("user");
    res.status(200).json(products);
});

export default displayProducts;