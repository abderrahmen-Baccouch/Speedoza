// controller/restauProductController.js

import User from "../models/user.js";
import Category from "../models/category.js";
import RestauProduct from "../models/RestauProduct.js";

export async function createRestauProduct(req, res) {
  const {
    name,
    details,
    minPrice,
    mediumPrice,
    maxPrice,
    ingredients,
    imagesBase64,
    userId,
    categoryId,
  } = req.body;

  try {
    const user = await User.findById({_id:userId});
    const category = await Category.findById({_id:categoryId});
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newRestauProduct = new RestauProduct({
      name,
      details,
      minPrice,
      mediumPrice,
      maxPrice,
      ingredients,
      imagesBase64,
      userId,
      categoryId,
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
    .populate({
      path: 'categoryId',
      populate: {
        path: 'foods',  // Populate foods within categoryId
        model: 'Food'   // Replace with the actual model name for the Food schema
      }
    })
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
    details,
    minPrice,
    mediumPrice,
    maxPrice,
    ingredients,
    imagesBase64,
    userId,
    categoryId,
  } = req.body;

  try {
    const user = await User.findById({_id:userId});
    const category = await Category.findById({_id:categoryId});
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }


    let restauProduct = await RestauProduct.findById(id);
    if (!restauProduct) {
      return res.status(404).json({ message: "RestauProduct not found" });
    }

    restauProduct.name = name || restauProduct.name;
    restauProduct.details = details || restauProduct.details;
    restauProduct.minPrice = minPrice || restauProduct.minPrice;
    restauProduct.mediumPrice = mediumPrice || restauProduct.mediumPrice;
    restauProduct.maxPrice = maxPrice || restauProduct.maxPrice;
    restauProduct.ingredients = ingredients || restauProduct.ingredients;
    restauProduct.imagesBase64 = imagesBase64 || restauProduct.imagesBase64;
    restauProduct.userId = userId || restauProduct.userId;
    restauProduct.categoryId = categoryId || restauProduct.categoryId;

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
    .populate({
      path: 'categoryId',
      populate: {
        path: 'foods',  // Populate foods within categoryId
        model: 'Food'   // Replace with the actual model name for the Food schema
      }
    })
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
        path: 'categoryId',
        populate: {
          path: 'foods',  // Populate foods within categoryId
          model: 'Food'   // Replace with the actual model name for the Food schema
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
