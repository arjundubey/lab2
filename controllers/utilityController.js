var Project = require('../models/Project');
var Bid = require('../models/Bid');
var User = require('../models/User');

var mailer = require('../handlers/mailer.js');;



/**
 * Ajax handler
 */




exports.ajax = function(req,res) {

	let data = '', response = '';

	switch(req.body.type) {

	
		case 'session-heartbeat' : 

			var temp = {};
			if(typeof req.session !=="undefined" && 'logged' in req.session && req.session.logged == true) {
				temp['logged'] = true;
				temp['user'] = req.session.user;
			} else {
				temp['logged'] = false;
 			}

 			res.json(temp);
 			res.end();

		break;

		case 'logout' : 
			
			req.session.user = '';
			req.session.destroy();

			res.end();

		break;

		case 'final-bid' :

			var doc = {

				bid_winner : req.body.userid,
				win_bid_id : req.body.bidid,
				status : 'CLOSED'

			};

			User.where({ id : req.body.userid }).findOne(function (err, user) {

				doc['winner_id'] = user._id;

				Bid.where({ id : req.body.bidid }).findOne(function (err, bid) {
				
					doc['winner_bid'] = bid._id;
					
					Project.where().updateOne({ id : req.body.projectid },doc,function (err, status) {
					   
					    if (status) {

					       mailer.send({
					       	'from' : 'noreply@freelance.com',
					       	'to' :user.email,
					       	'subject' : 'Your Bid Won !',
					       	'html' : `Hi, <br> This is to inform you that bid on ${req.body.name} for $ ${bid.price} has won. Please visit the project page to view all the details. <br> Freelance Team `	

					       });	
					    				
					       res.json(status);
					       res.end();
					      
					    }
					  
					});

				});


			});	

		break;


	}
	
};
