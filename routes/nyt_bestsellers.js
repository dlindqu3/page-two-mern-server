const express = require('express'); 
const axios = require('axios'); 
require('dotenv').config()

const router = express.Router()

let nyt_key = process.env.NYT_API_KEY

// get list of current best sellers by category 
router.get('/category/:category_name', async (req, res) => {
  try {
    let category_name = req.params.category_name
    let url = `https://api.nytimes.com/svc/books/v3/lists/current/${category_name}.json?api-key=${process.env.NYT_API_KEY}`
    
    console.log('category_name: ', category_name)
    let result = await axios.get(url);
    res.send(result.data)
  } catch (error) {
    console.log(error)
  }
})

// get recent categories 
let base_url_two = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key='
router.get('/list-categories', async (req, res) => {
  try {
    let full_url = base_url_two + nyt_key
    console.log('full url: ', full_url)
    let result = await axios.get(full_url);
    res.send(result.data)
  } catch(error){
    console.log(error)
  }
})

// for use on front end: 
const book_categories = [
  "combined-print-and-e-book-fiction",
  "combined-print-and-e-book-nonfiction",
  "hardcover-fiction",
  "hardcover-nonfiction",
  "trade-fiction-paperback",
  "paperback-nonfiction", 
  "advice-how-to-and-miscellaneous",
  "childrens-middle-grade-hardcover",
  "picture-books", 
  "series-books",
  "young-adult-hardcover",
  "audio-fiction",
  "audio-nonfiction",
  "business-books",
  "graphic-books-and-manga",
  "mass-market-monthly",
  "middle-grade-paperback-monthly",
  "young-adult-paperback-monthly"
]

module.exports = router