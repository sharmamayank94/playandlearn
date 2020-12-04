function shifthead(x)
{

	var labuser = document.querySelector("."+x);
	
	labuser.style.top = "0px";
	labuser.style.fontSize = "14px";
}

function shiftdownhead(x, y )
{

	var labuser = document.querySelector("."+x);
	var selectElement = document.querySelector('input[name='+y+']');

	if(selectElement.value!='') return;
	
	labuser.style.top = "30px";
	labuser.style.fontSize = "16px";
}