import mongoose from "mongoose";

const restauProductSchema = new mongoose.Schema({
 
  details: {
    type: String,
  },
  ingredients: [
    {
      type: String,
    },
  ],
  minPrice: {
    type: Number,
    required: true,
  },
  mediumPrice: {
    type: Number,
    required: true,
  },
  maxPrice: {
    type: Number,
    required: true,
  },

  foodId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const RestauProduct = mongoose.model("RestauProduct", restauProductSchema);

export default RestauProduct;
