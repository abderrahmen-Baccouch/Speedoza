import mongoose from "mongoose";

const ingredientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
   
    price: {
        type: Number,
        required: true,
    },
    
});

export default mongoose.model("Ingredient", ingredientSchema);