const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const postRoutes = require("./routes/posts");

const app = express();

// MongoDB Connection
mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

// Routes
app.get("/", (req, res) => {
  res.render("landing"); // Render the landing page
});

app.use("/posts", postRoutes); // Post routes for CRUD operations

// Start Server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
