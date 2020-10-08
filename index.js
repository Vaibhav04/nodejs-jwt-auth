const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");


const {PORT, DB_PATH} = require("./config");
// Set view engine
app.set("view engine", "ejs");

// Get url encoded data
app.use(express.json());
app.use(cookieParser())

// Importing routes
const initializeRoutes = require("./routes");
initializeRoutes(app);


app.listen(PORT, async() => {
     try {
          await mongoose.connect(DB_PATH)
          console.log("connected to db and server");
     } catch (error) {
          console.log(error);
     }
})