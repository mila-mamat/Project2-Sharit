// Import depenencies
var path = require("path");
var moment = require("moment");
const db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
const passport = require("../config/passport");
const Sequelize = require("sequelize");

module.exports = function (app) {
  // Route to sign user up
  app.get("/signup-login", function (req, res) {
    if (req.user) {
      res.redirect("/"); // should redirect to home page, not render the home page without content
    } else res.render("signup-login", {}); /* Is {} required? */
  });

  // Route to log user in
  app.post("/login", passport.authenticate("local"), async (req, res) => { //what is this? we dont have a login page
    res.json(req.user);
  });

  // Route to log user out
  app.get("/logout", async (req, res) => {
    //is async required?
    req.logout();
    res.redirect("/signup-login"); //should be directed to login page, not home page
  });

  // Route to render home view
  app.get("/", isAuthenticated, async function (req, res) {
    if (req.user) {
      let posts = await db.Post.findAll({
        include: [
          {
            model: db.User,
          },
          {
            model: db.Comment,
          },
          {
            model: db.PostLike,
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
      posts = posts.map(function (post) {
        post.dataValues.createdAt = moment(post.createdAt).format("lll"); //format time stamp
        post.dataValues.commentNum = post.Comments.length; //count the comments and likes
        post.dataValues.likeNum = post.PostLikes.length;
        let obj = post.PostLikes.find(o => o.UserId == req.user.id);
        if(obj) post.dataValues.isLikedBefore = true
        return post;
      });
      posts.currentUser = req.user.username
      res.render("home", { posts: posts });
    } else res.redirect("/signup-login");
  });

  // Route to render post view
  app.get("/post/:postId", async function (req, res) {
    if (req.user) {
      const post = await db.Post.findOne({
        where: {
          id: req.params.postId,
        },
        include: [
          {
            model: db.User,
          },
          {
            model: db.PostLike,
          },
        ],
      });
      const comments = await db.Comment.findAll({
        where: {
          PostId: req.params.postId
        },
        include: [
          {
            model: db.User
          }
        ],
        order: [["updatedAt", "ASC"]],
      });
      // attach current user to the post object
      post.currentUser = req.user.username
      res.render("post", {
        post: post,
        comments: comments
      });
    } else res.redirect("/signup-login");
  });


  // Route to render own profile view       // not polished yet
  app.get("/profile/:userName", async function (req, res) {
    if (req.user) {
      // let fullName = `${req.user.first_name} ${req.user.last_name}`;
      let userInfo = await db.User.findOne({
        where: {
          username: req.params.userName,
        },
        include: [
          {
            model: db.Post,
          },
          {
            model: db.Comment,
          },
          {
            model: db.PostLike,
          },
        ],
        order: [["updatedAt", "DESC"]],
    
      });

      let posts = await db.Post.findAll({
        where: {
          Userid: req.user.id,
        },
        include: [
          {
            model: db.User,
          },
          {
            model: db.Comment,
          },
          {
            model: db.PostLike,
          },
        ],
        order: [["updatedAt", "DESC"]],
      });

      posts = posts.map(function (post) {
        post.dataValues.createdAt = moment(post.createdAt).format("lll"); //format time stamp
        post.dataValues.commentNum = post.Comments.length; //count the comments and likes
        post.dataValues.likeNum = post.PostLikes.length;
        let obj = post.PostLikes.find(o => o.UserId == req.user.id);
        if(obj) post.dataValues.isLikedBefore = true
        return post;
      });
         // validate if viewing own profile or others
      userInfo.dataValues.isProfileOwner = false
      if(userInfo.dataValues.id==req.user.id){
        userInfo.dataValues.isProfileOwner = true;
      }
      console.log(userInfo.dataValues.Posts)
      userInfo.Posts = userInfo.Posts.map(function (post) {
        post.dataValues.createdAt = moment(post.createdAt).format("lll"); //format time stamp
        return post;
      });
      // attach current user to the userinfo object
      userInfo.currentUser = req.user.username
      res.render("profile", {userInfo, posts});
    } else res.redirect("/signup-login");
  });


};
