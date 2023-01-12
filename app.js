const laptopsElement = document.getElementById("laptops");
const personElement = document.getElementById("person");
const bankBalanceElement = document.getElementById("bankBalance");
const loanBalanceElement = document.getElementById("loanBalance");
const workBalanceElement = document.getElementById("workMoney");
const loanElement = document.getElementById("loanButton");
const workElement = document.getElementById("workButton");
const bankElement = document.getElementById("bankButton");
const buyNowElement = document.getElementById("buyNowButton");
const specsElement = document.getElementById("specs");
//Creating a person with banking details
let person = {
    name: "Joe Banker",
    bankBalance: 2000,
    loan: 100,
    workBalance: 100,
};
personElement.innerText = person.name;
bankBalanceElement.innerText ="Balance "  + person.bankBalance + " €";
loanBalanceElement.innerText = person.loan;
workBalanceElement.innerText ="Balance "  + person.workBalance + " €";

//onclick loan
document.getElementById("loanButton").addEventListener("click", pressloanButton);
function pressloanButton(){
    if (person.loan>0){
        alert("You alreydy have loan. Please pay it first before applying new loan!")
    } else {
        let loanAsked = prompt("Your current Balance is " + person.bankBalance + "€. We allow you to loan " + 2*person.bankBalance  +"€. Write the wanted loan amount.", 2*person.bankBalance );
        if (loanAsked === 0){
            alert("Asked loan was "  + loanAsked + "€. Loan not granted")
        }
        else if (loanAsked <= person.bankBalance*2 && loanAsked > 0){
            alert("Loan Granted")
            person.loan = loanAsked;
            loanBalanceElement.innerText = person.loan;       
        }
    }
}
//onclick work to Bank
document.getElementById("bankButton").addEventListener("click", pressBankButton);
function pressBankButton() {
    if (person.workBalance === 0){
        alert("You need to work to transfer money to bank")
    
    }else if (person.loan === 0){
    person.bankBalance = person.bankBalance + person.workBalance
    person.workBalance = 0
    console.log(person.bankBalance)
    bankBalanceElement.innerText ="Balance "  + person.bankBalance + " €";
    workBalanceElement.innerText = person.workBalance
}else if (person.loan >0){
    person.bankBalance = person.bankBalance + (person.workBalance*0.9)
    person.loan= person.loan - (person.workBalance*0.1)
    person.workBalance = 0
    //for end of loan payment. Paying instant back if customer sends too much money.
    if (person.loan <0){
        const overpaidMoney = Math.abs(person.loan)
        person.bankBalance = person.bankBalance + overpaidMoney
        person.loan = 0
        alert("Hurray, you have paid your loan to bank!")
    }
    bankBalanceElement.innerText ="Balance "  + person.bankBalance + " €";
    workBalanceElement.innerText = person.workBalance + " €";
    loanBalanceElement.innerText = person.loan;

}else if (person.loan <0)
    loanBalanceElement.innerText = "BANK OWNS MONEY TO YOU";
    
}


//onclick more workmoney 100
document.getElementById("workButton").addEventListener("click", pressWork);
function pressWork() {
    person.workBalance = person.workBalance + 100
    console.log(person.workBalance)
    workBalanceElement.innerText ="Balance "  + person.workBalance + " €";
  }


let laptops = [];

//fetching laptops via API
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data )
    .then(laptops => addLaptopsToMenu(laptops));

const addLaptopsToMenu = (laptops) =>{
    laptops.forEach(x => addLaptopToMenu(x));
}

const addLaptopToMenu = (laptop) =>{
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
    

    
}





function getAllLaptops() {
    return fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(function(response) {
        return response.json()
    })
}

getAllLaptops()

.then(function(laptops){
 
    console.log(laptops)
    console.log(laptops[0].specs)
})
 

