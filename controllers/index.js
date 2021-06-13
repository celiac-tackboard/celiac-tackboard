const router = require('express').Router();

const apiRoutes = require('./api')
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');
const submitRoutes = require('./submit-routes');
const profilePageRoutes = require('./profile-page-routes');


router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/profile', profileRoutes);
router.use('/submit', submitRoutes);
router.use('/profile-page', profilePageRoutes);

router.use((req, res) => {
    res.status(404).end();
});


module.exports = router;