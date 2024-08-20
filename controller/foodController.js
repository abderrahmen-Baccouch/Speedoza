
import Food from '../models/food.js';
import Category from '../models/category.js';
import cloudinary from '../config/cloudinary.js';

export async function createFood(req, res) {
    const { name, description, cateogryId } = req.body;

    try {
        const category = await Category.findById(cateogryId);
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        // Upload photos to Cloudinary
        const photosPromises = req.files.map(file =>
            cloudinary.uploader.upload(file.path) // Ensure you handle the file path correctly
        );
        const photosResults = await Promise.all(photosPromises);

        const photos = photosResults.map(result => result.secure_url);

        const newFood = new Food({
            name,
            description,
            photos,
            category: category._id
        });

        await newFood.save();

        // Update the category's foods array with the new food id
        category.foods.push(newFood._id);

        // Save the updated category document
        await category.save();

        res.status(201).json({ message: "Food item created successfully", food: newFood });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};

export async function getAllFoods (req, res)  {
    try {
        const foods = await Food.find().populate('category');
        res.status(200).json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};


