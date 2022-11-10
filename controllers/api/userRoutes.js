const router = require("express").Router();
const { User } = require("../../models");

//GET - Retrieve All Post
router.get("/", async (req, res) => {
  try {
    const userData = await User.findAll();
    res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST - CREATE User
router.post("/", async (req, res) => {
  try {
    const userData = await User.create({
      user_name: req.body.name,
      user_email: req.body.email,
      user_password: req.body.password,
    });

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//POST login User
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({
      where: { user_email: req.body.email },
    });

    if (!userData) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: "Incorrect email or password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

//POST logout User
router.post("/logout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(200).json({ message: "You have logged out!" });
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
