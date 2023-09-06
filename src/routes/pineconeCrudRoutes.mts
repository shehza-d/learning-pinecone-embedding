import express from "express";
import {
  getAllProducts,
  getProduct,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/crudControllers.js";

const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product/:id", getProduct);
router.post("/product", addProduct);
router.put("/product", updateProduct);
router.delete("/product/:id", deleteProduct);

export { router as pineconeCrudRouter };
