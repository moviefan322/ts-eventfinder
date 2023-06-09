import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { ObjectId } from "mongodb";

type Comment = {
  email: string;
  name: string;
  text: string;
  eventId: undefined | string | string[];
  id?: ObjectId;
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.eventId;

  const client = (await MongoClient.connect(
    process.env.MONGO_URI
  )) as MongoClient;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !text ||
      text.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid input." });
      return;
    }

    let id: ObjectId;

    const newComment: Comment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();
    const result = await db.collection("comments").insertOne(newComment);

    console.log(result);

    newComment.id = result.insertedId;

    res.status(201).json({ message: "Added comment.", comment: newComment });
  }

  if (req.method === "GET") {
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({
        _id: -1,
      })
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
