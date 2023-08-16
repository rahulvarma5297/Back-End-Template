const usersRouter = require("./routes/users.js");

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const url = process.env.MONGO_URL;
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not Connected to MongoDB", err);
  });

// MVC -> Model View Controller
app.use("/users", usersRouter);

app.listen(5000, () => console.log("Server running on port 5000"));
