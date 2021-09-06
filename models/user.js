  
const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
      type : String,
      required: true
    },
    lastName: {
      type : String,
      required: true
    },
    username: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now()
    }
  });
module.exports = mongoose.model('myuser' , userSchema)