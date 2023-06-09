import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import "dotenv/config";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    const client = (await MongoClient.connect(
      process.env.MONGO_URI
    )) as MongoClient;
    const db = client.db();
    await db.collection("emails").insertOne({ email: email });

    client.close();

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
