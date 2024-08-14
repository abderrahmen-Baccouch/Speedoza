// routes/restauProductRoutes.js

import express from "express";
import {
  createRestauProduct,
  getAllRestauProducts,
  updateRestauProduct,
  deleteRestauProduct,
  getRestauProductById,
  getRestauProductByUserId
} from "../controller/restauProductController.js";

const router = express.Router();

router.post("/createRestauProduct", createRestauProduct);
router.get("/getAllRestauProducts", getAllRestauProducts);
router.put("/updateRestauProduct/:id", updateRestauProduct);
router.delete("/deleteRestauProduct/:id", deleteRestauProduct);
router.get("/getRestauProductById/:id", getRestauProductById);
router.get("/getRestauProductByUserId/:userId", getRestauProductByUserId);

export default router;
