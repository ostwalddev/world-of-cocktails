import mongoose from 'mongoose';
async function connectMongo() {
	const uri = process.env.MONGO_URI;
	if (!uri) throw new Error('Please add your Mongo URI to .env.local');
	await mongoose.connect(uri);
}

export default connectMongo;
