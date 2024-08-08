import mongoose from 'mongoose';

const clientSchema = new mongoose.Schema({
    identifiant: {
        type: String,
        required: true,
    },
   
    address: {
        type: String,
        required: true,
    }
});

export default mongoose.model('Client', clientSchema);
