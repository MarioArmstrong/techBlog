const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Posts = require("./Posts");
const User = require("./User");

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      references: {
        model: User,
        key: "id",
        unique: false,
      },
    },
    post_id: {
      references: {
        model: Posts,
        key: "id",
        unique: false,
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "comment",
  }
);

module.exports = Comment;
