// routes/restauProductRoutes.js

import express from "express";
import {
  createRestauProduct,
  getAllRestauProducts,
} from "../controller/restauProductController.js";

const router = express.Router();

router.post("/createRestauProduct", createRestauProduct);
router.get("/getAllRestauProducts", getAllRestauProducts);

export default router;
