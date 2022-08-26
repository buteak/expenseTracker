const balance = document.querySelector('#balance');
const moneyPlus = document.querySelector('#money-plus');
const moneyMinus = document.querySelector('#money-minus');
const list = document.querySelector('#list');
const form = document.querySelector('#form');
const formControl = document.getElementById('form-control');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const btn = document.getElementById('btn');



//  const dummyTransactions = [
//     {
//     id: 1, text: 'Banana', price : -30
//     },
//     {
//     id: 2, text: 'Pawpaw', price : 20
//     },
//     {
//     id: 3, text: 'Orange', price : -40
//     },
//     {
//     id: 4, text: 'Melon', price : -70
//     },
//     {
//     id: 5, text: 'Quava', price : 90
//     },
//     {
//     id: 6, text: 'Groundnut', price : 3000
//     },
//     {
//     id: 7, text: 'Kuli', price : -60
//     },
//  ];
  

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));



 let transactions = localStorage.getItem("transactions") !== null ? localStorageTransactions : [];



 function checkTextValue(e){
   e.preventDefault();
   if(text.value.trim() === "" || amount.value.trim() === ""){

     }
   else{
      const transaction = {
        id : generateID(),
        text : text.value,
        price :+amount.value,
      };
      transactions.push(transaction);
      addTODOMM(transaction);
      updateBalance();
      updateLocalStorage();
      text.value = '';
      amount.value = '';
   }
}

 function generateID(){
    return Math.floor(Math.random() * 100000);
 }

 function addTODOMM(transactions){
  const sign = transactions.price < 0 ? '-' : '+';
  const item = document.createElement('li');
  item.classList.add(transactions.price < 0 ? 'minus' : 'plus');
  item.innerHTML = `
    ${transactions.text} <span>$${Math.abs(transactions.price)}</span> <button class="delete-btn" onclick="removeTransaction(${transactions.id})">x</button 
  
  `;
  list.appendChild(item);
 }

 function updateBalance(){
    const prices = transactions.map(transaction => transaction.price)
    const total = prices.reduce((prevValue,currentValue)=>{
        return prevValue += currentValue;
    },0).toFixed(2);

    const income = prices
                         .filter(item => item > 0)
                          .reduce((prevValue,currentValue)=>{
                             return prevValue += currentValue;
                          },0) ;
    const expense = prices
                         .filter(item => item < 0)
                          .reduce((prevValue,currentValue)=>{
                             return prevValue += currentValue;
                          },0);


    balance.textContent = '$'+ total;
    moneyPlus.textContent = "$" +  income;
    moneyMinus.textContent = '$' + expense;
 }



 function removeTransaction(id){
   transactions = transactions.filter(transaction => transaction.id !== id);
   updateLocalStorage();
   init();
 }



 function updateLocalStorage(){
   localStorage.setItem('transactions', JSON.stringify(transactions));
 }
   
 




 function init(){
    list.innerHTML ="";
    
    transactions.forEach(addTODOMM)
    updateBalance();
   
 }

 init();

 form.addEventListener('submit', checkTextValue);