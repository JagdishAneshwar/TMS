const mongo = require("mongoose");


const mongoURI = process.env.MONGODB_URI;



const connToMongo = async () => {
  await mongo.connect(mongoURI).then(() => {
    console.log("Successfully! connected with database");
  });
};

module.exports = connToMongo;
