// controller/restauProductController.js

import User from "../models/user.js";
import Category from "../models/category.js";
import RestauProduct from "../models/RestauProduct.js";
import Food from "../models/food.js";

export async function createRestauProduct(req, res) {
  const {
    
    details,
    minPrice,
    mediumPrice,
    maxPrice,
    ingredients,
    userId,
    foodId,
  } = req.body;

  try {
    const user = await User.findById({_id:userId});
    const food = await Food.findById({_id:foodId});
    
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(!food){
      return res.status(404).json({ message: "Food not found" });
    }

    const newRestauProduct = new RestauProduct({
      details,
      minPrice,
      mediumPrice,
      maxPrice,
      ingredients,
      userId,
      foodId,
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
    .populate("userId") // Populate user details as needed
    .populate('foodId');
    res.status(200).json(restauProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function updateRestauProduct(req, res) {
  const { id } = req.params;
  const {
    details,
    minPrice,
    mediumPrice,
    maxPrice,
    ingredients,
    userId,
    foodId,
  } = req.body;

  try {
    const user = await User.findById({_id:userId});
    const food = await Food.findById({_id:foodId});
    
  
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if(!food){
      return res.status(404).json({ message: "Food not found" });
    }


    let restauProduct = await RestauProduct.findById(id);
    if (!restauProduct) {
      return res.status(404).json({ message: "RestauProduct not found" });
    }

    restauProduct.foodId = foodId || restauProduct.foodId;

    restauProduct.details = details || restauProduct.details;
    restauProduct.minPrice = minPrice || restauProduct.minPrice;
    restauProduct.mediumPrice = mediumPrice || restauProduct.mediumPrice;
    restauProduct.maxPrice = maxPrice || restauProduct.maxPrice;
    restauProduct.ingredients = ingredients || restauProduct.ingredients;
    restauProduct.userId = userId || restauProduct.userId;

    await restauProduct.save();
    res.status(200).json({
      message: "RestauProduct updated successfully",
      restauProduct,
    });
  } catch (error) {
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
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getRestauProductById(req, res) {
  const { id } = req.params;

  try {
    const restauProduct = await RestauProduct.findById(id)
    .populate("userId") // Populate user details as needed
    .populate('foodId');
    if (!restauProduct) {
      return res.status(404).json({ message: "RestauProduct not found" });
    }
    res.status(200).json(restauProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}

export async function getRestauProductByUserId(req, res) {
  const { userId } = req.params;

  try {
    const restauProducts = await RestauProduct.find({ userId })
     .populate({
      path: 'foodId',
      populate: {
        path:'category'
      }
     })
      .populate('userId'); // Populate user details as needed

    if (!restauProducts.length) {
      return res.status(404).json({ message: "RestauProducts not found" });
    }

    res.status(200).json(restauProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
