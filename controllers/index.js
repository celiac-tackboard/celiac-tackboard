const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const submitRoutes = require("./submit-routes");
const profilePageRoutes = require("./profile-page-routes");
const locationRoutes = require("./location-routes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/submit", submitRoutes);
router.use("/profile-page", profilePageRoutes);
router.use("/location", locationRoutes);

router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
