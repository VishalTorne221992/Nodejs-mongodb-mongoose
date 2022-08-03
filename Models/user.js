
// importing modules
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({   
    username: {type: String, required: true },
    email : {type: String, unique: true, required:true},
    Address : {type: String, required:true}
});

// plugin for passport-local-mongoose
UserSchema.plugin(passportLocalMongoose, {usernameUnique: false});
  
// export userschema
 module.exports = mongoose.model("User", UserSchema);