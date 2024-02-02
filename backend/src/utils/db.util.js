const MongoClient = require("mongodb").MongoClient;

let db;

async function setMongoDBDatabase() {
  await MongoClient.connect(process.env.MONGODB_URL).then((client) => {
    db = client.db(process.env.MONGODB_NAME);
  });
}

async function getMongoDBDatabase() {
  if (!db) await setMongoDBDatabase();
  return db;
}


exports.startMongoDBDatabase = setMongoDBDatabase;
exports.getMongoDBDatabase = getMongoDBDatabase;
