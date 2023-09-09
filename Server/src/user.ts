import * as mongodb from "mongodb";

export interface User {
  FirstName: string;
  LastName: string;
  Email: string;
  Role: "admin" | "user" | "guest";
  PasswordHash: string;
  Balance: string;
  VerifyToken: string;
  dateCreated: number;
}
