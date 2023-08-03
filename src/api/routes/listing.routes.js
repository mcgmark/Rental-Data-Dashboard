const express = require('express');
const apiRouter = express.Router();
let Listing = require('../model/Listing');
const mongoose = require('mongoose');
const isAuthenticated = require('./authMiddleware');



/* GET - FIND ALL */
apiRouter.get('/listings', async (req, res) => {
  // Paginate
  const page = parseInt(req.query.page) || 1; // Get the requested page number from the query parameters or use 1 as default
  const limit = req.query.page ? 12 : 1000000;

  // Extract the filter criteria from query parameters
  const { keywords, month, source, town, unit_size, house_type, rent_amount } = req.query;

  // Build the filter object based on the provided query parameters
  const filters = {};
  if (keywords && keywords !== "Keywords") {
    filters.$text = { $search: keywords };
  }
  if (month && month !== "Month") {
    filters.month = { $regex: month, $options: 'i' };
  }
  if (source && source !== "Source") {
    filters.source = { $regex: source, $options: 'i' };
  }
  if (town && town !== "Town") {
    filters.town = { $regex: town, $options: 'i' };
  }
  if (unit_size && unit_size !== "Bedrooms") {
    filters.unit_size = parseInt(unit_size);
  }
  if (house_type && house_type !== "Type") {
    filters.house_type = { $regex: house_type, $options: 'i' };
  }
  if (rent_amount && rent_amount !== "Rent") {
    filters.rent_amount = { $lte: parseInt(rent_amount) };
  }

  try {
    const listings = await Listing.paginate(filters,{
      page,
      limit
    });
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

apiRouter.get('/listings/:id', async (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);
  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})


/* POST - CREATE */
apiRouter.post('/add-listing', isAuthenticated, async (req, res) => {
  try {
    const newListing = await Listing.create(req.body);
    res.status(201).json(newListing);
  } catch (err) {
    res.status(900).json({ error: err.message });
  }
})

/* GET - DELETE SPECIFIC ID */
apiRouter.get('/delete-listing/:id', isAuthenticated, async (req, res) => {
  try {
    const deletedListing = await Listing.findOneAndDelete({ _id: req.params.id });
    res.status(200).json('Delete Success' + deletedListing);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})



module.exports = apiRouter;



