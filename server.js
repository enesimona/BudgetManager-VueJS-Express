'use strict'
const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const firebase = require('firebase');
const morgan = require('morgan');
var apiRoutes = express.Router();
var cors = require('cors');
//app.use(express.static(__dirname + '/app'));

app.use(bodyParser.urlencoded({
  limit: '50mb',
  extended: false,
  parameterLimit: 1000000
}));
app.use(bodyParser.json({
  limit: '50mb'
}));
app.use(morgan('dev'));

var budgetId;
 var admin = require("firebase-admin");
 var serviceAccount = require("serviceAccountKeyAdmin.json");

 admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://budgetmanager-538dd.firebaseio.com"
});
// Get a database reference to our blog
var db = admin.database();
const refBudget = db.ref("server/saving-data/fireblog/budgets");


app.get('/home',(req,res)=>{

	res.status(200).send("Hello");
});

app.get('/setup',(req,res)=>{
	//var budgetRef =  refBudget.child("budgets");
	refBudget.push({
		title:"Christmas gifts",
		limit:400,
		remaining:300
	});
	res.status(200).send("Am inserat");
});

app.get('/setupWithIds',(req,res)=>{
	//var budgetRef =  refBudget.child("budgets");
	refBudget.push({
		title:"Christmas gifts",
		limit:400,
		remaining:300
	});
	res.status(200).send("Am inserat");
});


apiRoutes.post('/budgets',(req,res)=>{

	var budget = req.body;

	console.log(req.body);
	if (budget.title && budget.limit){
		budget.remaining = budget.limit;
		refBudget.push(budget);
	//res.status(200).send("Am inserat");
		res.status(201).send('created');
	}else {
		res.status(400).send('invalid budget');
	}
});

apiRoutes.put('/budget/:id',(req,res)=>{

	var budgetRef = db.ref("server/saving-data/fireblog/budgets/"+req.params.id);
	var budgetExpenses = db.ref("server/saving-data/fireblog/budgets/"+req.params.id+"/expense");
	var budgetLimitRef = db.ref("server/saving-data/fireblog/budgets/"+req.params.id+"/limit");

	var budget;
	var remaining; 
	var expenses = new Array();

	budgetRef.once("value",function(snapshot){
		
			budget = snapshot.val();
			remaining = budget.remaining;
			console.log ("Limit is "+remaining);
			if ((remaining - req.body.price) >=0){

			if (budget.expense != undefined ){
				expenses = budget.expense;
			}
			expenses.push(req.body);
			remaining = remaining - req.body.price;
			var updateObject = {
					"remaining":remaining,
   					"expense": expenses
					};
			budgetRef.update(updateObject);
			res.status(201).send('created');
			}else {
				res.status(201).send('budget exceeded');
			}	

	});
	
});

// function getBudgets(){
// 	var budgetRef = db.ref("server/saving-data/fireblog/budgets");
	
// 	var budgets = new Array();
// 	var budgetsFormatted = new Array();
	

// 	budgetRef.once("value").then=>(function(snapshot){
		
// 			//budgets = snapshot.val();
// 			snapshot.forEach(function(childSnapshot) {
// 			var budget = {
// 					id : childSnapshot.key,
// 					title : childSnapshot.val().title,
//     				limit : childSnapshot.val().limit,
//     				remaining : childSnapshot.val().remaining,
//     				expense : childSnapshot.val().expense
// 			};
//     		budgets.push(budget);
//   });
// }

apiRoutes.get('/budgets',(req,res)=>{

	var budgetRef = db.ref("server/saving-data/fireblog/budgets");
	
	var budgets = new Array();
	var budgetsFormatted = new Array();
	

	budgetRef.once("value").then(function(snapshot){
		
			//budgets = snapshot.val();
			snapshot.forEach(function(childSnapshot) {
			var budget = {
					id : childSnapshot.key,
					title : childSnapshot.val().title,
    				limit : childSnapshot.val().limit,
    				remaining : childSnapshot.val().remaining,
    				expense : childSnapshot.val().expense
			};
    		budgets.push(budget);
  });	
			res.status(200).json(budgets);	

	});
	
});
apiRoutes.get('/budgets/:id',(req,res)=>{

	var budgetRef = db.ref("server/saving-data/fireblog/budgets/"+req.params.id);
	
	var budget;
	

	budgetRef.once("value",function(snapshot){
		
			budget = snapshot.val();	
			res.status(200).json(budget);	

	});
	
});

apiRoutes.delete('/budgets/:id', (req, res) => {
    let found = false
   	var budgetRef = db.ref("server/saving-data/fireblog/budgets/"+req.params.id);
   
	budgetRef.once('value', function(snapshot) {
    snapshot.ref.remove();
    res.status(201).send('deleted')
});
   
});

app.use(cors(
	{	origin: 'http://localhost:3000',
  		credentials: true
}));
app.use(apiRoutes);

app.listen(8081);
console.log("Magic happens on port 8080...");