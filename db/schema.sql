-- Drop sharit_db database if it exists
DROP DATABASE IF EXISTS sharit_db;

-- Create shareit_db database and select it for use
CREATE DATABASE sharit_db;
USE sharit_db;

-- Create users table
CREATE TABLE `users`
(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
  `username` VARCHAR (30) NOT NULL,
  `password` VARCHAR (30) NOT NULL,
  `first_name` VARCHAR (60) NOT NULL,
  `last_name` VARCHAR (60) NOT NULL,
  `profile_photo` BLOB,
  `birthdate` DATE,
  `sex` VARCHAR (30),
  `city` VARCHAR (60),
  `province` VARCHAR (60),
  `country` VARCHAR (60),
  PRIMARY KEY (`id`)
);

-- Create posts table
CREATE TABLE `posts`
(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
  `post_photo` BLOB,
  `text` VARCHAR (255) NOT NULL,
  `user_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- Create comments table
CREATE TABLE `comments`
(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`text` VARCHAR (255) NOT NULL,
	`user_id` INTEGER NOT NULL,
  `post_id` INTEGER NOT NULL,
  PRIMARY KEY (`id`)
);

-- Create likes table
CREATE TABLE `likes`
(
	`id` INTEGER NOT NULL AUTO_INCREMENT,
	`user_id` INTEGER NOT NULL,
  `post_id` INTEGER,
  `comment_id` INTEGER,
  PRIMARY KEY (`id`)
);