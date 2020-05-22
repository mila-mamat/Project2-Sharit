// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function(app) {

  app.get("/signup-login", function(req, res) {
    // If the user already has an account send them to the home page
    if (req.user) {
      res.redirect("/");
    }
    res.sendFile(path.join(__dirname, "../public/signup-login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/", isAuthenticated, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/home.html"));
  });

  // TODO: display single post and comments
  // Must use handlebares
  app.get("/post/:post-id", function(req, res) {

  });

  // TODO: display profile page
  // Must use handlebars
  app.get("/profile/:user-username", function(req, res) {

  });
};
