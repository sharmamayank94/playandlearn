
var question = document.querySelector(".question");
var points = 0; 

var inp = document.querySelector("#answer");
var position = document.querySelector(".points");
var inputContainer = document.querySelector(".container");

var operatorlist = [" + ", " - ", " * "]

var operator = Math.ceil(Math.random() * 10)%3;
var operand1 = Math.ceil(Math.random() * 30); 
var operand2 = Math.ceil(Math.random() * 30); 
var answer = 0; 
if(operator==0) answer = operand1 + operand2;
else if(operator==1) answer = operand1 - operand2;
else if(operator==2) answer = operand1 * operand2;


question.innerHTML = "" + operand1 + operatorlist[operator] + operand2;


var startTime = 0;
var endTime = 0;
inp.addEventListener('input', ()=>{
	console.log("start");
	if(startTime==0) startTime = new Date()
	if(Number(inp.value) == answer)
	{
		points++;
		if(points==2)
		{
			endTime = new Date();
			
			inputContainer.style.display = "none";
			question.innerHTML = Math.ceil((endTime-startTime)/1000);
		} 
		else
		{
			var operator = Math.ceil(Math.random() * 10)%3;
			var operand1 = Math.ceil(Math.random() * 30); 
			var operand2 = Math.ceil(Math.random() * 30); 

			if(operator==0) answer = operand1 + operand2;
			else if(operator==1) answer = operand1 - operand2;
			else if(operator==2) answer = operand1 * operand2;
			inp.value = "";
			
			position.style.width = points/10 * 100 + "%";

			question.innerHTML = "" + operand1 + operatorlist[operator] + operand2;
		}
		position.style.width = points/10 * 100 + "%";

		
	}
})