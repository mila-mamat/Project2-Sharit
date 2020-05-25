// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
const db = require("../models");

// Requiring our custom middleware for checking if a user is logged in
var isAuthenticated = require("../config/middleware/isAuthenticated");

module.exports = function (app) {

  app.get("/signup-login", function (req, res) {
    // If the user already has an account send them to the home page
    if (req.user) {
      // res.sendFile(path.join(__dirname, "../public/home.html"));              // delete later
      res.render('home')
    } 
    // else res.sendFile(path.join(__dirname, "../public/signup-login.html"));
    else res.render('signup-login',{})
  });

  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page


  app.get("/", isAuthenticated, async function (req, res) { 
    if (req.user) {
      let posts = await db.Post.findAll({
        include :{model: db.User}
      })
      // console.log(posts)
      res.render('home',{posts:posts})
    } 
    // else res.sendFile(path.join(__dirname, "../public/signup-login.html"));
    else res.render('signup-login',{})
  });


  // TODO: display single post and comments
  app.get("/post/:postId", function (req, res) {

  });

  // TODO: display profile page
  // Must use handlebars
  app.get("/profile", function (req, res) {

    if (req.user) {
      let userName = req.user
      res.render('profile', {
        profileName: userName
      })
    } 
    // else res.sendFile(path.join(__dirname, "../public/signup-login.html"));
    else res.render('signup-login',{})
    

  });

  app.get("/profile/:profileID", function (req, res) {

    console.log(req.user.id)
    console
    if(req.user)
    {
      let userName = req.user
      res.render('profile', {
        profileName: userName
      })
    }
    // else res.sendFile(path.join(__dirname, "../public/signup-login.html"));
    else res.render('signup-login',{})


  });

};