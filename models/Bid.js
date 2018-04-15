const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var slug = require('slug');


const bidSchema = new Schema({

  id : { type: Number, default: 0 },
  project_id: Number,
  user_id: Number,
  slug: String,
  description: String,
  price: Number,
  time: String,
  user : { type: Schema.Types.ObjectId, ref: 'User' },
  project : { type: Schema.Types.ObjectId, ref: 'Project' }

});

bidSchema.plugin(autoIncrement.plugin, { model : 'Bid' , field: 'id' });
const Bid = mongoose.model('Bid',bidSchema);

 
module.exports = Bid;