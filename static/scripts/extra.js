function checkAnswer()
{
	var start = document.getElementById("00");
	var end = document.getElementById(""+(rown-1) + (coln-1));
	var result = document.querySelector(".result");

	if(!start.checked)
	{
		result.innerHTML = "Starting square not selected";
	}
	else if(!end.checked)
	{
		result.innerHTML = "Ending box not selected";
	}
	else
	{
		var pos = true;

		for(var i = 0; i<parseInt(rown); i++)
		{
			
			for(var j = 0; j<parseInt(coln); j++)
			{
				var box = document.getElementById(""+i+j);
				var leftbox = document.getElementById(""+(i)+(j-1));
				var upbox = document.getElementById(""+(i-1)+(j));
				if(!box.checked) continue;

				if(i==0 && j==0) continue;
				
				if(i==0)
				{
					if(!leftbox.checked) pos = false;
				}
				else if(j==0)
				{
					if(!upbox.checked) pos = false;
				}
				else
				{
					if(!leftbox.checked && !upbox.checked) pos = false;
				}

				if(!pos) break;
			}
			if(!pos) break;

		}

		if(pos)
		{
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
		else
		{
			result.innerHTML = "Wrong answer";
		}
	}