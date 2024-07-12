const Gameboard = require('./gameboard');

class Player {
    constructor(type) {
        this.type = type; // person or computer
        this.gameboard = new Gameboard();
    }
}

module.exports = Player;