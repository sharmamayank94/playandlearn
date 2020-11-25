var ans = 0;
activateChilds(-1, 0);

function getSum(i, j)
{

	
	ans+=parseInt(document.getElementById("h"+i+j).innerHTML);
	if(i==rown-1 && j==coln-1)return 0;

	if(i<rown-1 && j<coln-1)
	{
		
		var nex = Math.ceil((Math.random() * 10)) % 2;
		
		if(nex==0)
		{
			getSum(i, j+1);
		}
		else 
		{
			getSum(i+1, j);
		}
	}
	else if(i>=parseInt(rown)-1)
	{
		getSum(i, j+1);
	}
	else if(j>=parseInt(coln)-1) getSum(i+1, j);	
}
getSum(0, 0);

document.querySelector(".answerspan").innerHTML = ans;

var userscore = 0;
var userscorespan = document.querySelector(".userscorespan");
var lastChoice = []

function activateChilds(i, j)
{
	if(j<coln-1 && i>-1)
	{
		var rightbox = document.getElementById(""+(i)+(j+1));
		rightbox.disabled = false;
		var rightboxh = document.getElementById("h"+(i)+(j+1));
		rightboxh.style.color = "black";
		rightboxh.style.backgroundColor = "lightgreen";
	}
	if(i<rown-1)
	{
		var rightbox = document.getElementById(""+(i+1)+(j));
		rightbox.disabled = false;
		var rightboxh = document.getElementById("h"+(i+1)+(j));
		rightboxh.style.color = "black";
		rightboxh.style.backgroundColor = "lightgreen";
	}
}

function deactivateElement(i, j, s='k')
{
	if(i<rown && j<coln)
	{
	
		var box = document.getElementById("" + i + j);
		var boxh = document.getElementById("h" + i + j);
		boxh.style.backgroundColor = "";
		box.disabled = true;
		if(box.checked)
		{			
			box.checked = false;
		} 
		boxh.style.color = "grey";

		if(s=='n') userscore-=boxh.innerHTML;
	}
}

function score(element, val, i, j)
{
	var box = document.getElementById("h"+i+j);
	box.style.backgroundColor="";
	if(element.checked)
	{
		if(lastChoice.length)
		{
			var pi = lastChoice[lastChoice.length-1][0];
			var pj = lastChoice[lastChoice.length-1][1];
			
			var prev = document.getElementById("" + pi+pj);

			if(pi+1 == i ) //if current element is bottom element of previous element
			{
				deactivateElement(pi, pj+1);
				
			}
			else if(pj+1 == j) //current element is right elemnet of previous element
			{
				deactivateElement(pi+1, pj);
			}

		}
		userscore+=val;
		
		
		
		//activating right and bottom boxes
		activateChilds(i, j);

		//pushing this element in last choice
		lastChoice.push([i,j]);
		if(ans==userscore && i==rown-1 && j==coln-1)
		{
			checkAnswer();
		}

	}	
	else{
		
		
		var lasti = lastChoice[lastChoice.length-1][0];
		var lastj = lastChoice[lastChoice.length-1][1];

		deactivateElement(lasti+1, lastj);
		deactivateElement(lasti, lastj+1);		
		tempChoice = []

		for (var it = lastChoice.length-1; it>-1; it--)
		{
			
			deactivateElement(lastChoice[it][0], lastChoice[it][1], 'n');
					
			if(i==lastChoice[it][0] && j==lastChoice[it][1])
			{
				if(it-1>-1) activateChilds(lastChoice[it-1][0], lastChoice[it-1][1]);
				for(element of lastChoice)
				{
					if(element[0]==i && element[1]==j) break;
					tempChoice.push(element);
				} 
				break;
			}
		}

		lastChoice = tempChoice;
		if(lastChoice.length==0)
		{
			activateChilds(-1, 0);
		}
		
	} 

	userscorespan.innerHTML = userscore;

	
}


function checkAnswer()
{
	var result = document.querySelector(".result");
		
	for(var i = 0; i<parseInt(rown); i++)
	{
		
		for(var j = 0; j<parseInt(coln); j++)
		{
			var box = document.getElementById(""+i+j);
			var boxb = document.getElementById("h"+i+j);
			if(box.checked)
			{
				boxb.style.backgroundImage = "linear-gradient(rgb(24, 202, 39), rgb(30, 219, 87))";
				boxb.style.color = "white";
			}
		}
		

	}
	result.innerHTML = "Congratulations";
		
		

	
}

function reset()
{
	userscore  = 0;
	userscorespan.innerHTML = userscore;
	for(var i = 0; i<parseInt(rown); i++)
	{
		
		for(var j = 0; j<parseInt(coln); j++)
		{
			
			deactivateElement(i, j)
		}
	}
	activateChilds(-1, 0);
}

function howtoplay()
{

}

function startgame()
{
	var rows = document.querySelector("#rowsinput").value;
	var cols = document.querySelector("#colsinput").value;
	window.location = "/gridandfun/?rows="+rows+"&cols="+cols;
}