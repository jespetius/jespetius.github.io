const laptopsElement = document.getElementById("laptops");
const personElement = document.getElementById("person");
const bankBalanceElement = document.getElementById("bankBalance");
const loanElement = document.getElementById("loanButton");
const workElement = document.getElementById("workButton");
const bankElement = document.getElementById("bankButton");
const buyNowElement = document.getElementById("buyNowButton");


let person = {
    name: "Joe Banker",
    bankBalance: 2040,
    loan: 0,
    workBalance: 0
};
personElement.innerHTML = person.name;
bankBalanceElement.innerHTML = person.bankBalance;
let laptops = [];

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