// Keep the MongoDB client cached across development reloads.
import {MongoClient} from 'mongodb';

declare global {
	var _mongoClientPromise: Promise<MongoClient> | undefined;
}
let clientPromise: Promise<MongoClient> | undefined;

export default function getClientPromise(): Promise<MongoClient> {
	const uri = process.env.MONGO_URI;
	if (!uri) throw new Error('Please add your Mongo URI to .env.local');
	if (process.env.NODE_ENV === 'development') {
		global._mongoClientPromise ??= new MongoClient(uri).connect();
		return global._mongoClientPromise;
	}
	clientPromise ??= new MongoClient(uri).connect();
	return clientPromise;
}
