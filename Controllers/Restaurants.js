const RestaurantsList = require('../Models/restaurants')


exports.getAllRestaurants=(req,res) =>{
    
    RestaurantsList.find().then(
        result => {

            res.status(200).json({ message: "data fetched successfully", data: result})
        }
    ).catch(error => {
         
        res.status(500).json({ message: "Error in database", error: error})
    })

    
}



exports.getRestaurantsByCity = (req, res) => {
    const filter = {city:req.params.city_id}

    console.log(filter);
    RestaurantsList.find(filter).then(
        result => {

            res.status(200).json({ message: "data fetched successfully" , result})
            
        }
    ).catch(error => {

        res.status(500).json({ message: "Error in Database", error: error })
    })

    
}


exports.getRestaurantDetail = (req, res) => {
    const filter = {name:req.params.name}

    console.log(filter);
    RestaurantsList.find(filter).then(
        result => {

            res.status(200).json({ message: "data fetched successfully" , result})
            
        }
    ).catch(error => {

        res.status(500).json({ message: "Error in Database", error: error })
    })
}

exports.getRestaurantsByFilter = (req, res) => {
    const filter = {}

    
    if(req.body.city_id){
        filter['city']=req.body.city_id
    }

    if(req.body.cuisine && req.body.cuisine.length > 0)
    {
        filter['Cuisine.name'] = { $in : req.body.cuisine}
    }



    if(req.body.lcost && req.body.hcost)
    {
        if(req.body.lcost ==0)
        {
            filter['cost'] = {$lte: req.body.hcost}
        }
        else
        {
            filter['cost'] = {$lte: req.body.hcost, $gt: req.body.lcost}
        }
    }
    
    let sort = 1;

    if(req.body.sort)
    {
        sort = req.body.sort
    }
    
   // Logic of pagination achieved through limit and skip
    RestaurantsList.find(filter).limit(2).skip(2*(req.params.pageNo-1)).sort({"cost": sort}).then(
        result => {

            RestaurantsList.find(filter).count((err, count) =>{
                if(err)
                console.log(err);
                else
                res.status(200).json({ message: "data fetched successfully", data1: result , TotalRecords: count})
            }) 

        }
    ).catch(error => {

        res.status(500).json({ message: "Error in Database", error: error })
    })

    
}
