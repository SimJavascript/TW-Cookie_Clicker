let cookie = document.getElementById('cookbtn');

let affichageSCore = document.getElementById('score');
let score = parseInt(localStorage.getItem('scorePlayer'));

let multiplier = parseInt(localStorage.getItem('multiplier'));
let multiplierPrice = parseInt(localStorage.getItem('multiplierPrice'));
let buttonMultiplier = document.getElementById('multiplier');

let autoClickerStatus = parseInt(localStorage.getItem('autoClickerStatus'));

let cows = parseInt(localStorage.getItem('cows'));
let cow;

update();

cookie.addEventListener('click', () => {
    ShowScore();
    saveData();

})

buttonMultiplier.addEventListener('click', () => {
    ShowMultiplier();
    saveData();

})

document.getElementById('store1').addEventListener('click', () => {

    if (autoClickerStatus == 0 && score >= 20) {
        autoClicker();
    }
    saveData();

})


document.getElementById('store2').addEventListener('click', () => {

    clearInterval(cow);
    if (score >= 20) {
        cows++;
        score -= 20;
        location.reload();
        
    }
    saveData();

})

function update() {

    getLocalStorage();
    displayOnLoad();
    ShowAutoClicker();
    ShowCows();


    if (autoClickerStatus == 1) {
        autoClicker();
    }

    if (cows > 0) {
        cowFarm();
    }

    function getLocalStorage() { // On récupère les datas.

        if (localStorage.getItem('scorePlayer') == undefined) {

            score = 0;
            multiplier = 1;
            multiplierPrice = 50;
            autoClickerStatus = 0;
            cows = 0;

        }

    }

    function displayOnLoad() { // Affichage initial 

        affichageSCore.innerHTML = score;
        buttonMultiplier.innerHTML = `x${multiplier} | Next Multiplier Cost: ${multiplierPrice}`;
        document.getElementById('store1').innerHTML = ShowAutoClicker();

    }

}

function ShowScore() { // Affichage du score.

    affichageSCore.innerHTML = calculateScore();
    buttonMultiplier.innerHTML = `x${multiplier} | Next Multiplier Cost: ${multiplierPrice}`;

}

function calculateScore() { // Calcule du score.

    score = score + (1 * multiplier);
    return score;

}

function ShowMultiplier() { // Affichage du multiplicateur.

    if (score >= multiplierPrice) {

        score -= multiplierPrice + (multiplier + 1);
        multiplier++;
        multiplierPrice = multiplierPrice + multiplier * 50;
        ShowScore();

    }
}

function saveData() { // Sauvegarder les datas.

    localStorage.setItem('scorePlayer', score);
    localStorage.setItem('multiplier', multiplier);
    localStorage.setItem('multiplierPrice', multiplierPrice);
    localStorage.setItem('autoClickerStatus', autoClickerStatus);
    localStorage.setItem('cows', cows);

}

function autoClicker() {
    autoClickerStatus = 1;
    let clicker = setInterval(ShowScore, 1000);
    ShowAutoClicker();
}

function ShowAutoClicker() { // On check si on a déjà l'autoClicker ou non.

    if (autoClickerStatus) {
        document.getElementById('store1').innerHTML = `Autoclicker: Active`
    } else {
        document.getElementById('store1').innerHTML = `You can buy Autoclicker: Cost 20`
    }

}

function cowFarm() {

    for (let i = 0; i < cows; i++) {

        cow = setInterval(ShowScore, 1000);
        
    }


}

function ShowCows() {

    if (cows > 0) {
        document.getElementById('store2').innerHTML = `You have ${cows} cows | Add 1 more : Cost 20`
    } else {
        document.getElementById('store2').innerHTML = `Add a cow for: Cost 20`
    }

}

