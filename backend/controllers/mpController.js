
import Product from "../models/productModel.js";
import multer from "multer";
import path from "path";

async function showProducts(req, res) {
    try {
        const products = await Product.find().populate("userId", "firstName lastName");

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found." });
        }

        return res.status(200).json({
            success: true,
            message: "Products fetched successfully.",
            products,
        });
    } catch (error) {
        console.error("Error in showProducts:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

async function searchProducts(req, res) {
    try {
        const { search } = req.query;

        if (!search) {
            return res.status(400).json({ success: false, message: "Search query is required." });
        }

        const products = await Product.find({
            $or: [
                { name: { $regex: search, $options: "i" } },
                { description: { $regex: search, $options: "i" } }
            ]
        }).populate("userId", "firstName lastName");

        if (products.length === 0) {
            return res.status(404).json({ success: false, message: "No products found matching your search." });
        }

        return res.status(200).json({
            success: true,
            message: "Search results fetched successfully.",
            products
        });
    } catch (error) {
        console.error("Error in searchProducts:", error.message);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}



async function addProduct(req, res) {
    try {
        const { title, description, price,condition,category,userId } = req.body;

        if (!title || !description || !price || !category || !condition  || !req.file || !userId) {
            return res.status(400).json({ message: "All fields, including an image, are required" });
        }

        const imagePath = `/images/${req.file.filename}`;

       

        const newProduct = await Product.create({
            userId,
            title, // Correct field name
            description,
            price,
            condition,
            category,
            image: imagePath,
        });

        return res.status(201).json({
            success: true,
            message: "Product added successfully!",
            product: newProduct
        });
    } catch (error) {
        console.error("Error in addProduct:", error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'../images'); 
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname); 
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${ext}`;
        cb(null, uniqueName); 
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Only image files are allowed!"), false); 
    }
};

const upload = multer({ storage, fileFilter });

export { addProduct, showProducts, searchProducts };
export default upload;