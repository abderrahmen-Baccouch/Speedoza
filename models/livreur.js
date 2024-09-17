import mongoose from "mongoose";

const livreurSchema = new mongoose.Schema({
	cin: {
		type: String,
		required: true,
	},
	identifiant: {
		type: String,
		required: true,
	},
	vehicleType: {
		type: String,
		required: true,
	},

	availabilityStatus: {
		type: String,
		required: true,
	},
});

export default mongoose.model("Livreur", livreurSchema);