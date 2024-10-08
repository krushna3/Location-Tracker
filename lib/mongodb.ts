import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!process.env.MONGODB_URI) {
    throw new Error("Please add your Mongo URI to .env.local");
}

if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable to preserve the client across hot reloads
    if (!(global as any)._mongoClientPromise) {
        client = new MongoClient(uri);
        (global as any)._mongoClientPromise = client.connect();
    }
    clientPromise = (global as any)._mongoClientPromise;
} else {
    // In production mode, it's best to not use a global variable
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
    const client = await clientPromise;
    console.log("connect to mongo")
    return client.db(dbName);
}