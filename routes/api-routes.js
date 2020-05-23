// Import dependencies
const db = require("../models");
const passport = require("../config/passport");

module.exports = app => {
  // Route to authenticate passport and send user to home page
  app.post("/api/login", passport.authenticate("local"), async (req, res) => {
    /* Test */
    console.log(req.user);
    
    res.json(req.user);
  });

  // Route to log user out
  app.get("/logout", async (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route to create user on signup/login page
  app.post("/api/users", async (req, res) => {
    /* Test */
    console.log(req.body);

    try {
      const newUser = await db.User.create({
        username: req.body.username,
        password: req.body.password,
        first_name: req.body.first_name,
        last_name: req.body.last_name
      });
      res.status(201).json(newUser);
    } catch (err) {
      console.log(`POST /api/users failed \n`, err)
      res.status(500).json({ errors: [err] })  
    }
  });

  // TODO: Route to display user info on profile page
  app.get("/api/users/:userId", async (req, res) => {
    try {
     const user = await db.User.findByPk(req.params.userId);
     res.status(200).json({ data: user });
    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`GET /api/users/${req.params.userId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }   
  });

  // TODO: Route to edit user info on profile page
  app.patch("/api/users/:userId", async (req, res) => {
    try {

    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`PATCH /api/users/${req.params.userId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // TODO: Route to create post on main page
  app.post("/api/posts", async (req, res) => {
    try {
      
    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`POST /api/posts failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // TODO: Route to display posts on main page
  app.get("/api/posts", async (req, res) => {
    try {
      
    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`GET /api/posts failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // TODO: Route to display single post on post page
  app.get("/api/posts/:postId", async (req, res) => {
    try {
      
    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`GET /api/posts/postId failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // TODO: Route to delete post
  app.delete("/api/posts/:post-id", async (req, res) => {
    try {
      
    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`DELETE /api/posts/postId failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // TODO: Route to edit post
  app.patch("/api/posts/:post-id", async (req, res) => {
    try {
      
    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`PATCH /api/posts/postId failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // TODO: Route to create comment
  app.post("/api/comments", async (req, res) => {
    try {
      
    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`POST /api/comments failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });
    
  // TODO: Route to create like
  app.post("/api/likes", async (req, res) => {
    try {
      
    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`POST /api/likes failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // TODO: Route to delete like
  app.delete("/api/likes/:like-id", async (req, res) => {
    try {
      
    } catch (err) {
      // TODO: Add statuses based on error type
      console.log(`DELETE /api/likes failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });
};
