// /api/meetups?skip=*&limit=*
import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "GET") {
    const { limit, skip } = req.query;
    const client = await MongoClient.connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vtweq.mongodb.net/meetups?retryWrites=true&w=majority`
    );
    const db = client.db();
    const meetupsCollection = db.collection("meetups");

    const meetups = await meetupsCollection
      .find()
      .skip(parseInt(skip))
      .limit(parseInt(limit))
      .toArray();
    client.close();

    res.status(200).json({
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString(),
      })),
    });
  }
}

export default handler;
