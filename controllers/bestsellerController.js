const Bestseller = require("../models/bestsellerModel");
const mongoose = require('mongoose'); 

// get all bestsellers in db 
const getBestsellers = async(req, res) => {
  const bestsellers = await Bestseller.find({}); 
  res.status(200).json(bestsellers)
}

// get single bestseller in db 
const getBestseller = async(req, res) => {
  const id = req.params.id;
  
  if (!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'item not found'})
  }
  
  const currentBestseller = await Bestseller.findById(id); 
  if (!currentBestseller){
    return res.status(404).json({error: 'bestseller not found'});
  }
  res.status(200).json(currentBestseller)
}


// create a bestseller in db 
const createBestseller = async (req, res) => {
  newObj = {
    owner: req.body.owner,
    title: req.body.title,
    author: req.body.author,
    list: req.body.list,
    notes: req.body.notes,
  };
  try {
    const bestseller = await Bestseller.create(newObj);
    res.status(200).json(bestseller);
    console.log("item added to db");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update a bestseller in db 
const updateBestseller = async (req, res) => {
  let id = req.params.id; 
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such item in database'})
  }
  const bestseller = await Bestseller.findOneAndUpdate({_id: id}, {
    ...req.body
  })
  if(!bestseller){
    return res.status(400).json({error: 'No such item in database'})
  }
  res.status(200).json(bestseller)
}

// delete a bestseller from db 
const deleteBestseller = async (req, res) => {
  let id = req.params.id; 
  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: 'No such item in database'})
  }
  const bestseller = await Bestseller.findOneAndDelete({_id: id})
  if (!bestseller){
    return res.status(400).json({error: 'No such item in database'})
  }
  res.status(200).json(bestseller)
}

// get bestseller category/list names from nyt
const getCategoryNames = async (req, res) => {
  let nyt_key = process.env.NYT_API_KEY;
  let base_url_two = 'https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=';
  try {
    let full_url = base_url_two + nyt_key
    console.log('full url: ', full_url)
    let result = await axios.get(full_url);
    res.send(result.data)
  } catch(error){
    console.log(error)
  }
}

// get current bestseller list by category from nyt 
const getNewBestsellersByCategory = async (req, res) => {
  try {
    let nyt_key = process.env.NYT_API_KEY; 
    let category_name = req.params.category_name;
    let url = `https://api.nytimes.com/svc/books/v3/lists/current/${category_name}.json?api-key=${nyt_key}`
    
    console.log('category_name: ', category_name)
    let result = await axios.get(url);
    res.send(result.data)
  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  createBestseller, 
  getBestseller, 
  getBestsellers, 
  getCategoryNames,
  getNewBestsellersByCategory, 
  deleteBestseller, 
  updateBestseller
}