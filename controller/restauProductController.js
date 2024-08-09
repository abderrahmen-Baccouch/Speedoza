// controller/restauProductController.js

import Food from "../models/food.js"; // Fixed naming
import User from "../models/user.js";
import RestauProduct from "../models/RestauProduct.js";

export async function createRestauProduct(req, res) {
  const {
    name,
    description,
    price,
    sellingPrice,
    ingredient,
    size,
    userId,
    foodId,
  } = req.body;

  try {
    const user = await User.findById({_id:userId});
    const foodItem = await Food.findById({_id:foodId}); // Renamed to avoid conflict
    console.log(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newRestauProduct = new RestauProduct({
      name,
      description,
      price, 
      ingredient,
      size,
      user: user._id,
      food: foodItem._id,
    });

    await newRestauProduct.save();
    res.status(201).json({
      message: "RestauProduct created successfully",
      restauProduct: newRestauProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getAllRestauProducts(req, res) {
  try {
    const restauProducts = await RestauProduct.find()
      .populate("user")
      .populate("food");
    res.status(200).json(restauProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
