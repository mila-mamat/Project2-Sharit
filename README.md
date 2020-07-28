# SharIt!
Life is beautiful - share it!

![GitHub repo size](https://img.shields.io/github/repo-size/mila-mamat/Project2-Sharit)
![GitHub top language](https://img.shields.io/github/languages/top/mila-mamat/Project2-Sharit)
![GitHub last commit](https://img.shields.io/github/last-commit/mila-mamat/Project2-Sharit)

## Team members
Mila Mamat: https://github.com/mila-mamat

Matthew Southcott: https://github.com/mjsouthcott

MaxGuo: https://github.com/Maxguojiaqi


## Table of Contents

* [Description](#description)
* [Technologies Used](#technologies-used)
* [User Story](#user-story)
* [Installation](#installation)
* [Usage](#usage)
* [License](#licence)
* [Contributing](#contributing)

## Description

This is a mobile-first web application that allows users to create and edit a profile, create posts with photos (optional), like and add comments to posts, and view other users' profiles and posts. User data is stored securely in a MySql database and rendered to the browser window using Handlebars views. Request and response routing is handled using HTTP.

## Technologies Used

* `HTML5`
* `CSS3`
* `Javascript`
* `Bulma`
* `jQuery`
* `Node.js`
* `SQL`
* Various `npm` Packages
  * `bcryptjs`
  * `to-case`
  * `express`
  * `express-fileupload`
  * `express-session`
  * `moment`
  * `mysql2`
  * `passport-local`
  * `sequelize`

## User Story

```
AS A user
I WANT to share photos and posts
SO THAT I can keep in touch with the people that I care about
```


### Usage

1. sign-up and login
<img src="https://github.com/mila-mamat/Project2-Sharit/blob/master/demo/signup.gif"  width="800" height="400">


2. create new post, like and comment others post
<img src="https://github.com/mila-mamat/Project2-Sharit/blob/master/demo/post.gif"  width="800" height="400">


3. update own profile, view others profile
<img src="https://github.com/mila-mamat/Project2-Sharit/blob/master/demo/profile.gif"  width="800" height="400">

## Installation

To install the application, click "Clone or download", copy the URL, launch Git Bash, navigate to your desired directory and use
```
git clone
```
followed by the copied URL.

To launch the deployed application, click the following link: https://sharit-social-platform.herokuapp.com/signup-login.

## Usage

Launch Git Bash and navigate to the application's root directory. Once there, use
```
npm install
```
to install the dependencies, followed by
```
node server.js
```
to run the application. Open a browser window and go to
```
https://localhost:8080
```

## Licence

MIT License

Copyright (c) 3M

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

## Contributing

Feel free to email me if you'd like to contribute.
