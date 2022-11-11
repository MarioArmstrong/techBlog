const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const User = require("./User");

class Posts extends Model {}

Posts.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    post_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
        unique: false,
      },
      //WHY DOESN'T THIS WORK?
      //   user_name: {
      //     type: DataTypes.STRING,
      //     references: {
      //       model: User,
      //       key: "user_name",
      //       unique: false,
      //     }
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "posts",
  }
);

module.exports = Posts;
