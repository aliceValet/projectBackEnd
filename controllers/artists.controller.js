const Artists = require('../models/artists.model.js');

// Create and Save a new artist
exports.create = (req, res) => {
  // Validate request
  if (!req.body.Name) {
    // If firstName is not present in body reject the request by
    // sending the appropriate http code
    return res.status(400).send({
      message: 'Name can not be empty'
    });
  }

  // Create a new artist
  const artist = new Artists({
    Name: req.body.Name,
    Birthday : req.body.Birthday,
    Followers : req.body.Followers
  });

  // Save artist in the database
  artist
    .save()
    .then(artist => {
      // we wait for insertion to be complete and we send the newly artist integrated
      res.send(artist);
    })
    .catch(err => {
      // In case of error during insertion of a new artist in database we send an
      // appropriate message
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the artist.'
      });
    });
};

// Retrieve and return all artists from the database.
exports.findAll = (req, res) => {
  Artists.find()
    .then(artist => {
      res.send(artist);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving artists.'
      });
    });
};

// Find a single artist with a artistId
exports.findOne = (req, res) => {
  Artists.findById(req.params.artistId)
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      res.send(artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving artist with id ' + req.params.artistId
      });
    });
};

// Update an artist identified by the artistId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.Name) {
    return res.status(400).send({
      message: 'Name can not be empty'
    });
  }

  // Find artist and update it with the request body
  Artists.findByIdAndUpdate(
    req.params.artistId,
    {
      Name: req.body.Name,
      Birthday : req.body.Birthday,
      Followers : req.body.Followers
    },
    { new: true }
  )
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      res.send(artist);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      return res.status(500).send({
        message: 'Error updating artist with id ' + req.params.artistId
      });
    });
};

// Delete an artist with the specified artistId in the request
exports.delete = (req, res) => {
  Artists.findByIdAndRemove(req.params.artistId)
    .then(artist => {
      if (!artist) {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      res.send({ message: 'Artist deleted successfully!' });
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Artist not found with id ' + req.params.artistId
        });
      }
      return res.status(500).send({
        message: 'Could not delete artist with id ' + req.params.artistId
      });
    });
};