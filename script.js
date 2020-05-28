// Variables

const main = document.getElementById('main');

const addUserButton = document.getElementById('add-user');

const doubleButton = document.getElementById('double');

const showMillionairesButton = document.getElementById('show-millionaires');

const sortButton = document.getElementById('sort');

const calculateWealthButton = document.getElementById('calculate-wealth');

let data = [];

// Initialization

getRandomUser();
getRandomUser();
getRandomUser();

// Functions 

async function getRandomUser() {
    const response = await fetch('https://randomuser.me/api');
    const data = await response.json();
    const user = data.results[0];   
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addData(newUser);
}

function addData(obj) {
    data.push(obj);
    updateDOM();
}

function updateDOM(providedData = data) {
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>';
    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        main.appendChild(element);
    });
    
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'); 
}

function doubleMoney() {
    data = data.map(user => {
        return {...user, money: user.money * 2};
    });
    updateDOM();
}

function sortByRichest() {
    data.sort((a,b) => b.money - a.money);
    updateDOM();
}

function showMillionaires() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

function calculateWealth() {
    const wealth = data.reduce((total,user) => (total += user.money), 0);
    const wealthElement = document.createElement('div');
    wealthElement.innerHTML = `<h3>Total Wealth: <strong>${formatMoney(wealth)}</strong></h3>`;
    main.appendChild(wealthElement);
}

// Event Listeners

addUserButton.addEventListener('click',getRandomUser);

doubleButton.addEventListener('click', doubleMoney);

sortButton.addEventListener('click', sortByRichest);

showMillionairesButton.addEventListener('click', showMillionaires);

calculateWealthButton.addEventListener('click', calculateWealth);