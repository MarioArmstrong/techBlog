const router = require("express").Router();
const { Posts } = require("../../models");

//GET - Retrieve All Post
router.get("/", async (req, res) => {
  try {
    const postData = await Posts.findAll();
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST - CREATE Post
router.post("/", async (req, res) => {
  try {
    const postData = await Posts.create(req.body);
    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT - UPDATE Post
router.put("/:id", async (req, res) => {
  try {
    const postData = await Posts.update(req.body, {
      where: { id: req.params.id },
    });
    if (!postData) {
      res.status(404).json({ message: "No post with that id exists!" });
    }
    res.status(200).json({ message: "Successfully updated POST" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE - DELETE Post
router.delete("/:id", async (req, res) => {
  try {
    const postData = await Posts.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: "No post with that id exists!" });
      return;
    }

    res.status(200).json({ message: "Successfully deleted POST" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
