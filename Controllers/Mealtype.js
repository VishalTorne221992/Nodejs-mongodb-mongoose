const MealtypeModel = require('../Models/mealTypes')

exports.getAllMealTypes = (req, res) => {
    MealtypeModel.find().then(
        result => {

            res.status(200).json({ message: "data fetched successfully", data: result })
        }
    ).catch(error => {

        res.status(500).json({ message: "Error in Database", error: error })
    })
}