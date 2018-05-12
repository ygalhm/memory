var LionKing = {};

var count = 0;
var winCount = 0;
var firstGuess = '';
var secondGuess = '';
var previousTarget = null;
var delay = 1200;

var cardsArray = [{
  'name': 'simba',
  'img': 'img/simba.png',
},
{
  'name': 'nala',
  'img': 'img/nala.png',
},
{
  'name': 'pumba',
  'img': 'img/pumba.png',
},
{
  'name': 'timon',
  'img': 'img/timon.png',
},
{
  'name': 'rafiki',
  'img': 'img/rafiki.png',
},
{
  'name': 'zazou',
  'img': 'img/zazou.png',
},
];

//START
LionKing.Start = function () {
  LionKing.build();
  LionKing.match();
  LionKing.resetGuesses();
  LionKing.select();
}
// NEW GAME
LionKing.newGame = function () {
  document.getElementById("game").innerHTML = "";
  LionKing.Start();
}
// BUILD THE GAME

LionKing.build = function () {

  var gameGrid = cardsArray.concat(cardsArray);
  gameGrid.sort(() => 0.5 - Math.random());
  var game = document.getElementById('game');
  var grid = document.createElement('section');
  grid.setAttribute('class', 'grid');
  grid.id = "grid";
  game.appendChild(grid);

  gameGrid.forEach(item => {

    var card = document.createElement('div');
    card.classList.add('card');
    card.dataset.name = item.name;

    var front = document.createElement('div');
    front.classList.add('front');

    var back = document.createElement('div');
    back.classList.add('back');
    back.style.backgroundImage = `url(${item.img})`;

    grid.appendChild(card);
    card.appendChild(front);
    card.appendChild(back);
  });
}

// MATCHS

LionKing.match = function () {
  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
}

// RESET_GUESSES

LionKing.resetGuesses = function () {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  var previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

// SELECTION PROCESS
LionKing.select = function () {
  var grid = document.getElementById('grid');
  grid.addEventListener('click', function (event) {

    var clicked = event.target;

    if (clicked.nodeName === 'SECTION' || clicked === previousTarget || clicked.parentNode.classList.contains('selected') || clicked.parentNode.classList.contains('match')) {
      return;
    }

    if (count < 2) {
      count++;
      if (count === 1) {
        firstGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      } else {
        secondGuess = clicked.parentNode.dataset.name;
        clicked.parentNode.classList.add('selected');
      }
      if (firstGuess && secondGuess) {
        if (firstGuess === secondGuess) {
          setTimeout(LionKing.match, delay);
          winCount = winCount + 1;
          console.log(winCount);
        }
        setTimeout(LionKing.resetGuesses, delay);
      }
      previousTarget = clicked;
    }

    if (winCount == 6){
      alert("You won ! You're the King !");
      location.reload();
    }
  });
}

// AUDIO 

var myAudio = document.getElementById("myAudio");
var isPlaying = false;

function togglePlay() {
  if (isPlaying) {
    myAudio.pause()
  } else {
    myAudio.play();
  }
};
myAudio.onplaying = function () {
  isPlaying = true;
};
myAudio.onpause = function () {
  isPlaying = false;
};

LionKing.Start();

