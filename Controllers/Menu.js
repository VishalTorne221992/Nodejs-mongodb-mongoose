const MenuModel = require('../Models/menu')

exports.getAllMenuByRestaurantName = (req, res) => {

    const filter = {restaurantName: req.params.name}
    
    console.log(filter);

    MenuModel.find(filter).then(
        result => {

            res.status(200).json({ message: "data fetched successfully", data: result })
        }
    ).catch(error => {

        res.status(500).json({ message: "Error in Database", error: error })
    })
}