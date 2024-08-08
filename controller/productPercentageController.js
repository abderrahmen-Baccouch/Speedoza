import ProductPercentage from '../models/ProductPercentage.js';

// Create a new product percentage promotion
export const createProductPercentage = async (req, res) => {
  const { name, percentage, description, productId } = req.body;

  try {
    const newProductPercentage = new ProductPercentage({
      name,
      percentage,
      description,
      productId,
    });

    const savedProductPercentage = await newProductPercentage.save();

    res.status(201).json(savedProductPercentage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get all product percentage promotions
export const getProductPercentages = async (req, res) => {
  try {
    const productPercentages = await ProductPercentage.find();
    res.status(200).json(productPercentages);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Get a single product percentage promotion by ID
export const getProductPercentageById = async (req, res) => {
  const { id } = req.params;

  try {
    const productPercentage = await ProductPercentage.findById(id);

    if (!productPercentage) {
      return res.status(404).json({ message: 'Product Percentage not found' });
    }

    res.status(200).json(productPercentage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Update a product percentage promotion by ID
export const updateProductPercentage = async (req, res) => {
  const { id } = req.params;
  const { name, percentage, description } = req.body;

  try {
    const productPercentage = await ProductPercentage.findById(id);

    if (!productPercentage) {
      return res.status(404).json({ message: 'Product Percentage not found' });
    }

    productPercentage.name = name || productPercentage.name;
    productPercentage.percentage = percentage || productPercentage.percentage;
    productPercentage.description = description || productPercentage.description;

    const updatedProductPercentage = await productPercentage.save();

    res.status(200).json(updatedProductPercentage);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};

// Delete a product percentage promotion by ID
export const deleteProductPercentage = async (req, res) => {
  const { id } = req.params;

  try {
    const productPercentage = await ProductPercentage.findById(id);

    if (!productPercentage) {
      return res.status(404).json({ message: 'Product Percentage not found' });
    }

    await productPercentage.remove();

    res.status(200).json({ message: 'Product Percentage deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
};
