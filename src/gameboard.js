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

    //prevent ship from going off the board
    avoidOverBoard(x, y, orientation, ship) {
        if (x < 0 || y < 0 || x > 9 || y > 9) return false;
        if (orientation === 'horizontal' && y + ship.length > 10) return false;
        else if (orientation === 'vertical' && x + ship.length > 10) return false;
        return true;
    }

    placeShip(ship, startPosition, orientation, marker) {
        
        //get coordinates
        let [x, y] = startPosition;

        const isValid = this.avoidOverBoard(x, y, orientation, ship);
        if (!isValid) return 'Invalid position';
        
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

        //compare desired position array with occupied array - check if any spots are taken
        for (let i = 0; i < this.occupiedCoordinates.length; i++) {
            const [occupiedX, occupiedY] = this.occupiedCoordinates[i];
            
            for (let j = 0; j < this.desiredCoordinates.length; j++) {
                const [desiredX, desiredY] = this.desiredCoordinates[j];

                //if the desired spot is already taken - return
                if (occupiedX === desiredX && occupiedY === desiredY) {
                    this.desiredCoordinates = [];
                    return;
                }
            }
        }

        //if spot not taken, add ship to desired position and update occupied coordinates array
        for (let i = 0; i < this.desiredCoordinates.length; i++) {
            const [row, col] = this.desiredCoordinates[i]; 
            this.board[row][col] = marker;
            this.occupiedCoordinates.push([row, col]);
        }

        this.desiredCoordinates = [];
        this.ships.push(ship);
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



console.log(gb.placeShip(aircraftCarrier, [5, 6], 'vertical', 'AC'));
// console.log(gb.placeShip(battleship, [6, 7], 'vertical', 'B'));
console.log(gb.board);
console.log(gb.desiredCoordinates);
console.log(gb.occupiedCoordinates);



module.exports = Gameboard;