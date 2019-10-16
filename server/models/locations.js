const mongoose = require('mongoose');
const { Schema } = mongoose;

const locationsSchema = new Schema({
    name: String,
    lat: Number,
    lng: Number,
})

module.exports = mongoose.model('locations', locationsSchema);