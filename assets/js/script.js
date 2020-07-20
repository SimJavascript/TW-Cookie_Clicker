// SIMON : function 'Clicker' 
// CALVIN : function 'Score'
// ALBERT : function 'Multiplier'
// NICO : layout
// Variables : $score $counter $click $multiplier $upgradePrice $cookiesBySecond 

(() => {
    const storage = window.localStorage;
    const counter = document.getElementById('score');
    const clicker = document.getElementById('cookbtn');
    const tempup = document.getElementById('tempup');
    let multiplier = 1;
    let score = {};

    function load() {
        if (storage.getItem('scorePlayer')) {
            score = JSON.parse(storage.getItem('scorePlayer'));
            counter.innerHTML = score.count;
        } else {
            score.count = 0;
            counter.innerHTML = 0;
        }
    }

    load();

    clicker.addEventListener('click', () => {
        score.count += multiplier;
        counter.innerHTML = score.count;
        storage.setItem('scorePlayer', JSON.stringify(score));
    })

})();