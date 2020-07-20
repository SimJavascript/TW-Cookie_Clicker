let cookie = document.getElementById('cookbtn');

let affichageSCore = document.getElementById('score');
let score = parseInt(localStorage.getItem('scorePlayer'));

let multiplier = parseInt(localStorage.getItem('multiplier'));
let multiplierPrice = parseInt(localStorage.getItem('multiplierPrice'));
let buttonMultiplier = document.getElementById('multiplier');

let cows = parseInt(localStorage.getItem('cows'));
let cowsCost = parseInt(localStorage.getItem('cowsCost'));
let cowTarget = document.getElementById('store1');
let cow;

let timeBonus = 10;
let isBonusActive = false;

update(); // Update the page with localStorage.

cookie.addEventListener('click', () => {  // Onclick Cookie
    ShowScore();
    saveData();
})
buttonMultiplier.addEventListener('click', () => {  // Onclick Multiplier

    if (score >= multiplierPrice && isBonusActive == false) {
        score -= multiplierPrice;
        multiplier++;
        multiplierPrice = multiplierPrice + multiplier * 10;
        location.reload();
    }
    saveData();
})
document.getElementById('tempup').addEventListener('click', () => {  // Onclick Bonus
    if (score >= 200 && isBonusActive == false) {
        score -= 200;
        Bonus();
    }
    saveData();
})
cowTarget.addEventListener('click', () => { // Onclick store 1 (cow).

    clearInterval(cow);
    if (score >= cowsCost && isBonusActive == false) {
        cows++;
        score -= cowsCost;
        cowsCost += cowsCost / 5;
        location.reload();
    }
    saveData();
})

function update() { // Update the page with localStorage.
    getLocalStorage();
    displayOnLoad();
    ShowCows();
    displayCow();
    if (cows > 0) {
        cowFarm();
    }
    function getLocalStorage() { // Get data from localStorage.
        if (localStorage.getItem('scorePlayer') == undefined) {
            score = 0;
            multiplier = 1;
            multiplierPrice = 10;
            cows = 0;
            cowsCost = 20;
        }
    }
    function displayOnLoad() { // Display the localStorage Data.
        affichageSCore.innerHTML = score;
        buttonMultiplier.innerHTML = `x${multiplier} | Next Multiplier Cost: ${multiplierPrice}`;
        document.getElementById('store1').innerHTML = ShowCows();
    }
}

function ShowScore() { //
    affichageSCore.innerHTML = calculateScore();
    function calculateScore() {
        score = score + (1 * multiplier);
        return score;
    }
}

function ShowMultiplier() { // Affichage du multiplicateur.
    buttonMultiplier.innerHTML = `x${multiplier} | Next Multiplier Cost: ${multiplierPrice}`;
}

function saveData() { // Sauvegarder les datas.
    localStorage.setItem('scorePlayer', score);
    localStorage.setItem('multiplier', multiplier);
    localStorage.setItem('multiplierPrice', multiplierPrice);
    localStorage.setItem('cows', cows);
    localStorage.setItem('cowsCost', cowsCost);
}

function cowFarm() {
    for (let i = 0; i < cows; i++) {
        cow = setInterval(ShowScore, 1000);
    }
}

function ShowCows() {
    if (cows > 0) {
        return document.getElementById('store1').innerHTML = `You have ${cows} cows (1cow = 1 clic per second) | Add 1 more for : ${cowsCost}`
    } else {
        return document.getElementById('store1').innerHTML = `Add a cow for: ${cowsCost}`
    }
}

function displayCow() {
    for (let i = 0; i < cows; i++) {
        let target = document.getElementsByClassName('build1');
        let imgCow = document.createElement("IMG");
        imgCow.setAttribute("src", "./assets/img/cow.png");
        imgCow.setAttribute("width", "50vw");
        target[0].appendChild(imgCow);
    }
}

function Bonus() {
    isBonusActive = true;
    timeBonus = 10;

    if (timeBonus == 10) {
        let bonus = setInterval(countDown, 1000);
        multiplier *= 3;

        function countDown() {

            timeBonus--;
            console.log(timeBonus);
            console.log(multiplier);
            document.getElementById('tempup').innerHTML = `Bonus is UP ! Everything is +200% | Time left : ${timeBonus}`;

            if (timeBonus == 0) {
                multiplier /= 3;
                clearInterval(bonus);
                isBonusActive = false;
                document.getElementById('tempup').innerHTML = `Buy Bonus (+200% Per Clic For 10 sec) | Cost: 500`;
            }
        }
    }
}


