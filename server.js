var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const path = require('path');

app.use('/pub', express.static(path.join(__dirname, 'pub')));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

// VARIABLES ============================================================================================

var players = {};

var ufo = {
  x: 0,
  y: 0,
  vel: 0
};

var stars = [];
var reclaimedStars = [];
var star = {
  id: null,
  x: 0,
  y: 0
};

var leaderboard = {
  playerID: 0,
  playerName: '',
  highScore: 0
};
 
io.on('connection', function (socket) {
  console.log('Sweet..a user has connected!');

  // PLAYER =============================================================================================
  var _rnd = Math.floor(Math.random() * 30) + 1;
  var avatar;
  switch(_rnd) {
    case 1:
      avatar = 'Bear';
      break;
    case 2:
      avatar = 'Buffalo';
      break;
    case 3:
      avatar = 'Chick';
      break;
    case 4:
      avatar = 'Chicken';
      break;
    case 5:
      avatar = 'Cow';
      break;
    case 6:
      avatar = 'Crocodile';
      break;
    case 7:
      avatar = 'Dog';
      break;
    case 8:
      avatar = 'Duck';
      break;
    case 9:
      avatar = 'Elephant';
      break;
    case 10:
      avatar = 'Frog';
      break;
    case 11:
      avatar = 'Giraffe';
      break;
    case 12:
      avatar = 'Goat';
      break;
    case 13:
      avatar = 'Gorilla';
      break;
    case 14:
      avatar = 'Hippo';
      break;
    case 15:
      avatar = 'Horse';
      break;
    case 16:
      avatar = 'Monkey';
      break;
    case 17:
      avatar = 'Moose';
      break;
    case 18:
      avatar = 'Narwhal';
      break;
    case 19:
      avatar = 'Owl';
      break;
    case 20:
      avatar = 'Panda';
      break;
    case 21:
      avatar = 'Parrot';
      break;
    case 22:
      avatar = 'Penguin';
      break;
    case 23:
      avatar = 'Pig';
      break;
    case 24:
      avatar = 'Bunny';
      break;
    case 25:
      avatar = 'Rhino';
      break;
    case 26:
      avatar = 'Sloth';
      break;
    case 27:
      avatar = 'Snake';
      break;
    case 28:
      avatar = 'Walrus';
      break;
    case 29:
      avatar = 'Whale';
      break;
    case 30:
      avatar = 'Zebra';
      break;
  }
  players[socket.id] = {
    x: Math.floor(Math.random() * 3600) + 50,
    y: Math.floor(Math.random() * 800) + 50,
    playerId: socket.id,
    score: 0,
    rnd: _rnd,
    name: avatar,
    starsCollected: []
  };

  // send the players object to the new player
  socket.emit('currentPlayers', players);

  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // when a player moves, update the player data
  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  // listen for 'gameOver' event
  socket.on('gameOver', function () {
    console.log(`${players[socket.id].name} has been abducted!`);
    players[socket.id].score = 0;
    addStars(players[socket.id].starsCollected);
    players[socket.id].starsCollected = [];
    players[socket.id].x = Math.floor(Math.random() * 3600) + 50;
    players[socket.id].y = Math.floor(Math.random() * 800) + 50;
    io.emit('addStars', reclaimedStars);
    socket.emit('scoreUpdate', players);
    socket.emit('playerRespawn', players[socket.id]);
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  // player disconnect
  socket.on('disconnect', function () {
    console.log('Bummer..a user has disconnected..');
    addStars(players[socket.id].starsCollected);
    socket.broadcast.emit('addStars', reclaimedStars);
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });

  // STARS ==============================================================================================

  if (stars.length == 0) {
    initStars();
  }
  // send stars to all players
  socket.emit('starGroup', stars);

  // listen for 'starCollected' event, update scores, generate new star
  socket.on('starCollected', function (starData) {
    //console.log(`Star ${starData.id} collected. x: ${starData.x}, y: ${starData.y}.`);
    players[socket.id].score += 1;
    star = { id: starData.id, x: starData.x, y: starData.y };
    players[socket.id].starsCollected.push(star);
    if (players[socket.id].score > leaderboard.highScore) {
      leaderboard.highScore = players[socket.id].score;
      leaderboard.playerID = players[socket.id];
      leaderboard.playerName = players[socket.id].name;
    }
    var index = stars.map(function(s) {
      return s.id;
    }).indexOf(starData.id);

    //console.log(`index: ${index}.`);
    if (index > -1) {
      stars.splice(index, 1);
    }
    io.emit('destroyStar', starData.id);
    io.emit('leaderboardUpdate', leaderboard);
    socket.emit('scoreUpdate', players);
  });

  // UFO ================================================================================================
  // send ufo position
  if (ufo.y == 0) {
    initUFO();
  } else {
    getUFO();
  }
  io.emit('ufoPosition', ufo);

  // update ufo position
  socket.on('ufoMovement', function (ufoData) {
    ufo.x = ufoData.x;
    ufo.vel = ufoData.vel;
    // emit message to update all players on ufo location
    io.emit('ufoMoved', ufo);
  });

  // SCORE ==============================================================================================

  // send the current scores
  io.emit('leaderboardUpdate', leaderboard);
  socket.emit('scoreUpdate', players);

});

server.listen(process.env.PORT || 5000, function () {
  console.log(`I'm all ears...listening on ${server.address().port}`);
});


// functions

// UFO ==================================================================================================
// initialize ufo if none exists
function initUFO() {
  console.log(`Initializing UFO...`);
  var rand = Math.floor(Math.random() * 2) + 1;
  var v;
  if (rand == 1) {
    v = 75;
  } else {
    v = -75;
  }
  ufo = {
    x: Math.floor(Math.random() * 1900) + 50,
    y: 0,
    vel: v,
  };
  return ufo;
}

// return position of current ufo
function getUFO() {
  console.log(`Sending current UFO data...`);
  ufo = {
    x: ufo.x,
    y: ufo.y,
    vel: ufo.vel
  };
}

// STARS ================================================================================================
// populate 500 stars
function initStars() {
  console.log(`Initializing stars...`);
  var counter = 0;
  stars = [];
  if (counter < 500){
    counter = 0;
  } else {
    counter = counter;
  }
  do {
    star = { id: counter + 1, x: Math.floor(Math.random() * 3600) + 50, y: Math.floor(Math.random() * 800) + 50 };
    //console.log(`Created star ${star.id}. x: ${star.x}, y: ${star.y}.`);
    stars.push(star);
    counter++;
  } while (counter < 500);
  console.log(`Initialized ${stars.length} stars...`);
}

// add stars
function addStars(_stars) {
  console.log(`Adding ${_stars.length} stars...`);
  reclaimedStars = [];
  var _star;
  _stars.forEach(function(s) {
    _star = { id: s.id, x: Math.floor(Math.random() * 3600) + 50, y: Math.floor(Math.random() * 800) + 50 };
    reclaimedStars.push(_star);
  });
}