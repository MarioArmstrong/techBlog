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
      posts, //this is an array
      logged_in: req.session.logged_in,
      loggedInUID: req.session.user_id,
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

router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [{ model: Posts }],
    });

    const user = userData.get({ plain: true });

    res.render("profile", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//directly below is the actual route for "/signup"
router.get("/signup", async (req, res) => {
  try {
    res.render("signup"); //this is the handlebars template
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

module.exports = router;
