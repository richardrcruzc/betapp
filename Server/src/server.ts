const dotenv = require("dotenv");
const cors = require("cors");
import { connectToDatabase } from "./database";
import { userRouter } from "./user.routes";
import { betRouter } from "./bet.routers";
import { oddRouter } from "./odd.routers";
const express = require("express");

// Load environment variables from the .env file, where the ATLAS_URI is configured
dotenv.config();

const URI = process.env.URI as string;
const PORT = process.env.PORT as string;
console.log("URI", URI);
if (!URI) {
  console.error(
    "No ATLAS_URI environment variable has been defined in config.env"
  );
  process.exit(1);
}

connectToDatabase(URI)
  .then(() => {
    const app = express();
    app.use(cors());
    // simple route
    app.get("/", (req: any, res: any) => {
      res.json({ message: "Welcome to betting application." });
    });

    app.use("/users", userRouter);
    app.use("/odds", oddRouter);
    app.use("/bets", betRouter);

    // start the Express server
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}...`);
    });
  })
  .catch((error) => console.error("error:", error));
