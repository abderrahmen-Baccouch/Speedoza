import ProductPercentage from '../models/ProductPercentage.js';

// Create a new product percentage promotion
export async function  createProductPercentage (req, res) {
  const { percentage, description } = req.body;

  try {
    const newProductPercentage = new ProductPercentage({
      percentage,
      description,
    });

    const savedProductPercentage = await newProductPercentage.save();

    res.status(201).json(savedProductPercentage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
