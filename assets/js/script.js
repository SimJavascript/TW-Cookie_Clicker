// VARIBLES
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
let dwarfTarget = document.getElementById('store3');
let dwarf;

let hackers = parseInt(localStorage.getItem('hackers'));
let hackersCost = parseInt(localStorage.getItem('hackersCost'));
let hackerTarget = document.getElementById('store4');
let hacker;

let robots = parseInt(localStorage.getItem('robots'));
let robotsCost = parseInt(localStorage.getItem('robotsCost'));
let robotTarget = document.getElementById('store5');
let robot;

let torvalds = parseInt(localStorage.getItem('torvalds'));
let torvaldsCost = parseInt(localStorage.getItem('torvaldsCost'));
let torvaldTarget = document.getElementById('store6');
let torvald;

let timeBonus = 10;
let isBonusActive = false;

let bonusPrice = 100;

var modal = document.querySelector(".modal");
var trigger = document.querySelector(".trigger");
var closeButton = document.querySelector(".close-button");

// SAVING DATA
window.onunload = () => { saveData(); }; // Save data when user leave the game
document.getElementById('reset').onclick = () => { resetData(); update(); }; // Reset data
update(); // Update the page with localStorage.

cookie.addEventListener('click', () => {  // Onclick Cookie
    showScore();
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
    if (score >= bonusPrice && isBonusActive == false) { // Check if the player has enough score to buy the bonus.
        score -= bonusPrice;
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
hackerTarget.addEventListener('click', () => { // Onclick store 3 (hacker).
    clearInterval(hacker);
    if (score >= hackersCost && isBonusActive == false) { // Check if the player has enough score to buy the hacker.
        hackers++;
        score -= hackersCost;
        hackersCost += hackersCost / 5;
        location.reload();
    }
})
robotTarget.addEventListener('click', () => { // Onclick store 3 (robot).
    clearInterval(robot);
    if (score >= robotsCost && isBonusActive == false) { // Check if the player has enough score to buy the robot.
        robots++;
        score -= robotsCost;
        robotsCost += robotsCost / 5;
        location.reload();
    }
})
torvaldTarget.addEventListener('click', () => { // Onclick store 3 (robot).
    clearInterval(torvald);
    if (score >= torvaldsCost && isBonusActive == false) { // Check if the player has enough score to buy the Torvald.
        torvalds++;
        score -= torvaldsCost;
        torvaldsCost += torvaldsCost / 5;
        location.reload();
    }
})

// UPDATE DATA
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
            dwarfsCost = 100;
            hackers = 0;
            hackersCost = 500;
            robots = 0;
            robotsCost = 1000;
            torvalds = 0;
            torvaldsCost = 50000;
            alerted = "no";
        }
    }
    function displayOnLoad() { // Display the elements innerHTML.
        affichageSCore.innerHTML = score;
        buttonMultiplier.innerHTML = `x${multiplier} Cost: ${multiplierPrice}`;
        document.getElementById('store1').innerHTML = showCows();
        document.getElementById('store2').innerHTML = showLutins();
        document.getElementById('store3').innerHTML = showDwarfs();
        document.getElementById('store4').innerHTML = showHackers();
        document.getElementById('store5').innerHTML = showRobots();
        document.getElementById('store6').innerHTML = showTorvalds();

        showBonus();

    }
}

function showScore() { // Show score on innerHTML
    affichageSCore.innerHTML = score = score + (1 * multiplier);
    showAvailableUpgrade();
    
}

function showMultiplier() { // Affichage du multiplicateur.
    buttonMultiplier.innerHTML = `x${multiplier} Cost: ${multiplierPrice}`;
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
    localStorage.setItem('hackers', hackers);
    localStorage.setItem('hackersCost', hackersCost);
    localStorage.setItem('robots', robots);
    localStorage.setItem('robotsCost', robotsCost);
    localStorage.setItem('torvalds', torvalds);
    localStorage.setItem('torvaldsCost', torvaldsCost);
}

//  RESET DATA
function resetData() { // Reset all the data and reload the page.
    score = 0;
    multiplier = 1;
    multiplierPrice = 10;
    cows = 0;
    cowsCost = 20;
    lutins = 0;
    lutinsCost = 50;
    dwarfs = 0;
    dwarfsCost = 100;
    hackers = 0;
    hackersCost = 500;
    robots = 0;
    robotsCost = 1000;
    torvalds = 0;
    torvaldsCost = 50000;
    alerted = "no";
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
            lutin = setInterval(showScore, 750);
        }
    }

    if (dwarfs > 0) {
        for (let i = 0; i < dwarfs; i++) {
            dwarf = setInterval(showScore, 500);
        }
    }

    if (hackers > 0) {
        for (let i = 0; i < hackers; i++) {
            hacker = setInterval(showScore, 250);
        }
    }

    if (robots > 0) {
        for (let i = 0; i < robots; i++) {
            robot = setInterval(showScore, 100);
        }
    }

    if (torvalds > 0) {
        for (let i = 0; i < torvalds; i++) {
            torvald = setInterval(showScore, 1);
        }
    }
}

