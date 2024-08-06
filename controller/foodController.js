
import Food from '../models/food.js';


export async function createFood (req, res)  {
    const { name, description } = req.body;
    const photos = req.files.map(file => `${req.protocol}://${req.get('host')}/public/images/${file.filename}`);

    try {
        const newFood = new Food({
            name,
            description,
            photos
        });
        await newFood.save();
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
