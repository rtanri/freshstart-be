const config = require("dotenv").config();
const express = require("express");
const postRoutes = require("./routes/post");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");
const orderRoutes = require("./routes/orders");
const commentRoutes = require("./routes/comments");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const port = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello Wasdsorld!");
});

app.use(express.json());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ limit: "20mb", extended: true }));
app.use(cors({ origin: "*" }));

app.use(postRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(orderRoutes);
app.use(commentRoutes);

mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
console.log(process.env.DATABASE_URL);
const db = mongoose.connection;
db.on("error", err => console.log(err));
db.once("open", () => console.log("Connected to Mongoose"));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
