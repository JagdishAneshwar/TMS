const connToMongo = require("./conn");
const { port } = require("./config");
const express = require("express");
var cors = require("cors");
const app = express();
connToMongo();

// to use request.body
app.use(express.json());
app.use(cors());

// Available routes
app.use("/api/auth", require("./src/routes/auth"));
app.use("/api/user",require("./src/routes/user"));
app.use("/api/task", require("./src/routes/tasks"));
app.use("/api/location", require("./src/routes/location"));
app.use("/api/attendance", require("./src/routes/attendance"));

app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});

