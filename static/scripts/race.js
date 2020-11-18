function countDown(countdown)
{
	question.innerHTML = countdown;
	console.log(countdown);
	if(countdown==0)
	{
		answer = setCourse();
		startTime = new Date();
		moveBot(1);
		moveBot(2);
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
	
	if(points[bot]<10) setTimeout(()=>moveBot(bot), (Math.ceil(Math.random()*10) % 3 + 4) * 1000);
	else{
		finalPosition[bot].innerHTML = rank + "<sup>"+posscript[rank-1]+"</sup> position" ;			
		rank++;	
	} 
			
}

function startGame()
{
	countDown(3);
}



function setCourse()
{
	var operator = Math.ceil(Math.random() * 10)%3;
	var operand1 = Math.ceil(Math.random() * 30); 
	var operand2 = Math.ceil(Math.random() * 30); 

	if(operand2>operand1)
	{
		var temp = operand2;
		operand2 = operand1;
		operand1 = temp;
	}
	var answer = 0;

	if(operator==0) answer = operand1 + operand2;
	else if(operator==1) answer = operand1 - operand2;
	else if(operator==2) answer = operand1 * operand2;

	question.innerHTML = "" + operand1 + operatorlist[operator] + operand2;
	return answer;
}

var question = document.querySelector(".question");
var inp = document.querySelector("#answer");
var position = document.querySelector(".points");
var botPosition = document.querySelectorAll(".points");
var inputContainer = document.querySelector(".container");
var finalPosition = document.querySelectorAll(".finalposition");

var points = [0, 0, 0];
var operatorlist = [" + ", " - ", " * "]
var posscript = ['st', 'nd', 'rd']



var startTime = 0;
var endTime = 0;
var rank = 1;


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