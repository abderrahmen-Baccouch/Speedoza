
import mongoose from 'mongoose';

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    photos: {
        type: [String], 
        required: true
    },
    category: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
});

const Food = mongoose.model('Food', foodSchema);

export default Food;
