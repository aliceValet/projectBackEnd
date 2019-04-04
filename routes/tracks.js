var express = require('express');
var router = express.Router();
// we import our user controller
var track = require('../controllers/tracks.controller');

/* GET all tracks */
router.get('/', track.findAll);

/* GET one track */
router.get('/:trackId', track.findOne);

/* DELETE  one track */
router.delete('/:trackId', track.delete);
/* update  one track */
router.post('/:trackId', track.update);

/* create  one track */
router.put('/', track.create);

module.exports = router;