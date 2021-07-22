const router = require('express').Router();

router.use('/ivr', require('./start'));
router.use('/ivr', require('./message'));
router.use('/ivr', require('./end'));

module.exports = router;
