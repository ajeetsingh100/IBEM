import express from "express";
import {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.post("/", createProduct); // Admin
router.get("/", getProducts); // All users
router.get("/:id", getProduct); // Product details
router.put("/:id", updateProduct); // Admin
router.delete("/:id", deleteProduct); // Admin

export default router;
