import mongoose from "mongoose";

const locationSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true,
    },
    lng: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
   
    country: {
        type: String,
        required: true,
    },
});

export default mongoose.model("Location", locationSchema);