import * as mongodb from "mongodb";
import { Bet } from "./bet";
import { Odd } from "./odd";
import { User } from "./user";

export const collections: {
  users?: mongodb.Collection<User>;
  odds?: mongodb.Collection<Odd>;
  bets?: mongodb.Collection<Bet>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("sportBettingDB");
  await applySchemaValidation(db);

  const usersCollection = db.collection<User>("users");
  collections.users = usersCollection;
  const oddsCollections = db.collection<Odd>("odds");
  collections.odds = oddsCollections;
  const betsCollections = db.collection<Bet>("bets");
  collections.bets = betsCollections;
}

// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our User model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchemaBet = {
    $jsonSchema: {
      bsonType: "object",
      required: ["UserId", "EventId", "OddId", "Amount"],
      additionalProperties: false,
      properties: {
        _id: {},
        UserId: {
          bsonType: "string",
          description: "'UserId' is required and is a string",
        },
        EventId: {
          bsonType: "string",
          description: "'EventId' is required and is a string",
          minLength: 5,
        },
        OddId: {
          bsonType: "string",
          description: "'OddId' is required and is a string",
          minLength: 5,
        },
        Amount: {
          bsonType: "string",
          description: "'Amount' is required and is a decimal",
          minLength: 5,
        },
      },
    },
  };
  const jsonSchemaOdd = {
    $jsonSchema: {
      bsonType: "object",
      required: ["EventId", "DTM", "Odds"],
      additionalProperties: false,
      properties: {
        _id: {},
        EventId: {
          bsonType: "string",
          description: "'EventId' is required and is a string",
        },
        DTM: {
          bsonType: "string",
          description: "'DTM' is required and is a string",
          minLength: 5,
        },
        Odds: {
          bsonType: "string",
          description: "'Odds' is required and is a string",
          minLength: 5,
        },
      },
    },
  };
  const jsonSchemaUser = {
    $jsonSchema: {
      bsonType: "object",
      required: ["FirstName", "LastName", "Email"],
      additionalProperties: false,
      properties: {
        _id: {},
        FirstName: {
          bsonType: "string",
          description: "'FirstName' is required and is a string",
        },
        LastName: {
          bsonType: "string",
          description: "'LastName' is required and is a string",
          minLength: 5,
        },
        Email: {
          bsonType: "string",
          description: "'Email' is required and is a string",
          minLength: 5,
        },
      },
    },
  };
  // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db
    .command({
      collMod: "users",
      validator: jsonSchemaUser,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("users", { validator: jsonSchemaUser });
      }
    });

  await db
    .command({
      collMod: "odds",
      validator: jsonSchemaOdd,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("odds", { validator: jsonSchemaOdd });
      }
    });

  await db
    .command({
      collMod: "bets",
      validator: jsonSchemaBet,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("bets", { validator: jsonSchemaBet });
      }
    });
}
