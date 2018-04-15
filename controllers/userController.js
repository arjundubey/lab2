var User = require('../models/User');
var passport = require('passport');  
var LocalStrategy = require('passport-local').Strategy; 


exports.index = function(req,res) {

	var filter = {};

	var perPage = 10 , page = req.param('page') ? (parseInt(req.param('page')) - 1) : 0;
	
	
	User.find(filter)
	    .limit(perPage)
	    .skip(perPage * page)
	    .sort('id')
	    .exec(function(err, users) {
	        User.count().exec(function(err, count) {
	            
	            res.json({
	                users: users,
	                page: page,
	                max : Math.round(count / perPage)
	            });
	            
	            res.end();

	        })
	    })
	
}


exports.create = function(req,res) {

	var u = new User();
	
	var values = req.body.data;

	Object.keys(values).map(key => {
		if(key !== 'password')
		u[key] = values[key];
	})

	User.register(u,values.password,function(err,user){
		if(!err)  {

		res.json(user);
		} else {
			res.json({ 'error' : err });
		}
		res.end();

	});

	
}

exports.show = function(req,res) {

	var id = req.params.id;

	if(!id || typeof id === "undefined")
		id = req.session.user.id;

	User.where({ id : id }).findOne(function (err, user) {
	  if (err) return handleError(err);
	  
	  if (user) {

	  	 res.json(user);
	  	 res.end();
			
	  }
	
	});
	
}



exports.update = function(req,res) {

	var id = req.body.id;
	
	var filename = '';

	if(req.file)
	     filename = req.file.filename;

	var doc = {

		 first_name: ( ! req.body.first_name || req.body.first_name == "") ? "" : req.body.first_name,
		  last_name: ( ! req.body.last_name || req.body.last_name == "") ? "" : req.body.last_name,
		  avatar: filename,
		  skills: ( ! req.body.skills || req.body.skills == "") ? "" : req.body.skills,
		  phone: ( ! req.body.phone || req.body.phone == "") ? "" : req.body.phone,
		  about: ( ! req.body.about || req.body.about == "") ? "" : req.body.about,
		  email: ( ! req.body.email || req.body.email == "") ? "" : req.body.email,
		  type: ( ! req.body.type || req.body.type == "") ? "" : req.body.type
	};


	User.where().updateOne({ id : id },doc,function (err, user) {
	 
	  
	  if (user) {

	  	 res.json(user);
	  	 res.end();
			
	  }
	
	});
	
}




exports.delete = function(req,res) {

	var id = req.params.id;
	

	User.findOneAndRemove({ id : id },function (err, user) {
	  if (err) return handleError(err);
	  
	  if (user) {

	  	 res.json(user);
	  	 res.end();
			
	  }
	
	});
	
}




exports.authenticate = function(req,res) {

	var data = req.body.data;
	req.session.logged = false;

	User.findOne({ email : data.email },function (err, user) {
	  
	  if (user) {

	  	 user.authenticate(data.password,function(err,status){

	  	 	var output = {};

	  	 	if(status !== false) {
	  	 		output = user;

	  	 		req.session.user = user;
				req.session.logged = true;

				req.session.save();	
	  	 	} else
	  	 	  output = { 'error' : err , 'success' : false };

	  	 	res.json(output);
	  	 	res.end();

	  	 });
	  	 
			
	  } else {

	  	 res.json(err);
	  	 res.end();

	  }
	
	});
	

}