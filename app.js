var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('static'));

app.get('/', (req, res)=>{
	res.render("home", {tab: "home"});
});

app.get("/calculaterace", (req, res)=>{
	console.log(req.query.operators);
	var botlev = req.query.botlevel || 5;
	var operatorlist = req.query.operators||"add,mul,sub,div";
	operatorlist = operatorlist.split(",");
	console.log(typeof(operatorlist));
	res.render("calculaterace", {tab: "race", botlev:botlev, operatorlist2:operatorlist});
});

app.get("/gridandfun", (req, res)=>{
	let rown = req.query.rows||3;
	let coln = req.query.cols||3;
	
	res.render("gridandfun", {tab: "gridandfun", rown: rown, coln: coln});
})



app.listen(process.env.PORT|| 3000, (a,b)=>{
	console.log("Server is running on port 3000");
});