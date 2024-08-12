
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, 
    },
    description: {
        type: String,
    },
    foods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Food',
    }],
});

export default mongoose.model('Category', categorySchema);
