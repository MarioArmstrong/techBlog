const router = require("express").Router();
const { Comment } = require("../../models");

//GET - Retrieve All Comment
router.get("/", async (req, res) => {
  try {
    const commentData = await Comment.findAll();
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET - Retrieve Specific Comment
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findOne({
      where: { id: req.params.id },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment by that id!" });
      return;
    }
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//POST - CREATE Comment
router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create(req.body);
    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

//PUT - UPDATE Comment
router.put("/:id", async (req, res) => {
  try {
    const commentData = await Comment.update(req.body, {
      where: { id: req.params.id },
    });
    if (!commentData) {
      res.status(404).json({ message: "No comment with that id exists!" });
    }
    res.status(200).json({ message: "Successfully updated COMMENT" });
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE - DELETE Comment
router.delete("/:id", async (req, res) => {
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!commentData) {
      res.status(404).json({ message: "No comment with that id exists!" });
      return;
    }

    res.status(200).json({ message: "Successfully deleted COMMENT" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
