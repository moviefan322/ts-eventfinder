import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import { connectDatabase, insertDocument } from "../../helpers/db-util";
import "dotenv/config";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      res.status(422).json({ message: "Invalid email address." });
      return;
    }

    let client: MongoClient | any;

    try {
      client = await connectDatabase();
    } catch (error) {
      res.status(500).json({ message: "Connecting to the database failed!" });
      return;
    }

    try {
      await insertDocument(client, "emails", { email: email });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!" });
      return;
    }

    res.status(201).json({ message: "Signed up!" });
  }
}

export default handler;
