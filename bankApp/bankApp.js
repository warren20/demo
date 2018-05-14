/*function Account (name) {
    this.name = name;
    this.account=[];
    this.accDetail =[];
    this.transactions = [];
    this.balance = 0;
  }
  
  // Account.getName()
  Account.prototype.getName =function(){
    return this.name;
  }
  Account.prototype.setAccount =function(newAcc){
    var acc ={name:newAcc.name, acc:newAcc.account, pin:newAcc.pin} 
    this.account.push(acc);
  }
  Account.prototype.findAccount =function(acc){
      try{
    if(!this.account.indexOf(acc)){
        throw "This account does not exist, please try again!";
    }else{
        //success
    }
}
catch(err){
    return err;
}
  }
  
  Account.prototype.viewTransactions = function () {
    return this.transctions;
  }
  
  Account.prototype.verify = function (pin) {
      /// verify
      // success
    
    // tips:
    // - `this` ... name, balance, pin, transactions
    if (pin !== this.pin) {
      // error not match
      return 'error';    
    }
    return 'success'
  }
  
  Account.prototype.deposit = function(pin, amount) {
    var check = this.verify(pin);
    if (check === 'error') {
      console.error('error pin');
      return;
    }
    
    var transaction = { 
      type: "deposit", 
      amount: amount, 
      balanceStart: this.balance,
      balanceEnd: this.balance + amount,
      createdAt: new Date() 
    };
    
    this.balance = this.balance + amount;
    this.transactions.push(transaction);
    //   return this.balance + amount;
  }
  
  Account.prototype.withdraw = function(amount) {
    var transaction = { 
      type: "withdrawal", 
      amount: amount, 
      balanceStart: this.balance,
      balanceEnd: this.balance - amount,
      createdAt: new Date() 
    };
    
    this.balance = this.balance - amount;  
    this.transactions.push(transaction);
  }
  
  var newComer = new Account('Warren');
  console.log(newComer.account);
  
  */
  
  /**
   * Dom Events
   */
  var accInput = document.getElementById('accountInput');

  function handleInput(){
    var value = accInput.value;
    newComer.account.push(value);
    // we need to save name somewhere
  }
  
  function onclick () {
    // do somethign with acocunt;
  }
                                                      
  // 1 create account :D
  // 2 attach js to html onclick
  
  // var savings  = new Account('savings');
  // var checking = new Acccount('checking');
  
  function Bank () {
    this.accounts = [];//as objects
    this.account_number =[];//only account numbers stored as array
    this.account_pin =[];//array of pin for accounts
    this.account_name =[];
    this.account_balance=[];
    this.transactions =[];
    this.generatedAcc = 1000;
    this.balance = 0;
    this.account_index = 0;
    this.index = this.accounts.length;
    this.checkIndex;
  }
  var genAcc;
  Bank.prototype.createAccount = function (name,pin,genAcc) {
    var newAccount = {name:name,pin:pin, genAcc:genAcc,balance:this.account_balance[this.account_index]}
   // this.account_number[this.account_index] = (this.account_index == 0)? this.generatedAcc:this.accounts[this.index-1].genAcc+1;
    this.account_number[this.account_index] = this.generatedAcc;
    this.account_name[this.account_index] = name;
    this.account_pin[this.account_index] = pin;
    this.account_balance[this.account_index] = this.balance;//at creation of account balance is zero
    this.checkIndex;
    if(this.accounts.length== 0){
      genAcc = this.generatedAcc;
    }else{
      //genAcc = this.accounts[this.index-1].genAcc+1;
      genAcc = this.accounts[this.index-1].genAcc+1;
    }
    //creating history of this transaction
    var transaction ={
      type: "account opened", 
      name:name,
      ['account number']:genAcc,
      balanceStart: this.balance,
      createdAt: new Date().toLocaleTimeString()
    }
    this.transactions[this.account_index] = transaction;
    console.log(this.transactions[this.account_index]);

    console.log(this.account_number);
    newAccount = {name:name,pin:pin, genAcc:genAcc}
    this.accounts.push(newAccount);
    this.index++;
    this.account_index++;
    this.generatedAcc++;
  }
  Bank.prototype.checkPin = function(depoAccount,depoPin,displayArea,newDispl){
    this.checkIndex = depoAccount -1000;
    if(this.account_pin[this.checkIndex] == depoPin){
      //success
      console.log("success");
      displayArea.style.display = "none";
      newDispl.style.display = "block";

    }
  }

  Bank.prototype.deposit = function(depoAccount, depoAmt,depoMsg){
    this.checkIndex = depoAccount -1000;
    this.account_balance[this.checkIndex]= this.account_balance[this.checkIndex]+ (+depoAmt);
    var transaction ={
      type: "Cash deposited", 
      name:this.account_name[this.checkIndex],
      ['account number']:+depoAccount,
      ['Initial balance']: this.account_balance[this.checkIndex]-depoAmt,
      ['Current balance'] :this.account_balance[this.checkIndex],
      createdAt: new Date()
    }
    this.transactions[this.checkIndex] = transaction;
    console.log(this.transactions[this.checkIndex]);
    console.log(this.account_balance[depoAccount - 1000]);
    console.log(this.account_number);
    depoMsg.innerHTML = " ";
    depoMsg.innerHTML += "Your account is successfully credited!";
  }
  Bank.prototype.withdrawVerifyPin = function(userAcc, wPin,displayArea,newDispl,msg){
    this.checkIndex = userAcc - 1000;
    if(this.account_pin[this.checkIndex] == wPin && this.account_number[this.checkIndex] == userAcc){
       //success
       console.log("withdraw success!");
       displayArea.style.display = "none";
       newDispl.style.display = "block";
    }else{
      console.log("access denied");
      console.log(this.account_number);
    }
  }
  Bank.prototype.withdrawCash= function(userAcc,wAmt){
    this.checkIndex = userAcc-1000;
    this.account_balance[this.checkIndex] =  this.account_balance[this.checkIndex]- wAmt;
    var transaction ={
      type: "Cash withdraw", 
      name:this.account_name[this.checkIndex],
      ['account number']:+userAcc,
      ['Initial balance']: this.account_balance[this.checkIndex]+(+wAmt),
      ['Current balance'] :this.account_balance[this.checkIndex],
      createdAt: new Date()
    }
    this.transactions[this.checkIndex] = transaction;
    console.log(this.transactions[this.checkIndex]);
    console.log(this.account_balance[userAcc-1000]);
    console.log(this.account_number);
  }
  //checking balance
  Bank.prototype.userBalanceCheck = function(userAccount,bPin){//verify account and pin
    this.checkIndex = userAccount - 1000;
    if(this.account_number[this.checkIndex]== userAccount && this.account_pin[this.checkIndex]==bPin){
      balance.style.display = "none";
      bDisplay.style.display = "block";
      bAmt.value = this.account_balance[userAccount-1000];
    }else{
      console.log("denied access");
      console.log("this checkIndex is :" + this.checkIndex);
      console.log("this account balance from array is: " +this.account_balance[this.checkIndex]);
      console.log("this account number from array is :"+this.account_number[this.checkIndex]);
      console.log("this account pin array is: "+this.account_pin[this.checkIndex]);
      console.log("this typed user account is :" +userAccount);
      console.log("this typed user pin is :"+bPin);
      console.log("at index 0 :"+this.account_number[0]);
      console.log("at index 1 :"+this.account_number[1]);
      console.log(this.account_number);
    }
  }
  Bank.prototype.checkingBalance= function(userAccount){
    this.checkIndex = userAccount -1000;
    return this.account_balance[this.checkIndex];
  }
  //account report
  Bank.prototype.reportPiVerifynAcc = function(userAcc,pin){
    this.checkIndex = userAcc -1000;
    var currentReport = this.transactions[this.checkIndex];
    if(this.account_number[this.checkIndex]== userAcc && this.account_pin[this.checkIndex]==pin){
      checkReport.style.display = "none";
      report.style.display = 'block';
    }
    for(item in currentReport){
      var content = item +":"+currentReport[item];
      console.log(content);
      rpt.textContent += content+'-------------------------------------------------------------';
    }
    
  }

  /* ------------------------------------------------------------------------------------------- */
  var BoA = new Bank();

  var important = document.getElementById("imptMsg");

  function message(msg){
    important.innerHTML =msg;
  }
 
  function createAccount(){
  var firstView = document.getElementById("firstView");
  var name = document.getElementById("accountOwner").value;
  var pin = document.getElementById("pinInput").value;
  var msg = document.getElementById("msg");
  
  var myMessage = setInterval(message("Important Notice"),2000);

  BoA.createAccount(name,pin,genAcc);

  console.log(BoA.accounts);
  console.log(BoA.account_name[BoA.account_index-1]);
  console.log(BoA.index);
  msg.innerHTML = " ";
  msg.innerHTML += "Your created account is :" + BoA.accounts[BoA.index-1].genAcc +" and your pin is: "+BoA.accounts[BoA.index-1].pin ;
  firstView.style.display = "none";
}

  function showView(){
    var view = document.getElementById("firstView");
    if(view.style.display !== "block"){
      view.style.display = "block";
    }else{
      view.style.display = "none";
    }
    
  }
  
  //ACCOUNT DETAILS
