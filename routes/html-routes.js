// Import depenencies
var path = require('path');
var moment = require('moment');
const db = require("../models");
var isAuthenticated = require("../config/middleware/isAuthenticated");
const passport = require('../config/passport');
const Sequelize = require('sequelize');

module.exports = function (app) {
  // Route to sign user up
  app.get("/signup-login", function (req, res) {
    if (req.user) {
      res.render('home');
    } else res.render('signup-login',{}); /* Is {} required? */
  });

  // Route to log user in
  app.post("/login", passport.authenticate("local"), async (req, res) => {
    res.json(req.user);
  });

  // Route to log user out
  app.get("/logout", async (req, res) => {
    req.logout();
    res.redirect("/");
  });

  // Route to render home view
  app.get("/", isAuthenticated, async function (req, res) { 
    if (req.user) {
      let posts = await db.Post.findAll({
        include: {
          model: db.User
        },
        order: [['updatedAt', 'DESC']]
      });
      posts=posts.map(function(post){
        post.dataValues.createdAt=moment(post.createdAt).format('lll');
        return post;
      })
      res.render('home',{posts:posts});
    } else res.redirect("/signup-login");
  });

  // Route to render post view
  app.get("/post/:postId", async function (req, res) {
    if (req.user) {
      const post = await db.Post.findOne({
        where: {
          PostId: req.params.postId
        },
        include: [
          {
            model: db.User
          },
          {
            model: db.PostLike,
            group: ['post_id'],
            attributes: [[Sequelize.fn('COUNT', 'id'), 'count_post_likes']]
          },
          {
            model: db.Comment,
            include: [
              {
                model: db.User
              },
              {
                model: db.CommentLike,
                group: ['comment_id'],
                attributes: [[Sequelize.fn('COUNT', 'id'), 'count_comment_likes']]
              }
            ]
          }
        ]
      });
      res.render('post', {
        post: post
      });
    } else res.redirect("/signup-login");
  });

  // Route to render own profile view
  app.get("/profile", async function (req, res) {
    if (req.user) {
      let fullName = `${req.user.first_name} ${req.user.last_name}`;
      let user = await db.User.findOne({
        where: {
          id: req.user.id
        },
        include: [
          {
            model: db.Post,
            include: [
              {
                model: db.Comment,
                include: [
                  {
                    model: db.CommentLike,
                    group: ['comment_id'],
                    attributes: [[Sequelize.fn('COUNT', 'id'), 'count_comment_likes']]
                  }
                ]
              },
              {
                model: db.PostLike,
                group: ['post_id'],
                attributes: [[Sequelize.fn('COUNT', 'id'), 'count_post_likes']]
              }
            ]
          }
        ]
      });
      res.render('profile', {
        fullName: fullName,
        user: user
      });
    } else res.redirect("/signup-login");
  });

  // Route to render other user's profile view
  app.get("/profile/:userName", async function (req, res) {
    if (req.user) {
      let fullName = `${user.first_name} ${user.last_name}`
      let user = await db.User.findOne({
        where: {
          username: req.params.userName
        },
        include: [
          {
            model: db.Post,
            include: [
              {
                model: db.Comment,
                include: [
                  {
                    model: db.CommentLike,
                    group: ['comment_id'],
                    attributes: [[Sequelize.fn('COUNT', 'id'), 'count_comment_likes']]
                  }
                ]
              },
              {
                model: db.PostLike,
                group: ['post_id'],
                attributes: [[Sequelize.fn('COUNT', 'id'), 'count_post_likes']]
              }
            ]
          }
        ]
      });
      res.render('profile', {
        fullName: fullName,
        user: user
      })
    } else res.redirect("/signup-login");
  });
};