function showAvailableUpgrade() {

    showCows();
    showLutins();
    showDwarfs();
    showHackers();
    showRobots();
    showTorvalds();
    showBonus();
    
}

function showCows() { // Show when the user can buy the item and his price
    if (cows > 0 || score > cowsCost) {
        return document.getElementById('store1').innerHTML = `+1 Chill Cow (-${cowsCost}) (${cows})`
    } else {
        return document.getElementById('store1').innerHTML = `???`
    }
}

function showLutins() { // Show when the user can buy the item and his price
    if (lutins > 0 || score > lutinsCost) {
        return document.getElementById('store2').innerHTML = `+1 Lucky Lutin (-${lutinsCost}) (${lutins})`
    } else {
        return document.getElementById('store2').innerHTML = `???`
    }
}

function showDwarfs() { // Show when the user can buy the item and his price
    if (dwarfs > 0 || score > dwarfsCost) {
        return document.getElementById('store3').innerHTML = `+1 Angry Dwarf (-${dwarfsCost}) (${dwarfs})`
    } else {
        return document.getElementById('store3').innerHTML = `???`
    }
}

function showHackers() { // Show when the user can buy the item and his price
    if (hackers > 0 || score > hackersCost) {
        return document.getElementById('store4').innerHTML = `+1 Hacker (-${hackersCost}) (${hackers})`
    } else {
        return document.getElementById('store4').innerHTML = `???`
    }
}

function showRobots() { // Show when the user can buy the item and his price
    if (robots > 0 || score > robotsCost) {
        return document.getElementById('store5').innerHTML = `+1 Mr Robot (-${robotsCost}) (${robots})`
    } else {
        return document.getElementById('store5').innerHTML = `???`
    }
}

function showTorvalds() { // Show when the user can buy the item and his price
    if (torvalds > 0 || score > torvaldsCost) {
        return document.getElementById('store6').innerHTML = `+1 Torvald (-${torvaldsCost}) (${torvalds})`
    } else {
        return document.getElementById('store6').innerHTML = `???`
    }
}

function showBonus() {
   
    if (score > bonusPrice && isBonusActive == false) {
        return document.getElementById('tempup').innerHTML = `BONUS 200%/clic | Cost: ${bonusPrice}`;
    } 
    
}

function displayBuild() { // Add the item img to the build.

    for (let i = 0; i < cows; i++) {
        let target = document.getElementsByClassName('build1');
        let imgCow = document.createElement("IMG");
        imgCow.setAttribute("src", "./assets/img/cow.png");
        imgCow.setAttribute("width", "50vw");
        imgCow.setAttribute("alt", "cow");
        target[0].appendChild(imgCow);
    }

    for (let i = 0; i < lutins; i++) {
        let target = document.getElementsByClassName('build2');
        let imgLutin = document.createElement("IMG");
        imgLutin.setAttribute("src", "./assets/img/lutin.png");
        imgLutin.setAttribute("width", "50vw");
        imgLutin.setAttribute("alt", "lutin");
        target[0].appendChild(imgLutin);
    }

    for (let i = 0; i < dwarfs; i++) {
        let target = document.getElementsByClassName('build3');
        let imgDwarf = document.createElement("IMG");
        imgDwarf.setAttribute("src", "./assets/img/dwarf.png");
        imgDwarf.setAttribute("width", "50vw");
        imgDwarf.setAttribute("alt", "dwarf");
        target[0].appendChild(imgDwarf);
    }

    for (let i = 0; i < hackers; i++) {
        let target = document.getElementsByClassName('build4');
        let imgHacker = document.createElement("IMG");
        imgHacker.setAttribute("src", "./assets/img/hacker.png");
        imgHacker.setAttribute("width", "50vw");
        imgHacker.setAttribute("alt", "hacker");
        target[0].appendChild(imgHacker);
    }

    for (let i = 0; i < robots; i++) {
        let target = document.getElementsByClassName('build5');
        let imgRobot = document.createElement("IMG");
        imgRobot.setAttribute("src", "./assets/img/robot.png");
        imgRobot.setAttribute("width", "50vw");
        imgRobot.setAttribute("alt", "robot");
        target[0].appendChild(imgRobot);
    }

    for (let i = 0; i < torvalds; i++) {
        let target = document.getElementsByClassName('build6');
        let imgTorvald = document.createElement("IMG");
        imgTorvald.setAttribute("src", "./assets/img/torvald.png");
        imgTorvald.setAttribute("width", "50vw");
        imgTorvald.setAttribute("alt", "torvald");
        target[0].appendChild(imgTorvald);
    }
}