function verify(){
  var accNu = document.getElementById("accountNumber").value;
  var pin = document.getElementById("pinInput").value;
  var result = BoA.accounts.find(item =>{
    item.genAcc == accNu;
  });
console.log(result);
  }
  //For deposit
  var depoDisplay = document.getElementById("deposit");
  var newDisplay = document.getElementById("newDisplay");
  var depoAccount =document.getElementById("depoAcc").value;
  var depoPin = document.getElementById("depoPin").value;
  var dAmt = document.getElementById("dAmt");
  //withdraw
  var wDispl = document.getElementById("wDisplay");
  
  
  function depodisplayFunc(){
    if(depoDisplay.style.display === 'none'){
    depoDisplay.style.display = "block";
    }else{
      depoDisplay.style.display = "none";
    }
  }
  function done(){
    newDisplay.style.display = "none";
  }
                              //checking the pin

function checkPin(){
  var depoAccount =document.getElementById("depoAcc").value;
  var depoPin = document.getElementById("depoPin").value;
BoA.checkPin(depoAccount,depoPin,depoDisplay,newDisplay);
}

function deposit(){
var depoAmt = document.getElementById("dAmt").value;
var depoAccount =document.getElementById("depoAcc").value;
var depoMsg = document.getElementById("depoMsg");
BoA.deposit(depoAccount, depoAmt,depoMsg);
dAmt.value = " ";
}

