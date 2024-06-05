const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the User schema
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
   
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  isEtat: {
    type: Boolean,
    default: false
  }, 
  image_profile: {
    type: String,
  }
},{timestamps:true});


// Create the User model from the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
