const Ship = require('./ship');

//instantiate all valid ships for the game
const aircraftCarrier = new Ship('Aircraft Carrier', 5);
const battleship = new Ship('Battleship', 4);
const destroyer = new Ship('Destroyer', 3);
const submarine = new Ship('Submarine', 3)
const cruiser = new Ship('Cruiser', 2);

class Gameboard {
    constructor() {
        this.board = [];
        for (let i = 0; i < 10; i++) {
            this.board.push(new Array(10).fill(null));
        }
        
        this.occupiedCoordinates = [];  //stores spots that are taken - prevent overlap ships
        this.desiredCoordinates = [];   //compares with occupied when placing ship - prevent overlap ships
        this.firedUpon = [];            //stores all coordinates that have been fired upon already
        this.hits = [];                 //stores all coordinates that were hit
        this.misses = [];               //stores all coordinates that were misses
        
        this.shipsObject = {
            'AC': aircraftCarrier,
            'B': battleship,
            'D': destroyer,
            'SUB': submarine,
            'C': cruiser
        }
    }

    //prevent ship from going off the board 
    //*helper to placeShip method*
    avoidOverBoard(x, y, orientation, ship) {
        if (x < 0 || y < 0 || x > 9 || y > 9) return false;
        if (orientation === 'horizontal' && y + ship.length > 10) return false;
        else if (orientation === 'vertical' && x + ship.length > 10) return false;
        return true;
    }

    //add to desired position array
    //*helper to placeShip method*
    setDesiredCoordinates(x, y, ship, orientation) {
        if (orientation === 'horizontal') {
            for (let i = 0; i < ship.length; i++) {
                this.desiredCoordinates.push([x, y + i]);
            }
        } else if (orientation === 'vertical') {
            for (let i = 0; i < ship.length; i++) {
                this.desiredCoordinates.push([x + i, y]);
            }
        }

        return this.desiredCoordinates;
    }
        
    //compare desired position array with occupied array - check if any spots are taken
    //*helper to placeShip method*
    occupiedSpotCheck() {
        for (let i = 0; i < this.occupiedCoordinates.length; i++) {
            const [occupiedX, occupiedY] = this.occupiedCoordinates[i];
            
            for (let j = 0; j < this.desiredCoordinates.length; j++) {
                const [desiredX, desiredY] = this.desiredCoordinates[j];

                //if the desired spot is already taken - return
                if (occupiedX === desiredX && occupiedY === desiredY) {
                    this.desiredCoordinates = [];  //clear array for next round
                    return true;
                }
            }
        }

        return false;
    }

    placeShip(ship, startPosition, orientation, marker) {
        
        //get coordinates
        let [x, y] = startPosition;

        const isValid = this.avoidOverBoard(x, y, orientation, ship);
        if (!isValid) return 'Invalid position';

        this.setDesiredCoordinates(x, y, ship, orientation);

        const isOccupied = this.occupiedSpotCheck();
        if (isOccupied) return 'That spot is taken';

        //selected spot is on board and unoccupied - place ship on board
        for (let i = 0; i < this.desiredCoordinates.length; i++) {
            const [row, col] = this.desiredCoordinates[i]; 
            this.board[row][col] = marker;
            this.occupiedCoordinates.push([row, col]); //update occupied coordinates
        }

        this.desiredCoordinates = []; //clear array for next round
    }

    //check if selected spot has already been shot
    //*helper function to receiveAttack method*
    firedCheck(x, y) {
        for (let i = 0; i < this.firedUpon.length; i++) {
            const [firedUponX, firedUponY] = this.firedUpon[i];
            if (x === firedUponX && y === firedUponY) return true;
        }

        return false;
    }

    //take hit - show on board
    receiveAttack(attackCoordinates) {
        const [x, y] = attackCoordinates;
        const location = this.board[x][y];

        const alreadyShot = this.firedCheck(x, y);
        if (alreadyShot) return 'You already shot there';

        //send coordinates to array - can't fire upon again
        this.firedUpon.push([x, y]);

        //attack missed - show on board
        if (location === null) {
            this.misses.push([x, y]);
            this.board[x][y] = 'o';
            return 'Miss';
        
        //attack hit - show on board and send damage to ship class
        } else {
            this.hits.push([x, y]);
            if (this.shipsObject[location]) this.shipsObject[location].getHit();
            this.board[x][y] = 'x';
            return 'Hit!';
        }
    }

    allShipsSunk() {
        return Object.values(this.shipsObject).every(ship => ship && ship.isSunk);
    }
}

module.exports = Gameboard;