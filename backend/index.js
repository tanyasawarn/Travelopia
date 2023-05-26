// import dependencies
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/config");

// import routes
const userRoutes = require("./routes/user.routes");
const destinationRoutes = require("./routes/destination.routes");

// create an instance of the express app
const app = express();

// set up middleware
app.use(cors());
app.use(express.json());

// connect to the MongoDB database using Mongoose
mongoose.connect(config.db.uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// verify the connection to the MongoDB database
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => console.log("Connected to MongoDB database"));

// define a route for the homepage
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

// define routes for user operations
app.use("/user", userRoutes);

// define routes for destination operations
app.use("/destination", destinationRoutes);

// handle errors using Express' built-in error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal server error");
});

// start the server
const PORT = config.server.port;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
