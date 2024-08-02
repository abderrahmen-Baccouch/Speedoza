import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
    identifiant: {
		type: String,
		required: true,
	},
    companyName: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    openingHours: {
        type: String,
        required: true,
    },
    closingHours: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    },
    products: {
        type: [Schema.Types.ObjectId],
        ref: 'Product',
    },

    reviews: {
        type: [Schema.Types.ObjectId],
        ref: 'Review',
    },
});

export default mongoose.model("Company", companySchema);