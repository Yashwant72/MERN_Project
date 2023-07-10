const mongoose = require('mongoose')


const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
        min: 1
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 1
    },
    area: {
        type: Number,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Residential', 'Commercial', 'Industrial', 'Land']
    },
    facilities: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
        min: 20
    }
}, {timestamps: true})
module.exports = mongoose.model("Property", PropertySchema)
