const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const listing = new mongoose.Schema({
  title: { type: String, required: 'Title is required', text: true },
  description: { type: String },
  source: { type: String, required: 'Source is required' },
  source_url: { type: String, required: 'Source URL is required' },
  month: { type: String, required: 'Month is required'  },
  house_type: { type: String, required: 'Building type is required' },
  unit_size: { type: Number, required: 'No. of bedrooms is required' },
  town: { type: String, required: 'Town is required' },
  street_name: { type: String},
  postal_code: { type: String },
  rent_amount: { type: Number, required: 'Rent amount is required' },
  utilities_included: { type: Boolean, default: false },
  landlord_type: { type: String },
  length_of_term: { type: String }
});

listing.index({ title: "text" }); // Enable index of title field for text search

listing.plugin(mongoosePaginate); // add pagination plugin to schema

const Listing = mongoose.model('Listing', listing);

module.exports = Listing;
