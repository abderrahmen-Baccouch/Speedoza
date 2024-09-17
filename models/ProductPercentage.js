import mongoose from 'mongoose';

const ProductPercentageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  percentage: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const ProductPercentage = mongoose.model('ProductPercentage', ProductPercentageSchema);

export default ProductPercentage;
