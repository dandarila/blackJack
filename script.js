//
// Blackjack
// by Marian - an version from Plural Sight and add features as showing cards
//

// Card variables
let suits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'];
let values = ['Ace', 'King', 'Queen', 'Jack', 'Ten', 'Nine', 'Eight', 'Seven', 'Six', 'Five', 'Four', 'Three', 'Two'];


//DOM Variables
let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById("new-game-button");
let hitButton = document.getElementById("hit-button");
let stayButton = document.getElementById("stay-button");
let image = document.getElementById('cardImage');
let image2 = document.getElementById('cardImage2');
let image3 = document.getElementById('cardImage3');
let image4 = document.getElementById('cardImage4');
let image5 = document.getElementById('cardImage5');
let imagePlayer = document.getElementById('cardImagePlayer');
let imagePlayer2 = document.getElementById('cardImagePlayer2');
let imagePlayer3 = document.getElementById('cardImagePlayer3');
let imagePlayer4 = document.getElementById('cardImagePlayer4');
let imagePlayer5 = document.getElementById('cardImagePlayer5');



// Game variables
let gameStarted = false,
    gameOver = false,
    playerWon = false,
    dealerCards = [],
    playerCards = [],
    dealerScore = 0,
    playerScore = 0,
    deck = [];


hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();


newGameButton.addEventListener('click', function(){
  gameStarted = true;
  gameOver = false;
  playerWon = false;

  deck = createDeck();
  shuffleDeck(deck);
  dealerCards = [getNextCard(), getNextCard()];
  playerCards = [getNextCard(), getNextCard()];


  newGameButton.style.display = 'none';
  hitButton.style.display = 'inline';
  stayButton.style.display = 'inline';
  showStatus();
  image3.src = 'jocker.jpg';
  image4.src = 'jocker.jpg';
  image5.src = 'jocker.jpg';
  imagePlayer3.src = 'jocker.jpg';
  imagePlayer4.src = 'jocker.jpg';
  imagePlayer5.src = 'jocker.jpg';
})

hitButton.addEventListener('click', function() {
  playerCards.push(getNextCard());
  if(playerCards[2]) imagePlayer3.src = `${getCardString(playerCards[2])}.jpg`
  if(playerCards[3]) imagePlayer4.src = `${getCardString(playerCards[3])}.jpg`
  if(playerCards[4]) imagePlayer5.src = `${getCardString(playerCards[4])}.jpg`
  checkForEndofGame();
  showStatus();
})

stayButton.addEventListener('click', function(){
  gameOver = true;
  checkForEndofGame();
  showStatus();
  if(dealerCards[2]) image3.src = `${getCardString(dealerCards[2])}.jpg`
  if(dealerCards[3]) image4.src = `${getCardString(dealerCards[3])}.jpg`
  if(dealerCards[4]) image5.src = `${getCardString(dealerCards[4])}.jpg`
})


function createDeck() {
  let deck = [];
  for (let suitIdx = 0; suitIdx < suits.length; suitIdx++) {
  for (let valueIdx = 0; valueIdx < values.length; valueIdx ++) {
    let card = {
      suit: suits[suitIdx],
      value : values[valueIdx]
        }
    deck.push(card);
  }
}
return deck;

}

function shuffleDeck(deck) {
  for (let i = 0; i < deck.length; i++) {
    let swapIdx = Math.trunc(Math.random() * deck.length);
    let tmp = deck[swapIdx];
    deck[swapIdx] = deck[i];
    deck[i] = tmp;
  }
}

function getNextCard() {
  return deck.shift()
}


function getCardString(card) {
  return card.value + ' of ' + card.suit;
  }

function updateScores() {
  dealerScore = getScore(dealerCards);
  playerScore = getScore(playerCards);
}

function checkForEndofGame() {
  updateScores();

  if(gameOver) {
    //let dealer take cards
    while(dealerScore < playerScore
          && playerScore <= 21
          && dealerScore <= 21) {
            dealerCards.push(getNextCard());
            updateScores();
    }
  }

  if (playerScore > 21) {
    playerWon = false;
    gameOver = true;
  }
  else if (dealerScore > 21) {
    playerWon = true;
    gameOver = true;
  }
  else if (gameOver) {
    if(playerScore > dealerScore) {
      playerWon = true;
    }
    else {
      playerWon = false;
    }
  }
}

function getCardNumericValue(card) {
  switch (card.value) {
    case 'Ace':
      return 1;
    case 'Two':
      return 2;
    case 'Three':
      return 3;
    case 'Four':
      return 4;
    case 'Five':
      return 5;
    case 'Six':
      return 6;
    case 'Seven':
      return 7;
    case 'Eight':
      return 8;
    case 'Nine':
      return 9;
    default:
      return 10;
  }
}

function getScore(cardArray) {
  let score = 0;
  let hasAce = false;
  for (let i = 0; i < cardArray.length; i++) {
    let card = cardArray[i];
    score += getCardNumericValue(card);
    if (card.value === 'Ace') {
      haseAce = true;
    }
  }
  if (hasAce && score + 10 <= 21) {
    return score + 10;
  }
  return score;
}

function showStatus(){
  if (!gameStarted) {
    textArea.innerText = 'Welcome to Blackjack!';
    return;
  }

  let dealerCardString = '';
  for (let i=0; i < dealerCards.length; i++) {
    dealerCardString += getCardString(dealerCards[i]) + '\n';
    image.src = `${getCardString(dealerCards[0])}.jpg`;
    image2.src = `${getCardString(dealerCards[1])}.jpg`;
    }

  let playerCardString = '';
  for (let i=0; i < playerCards.length; i++) {
    playerCardString += getCardString(playerCards[i]) + '\n';
    imagePlayer.src = `${getCardString(playerCards[0])}.jpg`;
    imagePlayer2.src = `${getCardString(playerCards[1])}.jpg`;
    }

  updateScores();

  textArea.innerText =
  'Dealer has: \n' +
  dealerCardString +
  '(score: '+ dealerScore + ')\n\n' +

  'Player has:\n' +
  playerCardString +
  '(score: '+ playerScore + ')\n\n';
    if (gameOver) {
    if (playerWon) {
      textArea.innerText += "YOU WIN !" ;
    }
    else {
      textArea.innerText += "DEALERS WINS !";
    }
    newGameButton.style.display = 'inline';
    hitButton.style.display = 'none';
    stayButton.style.display = 'none';
  }

}
