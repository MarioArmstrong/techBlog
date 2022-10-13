const sequelize = require("../config/connection");
const postData = require("./postData.json");
const commentData = require("./commentData.json");
const userData = require("./userData.json");

const { Posts } = require("../models");
const { Comment } = require("../models");
const { User } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  for (const posts of postData) {
    await Posts.create({
      ...posts,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }
  console.log(commentData);
  for (const comments of commentData) {
    await Comment.create({
      ...comments,
      user_id: users[Math.floor(Math.random() * users.length)].id,
    });
  }

  process.exit(0);
};

seedDatabase();
