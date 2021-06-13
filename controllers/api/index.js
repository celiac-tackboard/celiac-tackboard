const router = require("express").Router();
const userRoutes = require("./user-routes");
const postRoutes = require("./post-routes");
const commentRoutes = require("./comment-routes");
const locationRouter = require("./location-routes");

// /api/users
router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/comments", commentRoutes);
router.use("/location", locationRouter);

module.exports = router;
