require("dotenv").config();
require("express-async-errors");

const express = require("express");
const mongoose = require("mongoose");
const database = mongoose.connection;
const app = express();
const mainRouter = require("./routes/main");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// middleware
app.use(express.static('./public'));
app.use(express.json());
app.use('/api/v1', mainRouter);
app.get("/", (req, res) => {
  res.send("hello");
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

mongoose.connect(process.env.MONGO_URL);

database.on("error", (error) => {
  console.log(error);
});
database.once("connected", () => {
  console.log("Datbase is connected");
});

const port = process.env.PORT || 3000;



const start = async () => {
  try {
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
