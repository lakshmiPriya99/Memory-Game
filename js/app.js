const tiles = ['fa fa-diamond', 'fa fa-paper-plane-o', 'fa fa-anchor', 'fa fa-bolt', 'fa fa-cube', 'fa fa-anchor', 'fa fa-leaf', 'fa fa-bicycle', 'fa fa-diamond', 'fa fa-bomb', 'fa fa-leaf', 'fa fa-bomb', 'fa fa-bolt', 'fa fa-bicycle', 'fa fa-paper-plane-o', 'fa fa-cube'];

const cardsBox = document.querySelector('.deck');

let compareCards = [];
let cardsMatched = [];
let clickCard = true; 
//Create Cards
function initSetup() {

    for (let i = 0; i < tiles.length; i++) {
        const myCard = document.createElement('li');
        myCard.classList.add('card');
        myCard.innerHTML = "<i class='" + tiles[i] + "'</i>";
        cardsBox.appendChild(myCard);

        onClick(myCard);
    }
}

//card event listener
myCard = shuffle(tiles);

//display timer by default
var timer = document.querySelector(".timer");
timer.innerHTML = "0 mins 0 secs";
clearInterval(interval);

//when card is clicked
function onClick(myCard) {

    myCard.addEventListener("click", function () {

        if (clickCard === true) { 
            const presentCard = this;
            const beforeCard = compareCards[0];
            //an existing opened card
            if (compareCards.length === 1) {
                clickCard = false;  
                myCard.classList.add('open', 'show', 'prevent');
                compareCards.push(this);

                matchCards(presentCard, beforeCard);
                //compare 2 opened cards


            } else {
                myCard.classList.add('open', 'show', 'prevent');
                compareCards.push(this);
            } //no opened cards
        }


    });

}

//comparing cards
function matchCards(presentCard, beforeCard) {
    clickCard = false; 

    if (presentCard.innerHTML === beforeCard.innerHTML) {

        presentCard.classList.add('match');
        beforeCard.classList.add('match');

        cardsMatched.push(presentCard, beforeCard);

        compareCards = [];
        clickCard = true;     

        gameComplete();

    } else {

        setTimeout(function () {
            presentCard.classList.remove('open', 'show', 'prevent');
            beforeCard.classList.remove('open', 'show', 'prevent');
            compareCards = [];
            clickCard = true;  
        }, 500);

    }

    incMov();


}


//when game is over

function gameComplete() {
    setTimeout(function () {
        if (cardsMatched.length === tiles.length) {
            congratulations();
            clearInterval(interval);
        }
    }, 200);
}

//moves 
const updateMoves = document.querySelector('.moves');
let movCount = 0;
updateMoves.innerHTML = 0;

function incMov() {
    movCount += 1;
    updateMoves.innerHTML = movCount;

    if (movCount == 1) {
        sec = 0;
        min = 0;
        hour = 0;
        startTimer();
    }

    updateRating();
}

//restart button
const restartFunction = document.querySelector('.restart');
restartFunction.addEventListener("click", restart);

function restart() {
    myCard = shuffle(tiles);
    cardsBox.innerHTML = "";
    initSetup();
    cardsMatched = [];
    compareCards = [];
    movCount = 0;
    updateMoves.innerHTML = movCount;
    starContent.innerHTML = `<i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>`;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}


const starContent = document.querySelector('.stars');
starContent.innerHTML = `<i class="fa fa-star"></i>
                <i class="fa fa-star"></i>
                <i class="fa fa-star"></i>`;

function updateRating() {

    switch (movCount) {
        case 15:
            starContent.innerHTML = `<i class="fa fa-star"></i>
                <i class="fa fa-star"></i>`;
            break;
        case 30:
            starContent.innerHTML = `<i class="fa fa-star"></i>`;
            break;

    }

}
//timer function
var sec = 0
var min = 0;
var timer = document.querySelector(".timer");
var interval;

function startTimer() {
    interval = setInterval(function () {
        timer.innerHTML = min + " mins " + sec + " secs";
        sec++;
        if (sec == 60) {
            min++;
            sec = 0;
        }
        if (min == 60) {
            hour++;
            min = 0;
        }
    }, 1000);
}

let modal = document.getElementById("popup1")

//modal close icon
let closeicon = document.querySelector(".close");

//modal display
function congratulations() {
    if (cardsMatched.length == 16) {
        clearInterval(interval);
        finalTime = timer.innerHTML;
        //show congratulations modal
        modal.classList.add("show");
        //declare star rating variable
        //showing move, rating, time on modal
        document.getElementById("finalMove").innerHTML = movCount;
        document.getElementById("starRating").innerHTML = starContent.innerHTML;
        document.getElementById("totalTime").innerHTML = finalTime;
        //closeicon on modal
        closeModal();
    };
}

function closeModal() {
    closeicon.addEventListener("click", function (e) {
        modal.classList.remove("show");
    });
}

//play again button
function playAgain() {
    modal.classList.remove("show");
    restart();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(tiles) {
    var currentIndex = tiles.length,
        temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = tiles[currentIndex];
        tiles[currentIndex] = tiles[randomIndex];
        tiles[randomIndex] = temporaryValue;
    }

    return tiles;
}

initSetup();