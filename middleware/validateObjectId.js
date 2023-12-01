const mongoose = require('mongoose');

module.exports = function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))//Lines 4-5 cut from genres.js - lines 46-47
    return res.status(404).send('Invalid ID.');
  
  next();
}