const mongoose = require("mongoose");
// Define mongoose schemas
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
});



const User = mongoose.model('User', userSchema);
  
  module.exports = {
    User,
  }