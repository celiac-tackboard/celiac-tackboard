
# Celiac Tackboard

## Description
This website serves as a community board for members to share their thoughts on gluten-free food, products, and services in Wisconsin.  Posts are separated by city to easily find information for the location you are in or are going to visit.  Users can add a link to an external site, or a rating to their post if they choose to, or they can omit a link and rating for a general discussion.  Users are able to comment on posts as well as upvote posts that they like.  On the users profile page they can view all of their previous posts and comments as well as create a new post. 
## Table of Contents
  * [Installation](#Installation)
  * [Usage](#Usage)
  * [Contribution](#Contribution)
  * [Tests](#Tests)
  
  * [Contact](#Questions)
## Installation
To install this application locally clone the repository to your machine.  You must install dependencies by running the command `npm install`.  In the /config/connection.js file, you must update the sequelize connection to use your own mysql username, password, and database.  Locations must be added to database through the MySQL shell.  In the MySQL shell use the command `INSERT INTO location (city_name, state) Values ('Madison', 'WI'), ('Milwaukee', 'WI'), ('Kenosha', 'WI'), ('Beloit'), 'WI');` to populate the location table.  To start your local server run the command 'npm start'.  You should now be able to visit http://localhost:3001 in your browser to use the website.  Here are links to the documentation for technologies that are used.  This app is also deployed on [Heroku](https://polar-brook-06864.herokuapp.com/).
* [express](https://www.npmjs.com/package/express)
* [nodeJS](https://nodejs.org/en/docs/)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [bulma css framework](https://bulma.io/)
* [MySQL](https://www.npmjs.com/package/mysql2)
* [sequelize](https://www.npmjs.com/package/sequelize)
* [starry-rating](https://www.npmjs.com/package/starry-rating)
## Usage
First you must either login or signup on the login page. ![Login page](/public/images/screenshots/login.png)  Once logged in you can view all of the posts on the homepage.  To view all of the posts for a specific city click on that city's button on the lefthand side of the page.  ![homepage](/public/images/screenshots/homepage.png)  You will then be redirected to a page that displays all of the posts for that city.  ![location](/public/images/screenshots/location.png)  You can click on home in the navbar to be taken back to the homepage and can select a different city to view.  If you click on the title of a post you will be taken to that single posts page.  There you can view all of that posts comments.  You can add a comment if you type it in the text area and click the "submit Comment" button.  You can also upvote the post by clicking the "Upvote" button.  ![single post](/public/images/screenshots/single-post.png)  If you click on profile in the navbar you will be taken to a page that displays all your posts.  On that page you can click on the text input that is labeled "create a post" to be directed to the page that allows you to create a post.  You can also click on the button that says "View your comments" to be taken to a page that displays all of your comments.  ![profile page posts](/public/images/screenshots/profile-posts.png)  ![profile comments](/public/images/screenshots/profile-comments.png)  On the create a post page you can fill out the form for a new post.  Location, title, description are all required and the link and rating are optional.  To submit the post click on the submit button.  To log out of the site simply click on the log out button on the navbar.  ![create a post](/public/images/screenshots/create-a-post.png)
## Contribution
Only the owners of the site are allowed to contribute to the project.
## Tests
Testing of all the routes can be done in the Insomnia app.  Enter the endpoint and what kind of method you are testing.  Enter the body into the body section as JSON and press send.

## Questions
GitHub: srwagner916<br>
Email: <srwagner916@gmail.com>

GitHub: dcheever88<br>
Email: <cheeverdanny@gmail.com>

GitHub: Vasilyg10<br>
Email: <zvgianna@gmail.com>

GitHub: allanp94<br>
Email: <allan.p94@gmail.com>
