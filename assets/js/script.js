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

let lutins = parseInt(localStorage.getItem('lutins'));
let lutinsCost = parseInt(localStorage.getItem('lutinsCost'));
let lutinTarget = document.getElementById('store2');
let lutin;

let dwarfs = parseInt(localStorage.getItem('dwarfs'));
let dwarfsCost = parseInt(localStorage.getItem('dwarfsCost'));
let dwarfsTarget = document.getElementById('store3');
let dwarf;

let timeBonus = 10;
let isBonusActive = false;

window.onunload = () => { saveData(); }; // Save data when user leave the game
document.getElementById('reset').onclick = () => { resetData(); update(); }; // Reset data
update(); // Update the page with localStorage.

cookie.addEventListener('click', () => {  // Onclick Cookie
    showScore();
    showCows();
    showLutins();
    showDwarfs();
    saveData();                           // Save data on each click
})
buttonMultiplier.addEventListener('click', () => {  // Onclick Multiplier
    if (score >= multiplierPrice && isBonusActive == false) { // Check if the player has enough score to buy the multiplier.
        score -= multiplierPrice;
        multiplier++;
        multiplierPrice = multiplierPrice + multiplier * 10;
        location.reload();
    }
})
document.getElementById('tempup').addEventListener('click', () => {  // Onclick Bonus
    if (score >= 200 && isBonusActive == false) { // Check if the player has enough score to buy the bonus.
        score -= 200;
        startBonus();
    }
})
cowTarget.addEventListener('click', () => { // Onclick store 1 (cow).
    clearInterval(cow);
    if (score >= cowsCost && isBonusActive == false) { // Check if the player has enough score to buy a cow.
        cows++;
        score -= cowsCost;
        cowsCost += cowsCost / 5;
        location.reload();
    }
})

lutinTarget.addEventListener('click', () => { // Onclick store 2 (lutin).
    clearInterval(lutin);
    if (score >= lutinsCost && isBonusActive == false) { // Check if the player has enough score to buy the lutin.
        lutins++;
        score -= lutinsCost;
        lutinsCost += lutinsCost / 5;
        location.reload();
    }
})

dwarfTarget.addEventListener('click', () => { // Onclick store 3 (dwarf).
    clearInterval(dwarf);
    if (score >= dwarfsCost && isBonusActive == false) { // Check if the player has enough score to buy the dwarf.
        dwarfs++;
        score -= dwarfsCost;
        dwarfsCost += dwarfsCost / 5;
        location.reload();
    }
})

function update() { // Update the page with localStorage on page load.
    getLocalStorage(); // Get data from localStorage.
    displayOnLoad();
    displayBuild(); // Display all build.
    startFarm(); // Make all the store items start to clic

    function getLocalStorage() { // Get data from localStorage.
        if (localStorage.getItem('scorePlayer') == undefined) { // If no data exist, initialize with default data below
            score = 0;
            multiplier = 1;
            multiplierPrice = 10;
            cows = 0;
            cowsCost = 20;
            lutins = 0;
            lutinsCost = 50;
            dwarfs = 0;
            dwarfsCost = 50;
        }
    }
    function displayOnLoad() { // Display the elements innerHTML.
        affichageSCore.innerHTML = score;
        buttonMultiplier.innerHTML = `x${multiplier} | Next Multiplier Cost: ${multiplierPrice}`;
        document.getElementById('store1').innerHTML = showCows();
        document.getElementById('store2').innerHTML = showLutins();
        document.getElementById('stor3').innerHTML = showDwarfs();
    }
}

function showScore() { // Show score on innerHTML
    affichageSCore.innerHTML = score = score + (1 * multiplier);
}

function showMultiplier() { // Affichage du multiplicateur.
    buttonMultiplier.innerHTML = `x${multiplier} | Next Multiplier Cost: ${multiplierPrice}`;
}

function saveData() { // Sauvegarder les datas.
    localStorage.setItem('scorePlayer', score);
    localStorage.setItem('multiplier', multiplier);
    localStorage.setItem('multiplierPrice', multiplierPrice);
    localStorage.setItem('cows', cows);
    localStorage.setItem('cowsCost', cowsCost);
    localStorage.setItem('lutins', lutins);
    localStorage.setItem('lutinsCost', lutinsCost);
    localStorage.setItem('dwarfs', dwarfs);
    localStorage.setItem('dwarfsCost', dwarfsCost);
}

function resetData() { // Reset all the data and reload the page.
    score = 0;
    multiplier = 1;
    multiplierPrice = 10;
    cows = 0;
    cowsCost = 20;
    lutins = 0;
    lutinsCost = 50;
    dwarfs = 0;
    dwarfsCost = 50;
    saveData();
    location.reload();
}

function startFarm() {
    if (cows > 0) {
        for (let i = 0; i < cows; i++) {
            cow = setInterval(showScore, 1000);
        }
    }

    if (lutins > 0) {
        for (let i = 0; i < lutins; i++) {
            lutin = setInterval(showScore, 500);
        }
    }

    if (dwarfs > 0) {
        for (let i = 0; i < dwarfs; i++) {
            dwarf = setInterval(showScore, 500);
        }
    }
}

function showCows() { // Show when the user can buy the item and his price
    if (cows > 0 || score > cowsCost) {
        return document.getElementById('store1').innerHTML = `+1 cow (-${cowsCost})`
    } else {
        return document.getElementById('store1').innerHTML = `???`
    }
}

function showLutins() { // Show when the user can buy the item and his price
    if (lutins > 0 || score > lutinsCost) {
        return document.getElementById('store2').innerHTML = `+1 lutin (-${lutinsCost})`
    } else {
        return document.getElementById('store2').innerHTML = `???`
    }
}

function showDwarfs() { // Show when the user can buy the item and his price
    if (dwarfs > 0 || score > dwarfsCost) {
        return document.getElementById('store3').innerHTML = `+1 Dawrf (-${dwarfsCost})`
    } else {
        return document.getElementById('store3').innerHTML = `???`
    }
}

function displayBuild() { // Add the item img to the build.

    for (let i = 0; i < cows; i++) {
        let target = document.getElementsByClassName('build1');
        let imgCow = document.createElement("IMG");
        imgCow.setAttribute("src", "./assets/img/cow.png");
        imgCow.setAttribute("width", "50vw");
        target[0].appendChild(imgCow);
    }

    for (let i = 0; i < lutins; i++) {
        let target = document.getElementsByClassName('build2');
        let imgLutin = document.createElement("IMG");
        imgLutin.setAttribute("src", "./assets/img/lutin.png");
        imgLutin.setAttribute("width", "50vw");
        target[0].appendChild(imgLutin);
    }

    for (let i = 0; i < dwarfs; i++) {
        let target = document.getElementsByClassName('build3');
        let imgDwarf = document.createElement("IMG");
        imgDwarf.setAttribute("src", "./assets/img/dwarf.png");
        imgDwarf.setAttribute("width", "50vw");
        target[0].appendChild(imgDwarf);
    }
}

function startBonus() {
    isBonusActive = true;
    timeBonus = 10;

    if (timeBonus == 10) {
        let bonus = setInterval(countDown, 1000);
        multiplier *= 3;

        function countDown() {

            timeBonus--;
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