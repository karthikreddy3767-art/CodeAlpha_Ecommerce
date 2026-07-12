require("dotenv").config();

const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URI;

console.log("URI Loaded:", uri ? "YES" : "NO");

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected using MongoDB Driver");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();