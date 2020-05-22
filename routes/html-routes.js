// Requiring path to so we can use relative routes to our HTML files
var path = require("path");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/signup-login", function (req, res) {
    // If the user already has an account send them to the home page
    if (req.user) {
      // res.sendFile(path.join(__dirname, "../public/home.html"));              // delete later
      res.render('home.handlebars')
    } else res.sendFile(path.join(__dirname, "../public/signup-login.html"));
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page

  app.get("/|/home", isAuthenticated, function (req, res) {                      // if it is "/" or "/home"
    if (req.user) {
      // res.sendFile(path.join(__dirname, "../public/home.html"));              // delete later
      res.render('home.handlebars')
    } else res.sendFile(path.join(__dirname, "../public/signup-login.html"));
  });


  // app.get("/home", isAuthenticated, function (req, res) {
  //   if (req.user) {
  //     // res.sendFile(path.join(__dirname, "../public/home.html"));
  //     res.render('home.handlebars')
  //   } else res.sendFile(path.join(__dirname, "../public/signup-login.html"));
  // });




  // TODO: display single post and comments
  app.get("/post/:postId", function (req, res) {

  });

  // TODO: display profile page
  // Must use handlebars
  app.get("/profile/:username", function (req, res) {
    let profileName = req.params.username
    console.log(profileName)
    res.render('index', {
      profileName
    })

  });
};