const laptopsElement = document.getElementById("laptops");
const personElement = document.getElementById("person");
const bankBalanceElement = document.getElementById("bankBalance");
const loanBalanceElement = document.getElementById("loanBalance");
const workBalanceElement = document.getElementById("workMoney");
const loanElement = document.getElementById("loanButton");
const workElement = document.getElementById("workButton");
const bankElement = document.getElementById("bankButton");
const buyNowElement = document.getElementById("buyNowButton");
const payLoanElement = document.getElementById("payLoanButton");
const specsElement = document.getElementById("specs");
const laptopTitleElement = document.getElementById("laptopTitle");
const laptopDescElement = document.getElementById("laptopDesc");
const laptopImageElement = document.getElementById("laptopImage");
const activeImage = document.getElementById("activeImage");
const laptopPriceElement = document.getElementById("laptopPrice");
//Creating a person with banking details
let person = {
    name: "Joe Banker",
    bankBalance: 2000,
    loan: 0,
    workBalance: 100,
};


//basic info showing 
personElement.innerText = person.name;
bankBalanceElement.innerText ="Balance "  + person.bankBalance + " €";
workBalanceElement.innerText ="Balance "  + person.workBalance + " €";
//hiding Loan Button
document.getElementById("payLoanButton").style.display = "none";


//onclick loan
document.getElementById("loanButton").addEventListener("click", pressloanButton);
function pressloanButton(){
    if (person.loan>0){
        alert("You alreydy have loan. Please pay it first before applying new loan!")
    } else {
        let loanAsked = prompt("Your current Balance is " + person.bankBalance + "€. We allow you to loan " + 2*person.bankBalance  +"€. Write the wanted loan amount.", 2*person.bankBalance );
        
        if (loanAsked <= person.bankBalance*2 && loanAsked > 0){
            alert("Loan Granted")
            person.loan = loanAsked;
            document.getElementById('loanBalance').style.display = "block";
            document.getElementById("payLoanButton").style.display = "block";
            loanBalanceElement.innerText ="Loan " + person.loan + " €";       
        }else if (loanAsked === 0){
            alert("Asked loan was "  + loanAsked + "€. Loan not granted");
        } else {
            alert("Loan not granted!")
        }

    }
    //direct pay loan button
    document.getElementById('PayLoanButton').style.display = "active";
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
    document.getElementById('loanBalance').style.display = "hidden";
}else if (person.loan >0){
    person.bankBalance = person.bankBalance + (person.workBalance*0.9)
    person.loan= person.loan - (person.workBalance*0.1)
    person.workBalance = 0
    loanBalanceElement.innerText ="Loan " + person.loan + " €" 
    //for end of loan payment. Paying instant back if customer sends too much money.
    if (person.loan <0){
        const overpaidMoney = Math.abs(person.loan)
        person.bankBalance = person.bankBalance + overpaidMoney
        person.loan = 0
        alert("Hurray, you have paid your loan to bank!")
        document.getElementById('loanBalance').style.display = "none";
        document.getElementById("payLoanButton").style.display = "none";

    }
    bankBalanceElement.innerText ="Balance "  + person.bankBalance + " €";
    workBalanceElement.innerText = person.workBalance + " €";
    

}else if (person.loan <0)
    loanBalanceElement.innerText = "BANK OWNS MONEY TO YOU";
    
}


//onclick more workmoney 100
document.getElementById("workButton").addEventListener("click", pressWork);
function pressWork() {
    person.workBalance += 100
    console.log(person.workBalance)
    workBalanceElement.innerText ="Balance "  + person.workBalance + " €";
  }

//Pay Loan directly

document.getElementById("payLoanButton").addEventListener("click", pressPayLoan);
function pressPayLoan(){
    if (person.workBalance === 0){
        alert("You need work to pay your loan")

    } else if (person.loan > 0){
        person.loan = person.loan - person.workBalance
        person.workBalance = 0 
        loanBalanceElement.innerText ="Loan " + person.loan + " €" 
    }
    
    checkLoanBalance()

    bankBalanceElement.innerText ="Balance "  + person.bankBalance + " €";
    workBalanceElement.innerText = person.workBalance + " €";

}

function checkLoanBalance(){
    if (person.loan <0){
        const overpaidMoney = Math.abs(person.loan)
        person.bankBalance = person.bankBalance + overpaidMoney
        person.loan = 0
        alert("Hurray, you have paid your loan to bank!")
        document.getElementById('loanBalance').style.display = "none";
        document.getElementById("payLoanButton").style.display = "none";
}
}


let laptops = [];

//fetching laptops via API
fetch("https://hickory-quilled-actress.glitch.me/computers")
    .then(response => response.json())
    .then(data => laptops = data )
    .then(laptops => addLaptopsToMenu(laptops));

const addLaptopsToMenu = (laptops) =>{
    laptops.forEach(x => addLaptopToMenu(x));
    specsElement.innerText = laptops[0].specs;
    laptopTitleElement.innerText = laptops[0].title;
    laptopDescElement.innerText = laptops[0].description;
    laptopPriceElement.innerText = laptops[0].price;
    addImage(laptops[0].image);

}

const addLaptopToMenu = (laptop) =>{
    const laptopElement = document.createElement("option");
    laptopElement.value = laptop.id;
    
    laptopElement.appendChild(document.createTextNode(laptop.title));
    laptopsElement.appendChild(laptopElement);
        
}

const handleLaptopMenuChange = e => {
    const selectedLaptop = laptops[e.target.selectedIndex];
    specsElement.innerText =selectedLaptop.specs;
    laptopTitleElement.innerText = selectedLaptop.title;
    laptopDescElement.innerText = selectedLaptop.description;
    laptopPriceElement.innerText = selectedLaptop.price;
    addImage(selectedLaptop.image)
    
}

function addImage(x) {
    if (x.includes("5")){
        x = "assets/images/5.png"
    }
    activeImage.src = "https://hickory-quilled-actress.glitch.me/" + x;
    
}

function clearDiv(elementID)
{
    document.getElementById(elementID).innerHTML = "";
}


laptopsElement.addEventListener("change", handleLaptopMenuChange)