function startBonus() {
    isBonusActive = true;
    timeBonus = 10;

    if (timeBonus == 10) {
        let bonus = setInterval(countDown, 1000);
        multiplier *= 3;
        document.getElementById('clickUpgrade').style.backgroundImage = "url('https://media2.giphy.com/media/gJijhzjTV2pCn2SePc/source.gif')";
        document.getElementById('clickUpgrade').style.backgroundImage = "repeat-y";

        function countDown() {

            timeBonus--;
            document.getElementById('tempup').innerHTML = `+200% BONUS POWER | Time left : ${timeBonus}`;
            document.getElementById('tempup').style.backgroundColor = "rgba(240, 123, 48, 1)";


            if (timeBonus == 0) {
                multiplier /= 3;
                clearInterval(bonus);
                isBonusActive = false;
                document.getElementById('tempup').innerHTML = `BONUS 200%/clic | Cost: ${bonusPrice}`;
                document.getElementById('tempup').style.backgroundColor = "rgba(41, 22, 121, 1)";
                document.getElementById('clickUpgrade').style.backgroundImage = "";
            }
        }
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  }

// Modal&achievement
function toggleModal() {
    modal.classList.toggle("show-modal");
}

function windowOnClick(event) {
    if (event.target === modal) {
        toggleModal();
    }
}

trigger.addEventListener("click", toggleModal);
closeButton.addEventListener("click", toggleModal);
window.addEventListener("click", windowOnClick);

if(localStorage.getItem('cows', cows) >= 1){
    document.getElementById('firstAchievement').innerHTML = "1. Unlock a Chill Cow";
}
if(localStorage.getItem('lutins', lutins) >= 1){
    document.getElementById('secondAchievement').innerHTML = "2. Unlock a Lucky Lutin";
}
if(localStorage.getItem('dwarfs', dwarfs) >= 1){
    document.getElementById('thirdAchievement').innerHTML = "3. Unlock an Angry Dwarf";
}
if(localStorage.getItem('hackers', hackers) >= 1){
    document.getElementById('fourthAchievement').innerHTML = "4. Unlock a Hacker";
}
if(localStorage.getItem('robots', robots) >= 1){
    document.getElementById('fifthAchievement').innerHTML = "5. Unlock a Mr robot";
}
if(localStorage.getItem('torvalds', torvalds) >= 1){
    document.getElementById('sixthAchievement').innerHTML = "6. Unlock a Torvald";
}

if(localStorage.getItem('cows', cows) >= 5 && 
    localStorage.getItem('lutins', lutins) >= 5 &&
    localStorage.getItem('dwarfs', dwarfs) >= 5 &&
    localStorage.getItem('hackers', hackers) >= 5 &&
    localStorage.getItem('robots', robots) >= 5 &&
    localStorage.getItem('torvalds', torvalds) >= 5){
        document.getElementById('seventhAchievement').innerHTML = "7. Unlock 5 of each character";
}
if(localStorage.getItem('cows', cows) >= 10 && 
    localStorage.getItem('lutins', lutins) >= 10 &&
    localStorage.getItem('dwarfs', dwarfs) >= 10 &&
    localStorage.getItem('hackers', hackers) >= 10 &&
    localStorage.getItem('robots', robots) >= 10 &&
    localStorage.getItem('torvalds', torvalds) >= 10){
        document.getElementById('eighthAchievement').innerHTML = "8. Unlock 10 of each character";
}
if(localStorage.getItem('cows', cows) >= 50 && 
    localStorage.getItem('lutins', lutins) >= 50 &&
    localStorage.getItem('dwarfs', dwarfs) >= 50 &&
    localStorage.getItem('hackers', hackers) >= 50 &&
    localStorage.getItem('robots', robots) >= 50 &&
    localStorage.getItem('torvalds', torvalds) >= 50){
        document.getElementById('ninthAchievement').innerHTML = "9. Unlock 50 of each character";
}
if(localStorage.getItem('torvalds', torvalds) >= 100){
    document.getElementById('tenthAchievement').innerHTML = "10. Unlock 100 Torvalds!!!!!!";
}
