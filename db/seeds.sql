-- Seed users table
INSERT INTO users (`username`, `password`, `first_name`, `last_name`, `profile_photo`, `birthdate`, `sex`, `city`, `province`, `country`) VALUES ('jsmith@website.com', 'password123', 'James', 'Smith', null, '2000-01-01', 'Male', 'Ottawa', 'Ontario', 'Canada');
INSERT INTO users (`username`, `password`, `first_name`, `last_name`, `profile_photo`, `birthdate`, `sex`, `city`, `province`, `country`) VALUES ('jjohnson@website.com', 'password123', 'John', 'Johnson', null, '1993-05-23', 'Male', 'Toronto', 'Ontario', 'Canada');
INSERT INTO users (`username`, `password`, `first_name`, `last_name`, `profile_photo`, `birthdate`, `sex`, `city`, `province`, `country`) VALUES ('rwilliams@website.com', 'password123', 'Robert', 'Williams', null, '1988-07-12', 'Male', 'Saskatoon', 'Saskatchewan', 'Canada');
INSERT INTO users (`username`, `password`, `first_name`, `last_name`, `profile_photo`, `birthdate`, `sex`, `city`, `province`, `country`) VALUES ('mbrown@website.com', 'password123', 'Mary', 'Brown', null, '2001-10-16', 'Female', 'Vancouver', 'British Columbia', 'Canada');
INSERT INTO users (`username`, `password`, `first_name`, `last_name`, `profile_photo`, `birthdate`, `sex`, `city`, `province`, `country`) VALUES ('pjones@website.com', 'password123', 'Patricia', 'Jones', null, '1997-09-03', 'Female', 'Montreal', 'Quebec', 'Canada');
INSERT INTO users (`username`, `password`, `first_name`, `last_name`, `profile_photo`, `birthdate`, `sex`, `city`, `province`, `country`) VALUES ('jgarcia@website.com', 'password123', 'Jennifer', 'Garcia', null, '1984-06-22', 'Female', 'Halifax', 'Nova Scotia', 'Canada');

-- Seed posts table
INSERT INTO posts (`post_photo`, `text`, `user_id`) VALUES (null, 'Falcon 9 and Crew Dragon are vertical on the launch pad', 4);
INSERT INTO posts (`post_photo`, `text`, `user_id`) VALUES (null, 'okay, this is epic', 3);
INSERT INTO posts (`post_photo`, `text`, `user_id`) VALUES (null, 'Congratulations to the class of 2020!', 1);
INSERT INTO posts (`post_photo`, `text`, `user_id`) VALUES (null, 'How to take care of yourself during the coronavirus crisis', 2);
INSERT INTO posts (`post_photo`, `text`, `user_id`) VALUES (null, 'Is a 70% marginal tax rate too high?', 3);
INSERT INTO posts (`post_photo`, `text`, `user_id`) VALUES (null, 'A team of Stanford scientists has developed a deep-learning model that maps fuel moisture levels in fine detail across 12 western states. Their data could ultimately help predict wildfires across the region.', 6);

-- Seed comments table
INSERT INTO comments (`text`, `user_id`, `post_id`) VALUES ('Awesome!', 2, 1);
INSERT INTO comments (`text`, `user_id`, `post_id`) VALUES ('what is?', 1, 2);
INSERT INTO comments (`text`, `user_id`, `post_id`) VALUES ('Congrats!', 2, 3);
INSERT INTO comments (`text`, `user_id`, `post_id`) VALUES ('next stop mars!!', 6, 1);
INSERT INTO comments (`text`, `user_id`, `post_id`) VALUES ('yes, duh', 1, 5);
INSERT INTO comments (`text`, `user_id`, `post_id`) VALUES ('No.', 4, 5);


-- Seed likes table
INSERT INTO likes (`user_id`, `post_id`, `comment_id`) VALUES (1, 3, null);
INSERT INTO likes (`user_id`, `post_id`, `comment_id`) VALUES (4, null, 3);
INSERT INTO likes (`user_id`, `post_id`, `comment_id`) VALUES (2, 6, null);
INSERT INTO likes (`user_id`, `post_id`, `comment_id`) VALUES (5, 5, null);
INSERT INTO likes (`user_id`, `post_id`, `comment_id`) VALUES (4, null, 2);
INSERT INTO likes (`user_id`, `post_id`, `comment_id`) VALUES (3, null, 1);

-- Test users table
SELECT * FROM users;

-- Test posts table
SELECT * FROM posts;

-- Test comments table
SELECT * FROM comments;

-- Test likes table
SELECT * FROM likes;