//For withdraw
var withdraw = document.getElementById("withdraw");
function withdrawFunc(){
  if(withdraw.style.display === 'none'){
    withdraw.style.display = "block";
    }else{
      withdraw.style.display = "none";
    }
}

function withdrawVerifyPin(){
  var userAcc = document.getElementById("wAcc").value;
  var userPin = document.getElementById("wPin").value;
  BoA.withdrawVerifyPin(userAcc,userPin,withdraw,wDisplay,msg);
}


  function withdrawMoney(){
    var userAcc = document.getElementById("wAcc").value;
    var wAmt = document.getElementById("wAmt").value;
    BoA.withdrawCash(userAcc,wAmt);
    
  }

  function doneWithdraw(){
    wDisplay.style.display = "none";
  }
  //checking balance
  function showBalance(){
    var balance = document.getElementById("balance");
    balance.style.display = "block";
    BoA.checkingBalance();
  }
  function bVerify(){
    var bAcc = document.getElementById("bAcc").value;
    var bpin = document.getElementById("bPin").value;
    BoA.userBalanceCheck(bAcc,bpin);
  }

  function doneBalance(){
    bDisplay.style.display = "none";
  }
  //historic
  function showReport(){
    var reportCheck = document.getElementById("checkReport");

   if(reportCheck.style.display =="none"){
    reportCheck.style.display = "block";
   }else{
    reportCheck.style.display = "none";
   }
  }
function rVerify(){
var rAcc = document.getElementById("rAcc").value;
var rPin = document.getElementById("rPin").value;
var rpt =  document.getElementById("rpt");
BoA.reportPiVerifynAcc(rAcc,rPin);
}

function clearReport(){
  var report = document.getElementById("report");
  report.style.display = "none";
}
function closing(){
  var close = document.getElementById("close");
  close.style.display = "block";
  close.style.position = "absolute";
  close.style.top = "100px";
}