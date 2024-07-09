const Ship = require('./ship');

class Gameboard {
    constructor() {
        this.board = [];
        for (let i = 0; i < 10; i++) {
            this.board.push(new Array(10).fill(null));
        }
        this.occupiedCoordinates = [];
        this.desiredCoordinates = [];
        this.ships = [];
    }

    placeShip(ship, startPosition, orientation, marker) {
        //get coordinates
        let [x, y] = startPosition;

        //prevent going off the board
        if (x < 0 || y < 0 || x > 9 || y > 9) return;
        if (orientation === 'horizontal' && y + ship.length > 10) return;
        else if (orientation === 'vertical' && x + ship.length > 10) return;

        //add to desired position array
        if (orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.desiredCoordinates.push([x, y + i]);
            }
        } else if (orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.desiredCoordinates.push([x + i, y]);
            }
        }

        //check if any spots are taken - compare desired position array with occupied array
        if (this.occupiedCoordinates.some(coords => this.desiredCoordinates.some(desired => desired[0] === coords[0] && desired[1] === coords[1]))) {
            return 'That position is taken';
        
        //if not taken, add ship to desired position and update occupied coordinates array
        } else {
            for (let i = 0; i < this.desiredCoordinates.length; i++) {
                const [row, col] = this.desiredCoordinates[i]; 
                this.board[row][col] = marker;
                this.occupiedCoordinates.push([row, col]);
            }

            this.ships.push(ship);
        }

        this.desiredCoordinates = [];
    }

    receiveAttack() {

    }

    allShipsSunk() {

    }
}

const gb = new Gameboard();
const aircraftCarrier = new Ship('Aircraft Carrier', 5);
const battleship = new Ship('Battleship', 4);
const destroyer = new Ship('Destroyer', 3);
const submarine = new Ship('Submarine', 3)
const cruiser = new Ship('Cruiser', 2);


// console.log(gb.board);
console.log(gb.placeShip(aircraftCarrier, [5, 6], 'vertical', 'AC'));
console.log(gb.placeShip(battleship, [0, 6], 'horizontal', 'B'));
console.log(gb.board);
console.log(gb.desiredCoordinates);
console.log(gb.occupiedCoordinates);



module.exports = Gameboard;