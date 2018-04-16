var Project = require('../models/Project');
var Bid = require('../models/Bid');
var User = require('../models/User');
var Transaction = require('../models/Transaction');


exports.index = function(req,res) {

 var filter = req.param('filter') ? req.param('filter') : {};

  var perPage = 10 , page = req.param('page') ? (parseInt(req.param('page')) - 1) : 0;
  
  if(typeof filter == "string")
     filter = JSON.parse(filter);

  if(  typeof filter.s !== "undefined"  ) {

    filter = { $text : {$search: filter.s} };

  }

  if( typeof filter.user !== "undefined" ) {

    filter['user_id'] = req.session.user.id;
    delete filter['user'];
  }

  if(  typeof filter.bid_winner !== "undefined" && filter.bid_winner == true ) {

    filter['bid_winner'] = req.session.user.id;

  }

  if(  typeof filter.relevant !== "undefined" && filter.relevant == true ) {

    filter['bid_winner'] = req.session.user.id;

  }


  console.log(req.param('filter'));


  
  Project.find(filter)
      .populate('bids')
      .populate('owner')
      .populate('winner_id')
      .populate('winner_bid')
      .limit(perPage)
      .skip(perPage * page)
      .sort('id')
      .exec(function(err, projects) {
          Project.count().exec(function(err, count) {
              
              res.json({
                  projects: projects,
                  page: page+1,
                  max : Math.round(count / perPage)
              });
              
              res.end();

          })
      })
  
}


exports.create = function(req,res) {

  var project = new Project;
  
  var filename = '';

  if(req.file)
      filename = req.file.filename;

  var values = {

    name: req.body.name ,
    user_id:req.session.user.id,
    win_bid_id : 0, // bid id
    description:req.body.description ,
    file: filename,
    min_budget :req.body.min_budget ,
    max_budget :req.body.max_budget ,
    skills :req.body.skills ,
    status: "OPEN",
    bid_winner: 0 // user id 


    };

  Object.keys(values).map(key => {
    project[key] = values[key];
  })

  User.findOne({ id : project.user_id },function(err,user){

      project.owner = user._id;

      project.save(function(err,p){

        user.projects.push(p._id);

        res.json(p);
        res.end();

      });



  });

}


exports.show = function(req,res) {

  var slug = req.params.slug;

  var users = {};


        Project.where({ slug : slug })
        .findOne()
        .exec(function (err, project) {
          
          if (project) {

            Bid.find({ project_id : project.id })
            .populate('user')
            .exec({ project_id : project.id },function (err, bids) {

             res.json({ data : project , bids : bids });
             res.end();
            
            });

          }
        
        });


      
  
}



exports.update = function(req,res) {

  var id = req.params.id;
  var doc = req.params.doc;

  Project.where().updateOne({ id : id },doc,function (err, project) {
    if (err) return handleError(err);
    
    if (project) {

       res.json(project);
       res.end();
      
    }
  
  });
  
}



exports.submitproject = function(req,res) {

  var id = req.body.id;

  var filename = '';

  if(req.file)
       filename = req.file.filename;

  var doc = {

      notes: ( ! req.body.notes || req.body.notes == "") ? "" : req.body.notes,
      project_file: filename
  };

  console.log(doc);

  Project.where().updateOne({ id : id },doc,function (err, project) {
    if (err) return handleError(err);
    
    if (project) {

       res.json(project);
       res.end();
      
    }
  
  });
  
}




exports.delete = function(req,res) {

  var id = req.params.id;
  

  Project.findOneAndRemove({ id : id },function (err, project) {
    if (err) return handleError(err);
    
    if (project) {

       res.json(project);
       res.end();
      
    }
  
  });
  
}




