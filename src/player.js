const Gameboard = require('./gameboard');

class Player {
    constructor(name) {
        this.name = name; //person or computer
        this.gameboard = new Gameboard();
    }
}

module.exports = Player;