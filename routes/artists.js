var express = require('express');
var router = express.Router();
// we import our user controller
var artist = require('../controllers/artists.controller');

/* GET one user */
router.get('/:artistId', artist.findOne);

/*GET all artists */
router.get('/', artist.findAll);

/* DELETE  one user */
router.delete('/:artistId', artist.delete);
/* update  one user */
router.post('/:artistId', artist.update);

/* create  one user */
router.put('/', artist.create);

module.exports = router;