exports.relevant = function(req,res) {

 var filter = req.param('filter') ? req.param('filter') : {};

  var perPage = 10 , page = req.param('page') ? (parseInt(req.param('page')) - 1) : 0;
  
  User.findOne({ id : req.session.user.id },function(err,user){ 


        if(typeof filter == "string")
           filter = JSON.parse(filter);

        if(  typeof filter.s !== "undefined"  ) {

          filter = { $text : {$search: filter.s} };

        }

        if( typeof filter.user !== "undefined" ) {

          filter['user_id'] = req.session.user.id;
          delete filter['user'];
        }

        var usrskills = user.skills.toLowerCase().split(',');

        for(var i=0;i<usrskills.length;i++) {
          usrskills[i] = usrskills[i].trim();
        }


        
        Project.find(filter)
            .populate('bids')
            .populate('owner')
            .populate('winner_id')
            .populate('winner_bid')
            .sort('id')
            .exec(function(err, projects) {

               projects = projects.filter(function(project){

                  var cmpskills = project.skills.toLowerCase().split(',');

                  // console.log("Comparing",cmpskills,usrskills);

                  var score = cmpskills.filter(function(obj) { return usrskills.indexOf(obj.trim()) !== -1; });
                  
                  // console.log(score.length);

                  if(score.length >= 3)
                    return project;
                  
                  return false;
                }) 

               
                var skip = perPage * page;
                var pprojects = [], index = 0;

                console.log(pprojects);
               
                for(var i=0;i<projects.length;i++) {

                   if(i <= skip && skip > 0) {
                    continue; // offset 
                   }
                  // change if required
                   
                   // console.log('Pushing @ '+index+" => "+projects[i].name);   
                   pprojects.push(projects[i]);

                    if(index >= perPage) {
                      break;
                   }

                  index++;
                }


                res.json({
                        projects: pprojects,
                        page: page+1,
                        max : Math.round(projects.length / perPage)
                    });
                    
                res.end();

            });


  });    
  
}




exports.bidprojects = function(req,res) {

 var filter = req.param('filter') ? req.param('filter') : {};

  var perPage = 10 , page = req.param('page') ? (parseInt(req.param('page')) - 1) : 0;
  
  User.findOne({ id : req.session.user.id })
  .populate('bids')
  .exec(function(err,user){ 

      var pids = [];

      Object.keys(user.bids).map(key => { if(!isNaN(key)) pids.push(user.bids[key].project_id) } );

       Project.find({ id : { $in : pids } , 'status' : 'OPEN' })
            .populate('bids')
            .populate('owner')
            .sort('id')
            .exec(function(err, projects) {

             res.json({ projects});
             res.end();  

        });
       

  });    
  
}

exports.finalize = function(req,res) {

  
  Project.where({ id : req.body.projectid })
        .findOne()
        .populate('winner_bid')
        .populate('winner_id')
        .exec(function (err, project) {
          
          var bid_price = project.winner_bid.price;
          var userbalance = req.session.user.balance;

          var currentUserBalance = userbalance - bid_price;

          req.session.user.balance = currentUserBalance;

       
          


          User.where().updateOne({ id : req.session.user.id },{ balance : currentUserBalance },function (err, u) {
              
              User.where({ id : project.winner_id.id }).findOne(function (err, user) {

                  /**
                   * Add transaction notification to employeer
                   */
                  
                  var transcation = new Transaction();



                  transcation['amount'] = bid_price;
                  transcation['type'] = 'transfer';
                  transcation['user_id'] = req.session.user.id;
                  transcation['user'] = req.session.user._id;
                  transcation['transfer_user_id'] = user.id;
                  transcation['transfer_user'] = user._id;
                  transcation['notes'] = "Money transferred to "+ user.first_name;

                  transcation.save();
                  

                  /**
                   * Add transaction notification to freelancer
                   */

                 var transcation1 = new Transaction();

                  transcation1['amount'] = bid_price;
                  transcation1['type'] = 'transfer';
                  transcation1['user_id'] = user.id;
                  transcation1['user'] = user._id;
                  
                  transcation1['transfer_user_id'] = req.session.user.id;
                  transcation1['transfer_user'] = req.session.user._id;

                  transcation1['notes'] = "Money deposited from "+req.session.user.name;

                  transcation1.save();


                  /**
                   * Rest of algo
                   * @type {[type]}
                   */
                  var newBalance =  user.balance + bid_price;

                  console.log("New balance "+newBalance);

                   User.where().updateOne({ id : project.winner_id.id },{ balance : newBalance },function (err, u1) {


                         Project.where().updateOne({ id : req.body.projectid },{ status : 'FINISHED' },function (err, u1) {
       
                            res.json(project);
                            res.end();


                         });
                    });


               });


          });

          // winner_id

          
  });
  
}