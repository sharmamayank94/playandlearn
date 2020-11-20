var express = require('express');
var ejs = require('ejs');

var app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('static'));

app.get('/', (req, res)=>{
	res.render("home", {tab: "home"});
});

app.get("/calculaterace", (req, res)=>{
	res.render("calculaterace", {tab: "race"});
});

app.get("/gridandfun", (req, res)=>{
	let rown = req.query.rows||3;
	let coln = req.query.cols||3;
	console.log(req.query.rows, req.query.cols);
	res.render("gridandfun", {tab: "gridandfun", rown: rown, coln: coln});
})



app.listen(3000, (a,b)=>{
	console.log("Server is running on port 3000");
});