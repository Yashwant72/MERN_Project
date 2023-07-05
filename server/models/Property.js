const mongoose = require('mongoose')

const propertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.SchemaTypes.ObjectId,
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
    images: {
        type: String,
				required: true
    },
    type: {
        type: String,
        required: true,
				lowercase: true,
        enum: ['residential', 'commercial', 'industrial', 'land']
    },
    beds: {
        type: Number,
        required: true,
        min: 0
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