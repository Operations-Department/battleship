const Ship = require('./ship');

//instantiate all valid ships for the game
const playerAircraftCarrier = new Ship('Aircraft Carrier', 5);
const playerBattleship = new Ship('Battleship', 4);
const playerDestroyer = new Ship('Destroyer', 3);
const playerSubmarine = new Ship('Submarine', 3)
const playerCruiser = new Ship('Cruiser', 2);

const compAircraftCarrier = new Ship('Aircraft Carrier', 5);
const compBattleship = new Ship('Battleship', 4);
const compDestroyer = new Ship('Destroyer', 3);
const compSubmarine = new Ship('Submarine', 3)
const compCruiser = new Ship('Cruiser', 2);


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

        this.playerACLocation = [];
        this.playerBLocation = [];
        this.playerDLocation = [];
        this.playerSUBLocation = [];
        this.playerCLocation = [];

        
        this.playerShipsObject = {
            'pAC': playerAircraftCarrier,
            'pB': playerBattleship,
            'pD': playerDestroyer,
            'pSUB': playerSubmarine,
            'pC': playerCruiser
        }

        this.compShipsObject = {
            'cAC': compAircraftCarrier,
            'cB': compBattleship,
            'cD': compDestroyer,
            'cSUB': compSubmarine,
            'cC': compCruiser
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

            //add player coordinates to array - used for smarter computer attack ai
            if (marker === 'pAC') this.playerACLocation.push([row, col]);
            if (marker === 'pB') this.playerBLocation.push([row, col]);
            if (marker === 'pD') this.playerDLocation.push([row, col]);
            if (marker === 'pSUB') this.playerSUBLocation.push([row, col]);
            if (marker === 'pC') this.playerCLocation.push([row, col]);
        }

        this.desiredCoordinates = []; //clear array for next round
    }

    //set the comp ship positions randomly each playthrough
    placeRandomShip(ship, marker) {
        let isValidPlacement = false;
    
        while (!isValidPlacement) {
            //generate random start coordinates
            const x = Math.floor(Math.random() * 10);
            const y = Math.floor(Math.random() * 10);
    
            //set ship as horizontal or vertical
            const orientation = this.getRandomShipOrientation();
    
            //avoid going overboard
            if (this.avoidOverBoard(x, y, orientation, ship)) {
                this.setDesiredCoordinates(x, y, ship, orientation);
    
                //avoid occupied position
                if (!this.occupiedSpotCheck()) {
                    //place ship and mark valid
                    this.placeShip(ship, [x, y], orientation, marker);
                    isValidPlacement = true;
                }
            }
        }
    }
    
    getRandomShipOrientation() {
        let orientation = Math.floor(Math.random() * 10) % 2;
        if (orientation === 0) return'horizontal';
        else return 'vertical';
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
            if (this.playerShipsObject[location]) this.playerShipsObject[location].getHit();
            else if (this.compShipsObject[location]) this.compShipsObject[location].getHit();
            this.board[x][y] = 'x';
            return 'Hit!';
        }
    }

    allPlayerShipsSunk() {
        return Object.values(this.playerShipsObject).every(ship => ship && ship.isSunk);
    }

    allCompShipsSunk() {
        return Object.values(this.compShipsObject).every(ship => ship && ship.isSunk);
    }
}

module.exports = Gameboard;