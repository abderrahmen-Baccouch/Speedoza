
import Food from '../models/food.js';
import Category from '../models/category.js';


export async function createFood (req, res)  {
    const { name, description,cateogryId } = req.body;
    const photos = req.files.map(file => `${req.protocol}s://${req.get('host')}/public/images/${file.filename}`);

    try {
const category = await Category.findById({_id:cateogryId});
if (!category) {
    return res.status(404).json({ message: "Category not found" });
}
        const newFood = new Food({
            name,
            description,
            photos,
            category: category._id
        });
        await newFood.save();
        //update category foods array with new food id
        category.foods.push(newFood._id);
        res.status(201).json({ message: "Food item created successfully", food: newFood });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server Error" });
    }
};


export async function getAllFoods (req, res)  {
    try {
        const foods = await Food.find();
        res.status(200).json(foods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
