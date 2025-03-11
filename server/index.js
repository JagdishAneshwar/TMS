const connToMongo = require("./conn");

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
app.use("/api/leave", require("./src/routes/leave"));
app.use("/api/attendance", require("./src/routes/attendance"));
app.use("/api/event", require("./src/routes/event"));
app.get('/', cors(), (req, res)=>{ res.json("Hello") })

app.listen(process.env.PORT || port, () => {
  console.log(`Server is running on port:${port}`);
});


