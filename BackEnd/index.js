const express = require("express");
const mongoose = require("mongoose"); // new
const routes = require("./routes"); // new
const cors = require("cors");
const https = require("https");
const Odds = require("./models/OddsModel");

const app = express();
app.use(express.json());

// import data to MongoDB
async function importData() {
  try {
    let url =
      "https://api.the-odds-api.com/v4/sports/upcoming/odds/?regions=au&markets=h2h&apiKey=39ba52bb38e2468a773a192b8527cb2b";
    https
      .get(url, (res) => {
        let body = "";

        res.on("data", (chunk) => {
          body += chunk;
        });

        res.on("end", async () => {
          try {
            let json = JSON.parse(body);
            // do something with JSON
            await Odds.deleteMany({});
            await Odds.create(json);
          } catch (error) {
            console.error(error.message);
          }
        });
      })
      .on("error", (error) => {
        console.error(error.message);
      });

    console.log("importData data successfully imported");
    const game = await Odds.findOne();
    console.log("games", game.sport_key);
    // to exit the process
    //process.exit();
    const dateTimeObject = new Date();
    console.log(
      "importData data successfully imported",
      `Date: ${dateTimeObject.toDateString()}`
    );
    console.log(`Time: ${dateTimeObject.toTimeString()}`);
    // to exit the process
    // process.exit();
  } catch (error) {
    console.log("importDataerror", error);
  }
}

mongoose
  .connect("mongodb://127.0.0.1:27017/bettingDB", { useNewUrlParser: true })
  .then(() => {
    //list collections on mongoDb
    // var collections = mongoose.connections[0].collections;
    // var names = [];

    //Object.keys(collections).forEach(function (k) {
    //  names.push(k);
    //});

    //console.log(names);

    const app = express();
    app.use(
      cors({
        origin: "*",
      })
    );
    app.use("/api", routes); // new

    setInterval(importData, 1000 * 3600);

    app.listen(5000, () => {
      console.log("Server has started!");
    });
  });
