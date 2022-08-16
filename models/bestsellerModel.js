const mongoose = require('mongoose');

// schema defines structure of a doc in db 
const Schema = mongoose.Schema
const bestsellerSchema = new Schema({
  owner: {
    type: String, 
    required: false 
  }, 
  title: {
    type: String, 
    required: true
  }, 
  author: {
    type: String, 
    required: true 
  }, 
  list: {
    type: String, 
    required: false 
  }
})

// this automatically builds a "Bestsellers" collection in the db 
module.exports = mongoose.model('Bestseller', bestsellerSchema)