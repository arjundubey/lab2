const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection);

mongoose.Promise = global.Promise;
var Schema = mongoose.Schema;
var slug = require('slug');

const projectSchema = new Schema({

  id : { type: Number, default: 0 },
  name: String,
  user_id: Number,
  win_bid_id : Number,
  slug: String,
  description: String,
  file: String,
  min_budget: Number,
  max_budget: Number,
  skills: String,
  notes: String,
  project_file: String,
  status: String,
  bid_winner: Number,

  bids: [{ type: Schema.Types.ObjectId, ref: 'Bid' }],
  owner : { type: Schema.Types.ObjectId, ref: 'User' },

  winner_id : { type: Schema.Types.ObjectId, ref: 'User' },
  winner_bid : { type: Schema.Types.ObjectId, ref: 'Bid' }


}); 

projectSchema.plugin(autoIncrement.plugin, { model : 'Project' , field: 'id' });
projectSchema.pre('save',function(next){

    this.slug = slug(this.name).toLowerCase();

    next();
});

projectSchema.index({'$**': 'text'});

const Project = mongoose.model('Project',projectSchema);


module.exports = Project;