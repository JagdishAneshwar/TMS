const mongo = require("mongoose");


const mongoURI = "mongodb+srv://skstech:gJ68ZxFEc40CbyJG@cluster0.ynec5u4.mongodb.net/";

const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connToMongo = async () => {
  await mongo.connect(mongoURI, connectionParams).then(() => {
    console.log("Successfully! connected with database");
  });
};

module.exports = connToMongo;