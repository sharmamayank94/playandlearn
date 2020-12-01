var express = require('express');
var ejs = require('ejs');
var cookieSession = require('cookie-session')
var app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('static'));

let k = 1


app.use(cookieSession({
	name: "session",
	keys: ['key1', 'key2']

}));


const checker = (req, res, next)=>{
	if(req.session.userId)
	{

		next();	
	} 
	else
	{
		req.session.userId = k;	
		k++;
		next();
	}
		
}



app.get('/', checker, (req, res)=>{
	
	res.render("home", {tab: "home", loggedIn: true, username: "mayank"});

});

app.get("/calculaterace", (req, res)=>{
	
	
	var botlev = req.query.botlevel || 5;
	var operatorlist = req.query.operators||"add,mul,sub,div";
	operatorlist = operatorlist.split(",");
	
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