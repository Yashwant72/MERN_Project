const User = require("../models/user");
const Property = require('../models/property')
const propertyController = require('express').Router()
const verifyToken = require('../middleware/auth')

propertyController.get('/getAll', async (req, res) => {
    try {
        const properties = await Property.find({}).populate("currentOwner").exec()
        return res.status(200).json(properties)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
})
propertyController.post('/', verifyToken, async (req, res) => {
    try {
        const newProperty = await Property.create({ ...req.body, currentOwner: req.userId })

        return res.status(200).json(newProperty)
    }
    catch (error) {
        res.status(500).json(error.message)
    }
})
propertyController.put('/:id', verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        //console.log(req.user.id + " " + property.currentOwner);
        if (JSON.stringify(property.currentOwner) !== JSON.stringify(req.userId)) {
            console.log(property.currentOwner)
            console.log(req.userId)
            throw new Error('Can not modify')
        }
        else {
            const updatedProperty = await Property.findByIdAndUpdate(
                req.params.id,
                { $set: req.body },
                { new: true }
            )
            return res.status(200).json(updatedProperty)
        }
    }
    catch (error) {
        return res.status(500).json(error.message)
    }
})

propertyController.delete('/:id', verifyToken, async (req, res) => {
    try {
        const property = await Property.findById(req.params.id)
        if (JSON.stringify(property.currentOwner) !== JSON.stringify(req.userId)) {
            console.log(property.currentOwner);
            console.log(req.userId);
            throw new Error('Can not delete')
        }
        else {
            const user = await User.findById(property.currentOwner);
            user.selling = user.selling.filter((prop) => prop != req.params.id);
            await user.save()

            await Property.findByIdAndDelete(req.params.id)
            //await property.delete()
            return res.status(200).json({ msg: 'Property Deleted' })
        }
    }
    catch (error) {
        res.status(500).json(error.message)
    }
})

module.exports = propertyController