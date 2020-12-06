var express = require('express');
var ejs = require('ejs');
var cookieSession = require('cookie-session');
var bodyParser = require('body-parser');
var knexjs = require('knex')
var bcrypt = require('bcrypt');



var knex = knexjs({
  client: 'pg',
 
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'playandlearn'
  }
});

// var knex = knexjs({
//   client: 'pg',
 
//   connectionString: process.env.DATABASE_URL,
//   ssl: {
//     rejectUnauthorized: false
//   }
// });

var app = express();

app.set('view engine', 'ejs');
app.use('/public', express.static('static'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use(cookieSession({
	name: "session",
	keys: ['key1', 'key2']

}));



function redirecthome(req, res, next)
{
	if(req.session.username)
	{
		res.redirect('/');
		
	}
	else
	{
		next();
	}
}


app.get('/',  (req, res)=>{
	var loggedIn = false;
	var username = "";
	if(req.session.username)
	{
		username = req.session.username;
		loggedIn = true;
	}	
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render("home", {tab: "home", loggedIn: loggedIn, username: username});

});

app.get("/calculaterace", (req, res)=>{
	var loggedIn = false;
	var username = "";
	if(req.session.username)
	{
		username = req.session.username;
		loggedIn = true;
	}	
	
	var botlev = req.query.botlevel || 5;
	var operatorlist = req.query.operators||"add,mul,sub,div";
	operatorlist = operatorlist.split(",");
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render("calculaterace", {tab: "race", loggedIn: loggedIn, username: username, botlev:botlev, operatorlist2:operatorlist});
});

app.get("/gridandfun", (req, res)=>{
	var loggedIn = false;
	var username = "";
	if(req.session.username)
	{
		username = req.session.username;
		loggedIn = true;
	}	
	

	let rown = req.query.rows||3;
	let coln = req.query.cols||3;
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render("gridandfun", {tab: "gridandfun", loggedIn: loggedIn, username: username, rown: rown, coln: coln});
})

app.get("/users/login", redirecthome, (req, res)=>{
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render("login", {message: ""});
});
app.get("/users/register", redirecthome, (req, res)=>{
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.render("register", {message:''});
});

app.post("/users/login", (req, res)=>{

	
	knex.select('username', 'password').from('userdetails')
	.where('username', '=', req.body.username)
	.then(data=>{
		bcrypt.compare(req.body.password, data[0].password, (err, result)=>{
			if(!result)
			{
				res.render('login', {message:"*Wrong password"});
			}
			else
			{
				knex('userstats').select('lastlogin', 'streak', 'username')
				.where('username', '=', data[0].username)
				.then(data=>{
					data = data[0];
					let streak = data.streak;
					
					let lastlogin = data.lastlogin;
					lastlogin = new Date(lastlogin.getFullYear(), lastlogin.getMonth(), lastlogin.getDate());
					
					let currentdate = new Date();
					currentdate = new Date(currentdate.getFullYear(), currentdate.getMonth(), currentdate.getDate());
					
					
					let difference = (currentdate - lastlogin)/(1000*60*60*24);
					if(difference == 1)
					{
						streak++;
					}
					else if(difference>1)
					{
						streak = 0;
					}


					return knex('userstats').where('username', '=', data.username).update({
						lastlogin: new Date(), 
						streak: streak
					}).returning('username')
					.then(data=>{
						console.log(data);
						req.session.username = data[0];
						res.redirect('/');
					});
				})
				.catch(console.log());
				
			}
		})
	})
	.catch(err=>{
		console.log(err);
	})

	
})

app.post("/users/register", (req, res)=>{
	
	
	 if(!req.body.email || !req.body.username || !req.body.password || !req.body.confirmpassword)
	{
		res.render("register", {message:"*Please fill all the details"});	
	}
	else if(req.body.confirmpassword!=req.body.password)
	{
		res.render("register", {message:"*Passwords do not match"});	

	}
	else
	{
		bcrypt.hash(req.body.password, 3, (err, hash) => {
			knex.select('email').from("userdetails")
			.where('email', '=', req.body.email)
			.orWhere('username', '=', req.body.username)
			.then(data=>{
				if(data.length>0)
				{
					res.render("register", {message:"*Username or email already exists"});	
				}
				else
				{
					knex("userdetails").insert({
		  				email:req.body.email,
		  				username:req.body.username,
		  				password: hash,
		  				created_on: new Date()
		  			})
		  			.returning('username')
		  			.then(data=>{
		  				data = data[0];
		  				return knex("userstats").insert({
			  				username: data,
			  				races: 0,
			  				racewon: 0,
			  				streak: 1,
			  				points: 0,
			  				avgtime: 0,
			  				lastlogin: new Date()
		  				})
		  				.returning('username')
		  				.then(data=>{
		  					data = data[0];
		  					req.body = null;
			  				req.session.username = data;
			  				res.redirect('/');
		  				})
		  				.catch(err=>{
		  					console.log(err);
		  				});

		  				
		  			})
		  			.catch(err=>{
		  				console.log(err);
		  			});


				}
			});
  			
		});
	}
	
});

app.get("/users/:user", (req, res)=>{
	let username = req.params.user;
	let joinedon = new Date();
	console.log(username);
	knex('userstats')
	.select('races', 'avgtime', 'racewon', 'points', 'streak')
	.where('username', '=', username)
	.then(data=>{
		console.log(data);
		data = data[0];
		let points = data.points;
		let streak = data.streak;
		let racecount = data.races;
		let wincount = data.racewon;
		let avgspeed = data.avgtime/(racecount*10);

		let loggedIn = false;
		if(req.session.username) loggedIn = true;

		res.render('profile', {username, loggedIn, joinedon, points, 
		streak, racecount, wincount, avgspeed});
	})
	.catch(err=>{
		res.send("user does not exist");
	});
	
});

app.get('/logout', (req, res)=>{
	req.session = null;
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	res.redirect('/users/login');
});


app.post('/racestats', (req, res)=>{
	let speed = req.body.timetaken;
	let winner = req.body.winner;
	console.log(req.body);
	knex('userstats').where('username', '=', req.session.username)
	.update({
		races: knex.raw('??+1', ['races']), 
		racewon: knex.raw('?? + ??', ['racewon', winner]),
		avgtime: knex.raw('?? + ??', ['avgtime', speed]),
		points: knex.raw('?? + 2 + ??', ['points', winner*5])
	}).then((data)=>{
		console.log(data);
		res.send("hey man");
	}).catch(err=>{
		console.log(err);
		console.log(req.body);
	});
});

app.listen(process.env.PORT|| 3000, (a,b)=>{
	console.log("Server is running on port 3000");
});