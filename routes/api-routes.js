// Import dependencies
const db = require('../models');
const path = require('path');
const Sequelize = require('sequelize');

module.exports = app => {
  /*
   *  GET routes
   */

  // Route to display current user
  app.get('/api/user', async (req, res) => {
    try {
      const user = req.user;
      res.status(200).json({ data: user });
    } catch (err) {
      console.log(`GET /api/user failed \n`, err);
      res.status(500).json({ errors: [err] });
    };
  });

  // Route to display users
  app.get('/api/users', async (req, res) => {
    try {
      const users = await db.User.findAll();
      res.status(200).json({ data: users });
    } catch (err) {
      console.log(`GET /api/users failed \n`, err);
      res.status(500).json({ errors: [err] });
    };
  });

  // Route to display specific user
  app.get("/api/users/:userId", async (req, res) => {
    try {
      const user = await db.User.findAll({
        where: {
          id: req.params.userId
        }
      });
      // const user = await db.User.findAll({
      //   where: {
      //     id: req.params.userId
      //   },
      //   attributes: [
      //     'first_name',
      //     'last_name',
      //     'profile_photo',
      //     'birthdate',
      //     'sex',
      //     'city',
      //     'province_state',
      //     'country'
      //   ],
      //   include: [
      //     {
      //       model: db.Post,
      //       attributes: [
      //         'id',
      //         'post_photo',
      //         'text',
      //         'datetime_modified'
      //       ],
      //       include: [
      //         {
      //           model: db.Comment,
      //           attributes: [],
      //           include: [
      //             {
      //               model: db.CommentLike,
      //               group: ['comment_id'],
      //               attributes: [[Sequelize.fn('COUNT', 'id'), 'count_comment_likes']]
      //             }
      //           ]
      //         },
      //         {
      //           model: db.PostLike,
      //           group: ['post_id'],
      //           attributes: [[Sequelize.fn('COUNT', 'id'), 'count_post_likes']]
      //         }
      //       ]
      //     }
      //   ]
      // });
      res.status(200).json({ data: user });
    } catch (err) {
      console.log(`GET /api/users/${req.params.userId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }   
  });

  // Route to display posts
  app.get('/api/posts', async (req, res) => {
    try {
      const posts = await db.Post.findAll();
      res.status(200).json({ data: posts });
    } catch (err) {
      console.log(`GET /api/posts failed \n`, err);
      res.status(500).json({ errors: [err] });
    };
  });

  // Route to display specific post
  app.get("/api/posts/:postId", async (req, res) => {
    try {
      const post = await db.Post.findAll({
        where: {
          id: req.params.postId
        },
        include: [
          {
            model: db.Comment,
            include: [
              {
                model: db.User
              }
            ]
          }
        ]
      });
      // let post = await db.Post.findAll({
      //   where: {
      //     id: req.params.postId
      //   },
      //   attributes: [
      //     'post_photo',
      //     'text',
      //     'datetime_modified'
      //   ],
      //   include: [
      //     {
      //       model: db.Comment,
      //       attributes: [
      //         'id',
      //         'text',
      //         'datetime_modified'
      //       ],
      //       include: [
      //         {
      //           model: db.CommentLike,
      //           group: ['comment_id'],
      //           attributes: [[Sequelize.fn('COUNT', 'id'), 'count_comment_likes']]
      //         },
      //         {
      //           model: db.User,
      //           attributes: [
      //             'first_name',
      //             'last_name'
      //           ]
      //         }
      //       ]
      //     },
      //     {
      //       model: db.PostLike,
      //       group: ['post_id'],
      //       attributes: [[Sequelize.fn('COUNT', 'id'), 'count_post_likes']]
      //     },
      //     {
      //       model: db.User,
      //       attributes: [
      //         'first_name',
      //         'last_name',
      //         'profile_photo'
      //       ]
      //     }
      //   ]
      // });
      res.status(200).json({ data: post });
    } catch (err) {
      console.log(`GET /api/posts/${req.params.postId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to display comments
  app.get('/api/comments', async (req, res) => {
    try {
      const comments = await db.Comment.findAll();
      res.status(200).json({ data: comments });
    } catch (err) {
      console.log(`GET /api/comments failed \n`, err);
      res.status(500).json({ errors: [err] });
    };
  });

  // Route to display specific comment
  app.get('/api/comments/:commentId', async (req, res) => {
    try {
      const comment = await db.comments.findByPk(req.params.commentId);
      res.status(200).json({ data: comment });
    } catch (err) {
      console.log(`GET /api/comments/${req.params.commentId} failed \n`, err);
      res.status(500).json({ errors: [err] });
    };
  });

  // Route to display post likes
  app.get('/api/postLikes', async (req, res) => {
    try {
      const postLikes = await db.PostLike.findAll();
      res.status(200).json({ data: postLikes });
    } catch (err) {
      console.log(`GET /api/postLikes failed \n`, err);
      res.status(500).json({ errors: [err] });
    };
  });

  // Route to display comment likes
  app.get('/api/commentLikes', async (req, res) => {
    try {
      const commentLikes = await db.commentLike.findAll();
      res.status(200).json({ data: commentLikes });
    } catch (err) {
      console.log(`GET /api/commentLikes failed \n`, err);
      res.status(500).json({ errors: [err] });
    };
  });

  /*
   *  POST routes
   */
  
  // Route to create user
  app.post("/api/users", async (req, res) => {
    try {
      const user = await db.User.create(req.body);
      user.profile_photo = '/avatars/profile-placeholder.png';
      user.save() // Is this required?
      res.status(200).json({ data: user });
    } catch (err) {
      console.log(`POST /api/users failed \n`, err)
      res.status(500).json({ errors: [err] })  
    }
  });

  // Route to create post     
  app.post("/api/posts", async (req, res) => {
    req.body.UserId = req.user.id
    try {
      const post = await db.Post.create(req.body);
      if (req.files) {
        const post_photo = req.files.post_photo
        const fileName = `${post_photo.name}`
        await post_photo.mv(path.join(__dirname, '..', 'public', 'postphoto', fileName))
        post.post_photo = `/postphoto/${fileName}`;
        post.save() // Is this required?
      }
      res.status(200).redirect("/");
    } catch (err) {
      console.log(`POST /api/posts failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to create comment
  app.post("/api/comments", async (req, res) => {
    try {
      const comment = await db.Comment.create(req.body);
      req.body.UserId = req.user.id;
      res.status(200).json({ data: comment });
    } catch (err) {
      console.log(`POST /api/comments failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to create post like
  app.post("/api/post-likes", async (req, res) => {    
    try {
      const postLike = await db.PostLike.create(req.body);
      req.body.UserId = req.user.id;
      res.status(200).json({ data: postLike });
    } catch (err) {
      console.log(`POST /api/post-likes failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to create comment like
  app.post("/api/comment-likes", async (req, res) => {
    try {
      const commentLike = await db.CommentLike.create(req.body);
      res.status(200).json({ data: commentLike });
    } catch (err) {
      console.log(`POST /api/comment-likes failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  /*
   *  DELETE routes
   */
 
  // Route to delete post
  app.delete("/api/posts/:postId", async (req, res) => {   
    try {
      let post = await db.Post.findByPk(req.params.postId);
      post = await post.destroy();
      res.status(200).json({ data: post });
    } catch (err) {
      console.log(`DELETE /api/posts/${req.params.postId} failed \n`, err)
      res.status(500).json({ errors: [err] }) 
    }
  });

  // Route to delete post like
  app.delete("/api/post-likes/:postLikeId", async (req, res) => {
    try {
      let postLike = await db.PostLike.findByPk(req.params.postLikeId);
      postLike = await postLike.destroy();
      res.status(200).json({ data: postLike });
    } catch (err) {
      console.log(`DELETE /api/post-likes/${req.params.postLikeId} failed \n`, err)
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

  /*
   *  PATCH routes
   */

  // Route to update user
  app.patch("/api/users/:userId", async (req, res) => {
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

  // Route to edit post
  app.patch("/api/posts/:postId", async (req, res) => {
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
};
