
const LocationsModel = require('../Models/locations')

exports.getAllLocations = (req, res) => {
    LocationsModel.find().then(
        result => {

            res.status(200).json({ message: "data fetched successfully", data: result })
        }
    ).catch(error => {

        res.status(500).json({ message: "Error in Database", error: error })
    })
}