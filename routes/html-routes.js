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
        return post;
      });
      res.render("home", { posts: posts });
    } else res.redirect("/signup-login");
  });

  // Route to render post view
  app.get("/post/:postId", async function (req, res) {
    if (req.user) {
      const post = await db.Post.findOne({
        where: {
          PostId: req.params.postId,
        },
        include: [
          {
            model: db.User,
          },
          {
            model: db.PostLike,
            group: ["PostId"],
            attributes: [[Sequelize.fn("COUNT", "id"), "count_post_likes"]],
          },
          {
            model: db.Comment,
            include: [
              {
                model: db.User,
              },
              {
                model: db.CommentLike,
                group: ["CommentId"],
                attributes: [
                  [Sequelize.fn("COUNT", "id"), "count_comment_likes"],
                ],
              },
            ],
            order: [["updatedAt", "DESC"]],
          },
        ],
      });
      res.render("post", {
        post: post,
      });
    } else res.redirect("/signup-login");
  });

  // Route to render own profile view
  app.get("/profile", async function (req, res) {
    if (req.user) {
      let fullName = `${req.user.first_name} ${req.user.last_name}`;
      let user = await db.User.findOne({
        where: {
          id: req.user.id,
        },
        include: [
          {
            model: db.PostLike,
            group: ["PostId"],
            attributes: [[Sequelize.fn("COUNT", "id"), "count_post_likes"]],
          },
          {
            model: db.Comment,
            group: ["PostId"],
            attributes: [[Sequelize.fn("COUNT", "id"), "count_comments"]],
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
      res.render("profile", {
        fullName: fullName,
        user: user,
      });
    } else res.redirect("/signup-login");
  });

  // Route to render other user's profile view
  app.get("/profile/:userName", async function (req, res) {
    console.log(req.user);
    if (req.user) {
      let fullName = `${user.first_name} ${user.last_name}`;
      let user = await db.User.findOne({
        where: {
          id: req.user.id,
        },
        include: [
          {
            model: db.PostLike,
            group: ["PostId"],
            attributes: [[Sequelize.fn("COUNT", "id"), "count_post_likes"]],
          },
          {
            model: db.Comment,
            group: ["PostId"],
            attributes: [[Sequelize.fn("COUNT", "id"), "count_comments"]],
          },
        ],
        order: [["updatedAt", "DESC"]],
      });
      res.render("profile", {
        fullName: fullName,
        user: user,
      });
    } else res.redirect("/signup-login");
  });
};
