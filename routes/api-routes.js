// Import dependencies
const db = require("../models");
const passport = require("../config/passport");

//add img
const path = require('path')

module.exports = app => {
  // Route to authenticate passport and send user to home page
  app.post("/api/login", passport.authenticate("local"), async (req, res) => {
    /* Test */
    // console.log(req.user);
    
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
      const user = await db.User.create(req.body);
      
      //add default profile photo
      user.profile_photo = `/avatars/profile-placeholder.png`;
      user.save()

      res.status(200).json({ data: user });
    } catch (err) {
      console.log(`POST /api/users failed \n`, err)
      res.status(500).json({ errors: [err] })  
    }
  });

  // Route to display user info on profile page
  app.get("/api/users/:userId", async (req, res) => {
    /* Test */
    console.log(req.body);

    try {
      const user = await db.User.findAll({
        where: {
          id: req.params.userId
        },
        attributes: [
          'first_name',
          'last_name',
          'profile_photo',
          'birthdate',
          'sex',
          'city',
          'province_state',
          'country'
        ],
        include: [
          {
            model: db.Post,
            attributes: [
              'id',
              'post_photo',
              'text',
              'datetime_modified'
            ],
            include: [
              {
                model: db.Comment,
                attributes: [],
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
      res.status(200).json({ data: user });
    } catch (err) {
      console.log(`GET /api/users/${req.params.userId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }   
  });

  // Route to edit user info on profile page
  app.patch("/api/users/:userId", async (req, res) => {
    /* Test */
    console.log(req.body);
    try {
      let user = await db.User.findByPk(req.params.userId);
      if (!user) return res.status(404).json({ errors: [{ title: 'Not found' }] });
      user = await db.User.update(req.body);
      res.status(200).json({ data: user });
    } catch (err) {
      console.log(`PATCH /api/users/${req.params.userId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to create post on main page         
  app.post("/api/posts", async (req, res) => {
    req.body.UserId = req.user.id
    
    try {
      const post = await db.Post.create(req.body);
      if (req.files) {
        const post_photo = req.files.post_photo
        // Prepend the fileName with the User.id to prevent naming collisions
        // with other users uploading files with the same name.
        const fileName = `${post_photo.name}`
        // Move the file from the tmp location to the public folder.
        await post_photo.mv(path.join(__dirname, '..', 'public', 'postphoto', fileName))
        // Record the public URL on the User model and store it in the database.
        post.post_photo = `/postphoto/${fileName}`;
        post.save()
      }
      res.status(200).redirect("/");
    } catch (err) {
      console.log(`POST /api/posts failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });



  // Route to display single post on post page
  app.get("/api/posts/:postId", async (req, res) => {
    /* Test */
    console.log(req.body);
    
    try {
      let post = await db.Post.findAll({
        where: {
          id: req.params.postId
        },
        attributes: [
          'post_photo',
          'text',
          'datetime_modified'
        ],
        include: [
          {
            model: db.Comment,
            attributes: [
              'id',
              'text',
              'datetime_modified'
            ],
            include: [
              {
                model: db.CommentLike,
                group: ['comment_id'],
                attributes: [[Sequelize.fn('COUNT', 'id'), 'count_comment_likes']]
              },
              {
                model: db.User,
                attributes: [
                  'first_name',
                  'last_name'
                ]
              }
            ]
          },
          {
            model: db.PostLike,
            group: ['post_id'],
            attributes: [[Sequelize.fn('COUNT', 'id'), 'count_post_likes']]
          },
          {
            model: db.User,
            attributes: [
              'first_name',
              'last_name',
              'profile_photo'
            ]
          }
        ]
      });
      res.status(200).json({ data: post });
    } catch (err) {
      console.log(`GET /api/posts/postId failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to delete post
  app.delete("/api/posts/:postId", async (req, res) => {
    /* Test */
    console.log(req.body);
    
    try {
      let post = await db.Post.findByPk(req.params.postId);
      post = await post.destroy();
      res.status(200).json({ data: post });
    } catch (err) {
      console.log(`DELETE /api/posts/${req.params.postId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to edit post
  app.patch("/api/posts/:postId", async (req, res) => {
    /* Test */
    console.log(req.body);
    
    try {
      let post = await db.Post.findByPk(req.params.postId);
      if (!post) return res.status(404).json({ errors: [{ title: 'Not found' }] });
      post = await db.Post.update(req.body);
      res.status(200).json({ data: post });
    } catch (err) {
      console.log(`PATCH /api/posts/${req.params.postId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to create comment
  app.post("/api/comments", async (req, res) => {
    /* Test */
    console.log(req.body);
    
    try {
      const comment = await db.Comment.create(req.body);
      res.status(200).json({ data: comment });
    } catch (err) {
      console.log(`POST /api/comments failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });
    
  // Route to create post like
  app.post("/api/post-likes", async (req, res) => {
    /* Test */
    console.log(req.body);
    
    try {
      const postLike = await db.PostLike.create(req.body);
      res.status(200).json({ data: postLike });
    } catch (err) {
      console.log(`POST /api/post-likes failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to delete post like
  app.delete("/api/post-likes/:postLikeId", async (req, res) => {
    /* Test */
    console.log(req.body);
    
    try {
      let postLike = await db.PostLike.findByPk(req.params.postLikeId);
      postLike = await postLike.destroy();
      res.status(200).json({ data: postLike });
    } catch (err) {
      console.log(`DELETE /api/post-likes/${req.params.postLikeId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

   // Route to create comment like
   app.post("/api/comment-likes", async (req, res) => {
    /* Test */
    console.log(req.body);
    
    try {
      const commentLike = await db.CommentLike.create(req.body);
      res.status(200).json({ data: commentLike });
    } catch (err) {
      console.log(`POST /api/comment-likes failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to delete comment like
  app.delete("/api/comment-likes/:commentLikeId", async (req, res) => {
    /* Test */
    console.log(req.body);
    
    try {
      let commentLike = await db.CommentLike.findByPk(req.params.commentLikeId);
      commentLike = await commentLike.destroy();
      res.status(200).json({ data: commentLike });
    } catch (err) {
      console.log(`DELETE /api/post-likes/${req.params.commentLikeId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });
};