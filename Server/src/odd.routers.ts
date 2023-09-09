import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const oddRouter = express.Router();
oddRouter.use(express.json());

oddRouter.get("/", async (_req: any, res: any) => {
  try {
    const odds = await collections.odds?.find({}).toArray();
    res.status(200).send(odds);
  } catch (error) {
    res.status(500).send(error);
  }
});
oddRouter.get("/:id", async (req: any, res: any) => {
  try {
    const id = req.params.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const odd = await collections.odds?.findOne(query);

    if (odd) {
      res.status(200).send(odd);
    } else {
      res.status(404).send(`Failed to find an odd: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an odd: ID ${req?.params?.id}`);
  }
});
oddRouter.post("/", async (req: any, res: any) => {
  try {
    const odd = req.body;
    const result = await collections.odds?.insertOne(odd);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new odd: ID ${result?.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new odd.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
oddRouter.put("/:id", async (req: any, res: any) => {
  try {
    const id = req?.params?.id;
    const odd = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.odds?.updateOne(query, {
      $set: odd,
    });

    if (result && result.matchedCount) {
      res.status(200).send(`Updated an odd: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an odd: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an odd: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
oddRouter.delete("/:id", async (req: any, res: any) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.odds?.deleteOne(query);

    if (result && result.deletedCount) {
      res.status(202).send(`Removed an odd: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an odd: ID ${id}`);
    } else if (!result.deletedCount) {
      res.status(404).send(`Failed to find an odd: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
