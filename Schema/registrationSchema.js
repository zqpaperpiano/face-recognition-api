const mongoose = require("mongoose");
const registeredUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    imageCount: Number,
    joinedDate: Date
  });

  module.exports = mongoose.model('User', registeredUserSchema);