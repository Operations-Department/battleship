const Gameboard = require('./gameboard');

class Player {
    constructor(type) {
        this.type = type; // person or computer
        this.gameboard = new Gameboard();
    }
}

const person = new Player('person');
const computer = new Player('computer');

// console.table(person.gameboard.board);
// console.table(computer.gameboard.board);

module.exports = Player;