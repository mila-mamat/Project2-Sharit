// Requiring path to so we can use relative routes to our HTML files
var path = require("path");
//format the data displayed on posts
var moment = require('moment');

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
        include :{model: db.User},
        order: [['updatedAt', 'DESC']]
      })
      posts=posts.map(function(post){
        post.dataValues.createdAt=moment(post.createdAt).format('lll');
        return post
      })

      res.render('home',{posts:posts})
    } 
    else res.redirect("/signup-login");
  });


  // TODO: display single post and comments
  app.get("/post/:postId", function (req, res) {

  });

  // TODO: display profile page
  // Must use handlebars
  app.get("/profile", async function (req, res) {

    if (req.user) {
      let userName = `${req.user.first_name} ${req.user.last_name}`
      let currentUserPosts = await db.Post.findAll({
        where : {UserId: req.user.id},
        include : {model: db.User},
      })
       
      res.render('profile', {
        posts: currentUserPosts,
        userName : userName
      })
      
    } 
    else res.redirect("/signup-login");
    

  });

  app.get("/profile/:profileUserName", async function (req, res) {

    if(req.user)
    {// find the user info from the User table
      let userInfo = await db.User.findOne({
        where : {username: req.params.profileUserName}
      })
      // find user name and ID
      let userName = `${userInfo.first_name} ${userInfo.last_name}`
      // extract user information
      let otherUserPosts = await db.Post.findAll({
        where : {UserId: userInfo.id},
        include : {model: db.User}
      })
      // render user's post etc
      res.render('profile', {
        posts: otherUserPosts,
        userName : userName
      })
    }
    // else res.sendFile(path.join(__dirname, "../public/signup-login.html"));
    else res.redirect("/signup-login");


  });

};