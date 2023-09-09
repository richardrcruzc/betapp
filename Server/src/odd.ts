import * as mongodb from "mongodb";

export interface Odd {
  EventId: string;
  DTM: string;
  Odds: string;
  _id?: mongodb.ObjectId;
}
