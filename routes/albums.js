var express = require('express');
var router = express.Router();
// we import our user controller
var album = require('../controllers/albums.controller');

/*GET all artists */
router.get('/', album.findAll);

/* GET one user */
router.get('/:albumId', album.findOne);

/* DELETE  one user */
router.delete('/:albumId', album.delete);
/* update  one user */
router.post('/:albumId', album.update);

/* create  one user */
router.put('/', album.create);



module.exports = router;