import { NextResponse } from 'next/server';
import { getDb } from '../../../../lib/mongodb';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { latitude, longitude } = body;

        if (!latitude || !longitude) {
            return NextResponse.json({ error: 'Latitude and Longitude are required' }, { status: 400 });
        }

        const db = await getDb();
        const collection = db.collection('locations');

        // Insert the location into MongoDB
        const result = await collection.insertOne({
            latitude,
            longitude,
            timestamp: new Date(),
        });

        return NextResponse.json({ message: 'Location saved successfully', id: result.insertedId.toString() }, { status: 200 });
    } catch (error) {
        console.error('Error saving location:', error);
        return NextResponse.json({ error: 'Error saving location' }, { status: 500 });
    }
}
