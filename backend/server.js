const express = require("express");
const cors = require("cors");
const app = express();
const postRoute = require("./routes/posts");
const PORT = 8000;
const mongoose = require("mongoose");
require("dotenv").config();

app.use(cors());

//データベース接続
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connect DB");
  })
  .catch((err) => {
    console.log(err);
  });

// middleware
app.use(express.json());
app.use("/api/posts", postRoute);

app.get("/", (req, res) => {
  res.send("HELLO");
});

app.listen(PORT, () => console.log("Server"));
