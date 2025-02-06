const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDb");
const cors = require("cors");

const app = express();

// Load environment variables and connect to the database
const PORT = process.env.PORT || 3000;
connectDb();

// Middleware setup
app.use(express.json());
app.use(cors());

// Serve static files from the 'public/images' folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Serve other static files (e.g., public files like HTML, JS, CSS)
app.use(express.static("public"));

// Routes
app.use("/", require("./routes/user"));
app.use("/recipe", require("./routes/recipe"));

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(err);
  } else {
    console.log(`App is listening on port ${PORT}`);
  }
});
