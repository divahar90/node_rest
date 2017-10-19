var express = require('express');
var router = express.Router();

router.use('/api/device', require('../model/device').router);
router.use('/api/location', require('../model/location').router);

// application -------------------------------------------------------------
router.get('/', function (req, res) {
    res.render('index', {title: 'API'});
});

module.exports = router;

