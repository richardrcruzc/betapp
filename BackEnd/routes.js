const express = require("express");
var bodyParser = require("body-parser");
const User = require("./models/UserModel");
const Game = require("./models/TodayGameModel");
const Sport = require("./models/SportModel");
const Oddsv3 = require("./models/Oddsv3Model");
const Odds = require("./models/OddsModel");
const Balance = require("./models/BalanceModel");
const Betlist = require("./models/BetlistModel");
const router = express.Router();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//get all odds by league
router.get("/oddsfindOne", async (req, res) => {
  try {
    const game = await Odds.findOne();
    res.send(game);
  } catch {
    res.status(404);
    res.send({ error: "Odds doesn't exist!" });
  }
});

//get all odds by league
router.get("/odds", async (req, res) => {
  try {
    // const games = await Odds.find({ data: req.query.league });
    const games = await Odds.find();
    // const games = await Game.findOne({ _id: "64d7bb5dee2d2f7af5133bf4" });
    res.send(games);
  } catch {
    res.status(404);
    res.send({ error: "Odds doesn't exist!" });
  }
});
// Get all today games
router.get("/oddsbyleague", async (req, res) => {
  try {
    const odds = await Odds.find({ sport_key: req.query.league });
    // const games = await Game.findOne({ _id: "64d7bb5dee2d2f7af5133bf4" });
    res.send(odds);
  } catch {
    res.status(404);
    res.send({ error: "Oddsbyleague doesn't exist!" });
  }
});

//get all odds by league
router.get("/Oddsv3", async (req, res) => {
  try {
    // const games = await Odds.find({ data: req.query.league });
    const games = await Oddsv3.find();
    // const games = await Game.findOne({ _id: "64d7bb5dee2d2f7af5133bf4" });
    res.send(games);
  } catch {
    res.status(404);
    res.send({ error: "Odds doesn't exist!" });
  }
});
// Get all today games
router.get("/gamesbyleagueV3", async (req, res) => {
  try {
    const games = await Game.find({ sport_key: req.query.league });
    // const games = await Game.findOne({ _id: "64d7bb5dee2d2f7af5133bf4" });
    res.send(games);
  } catch {
    res.status(404);
    res.send({ error: "gamesbyleague doesn't exist!" });
  }
});
// Get all today games
router.get("/sports", async (req, res) => {
  try {
    const sports = await Sport.find();
    res.send(sports);
  } catch {
    res.status(404);
    res.send({ error: "sports doesn't exist!" });
  }
});
//Get balance for users
router.get("/balance/:userId", urlencodedParser, async (req, res) => {
  try {
    const balance = await Balance.findOne({ userId: req.params.userId });

    res.send(balance);
  } catch (err) {
    res.status(404);
    res.send({ error: err.message });
  }
});
//Add balance to users
router.post("/balance", jsonParser, async (req, res) => {
  console.log("Balance.body", req.body);
  try {
    const balance = new Balance({
      userId: req.body.userId,
      betAmount: req.body.betAmount,
    });
    await balance.save();
    res.send(balance);
  } catch (err) {
    res.status(404);
    res.send({ error: err.message });
  }
});

//Pull BetList to users
router.get("/betlist/:id", jsonParser, async (req, res) => {
  try {
    const betlist = await Betlist.find({ userId: req.params.id });
    res.send(betlist);
  } catch (err) {
    res.status(404);
    res.send({ betlistError: err.message });
  }
});
//Add BetList to users
router.post("/betlist", jsonParser, async (req, res) => {
  try {
    const bet = new Betlist({
      selectedMatches: req.body.selectedMatches,
      betAmount: req.body.betAmount,
      win: req.body.win,
      time: req.body.time,
      userId: req.body.userId,
    });
    await bet.save();
    res.send(bet);
  } catch (err) {
    res.status(404);
    res.send({ betError: err.message });
  }
});

// Get all USers
router.get("/users", async (req, res) => {
  const users = await User.find();
  res.send(users);
});

// Get USer by email
router.post("/userSigIn", jsonParser, async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("email", email);
  const users = await User.findOne({
    email: email,
    password: password,
  });

  res.send(users);
});

router.post("/users", jsonParser, async (req, res) => {
  console.log("req.body", req.body);
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      date: req.body.date,
    });
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(404);
    res.send({ error: err.message });
  }
});

router.get("/users/:userId", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.userId });
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });

    (user.FirstName = req.body.firstName),
      (user.LastName = req.body.lastName),
      (user.Email = req.body.email),
      (user.Role = req.body.role),
      (user.PasswordHash = req.body.passwordHash),
      (user.Balance = req.body.balance),
      (user.VerifyToken = req.body.verifyToken),
      (user.dateCreated = req.body.dateCreated),
      await user.save();
    res.send(user);
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});

router.delete("/users/:id", urlencodedParser, async (req, res) => {
  try {
    console.log("req.params.id", req.params.id);
    await User.deleteOne({ _id: req.params.id });
    res.status(204).send("deleted");
  } catch {
    res.status(404);
    res.send({ error: "User doesn't exist!" });
  }
});
module.exports = router;
