const Gameboard = require('./gameboard');

class Player {
    constructor(name, type) {
        this.name = name; 
        this.type = type; //person or computer
        this.gameboard = new Gameboard();
    }
}

module.exports = Player;