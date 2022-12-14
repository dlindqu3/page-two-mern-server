require('dotenv').config();
const express = require('express'); 
const mongoose = require('mongoose'); 
const nyt_bestsellers_routes = require('./routes/nyt_bestsellers'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 

const app = express(); 

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

app.use(cors()); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(express.json()) would be similar to bodyParser

// routes
app.use('/api/nyt-bestsellers', nyt_bestsellers_routes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      // console.log(process.env.MONGO_URI)
      // console.log(`connected to mongoDB and listening on port ${process.env.PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })

