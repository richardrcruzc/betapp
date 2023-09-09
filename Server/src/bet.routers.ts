import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database";

export const betRouter = express.Router();
betRouter.use(express.json());

betRouter.get("/", async (_req, res) => {
  try {
    const bets = await collections.bets?.find({}).toArray();
    res.status(200).send(bets);
  } catch (error) {
    res.status(500).send(error);
  }
});
betRouter.get("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const bet = await collections.bets?.findOne(query);

    if (bet) {
      res.status(200).send(bet);
    } else {
      res.status(404).send(`Failed to find an bet: ID ${id}`);
    }
  } catch (error) {
    res.status(404).send(`Failed to find an bet: ID ${req?.params?.id}`);
  }
});
betRouter.post("/", async (req, res) => {
  try {
    const bet = req.body;
    const result = await collections.bets?.insertOne(bet);

    if (result?.acknowledged) {
      res.status(201).send(`Created a new bet: ID ${result?.insertedId}.`);
    } else {
      res.status(500).send("Failed to create a new bet.");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
betRouter.put("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const bet = req.body;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.bets?.updateOne(query, {
      $set: bet,
    });

    if (result && result?.matchedCount) {
      res.status(200).send(`Updated an bet: ID ${id}.`);
    } else if (!result?.matchedCount) {
      res.status(404).send(`Failed to find an bet: ID ${id}`);
    } else {
      res.status(304).send(`Failed to update an bet: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
betRouter.delete("/:id", async (req, res) => {
  try {
    const id = req?.params?.id;
    const query = { _id: new mongodb.ObjectId(id) };
    const result = await collections.bets?.deleteOne(query);

    if (result && result?.deletedCount) {
      res.status(202).send(`Removed an bet: ID ${id}`);
    } else if (!result) {
      res.status(400).send(`Failed to remove an bet: ID ${id}`);
    } else if (!result?.deletedCount) {
      res.status(404).send(`Failed to find an bet: ID ${id}`);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});
