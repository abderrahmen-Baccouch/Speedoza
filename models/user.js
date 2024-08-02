//model user
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
    },
    role: {
        type: String,
    },
    CompanyData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: false,
    },
    LivreurData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Livreur',
        required: false,
    },
    ClientData: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        required: false,
    },
});

export default mongoose.model('User', userSchema);