const Albums = require('../models/albums.model.js');

// Create and Save a new album
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Title) {
    // If Title is not present in body reject the request by
    // sending the appropriate http code
    return res.status(400).send({
      message: 'Title can not be empty'
    });
  }

  // Create a new album
  const album = new Albums({
    Title: req.body.Title,
    Release : req.body.Release,
    Genre : req.body.Genre,
    Cover_url: req.body.Cover_url
  });

  // Save album in the database
  album
    .save()
    .then(album => {
      // we wait for insertion to be complete and we send the newly album integrated
      res.send(album);
    })
    .catch(err => {
      // In case of error during insertion of a new album in database we send an
      // appropriate message
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the album.'
      });
    });
};

// Retrieve and return all albums from the database.
exports.findAll = (req, res) => {
  Albums.find()
    .then(albums => {
      res.send(albums);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving albums.'
      });
    });
};

// Find a single album with a albumId
exports.findOne = (req, res) => {
  Albums.findById(req.params.albumId)
    .then(album => {
      if (!album) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      res.send(album);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving album with id ' + req.params.albumId
      });
    });
};

// Update an album identified by the albumId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.Title) {
    return res.status(400).send({
      message: 'Title can not be empty'
    });
  }

  // Find album and update it with the request body
  Albums.findByIdAndUpdate(
    req.params.albumId,
    {
      Title: req.body.Title,
      Release : req.body.Release,
      Genre : req.body.Genre,
      Cover_url: req.body.Cover_url
    },
    { new: true }
  )
    .then(album => {
      if (!album) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      res.send(album);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      return res.status(500).send({
        message: 'Error updating album with id ' + req.params.albumId
      });
    });
};

// Delete an album with the specified albumId in the request
exports.delete = (req, res) => {
  Albums.findByIdAndRemove(req.params.albumId)
    .then(album => {
      if (!album) {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      res.send({ message: 'Album deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Album not found with id ' + req.params.albumId
        });
      }
      return res.status(500).send({
        message: 'Could not delete album with id ' + req.params.albumId
      });
    });
};