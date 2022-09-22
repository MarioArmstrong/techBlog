const router = require("express").Router();
const userRoutes = require("./userRoutes");
// const otherRoutes = require(""); //still need to do this

router.use("/users", userRoutes);
// router.use("/", projectRoutes); //still need to do this

module.exports = router;
