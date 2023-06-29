const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
    },
    area: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
        enum: ['Residential', 'Commercial', 'Industrial', 'Land']
    },
    beds: {
        type: Number,
        required: true,
        min: 1
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
}, {
	timestamps: true
})

const Property = mongoose.model("Property", propertySchema);

module.exports = Property;