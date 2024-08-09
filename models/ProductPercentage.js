import mongoose from 'mongoose';

const ProductPercentageSchema = new mongoose.Schema({
  percentage: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductPercentage = mongoose.model('ProductPercentage', ProductPercentageSchema);

export default ProductPercentage;
