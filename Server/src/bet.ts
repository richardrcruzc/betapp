import * as mongodb from "mongodb";

export interface Bet {
  UserId?: string;
  EventId?: string;
  OddId?: string;
  Amount?: number;
  EstimatedProfit?: number;
  OnTeam?: string;
  Status?:
    | "Pending"
    | "Submitted"
    | "PartiallyExecuted"
    | "Executed"
    | "Completed"
    | "PendingCancel"
    | "Cancelled"
    | "PendingUser"
    | "PendingFriend"
    | "Active"
    | "Declined";
  FriendId?: string;
  DTM?: string;
  Won?: boolean;
  _id?: mongodb.ObjectId;
}
