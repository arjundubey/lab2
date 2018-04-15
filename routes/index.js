var express = require('express');
var router = express.Router();

var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/') 
  },
  filename: function (req, file, cb) {
     cb(null, Date.now() + path.extname(file.originalname))
  }
})
var upload = multer({ storage: storage });


const userController = require('../controllers/userController');
const projectController = require('../controllers/projectController');
const bidController = require('../controllers/bidController');
const utilityController = require('../controllers/utilityController');
const transactionController = require('../controllers/transactionController');
const kafkaController = require('../controllers/kafkaController');



//router.get('/projects1',kafkaController.make('projectsview1'));

router.get('/users',kafkaController.make('userControllerIndex')); // get list of all users

router.post('/user',kafkaController.make('userControllerCreate')); // create a new user
router.get('/api/v1/user/:id',kafkaController.make('userControllerShow')); // get details of a single user
router.get('/api/v1/user/',kafkaController.make('userControllerShow')); // get details of a currently logged in user

router.post('/authenticate',function(req,res){

	req.session.logged = false;

	kafkaController.makeRequest('userControllerAuthenticate',req,res,function(output){

		

	  	 	if( "id" in output ) {

	  	 		req.session.user = output;
				req.session.logged = true;

				req.session.save();	
	  	 	}

	  	 	res.json(output);
	  	 	res.end();
	});

}); 

router.post('/session',function(req,res){

	var temp = {};
	if(typeof req.session !=="undefined" && 'logged' in req.session && req.session.logged == true) {
		temp['logged'] = true;
		temp['user'] = req.session.user;
	} else {
		temp['logged'] = false;
		}
	
	res.json(temp);
	res.end();		
}); 


router.post('/logout',function(req,res){

	req.session.user = '';
	req.session.destroy();
	
	res.json({ logged : true });
	res.end();		
}); 


router.put('/user/:id',upload.single('file'),kafkaController.make('userControllerUpdate')); // update user 

router.delete('/user/:id',kafkaController.make('userControllerDelete')); // delete user 

router.get('/api/v1/projects/relevant',kafkaController.make('projectControllerRelevant')); // get list of all projects
router.get('/api/v1/bidprojects',kafkaController.make('projectControllerBidprojects')); // get list of all projects
router.get('/api/v1/projects',kafkaController.make('projectControllerIndex')); // get list of all projects

router.post('/api/v1/project',upload.single('file'),kafkaController.make('projectControllerCreate')); // create a new project
router.get('/api/v1/project/:slug',kafkaController.make('projectControllerShow')); // get details of a single project
router.put('/project/:slug',kafkaController.make('projectControllerUpdate')); // update project 
router.put('/api/v1/submitproject',upload.single('file'),kafkaController.make('projectControllerSubmitproject')); // update project 
router.post('/api/v1/project/finalize',kafkaController.make('projectControllerFinalize')); // update project 
router.delete('/project/:slug',kafkaController.make('projectControllerDelete')); // delete project 


router.get('/api/v1/bids',kafkaController.make('bidControllerIndex')); // get list of all bids
router.post('/api/v1/bid',kafkaController.make('bidControllerCreate')); // create a new bid
router.get('/bid/:id',kafkaController.make('bidControllerShow')); // get details of a single bid
router.put('/bid/:id',kafkaController.make('bidControllerUpdate')); // update bid 
router.delete('/bid/:id',kafkaController.make('bidControllerDelete')); // delete bid 

router.get('/api/v1/transaction',kafkaController.make('transactionControllerIndex'));
router.post('/api/v1/transaction',kafkaController.make('transactionControllerCreate'));
router.post('/api/v1/transaction/withdraw',kafkaController.make('transactionControllerWithdraw'));

router.post('/ajax',upload.single('file'),kafkaController.make('utilityControllerAjax')); // delete bid 

router.get('/*', function(req, res){
  res.sendFile(process.env.PUBLIC_FOLDER + '/public/index.html');
});

module.exports = router;
