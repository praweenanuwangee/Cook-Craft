const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const connectDb = require("./config/connectionDB");
const cors =require("cors")

const PORT = process.env.PORT || 3000;

// Check if the .env variables are loaded correctly
if (!process.env.CONNECTION_STRING) {
  console.error("MongoDB connection string is missing in .env file");
  process.exit(1);
}

// Connect to the database
connectDb();


// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/",require("./routes/user"))
app.use("/recipe", require("./routes/recipe"));

// Start the server
app.listen(PORT, (err) => {
  if (err) {
    console.error(`Error starting server: ${err.message}`);
  } else {
    console.log(`App is listening on port ${PORT}`);
  }
});
