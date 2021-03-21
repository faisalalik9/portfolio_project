const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  name: String,
  image: String,
  messages: Array
});




mongoose.model('users', userSchema);
