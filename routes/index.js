module.exports = function(app) {
     // Importing routes
     const homeRoutes = require("./home")
     const authRoutes = require("./auth");
     const errorRoutes = require("./not-found");

     // Using routes
     app.use("/", homeRoutes);
     app.use("/auth", authRoutes);

     // Invalid route
     app.use("*", errorRoutes);

}