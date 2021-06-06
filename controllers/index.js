const router = require('express').Router();
<<<<<<< HEAD

const homeRoutes = require('./home-routes.js');

router.use('/', homeRoutes);
=======
const apiRoutes = require('./api')
const homeRoutes = require('./home-routes');
const profileRoutes = require('./profile-routes');

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/profile', profileRoutes);

router.use((req, res) => {
    res.status(404).end();
});
>>>>>>> origin/develop

module.exports = router;