// Import dependencies
var db = require("../models");
var passport = require("../config/passport");

module.exports = app => {
  // Route to check if user has valid credentials and if so send to home page
  app.post("/api/login", passport.authenticate("local"), async (req, res) => {
    /* Test */
    console.log(req.user)
    
    res.json(req.user);
  });

  // Route to log user out
  app.get("/logout", async (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route to create user
  app.post("/api/users", async (req, res) => {
    /* Test */
    console.log(req.body)

    try {
      await db.User.create({
        email: req.body.email,
        password: req.body.password
      })
      res.redirect(307, "/api/login");
    } catch (err) {
      res.status(401).json(err);
    }
  });

  // Route to display user info on profile page
  app.get("/api/users/:user-id", async (req, res) => {
    try {
      if (!req.user) {
        // If user is not logged in, return empty object
        res.json({});
      } else {
        // Else return user info
        res.json({
          // TODO: add additional info
          email: req.user.email,
          id: req.user.id
        });
      }
    } catch (err) {
      // TODO: Add error handling
    }   
  });

  // TODO: Route to edit user info on profile page
  app.patch("/api/users/:user-id", async (req, res) => {
    try {

    } catch (err) {

    }
  });

  // TODO: Route to create post on main page
  app.post("/api/posts", async (req, res) => {
    try {
      
    } catch (err) {

    }
  });

  // TODO: Route to display posts on main page
  app.get("/api/posts", async (req, res) => {
    try {
      
    } catch (err) {

    }
  });

  // TODO: Route to display single post on post page
  app.get("/api/posts/:post-id", async (req, res) => {
    try {
      
    } catch (err) {

    }
  });

  // TODO: Route to delete post
  app.delete("/api/posts/:post-id", async (req, res) => {
    try {
      
    } catch (err) {

    }
  });

  // TODO: Route to edit post
  app.patch("/api/posts/:post-id", async (req, res) => {
    try {
      
    } catch (err) {

    }
  });

  // TODO: Route to create comment
  app.post("/api/comments", async (req, res) => {
    try {
      
    } catch (err) {

    }
  });
    
  // TODO: Route to create like
  app.post("/api/likes", async (req, res) => {
    try {
      
    } catch (err) {

    }
  });

  // TODO: Route to delete like
  app.delete("/api/likes/:like-id", async (req, res) => {
    try {
      
    } catch (err) {

    }
  });
};
