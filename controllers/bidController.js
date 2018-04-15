var Bid = require('../models/Bid');
var User = require('../models/User');
var Project = require('../models/Project');



exports.index = function(req,res) {

 var filter = req.param('filter') ? req.param('filter') : {};
 var sortable = 'id';
  var perPage = 4 , page = req.param('page') ? (parseInt(req.param('page')) - 1) : 0;
  
  if(typeof filter == "string")
     filter = JSON.parse(filter);

  if(  typeof filter.s !== "undefined"  ) {

    filter = { $text : {$search: filter.s} };

  }

  if( typeof filter.user !== "undefined" ) {

    filter['user_id'] = req.session.user.id;
    delete filter['user'];
  }

  if( typeof filter.sort !== "undefined" ) {

    switch(filter.sort) {

       case 'date' : break;
       case 'asc' : sortable = 'price'; break;
       case 'desc' : sortable = { price: -1 }; break;

    }
    delete filter['sort'];
  }


  
  Bid.find(filter)
      .limit(perPage)
      .skip(perPage * page)
      .sort(sortable)
      .populate('project')
      .populate('user')
      .exec(function(err, bids) {
          Bid.count().exec(function(err, count) {
              
              res.json({
                  bids: bids,
                  page: page,
                  max : Math.round(count / perPage)
              });
              
              res.end();

          })
      })
  
}


exports.create = function(req,res) {

  var bid = new Bid;
  

  var values = {

  project_id: 8,
  user_id: 15,
  description: "This is a big",
  price: 14.5,
  time: "4 days",


    };
  
  var values = req.body.formData;

  Object.keys(values).map(key => {
    bid[key] = values[key];
  })

    User.where({ id : bid.user_id }).findOne(function (err, user) {

      bid.user = user._id;

      Project.where({ id : bid.project_id }).findOne(function (err, project) {

        bid.project = project._id;
        
        bid.save(function(err,b){

                project.bids.push(b._id);
                project.save();
                
                user.bids.push(b._id);
                user.save();
                

                if (b) {
                    output = {
                      project_id: b.project_id,
                      user_id: b.user_id,
                      description: b.description,
                      price: b.price,
                      time: b.time,
                      user : user,
                      id : b.id
                    };


                   res.json(output);
                   res.end();
                  
                }
              
              });
          
          });

        
      });

}

exports.show = function(req,res) {

  var id = req.params.id;

  Bid.where({ id : id }).findOne().populate('user').exec(function (err, bid) {
    
    if (bid) {

       res.json(bid);
       res.end();
      
    }
  
  });
  
}



exports.update = function(req,res) {

  var id = req.params.id;
  var doc = {

  project_id: 1,
  user_id: 2,
  description: "This is a big",
  price: 14.5,
  time: "2 days",


    };


  Bid.where().updateOne({ id : id },doc,function (err, bid) {
    if (err) return handleError(err);
    
    if (bid) {

       res.json(bid);
       res.end();
      
    }
  
  });
  
}




exports.delete = function(req,res) {

  var id = req.params.id;
  

  Bid.findOneAndRemove({ id : id },function (err, bid) {
    if (err) return handleError(err);
    
    if (bid) {

       res.json(bid);
       res.end();
      
    }
  
  });
  
}