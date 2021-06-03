const User = require('./User');
const Post = require('./Post');
const Votes = require('./Votes');
const Comment = require('./Comment');
const Location = require('./Location');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

User.belongsToMany(Post, {
  through: Votes,
  foreignKey: 'user_id'
});

Post.belongsToMany(User, {
  through: Votes,
  foreignKey: 'post_id'
});

Votes.belongsTo(User, {
  foreignKey: 'user_id'
});

Votes.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Vote, {
  foreignKey: 'user_id'
});

Post.hasMany(Votes, {
  foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
  foreignKey: 'post_id'
});

User.hasMany(Comment, {
  foreignKey: 'user_id'
});

Post.hasMany(Comment, {
  foreignKey: 'post_id'
});

Location.hasMany(Post, {
  foreignKey: 'location_id'
});

Post.belongsTo(Location, {
  foreignKey: 'location_id'
});

module.exports = { User, Post, Votes, Comment, Location };