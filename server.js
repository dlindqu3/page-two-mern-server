require('dotenv').config()
const express = require('express'); 
const nyt_bestsellers_routes = require('./routes/nyt_bestsellers'); 

const app = express(); 

app.use((req, res, next) => {
  console.log(req.path, req.method)
  next()
})

// routes
app.use('/api/nyt-bestsellers', nyt_bestsellers_routes)

app.listen(process.env.PORT, () => {
  console.log(`listening on port ${process.env.PORT}`)
})