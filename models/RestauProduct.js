import mongoose from "mongoose";

const restauProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: [
    {
      type: Number,
      required: true,
    },
  ],

  ingredient: [
    {
      type: String,
    },
  ],
  size: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  food: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Food",
    required: true,
  },
});

const RestauProduct = mongoose.model("RestauProduct", restauProductSchema);

export default RestauProduct;
