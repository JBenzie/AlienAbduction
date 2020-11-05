var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
const path = require('path');

var players = {};
var ufo = {
  x: 0,
  vel: 0
};
var star = {
  x: Math.floor(Math.random() * (1900 * 2)) + 50,
  y: Math.floor(Math.random() * 800) + 50
};
var leaderboard = {
  playerID: 0,
  playerName: '',
  highScore: 0
};

app.use('/pub', express.static(path.join(__dirname, 'pub')));
 
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});
 
io.on('connection', function (socket) {
  console.log('Sweet..a user has connected!');
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
    x: Math.floor(Math.random() * 700) + 50,
    y: Math.floor(Math.random() * 500) + 50,
    playerId: socket.id,
    score: 0,
    rnd: _rnd,
    name: avatar
  };

  if (ufo.x == 0 && ufo.vel == 0) {
    var rand = Math.floor(Math.random() * 2) + 1;
    var v;
    if (rand == 1) {
      v = 75;
    } else {
      v = -75;
    }
    ufo = {
      x: Math.floor(Math.random() * 1900) + 50,
      vel: v,
    };
  } else {
    ufo = ufo;
  };

  // send the players object to the new player
  socket.emit('currentPlayers', players);

  // send star object to the new player
  socket.emit('starLocation', star);

  // send the current scores
  socket.emit('leaderboardUpdate', leaderboard);
  socket.emit('scoreUpdate', players);
  // send ufo position
  socket.emit('ufoPosition', ufo);
  //console.log(`emmited ufoPosition. ufo.x: ${ufo.x}, ufo.vel: ${ufo.vel}.`);

  // update all other players of the new player
  socket.broadcast.emit('newPlayer', players[socket.id]);

  // player disconnect
  socket.on('disconnect', function () {
    console.log('Bummer..a user has disconnected..');
    // remove this player from our players object
    delete players[socket.id];
    // emit a message to all players to remove this player
    io.emit('disconnect', socket.id);
  });

  // when a player moves, update the player data
  socket.on('playerMovement', function (movementData) {
    players[socket.id].x = movementData.x;
    players[socket.id].y = movementData.y;
    // emit a message to all players about the player that moved
    socket.broadcast.emit('playerMoved', players[socket.id]);
  });

  // update ufo position
  socket.on('ufoMovement', function (ufoData) {
    //console.log(`ufoMovement received. ufoData.x: ${ufoData.x}, ufoData.vel: ${ufoData.vel}.`);
    ufo.x = ufoData.x;
    ufo.vel = ufoData.vel;
    // emit message to update all players on ufo location
    socket.broadcast.emit('ufoMoved', ufo);
  });

  // listen for 'starCollected' event, update scores, generate new star
  socket.on('starCollected', function () {
    players[socket.id].score += 1;
    if (players[socket.id].score > leaderboard.highScore) {
      leaderboard.highScore = players[socket.id].score;
      leaderboard.playerID = players[socket.id];
      leaderboard.playerName = players[socket.id].name;
    }
    star.x = Math.floor(Math.random() * (1900 * 2)) + 50;
    star.y = Math.floor(Math.random() * 800) + 50;
    io.emit('starLocation', star);
    io.emit('scoreUpdate', players);
    io.emit('leaderboardUpdate', leaderboard);
  });


});

server.listen(process.env.PORT || 5000, function () {
  console.log(`I'm all ears...listening on ${server.address().port}`);
});