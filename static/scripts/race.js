var question = document.querySelector(".question");
var inp = document.querySelector("#answer");
var position = document.querySelector(".points");
var botPosition = document.querySelectorAll(".points");
var inputContainer = document.querySelector(".container");
var finalPosition = document.querySelectorAll(".finalposition");

var operatordict = {
	"sub": "-",
	"mul": "*",
	"add": "+",
	"div": "/"
}
var operatorlist = [];
for(item of operatorlist2)
{
	operatorlist.push(operatordict[item]);
	document.querySelector("#"+item).checked = true;
}

var points = [0, 0, 0];

var posscript = ['st', 'nd', 'rd']



var startTime = 0;
var endTime = 0;
var rank = 1;



function countDown(countdown)
{
	question.innerHTML = countdown;
	
	if(countdown==0)
	{
		answer = setCourse();
		startTime = new Date();
		setTimeout(()=>moveBot(1), (Math.ceil(Math.random()*10) % 3 + 10-parseInt(JSON.parse(botlev))) * 1000);
		setTimeout(()=>moveBot(2), (Math.ceil(Math.random()*10) % 3 + 10-parseInt(JSON.parse(botlev))) * 1000);
	}
	else
	{
		setTimeout(()=>countDown(countdown-1), 1000);
	}
}

function moveBot(bot)
{
	points[bot]++;
	botPosition[bot].style.width = (points[bot]/10 * 100) + "%";
	
	if(points[bot]<10) setTimeout(()=>moveBot(bot), (Math.ceil(Math.random()*10) % 3 + 10-parseInt(JSON.parse(botlev))) * 1000);
	else{
		finalPosition[bot].innerHTML = rank + "<sup>"+posscript[rank-1]+"</sup> position" ;			
		rank++;	
	} 
			
}

function startgame()
{
	var slider = document.getElementById("botslider");
	var operators =[];
	var opsec = document.getElementsByClassName("opsec");

	for (item of opsec)
	{
		if(item.checked) operators.push(item.value);
	}	
	console.log(operators);
	window.location = "/calculaterace/?"+"botlevel="+slider.value+"&operators="+operators;
}

function startGame()
{
	countDown(3);
}



function setCourse()
{
	var operator = operatorlist[Math.ceil(Math.random() * 10)%operatorlist.length];
	var operand1 = Math.ceil(Math.random() * 22)+2; 
	var operand2 = Math.ceil(Math.random() * 22)+2; 

	if(operand2>operand1)
	{
		var temp = operand2;
		operand2 = operand1;
		operand1 = temp;
	}
	var answer = 0;

	if(operator=='+') answer = operand1 + operand2;
	else if(operator=='-') answer = operand1 - operand2;
	else if(operator=='*') answer = operand1 * operand2;
	else if(operator=='/'){
		operand1 = Math.ceil(Math.random() * 10) * operand2;
		answer = operand1/operand2;
	} 

	question.innerHTML = "" + operand1 + operator + operand2;
	return answer;
}



inp.addEventListener('input', ()=>{
	


	if(Number(inp.value) == answer)
	{
		points[0]++;
		if(points[0]==10)
		{
			endTime = new Date();
			finalPosition[0].innerHTML = rank + "<sup>"+posscript[rank-1]+"</sup> position" ;			
			rank++;
			inputContainer.style.display = "none";
			question.innerHTML = Math.ceil((endTime-startTime)/1000) + " seconds";
		} 
		else
		{
			answer = setCourse();
			inp.value = "";			
						
			//question.innerHTML = "" + operand1 + operatorlist[operator] + operand2;
		}
		position.style.width = points[0]/10 * 100 + "%";
	

		
	}
});