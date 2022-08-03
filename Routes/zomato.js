// imports

const mongoose = require('mongoose')
const passport = require("passport")
const LocalStrategy = require("passport-local")
const passportLocalMongoose = require("passport-local-mongoose")


const express = require('express')
const Router = express.Router()
const restaurantController = require('../Controllers/Restaurants')
const locationsController = require('../Controllers/Locations')
const MealtypesController = require('../Controllers/Mealtype')
const MenuController = require('../Controllers/Menu')

const User = require('../Models/user')
const user = require('../Models/user')

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// configure routes

// Registering and User login 


Router.post('/register', function (req, res){
    var username = req.body.usernameForm
    var password = req.body.userPasswordForm
    var email = req.body.useremailForm
    var Address = req.body.userAddressForm

    console.log(username,'this is the sent username')
    console.log(password,'this is the sent password')

    if(!username){
        return console.log('username not given ')
    }
    
    // const userExist = User.findOne({"username": username})

    // userExist.select('_id username email')

    
    User.register( new User ({ username: username, email: email, Address: Address}),
                
                   password, function (err, user){
                       if(err){
                        console.log(err)
                        return console.log('error occured : ', err)
                            
                       }
                       
                    
                    return res.json({ message: "User saved successfully !! Please login with your Credentials !"})
                       
                   })
    
    
 })


 Router.post('/login',  passport.authenticate('local'), function(req, res) {

    console.log(req.session)
    console.log(req.sessionID)
    console.log(req.user)
    console.log(req.session.passport.user)
    
    return res.status(302).send({user:req.user})
    

     
 })

// Restaurants routes
Router.get('/restaurants', restaurantController.getAllRestaurants)

Router.get('/restaurants/:city_id', restaurantController.getRestaurantsByCity)

Router.post('/restaurants/filter/:pageNo' ,restaurantController.getRestaurantsByFilter)

Router.get('/restaurantsDetails/:name', restaurantController.getRestaurantDetail)


// Locations routes

Router.get('/locations', locationsController.getAllLocations)

// Mealtype route 

Router.get('/mealtype', MealtypesController.getAllMealTypes)

// Menu Route 

Router.get("/menu/:name", MenuController.getAllMenuByRestaurantName)



// Test route

Router.get('/TestPage', (req, res) => {
    console.log(req.isAuthenticated())
    res.redirect('http://localhost:3000/TestPage')
})

function checkAuthenticated(req, res, next){
    
       if(req.isAuthenticated()) {return next()}
       res.redirect('http://localhost:3000/')
       
        

    }


Router.delete('/logout', function(req, res){
   
    req.logOut()
    req.session.destroy(() => {console.log('session deleted')})
    console.log(req.session)
    console.log(req.sessionID,'this is session Id')
    
    res.redirect(303,'http://localhost:3000/')
    //res.json({data:'hello deleted'})
})

module.exports = Router