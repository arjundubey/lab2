var kafka = require('../handlers/kafka/client');


exports.make = function(topic_name,callback) {

	return function(req,res){

		var param = {

			page : req.param('page') ? req.param('page') : 0,
			filter : req.param('filter') ? req.param('filter') : {}

		}; 

		var newreq = { 
			param : param, 
			params : req.params ? req.params : {}, 
			session : { user : req.session.user }, 
			file : req.file, 
			body : req.body 
		}

		kafka.make_request(topic_name, { req :newreq }, function(err, rows){


			res.send(rows);


		});
	}	

};



exports.makeRequest = function(topic_name,req,res,callback) {


		var param = {

			page : req.param('page') ? req.param('page') : 0,
			filter : req.param('filter') ? req.param('filter') : {}

		}; 

		var newreq = { 
			param : param, 
			params : req.params ? req.params : {}, 
			session : { user : req.session.user }, 
			file : req.file, 
			body : req.body 
		}

		kafka.make_request(topic_name, { req :newreq }, function(err, rows){
			
			callback(rows);

		});
	

};
