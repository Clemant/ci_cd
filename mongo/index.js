const express = require("express");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const app = express();
const URI = process.env.DATABASE;
const DATABASENAME = process.env.DATABASENAME;
const COLLECTION = process.env.COLLECTION;
const CLIENT = new MongoClient(URI);

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    console.log(new Date(), ": Get Request all");
    console.log(req.headers);
    const database = CLIENT.db(DATABASENAME);
    const COLLECTIONNAME = database.collection(COLLECTION);
    const FINDQUERY = await COLLECTIONNAME.find({});
    const RESULT = await FINDQUERY.toArray();
    res.json({
      data: RESULT,
      message: "Success",
    });
  } catch (error) {
    console.error(new Date(), ": ", error);
    res.json({
      data: error,
      message: "Error message",
    });
  } finally {
    // await CLIENT.close();
  }
});

app.listen(3000, () => {
  console.log(new Date(), ": Server is running ...");
});
