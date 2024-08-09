// controller/restauProductController.js

import Foood from "../models/food.js"; // Renamed to match your model naming convention
import User from "../models/user.js";
import RestauProduct from "../models/RestauProduct.js";

export async function createRestauProduct(req, res) {
  const { name, description, price, size, userId, foodId } = req.body; // Fixed FoodId to foodId

  try {
    const user = await User.findById(userId);
    const foodItem = await Foood.findById({_id:foodId}); // Renamed to avoid conflict
    console.log(foodId);
    if (!foodItem) {
      return res.status(404).json({ message: " Food item not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User item not found" });
    }

    const newRestauProduct = new RestauProduct({
      name,
      description,
      price,
      size,
      user: user._id,
      food: foodItem._id, // Changed to match the variable name
    });

    await newRestauProduct.save();
    res.status(201).json({
      message: "RestauProduct created successfully",
      restauProduct: newRestauProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getAllRestauProducts(req, res) {
  try {
    const restauProducts = await RestauProduct.find()
      .populate("user")
      .populate("food"); // Changed to match the field name in RestauProduct model
    res.status(200).json(restauProducts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
}
