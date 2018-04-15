const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const passportLocalMongoose = require('passport-local-mongoose');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var slug = require('slug');

const userSchema = new Schema({

  id : { type: Number, default: 0 },
  first_name: String,
  last_name: String,
  slug : String,
  avatar: String,
  skills: String,
  phone: String,
  about: String,
  email: String,
  password: String,
  type: String,
  balance : { type: Number, default: 0 },
  bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }],
  projects : [{ type: Schema.Types.ObjectId, ref: 'Project' }]

});



userSchema.plugin(autoIncrement.plugin, { model : 'User' , field: 'id' });
userSchema.plugin(passportLocalMongoose, {  usernameField : 'email' , hashField : 'password' });

userSchema.pre('save',function(next){

    this.slug = slug(this.first_name+"-"+this.last_name).toLowerCase();

    next();
});

const User = mongoose.model('User',userSchema);


module.exports = User;