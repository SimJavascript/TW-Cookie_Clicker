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
    const store1 = document.getElementById('store1');
    const store2 = document.getElementById('store2');
    const store3 = document.getElementById('store3');
    const store4 = document.getElementById('store4');
    const store5 = document.getElementById('store5');
    const store6 = document.getElementById('store6');

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

    store1.addEventListener('click', () => {
        let img = document.createElement('img');
        img.setAttribute('src', "./assets/img/cow.png");
        img.setAttribute('width', "50vw");
        document.getElementById('build1').appendChild(img);
    })

})();