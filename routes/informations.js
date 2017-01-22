var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    if(req.query.error == 1) {
        var err = new Error('Bad Request');
        err.status = 400;
        next(err);
    } else {
        res.send('api well done!');
    }
});

module.exports = router;
