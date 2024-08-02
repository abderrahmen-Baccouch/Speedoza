import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
   
    ingredients:
    [{
        type: Schema.Types.ObjectId,
        ref: 'Ingredient',
    }],
    restaurant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true,
    },
    images: [{
        type: String,
    }],
    rating: {
        type: Number,
        default: 0,
    },
  

    availability: {
        type: Boolean,
        default: true,
    },
    tags: [{
        type:Schema.Types.ObjectId,
        ref: 'Tag',

    }],

});

export default mongoose.model('Product', productSchema);