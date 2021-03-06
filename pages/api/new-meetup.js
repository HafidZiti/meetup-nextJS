// /api/new-meetup
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtweq.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();

    const meetupsCollection = db.collection("meetups");
    await meetupsCollection.insertOne(data);
    client.close();

    res.status(201).json({ message: "Meetup inserted!" });
  }
}

export default handler;
