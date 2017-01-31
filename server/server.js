var express		= require('express');
var app 		= express();
var bodyParser 	= require('body-parser');

var mongoose	= require('mongoose');
mongoose.connect('mongodb://tester:123123@ds029605.mlab.com:29605/test_db');

var Bear		= require('./app/models/bear');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port 	= process.env.PORT || 8080;

var router 	= express.Router();

router.use(function(req, res, next){
	res.header("Access-Control-Allow-Origin", "*");
  	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  	res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
	console.log("Something is happening.");
	next();
});

router.get('/', function(req, res){
	res.json({
		message: 'Hooray! Welcome to our API!'
	});
});

router.route('/bears')
	  
	  .post(function(req, res){

	  	var bear = new Bear();

	  	bear.student_id = req.body.student_id;
	  	bear.firstname = req.body.firstname;
	  	bear.lastname = req.body.lastname;
	  	bear.info = req.body.info;

	  	bear.save(function(err){

	  		if(err)
	  			res.send(err);

	  		res.json({ message: 'Bear created!' });
	  	});

	  })

	  .get(function(req, res){

	  	Bear.find(function(err, bears){
	  		if(err)
	  			res.send(err);

	  		res.json(bears);
	  	});	

	  });

router.route('/bears/:student_id')
	  
	  .delete(function(req, res){

	  	Bear.remove({
	  		student_id: req.params.student_id
	  	}, function(err, bear){
	  		if(err)
	  			res.send(err);

	  		res.json(bear);
	  		console.log(bear);	
	  	});

	  })

	  .put(function(req, res){

	  	Bear.findOne({
	  		student_id: req.params.student_id
	  	}, function(err, bear){
	  		if(err)
	  			res.send(err);

		  	bear.firstname = req.body.firstname;
		  	bear.lastname = req.body.lastname;
		  	bear.info = req.body.info;

		  	bear.save(function(err){

		  		if(err)
		  			res.send(err);

		  		res.json({ message: 'Bear updated!' });
		  	});
		  	
	  	});

	  });

app.use('/api', router);

app.listen(port);
console.log("Magic happens on port " + port);