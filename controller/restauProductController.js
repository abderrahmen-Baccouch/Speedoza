// controller/restauProductController.js

import Food from "../models/food.js"; // Fixed naming
import User from "../models/user.js";
import RestauProduct from "../models/RestauProduct.js";
import { get } from "mongoose";

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


export async function updateRestauProduct(req, res) {
  const { id } = req.params;
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
    if (!foodItem) {
      return res.status(404).json({ message: "Food item not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let restauProduct = await RestauProduct.findById(id);
    if (!restauProduct) {
      return res.status(404).json({ message: "RestauProduct not found" });
    }

    restauProduct.name = name || restauProduct.name;
    restauProduct.description = description || restauProduct.description;
    restauProduct.price = price || restauProduct.price;
    restauProduct.sellingPrice = sellingPrice || restauProduct.sellingPrice;
    restauProduct.ingredient = ingredient || restauProduct.ingredient;
    restauProduct.size = size || restauProduct.size;
    restauProduct.user = user._id || restauProduct.user;
    restauProduct.food = foodItem._id || restauProduct.food;

    await restauProduct.save();
    res.status(200).json({
      message: "RestauProduct updated successfully",
      restauProduct,
    });
  }
  catch (error) { 
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function deleteRestauProduct(req, res) {
  const { id } = req.params;

  try {
    const restauProduct = await RestauProduct.findByIdAndDelete(id);
    if (!restauProduct) {
      return res.status(404).json({ message: "RestauProduct not found" });
    }
    res.status(200).json({ message: "RestauProduct deleted successfully" });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}  

export async function getRestauProductById(req, res) {
  const { id } = req.params;

  try {
    const restauProduct = await RestauProduct.findById(id).populate("user").populate("food");
    if (!restauProduct) {
      return res.status(404).json({ message: "RestauProduct not found" });
    }
    res.status(200).json(restauProduct);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getRestauProductByUserId(req, res) {
  const { userId } = req.params;

  try {
    const restauProduct = await RestauProduct.find({ user: userId }).populate("user").populate("food");
    if (!restauProduct) {
      return res.status(404).json({ message: "RestauProduct not found" });
    }
    res.status(200).json(restauProduct);
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}