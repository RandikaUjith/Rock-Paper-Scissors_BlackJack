function botChoiceFunction() {
    let bot = Math.floor(3*Math.random());
    let botArray = ['rock', 'paper', 'scissors'];
    return botArray[bot];
}

function decision(yourChoice, botChoice) {
    let rpsDatabase = {
        'rock': {'scissors':1, 'rock':0.5, 'paper':0 },
        'paper': {'scissors':0, 'rock':1, 'paper':0.5 },
        'scissors': {'scissors':0.5, 'rock':0, 'paper':1}
    }
    let score = rpsDatabase[yourChoice][botChoice];
    if (score === 0){
        return {message: 'You Lost !', colour:'red'}
    } else if (score === 0.5) {
        return {message: 'Game Draw !', colour: 'blue'}
    } else {
        return {message: 'You Won !!', colour: 'Green'}
    }
}

function render(result, yourChoice, botChoice) {
    let yourElement = document.getElementById(yourChoice).cloneNode(true);
    yourElement.style.boxShadow = '0px 0px 20px rgb(49, 54, 206)';

    let botElement = document.getElementById(botChoice).cloneNode(true);
    botElement.style.boxShadow = '0px 0px 20px rgb(255, 0, 0)';
    
    let textdiv = document.createElement('div');
    textdiv.setAttribute('id', 'text-div');

    textdiv.innerText = result.message;
    textdiv.style.color = result.colour; 
    textdiv.setAttribute('class', 'result-text');

    let resetButton = document.createElement('button');
    resetButton.innerText = 'Go Again';
    resetButton.setAttribute('class', 'GoAgain-button');
    resetButton.setAttribute('onclick', 'location.reload()');
    textdiv.appendChild(resetButton);
    
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissors').remove();

    document.getElementById('image-div-id').appendChild(yourElement);
    document.getElementById('image-div-id').appendChild(textdiv);
    document.getElementById('image-div-id').appendChild(botElement);  
}


function yourChoiceFunction(choice) {
    let yourChoice = choice;
    let botChoice = botChoiceFunction();
    let result = decision(yourChoice, botChoice);
    render(result, yourChoice, botChoice);
}


//Button Challange

let allButtons = document.getElementsByTagName('button');

let buttonCopy = []
for (let i=0; i<allButtons.length; i++) {
    buttonCopy.push(allButtons[i].className);
}
 

function selectColor(choice) {
    if (choice === 'red'){
        redColor();
    } else if (choice === 'green') {
        greenColor();
    } else if (choice === 'random') {
        randomColor();
    } else if (choice === 'reset') {
        resetColor();
    }
}

function redColor(){
    for (let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList);
        allButtons[i].classList.add('red-button');
    }
}

function greenColor(){
    for (let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList);
        allButtons[i].classList.add('green-button');
    }
}

function randomColor(){
    for (let i=0; i<allButtons.length; i++) {
        let rand = Math.floor(Math.random()*allButtons.length);
        allButtons[i].classList.remove(allButtons[i].classList);
        allButtons[i].classList.add(buttonCopy[rand]);
    }
}

function resetColor() {
    for (let i=0; i<allButtons.length; i++) {
        allButtons[i].classList.remove(allButtons[i].classList);
        allButtons[i].classList.add(buttonCopy[i]);
    }
    
}

//BlackJack Game

//model

let cardArray = {
    1 : 'blackjack_assets/images/1.png',
    2: 'blackjack_assets/images/2.png',
    3: 'blackjack_assets/images/3.png',
    4: 'blackjack_assets/images/4.png',
    5: 'blackjack_assets/images/5.png',
    6: 'blackjack_assets/images/6.png',
    7: 'blackjack_assets/images/7.png',
    8: 'blackjack_assets/images/8.png',
    9: 'blackjack_assets/images/9.png',
    10: 'blackjack_assets/images/10.png',
    11: 'blackjack_assets/images/11.png',
    12: 'blackjack_assets/images/12.png',
    13: 'blackjack_assets/images/13.png',
}

let yourScore = 0;
let dealerScore = 0;
let winScore = 0;
let lostScore = 0;
let drawScore = 0;
const aww = new Audio('blackjack_assets/sounds/aww.mp3')
const cash = new Audio('blackjack_assets/sounds/cash.mp3')
const swish = new Audio('blackjack_assets/sounds/swish.m4a')

function hitFunction() {
    if ( yourScore <= 21) {
        let rand = showCard('you-image-id');
        yourScore = yourScore + rand;
        document.getElementById('your_score_display').innerText = yourScore;
        swish.play();

        if (yourScore > 21) {
            document.getElementById('blackjack_header_display_id').innerText = 'You Lost';
            aww.play();
            lostScore = lostScore + 1;
            document.getElementById('lost_score').innerText = lostScore;
        }
    }
    
}

function dealFunction() {
    if (document.getElementById('blackjack_header_display_id').innerText === "Let's Play") {
        
        for(let i=0; i<3; i++) {
            let rand = showCard('dealer-image-id');
            dealerScore = dealerScore + rand;
            document.getElementById('dealer_score_display').innerText = dealerScore;
            swish.play();
            //await (1000);
        }
    
        if (yourScore > dealerScore && yourScore <= 21 || dealerScore > 21) {
            document.getElementById('blackjack_header_display_id').innerText = 'You Won';
            cash.play();
            winScore = winScore + 1;
            document.getElementById('win_score').innerText = winScore;
        }else if (yourScore === dealerScore){
            document.getElementById('blackjack_header_display_id').innerText = 'Game Draw';
            cash.play();
            drawScore = drawScore + 1;
            document.getElementById('draw_score').innerText = drawScore;
        }else {
            document.getElementById('blackjack_header_display_id').innerText = 'You Lost';
            aww.play();
            lostScore = lostScore + 1;
            document.getElementById('lost_score').innerText = lostScore;
        }
    }
}

function standFunction() {
    let yourImages = document.querySelector('#you-image-id').querySelectorAll('img');
    let dealerImages = document.querySelector('#dealer-image-id').querySelectorAll('img');

    for (let i=0; i<yourImages.length; i++) {
        yourImages[i].remove();
    }
    for (let i=0; i<dealerImages.length; i++) {
        dealerImages[i].remove();
    }

    yourScore = 0;
    dealerScore = 0;

    document.getElementById('your_score_display').innerText = yourScore;
    document.getElementById('dealer_score_display').innerText = dealerScore;
    document.getElementById('blackjack_header_display_id').innerText = "Let's Play";
}

//view

function showCard(div) {

    let rand = Math.floor(Math.random()*13) + 1;

    let image = document.createElement('img');
    image.setAttribute('src', cardArray[rand]);
    image.setAttribute('class', 'card-image');
    document.getElementById(div).appendChild(image);
    return rand;
}

//Contrl

document.querySelector('#hit_button').addEventListener('click', hitFunction);
document.querySelector('#deal_button').addEventListener('click', dealFunction);
document.querySelector('#stand_button').addEventListener('click', standFunction);
