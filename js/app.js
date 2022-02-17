//calculate button
document.getElementById('calculate-button').addEventListener('click', function () {
  // total expenses
  const totalExpenses = document.getElementById('total-expenses');
  const totalExpensesNumber = getInputValue('food-input') + getInputValue('rent-input') + getInputValue('clothes-input');
  //balance 
  const balanceAmount = document.getElementById('balance');
  //income amount
  const incomeAmount = getInputValue('income-input');
  //error check
  if (totalExpensesNumber >= 0 && incomeAmount >= 0) {
      totalExpenses.innerText = totalExpensesNumber;
      //error check
      if (totalExpensesNumber <= incomeAmount) {
          balanceAmount.innerText = incomeAmount - getTextValue('total-expenses');
          mathError('total-expenses','expenses',false);
          mathError('balance','expenses', false);
      }
      else {
          balanceAmount.innerText = '00';
          mathError('total-expenses','expenses',true);
      }
  }
  else {
      totalExpenses.innerText = '00';
      balanceAmount.innerText = '00';
  }
});

//save button 
document.getElementById('save-button').addEventListener('click', function () {
  // save amount
  const saveAmount = document.getElementById('save-amount');
  const saveAmountNumber = getInputValue('income-input') * (getInputValue('save-input') / 100);
    // remain amount 
  const remainAmount = document.getElementById('remain-amount');
  //error check
  if (saveAmountNumber >= 0) {
      saveAmount.innerText = saveAmountNumber;
      //error check
      if (getTextValue('save-amount') <= getTextValue('balance')) {
          remainAmount.innerText = getTextValue('balance') - getTextValue('save-amount');
          mathError('save-amount','saving',false);
          mathError('balance', 'saving', false);
      }
      else {
          remainAmount.innerText = '00';
          mathError('save-amount', 'saving', true);
          mathError('balance', 'saving', true);
      }
  }
  else if(saveAmountNumber.typeof != 'number'){
      saveAmount.innerText = '00';
      remainAmount.innerText = '00';
  }
});


// check error display
function errorDisplay(amount, displayId, border, isError) {
  if (isError == true) {
      document.getElementById(amount).style.color = 'blue';
      document.getElementById(displayId).style.display = 'block';
      document.getElementById(border).style.border = '2px solid blue';
  }
  else {
      document.getElementById(amount).style.color = 'black';
      document.getElementById(displayId).style.display = 'none';
      document.getElementById(border).style.border = 'none';
  }
};

//input error
function inputError(idName,isTrue){
  if(isTrue==true){
      errorDisplay(idName +'-error', idName+'-error', idName, true);
  }
  else{
      errorDisplay(idName +'-error', idName+'-error', idName, false);
  }
};

// math error display
function mathError(displayName,errorId,isTrue){
  if(isTrue==true){
  errorDisplay(displayName, errorId +'-error', errorId +'-error', true);
  }
  else{
  errorDisplay(displayName, errorId +'-error', errorId +'-error', false);
  }
};


// get  input id value
function getInputValue(inputId) {
  const inputText = document.getElementById(inputId);
  const inputNumber = parseFloat(inputText.value);
  //check string
  if(isNaN(inputText.value) == true){
      inputError(inputId,true);
      document.getElementById(inputId+'-error-type').innerText = 'not acceptable';
      
  }
  //check number
  else if(isNaN(inputText.value) == false){
      inputError(inputId,true);
      document.getElementById(inputId+'-error-type').innerText = 'not nagative value';
  }
  //check empty fill
  if (inputText.value == '') {
      inputError(inputId,true);
      mathError('total-expenses','expenses',false);
      mathError('save-amount','saving', false);
      document.getElementById(inputId+'-error-type').innerText = 'fill up';
  }
  else {
      //error check
      if (inputText.value >= 0) {
          inputError(inputId,false);
          return inputNumber;
      }
      else {
          inputError(inputId,true);
          mathError('total-expenses','expenses',false);
          mathError('save-amount', 'saving', false);
      }
  }
  inputText.value="";
  return getInputValue;
};

// get id innerText value
function getTextValue(textId) {
  const text = document.getElementById(textId);
  const textValue = parseFloat(text.innerText);
  return textValue;
};



