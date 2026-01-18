let tinyCat, context;
let imgCat = new Image();
let lastDirection = 'right';
let cat = {
    animation: "walk",
    direction: "right"
};
let infosScreen = {
    width: window.visualViewport.width,
    height: window.visualViewport.height
};

const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}

document.addEventListener('DOMContentLoaded', function () {
    tinyCat = document.getElementById('tiny_cat');
    context = tinyCat.getContext('2d');
    let URLCat = tinyCat.getAttribute('data-src');
    imgCat.src = URLCat;

});

let xPos = 0, xPosCat = 0;

const getLocalInit = () => {
    xPosCat = parseInt(localStorage.getItem("xInitCat"));
    if (xPosCat == null || isNaN(xPosCat)) {
        xPosCat = parseInt(0);
    }
}
const setStorageCat = (x) => {
    localStorage.setItem("xInitCat", x);
}

let maxAllowedOperations = getRandomArbitrary(30, 200);
let operations = 0;
let globalTipsCat;


const tinyBrain = () => {
    operations++;
    if (tinyCat.offsetLeft > infosScreen.width - 20) {
        operations = 0;
        lastDirection = 'left';
        cat.animation = 'walk';
        cat.direction = 'left';
    }
    if (tinyCat.offsetLeft < 0) {
        operations = 0;
        lastDirection = 'right';
        cat.animation = 'walk';
        cat.direction = 'right';
    }
    if (operations > maxAllowedOperations) {
        if (cat.animation != 'idle') {
            operations = 0;
            cat.animation = 'idle';
            cat.direction = 'idle';
        }
        else {
            operations = 0;
            cat.animation = 'walk';
            cat.direction = lastDirection;
        }
        maxAllowedOperations = getRandomArbitrary(30, 200);
    }

}

const addHeart = () => {
    let heart = document.createElement('p');
    heart.classList.add('heart');
    heart.style.left = (tinyCat.offsetLeft + 10) + 'px';
    heart.innerHTML = '❤️';
    document.body.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 900);
}

imgCat.onload = function () {
    getLocalInit();
    launchCat();
    tinyBrain();
    globalTipsCat = tippy('#tiny_cat', {
        followCursor: true,
        content: "Moi c'est Papouille, le chat virtuel du site, mais aussi dans la vraie vie de Rémi.",
    });
    tinyCat.addEventListener('click', addHeart);
};
const move_cat = (x, y) => {
    if (x == '+') {
        xPosCat += 2;
        lastDirection = 'right';
        tinyCat.style.left = xPosCat + 'px';
    }
    if (x == '-') {
        xPosCat -= 2;
        lastDirection = 'left';
        tinyCat.style.left = xPosCat + 'px';
    }
    setStorageCat(xPosCat);
}
const launchCat = () => {
    switch (cat.animation) {
        case "walk":
            yPos = -160;
            break;
        case "idle":
            yPos = -900;
            break;
    }
    switch (cat.direction) {
        case "idle":
            break;
        case "right":
            lastDirection = 'right';
            move_cat('+', false);
            break;
        case "left":
            lastDirection = 'left';
            move_cat('-', false);
            break;
    }
    if (cat.direction == 'left') {
        tinyCat.classList.add('fliped');
    }
    else {
        tinyCat.classList.remove('fliped');
    }
    context.clearRect(0, 0, tinyCat.width, tinyCat.height);
    if (xPos > 1200) {
        xPos = 0;
    }

    context.drawImage(imgCat, -xPos, yPos, 1400, 1400);
    xPos += 365;
    tinyBrain();
    setTimeout(launchCat, 100);
}

