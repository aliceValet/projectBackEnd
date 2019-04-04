const Tracks = require('../models/tracks.model.js');

// Create and Save a new Track
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Title) {
    // If firstName is not present in body reject the request by
    // sending the appropriate http code
    return res.status(400).send({
      message: 'Title can not be empty'
    });
  }

  // Create a new Track
  const track = new Tracks({
    Title: req.body.Title,
    Duration : req.body.Duration,
    Listenings : req.body.Listenings,
    Likes : req.body.Likes
  });

  // Save Track in the database
  track
    .save()
    .then(track => {
      // we wait for insertion to be complete and we send the newly track integrated
      res.send(track);
    })
    .catch(err => {
      // In case of error during insertion of a new track in database we send an
      // appropriate message
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Track.'
      });
    });
};

// Retrieve and return all tracks from the database.
exports.findAll = (req, res) => {
  Tracks.find()
    .then(tracks => {
      res.send(tracks);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving tracks.'
      });
    });
};

// Find a single Track with a TrackId
exports.findOne = (req, res) => {
  Tracks.findById(req.params.trackId)
    .then(track => {
      if (!track) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      res.send(track);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving track with id ' + req.params.trackId
      });
    });
};

// Update a Track identified by the TrackId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.Title) {
    return res.status(400).send({
      message: 'Title can not be empty'
    });
  }

  // Find track and update it with the request body
  Tracks.findByIdAndUpdate(
    req.params.trackId,
    {
      Title: req.body.Title,
      Duration : req.body.Duration,
      Listenings : req.body.Listenings,
      Likes : req.body.Likes
    },
    { new: true }
  )
    .then(track => {
      if (!track) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      res.send(track);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      return res.status(500).send({
        message: 'Error updating track with id ' + req.params.trackId
      });
    });
};

// Delete a Track with the specified trackId in the request
exports.delete = (req, res) => {
  Tracks.findByIdAndRemove(req.params.tarckId)
    .then(track => {
      if (!track) {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      res.send({ message: 'Track deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Track not found with id ' + req.params.trackId
        });
      }
      return res.status(500).send({
        message: 'Could not delete track with id ' + req.params.trackId
      });
    });
};