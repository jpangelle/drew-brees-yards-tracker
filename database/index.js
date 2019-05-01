const mongoose = require('mongoose');

let entrySchema = mongoose.Schema({
  _id: String,
  yards: String,
  timeStamp: String,
});

let Entry = mongoose.model('Entry', entrySchema);

exports.Entry = Entry;
