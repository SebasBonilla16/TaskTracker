require("./database/connect");
const express = require("express");
const app = express();
const tasks = require("./routes/tasks");
const connectDB = require("./database/connect");
require("dotenv").config();
const notFound = require("./middleware/notFound");
//middleware
app.use(express.static("./main"));
app.use(express.json());

//routes
app.use("/api/v1/tasks", tasks);

app.use(notFound);

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listening on ${port}...`));
  } catch (error) {
    console.log("oops!");
  }
};

start();