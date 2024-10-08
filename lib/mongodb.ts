// import { MongoClient, Db } from 'mongodb';

// const uri = process.env.MONGODB_URI as string;
// const dbName = process.env.MONGODB_DB as string;

// let client: MongoClient;
// let clientPromise: Promise<MongoClient>;

// if (!process.env.MONGODB_URI) {
//     throw new Error("Please add your Mongo URI to .env.local");
// }

// if (process.env.NODE_ENV === 'development') {
//     if (!(global as any)._mongoClientPromise) {
//         client = new MongoClient(uri);
//         (global as any)._mongoClientPromise = client.connect();
//     }
//     clientPromise = (global as any)._mongoClientPromise;
// } else {
//     client = new MongoClient(uri);
//     clientPromise = client.connect();
// }

// export async function getDb(): Promise<Db> {
//     const client = await clientPromise;
//     console.log("connect to mongo")
//     return client.db(dbName);
// }

import { MongoClient, Db } from 'mongodb';

const uri = process.env.MONGODB_URI as string;
const dbName = process.env.MONGODB_DB as string;

if (!uri) {
    throw new Error("Please add your Mongo URI to .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
    if (!global._mongoClientPromise) {
        client = new MongoClient(uri);
        global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
} else {
    // In production, always create a new MongoClient
    client = new MongoClient(uri);
    clientPromise = client.connect();
}

export async function getDb(): Promise<Db> {
    const client = await clientPromise;
    console.log("Connected to MongoDB");
    return client.db(dbName);
}

export default clientPromise;
