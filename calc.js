var equation = [];
var numberHolder = "";
var sum = 0;

function buttonPressed(button){
  if (!isNaN(button) || button == "."){
    numberHolder += button;
  } else if(button == "ac"){
    resetCalc();
  }else if(button == "ce"){
    numberHolder = "";
  } else if(button == "="){
    equation[equation.length] = parseFloat(numberHolder);
    solve();
    return;
  } else { //ie. if operator

    //toggle negative
    if(button == "-" && equation.length != 0 && numberHolder == "" ){
        numberHolder = "-";
        updateDisplay();
        return;
    } else if (button == "-" && numberHolder == "-") {
        numberHolder = "";
        updateDisplay();
        return;
    }

    //unexpected operator
    if(isOperator(equation[equation.length-1]) && numberHolder == ""){
      displayError();
      return;
    }

    //else push number and operator to array
    if(equation.length == 0 && numberHolder == ""){
      numberHolder = sum;
    }
    equation[equation.length] = parseFloat(numberHolder);
    equation[equation.length] = button;
    numberHolder = "";
  }
  updateDisplay();
}

//remember to accomodate for negatives
function solve(){ 
  var total = equation[0];
  for(var i = 1; i+1 < equation.length; i = i+2){
    var symbol = equation[i];
    var num = 0;

    num = equation[i+1];

    switch(symbol) {
      case '+':
        total += num;
        break;
      case '-':
        total -= num;
        break;
      case '*':
        total *= num;
        break;
      case '/':
        total /= num;
        break;
      default:
        break;
    }
  }
  sum = total;
  numberHolder = "";
  updateDisplay();
  equation = [];
}


function isOperator(op){
    switch(op){
      case '+':
      case '-':
      case '*':
      case '/':
        return true;
      default:
        return false;
    }
  }

function resetCalc(){
  equation = [];
  numberHolder = "";
  sum = 0;
}

function displayError(){
  console.log("You have made a mistake");
  document.getElementById('mainScreen').innerHTML = "error";
  document.getElementById('minorScreen').innerHTML = sum;
  equation = [];
  numberHolder = "";
}

function updateDisplay(){
  var current = numberHolder;
  if(current == ""){ current = sum; }
  else if(isNaN(current) && current != "-"){ current = 0; }
  document.getElementById('mainScreen').innerHTML = current;

  var eq = equation.join(" ");

  document.getElementById('minorScreen').innerHTML = eq;

  console.log("E: " + eq);
  console.log("N: " + numberHolder);
  console.log("S: " + sum);
}
  

