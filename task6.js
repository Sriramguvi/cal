let container=document.createElement("div");
container.setAttribute("id","container");
let calculator=document.createElement("div");
calculator.setAttribute("id","calculator");
let result=document.createElement("div");
result.setAttribute("id","result");
let history=document.createElement("div");
history.setAttribute("id","history");
let hval=document.createElement("p");
hval.setAttribute("id","history-value");
let output=document.createElement("div");
output.setAttribute("id","output");
let hval1=document.createElement("div");
hval1.setAttribute("id","output-value");
let keyboard=document.createElement("div");
keyboard.setAttribute("id","keyboard");

keyboard.innerHTML=`	
<button class="operator" id="clear">C</button>
<button class="operator" id="backspace">CE</button>
<button class="operator" id="%">%</button>
<button class="operator" id="/">&#247;</button>
<button class="number" id="7">7</button>
<button class="number" id="8">8</button>
<button class="number" id="9">9</button>
<button class="operator" id="*">&times;</button>
<button class="number" id="4">4</button>
<button class="number" id="5">5</button>
<button class="number" id="6">6</button>
<button class="operator" id="-">-</button>
<button class="number" id="1">1</button>
<button class="number" id="2">2</button>
<button class="number" id="3">3</button>
<button class="operator" id="+">+</button>
<button class="empty" id="empty"></button>
<button class="number" id="0">0</button>
<button class="empty" id="empty"></button>
<button class="operator" id="=">=</button>"`;
calculator.append(keyboard);
output.append(hval1);
result.append(output);
history.append(hval);
result.append(history);
calculator.append(result);
container.append(calculator);
document.body.append(container);


function getHistory(){
	return document.getElementById("history-value").innerText;
}
function printHistory(num){
	document.getElementById("history-value").innerText=num;
}
function getOutput(){
	return document.getElementById("output-value").innerText;
}
function printOutput(num){
	if(num==""){
		document.getElementById("output-value").innerText=num;
	}
	else{
		document.getElementById("output-value").innerText=getFormattedNumber(num);
	}	
}
function getFormattedNumber(num){
	if(num=="-"){
		return "";
	}
	var n = Number(num);
	var value = n.toLocaleString("en");
	return value;
}
function reverseNumberFormat(num){
	return Number(num.replace(/,/g,''));
}
var operator = document.getElementsByClassName("operator");
for(var i =0;i<operator.length;i++){
	operator[i].addEventListener('click',function(){
		if(this.id=="clear"){
			printHistory("");
			printOutput("");
		}
		else if(this.id=="backspace"){
			var output=reverseNumberFormat(getOutput()).toString();
			if(output){//if output has a value
				output= output.substr(0,output.length-1);
				printOutput(output);
			}
		}
		else{
			var output=getOutput();
			var history=getHistory();
			if(output==""&&history!=""){
				if(isNaN(history[history.length-1])){
					history= history.substr(0,history.length-1);
				}
			}
			if(output!="" || history!=""){
				output= output==""?output:reverseNumberFormat(output);
				history=history+output;
				if(this.id=="="){
					var result=eval(history);
					printOutput(result);
					printHistory("");
				}
				else{
					history=history+this.id;
					printHistory(history);
					printOutput("");
				}
			}
		}
		
	});
}
var number = document.getElementsByClassName("number");
for(var i =0;i<number.length;i++){
	number[i].addEventListener('click',function(){
		var output=reverseNumberFormat(getOutput());
		if(output!=NaN){
			console.log(this.id);
			//if output is a number
			output=output+this.id;
			printOutput(output);
		}
	});
}









