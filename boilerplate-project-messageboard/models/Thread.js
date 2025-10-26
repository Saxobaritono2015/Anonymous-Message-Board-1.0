const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  text: { type: String, required: true },
  delete_password: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  reported: { type: Boolean, default: false }
}, { _id: true }); // Ensure _id is generated

const threadSchema = new mongoose.Schema({
  board: { type: String, required: true },
  text: { type: String, required: true },
  delete_password: { type: String, required: true },
  created_on: { type: Date, default: Date.now },
  bumped_on: { type: Date, default: Date.now },
  reported: { type: Boolean, default: false },
  replies: [replySchema]
}, { _id: true }); // Ensure _id is generated

// Update bumped_on when saving
threadSchema.pre('save', function(next) {
  this.bumped_on = Date.now();
  next();
});

module.exports = mongoose.model('Thread', threadSchema);