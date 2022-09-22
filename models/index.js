const Comment = require("./Comment");
const User = require("./User");
const Posts = require("./Posts");

User.hasMany(Comment, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

User.hasMany(Posts, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Comment.belongsTo(Posts, {
  foreignKey: "post_id",
});

Posts.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "SET NULL",
});

Posts.hasMany(Comment, {
  foreignKey: "post_id",
  onDelete: "CASCADE",
});
module.exports = {
  Comment,
  User,
  Posts,
};
