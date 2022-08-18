const express = require('express'); 
require('dotenv').config();
const {
  createBestseller,
  getBestseller, 
  getBestsellers, 
  getCategoryNames, 
  getNewBestsellersByCategory, 
  deleteBestseller, 
  updateBestseller
} = require('../controllers/bestsellerController'); 


const router = express.Router()

// create/post a bestseller to mongo db 
// if you change schema (like adding notes field), new items in same mongo db will have the new field, won't conflict with existing items 
router.post('/', createBestseller)

// get all bestseller instances from db
router.get('/', getBestsellers)

// get bestseller instances from db by id 
router.get('/:id', getBestseller)

// update instance of a bestseller in db 
router.patch('/:id', updateBestseller)

// delete instance of bestseller in db  
router.delete('/:id', deleteBestseller)

// get list of current bestsellers by category from NYT API  
router.get('/category/:category_name', getNewBestsellersByCategory)

// get all categories from NYT API  
router.get('/list-categories', getCategoryNames)


module.exports = router