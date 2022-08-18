const express = require('express'); 
const axios = require('axios'); 
require('dotenv').config();
const Bestseller = require('../models/bestsellerModel'); 
const {
  createBestseller,
  getBestseller, 
  getBestsellers, 
  getCategoryNames, 
  getNewBestsellersByCategory
} = require('../controllers/bestsellerController'); 
const { create } = require('../models/bestsellerModel');


const router = express.Router()

let nyt_key = process.env.NYT_API_KEY

// create/post a bestseller to mongo db 
// if you change schema (like adding notes field), new items in same mongo db will have the new field, won't conflict with existing items 
router.post('/', createBestseller)

// get all bestseller instances from db
router.get('/', getBestsellers)

// get bestseller instances from db by id 
router.get('/:id', getBestseller)

// update instance of a bestseller in db 
router.patch('/:id', (req, res) => {
  res.json({test: 'update single bestsellers in db'})
})

// delete instance of bestseller in db  
router.delete('/:id', (req, res) => {
  res.json({test: 'delete single bestsellers in db'})
})

// get list of current bestsellers by category from NYT API  
router.get('/category/:category_name', getNewBestsellersByCategory)

// get all categories from NYT API  
router.get('/list-categories', getCategoryNames)


module.exports = router