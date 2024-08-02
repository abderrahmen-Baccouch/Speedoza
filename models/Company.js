import mongoose from 'mongoose';

const companySchema = new mongoose.Schema({
    identifiant: {
        type: String,
        required: true,
        unique: true
    },
    companyName: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    openingHours: {
        type: String,
        required: true
    },
    closingHours: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true
    }
});

const Company = mongoose.model('Company', companySchema);

export default Company;
