const router = require("express").Router();
const withAuth = require("../utils/auth");

const { User, Posts } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postsData = await Posts.findAll({
      //GETs all posts and joins with user data
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });

    //serializing data
    const posts = postsData.map((post) => post.get({ plain: true }));

    res.render("homepage", {
      posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postsData = await Posts.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });

    const posts = postsData.get({ plain: true });

    res.render("posts", {
      ...posts,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
