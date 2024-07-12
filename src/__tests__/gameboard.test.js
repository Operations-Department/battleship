const Gameboard = require('../gameboard');
const Ship = require('../ship');

let gb;
let aircraftCarrier;
let battleship;
let destroyer;
let submarine;
let cruiser;

//setup: create a new gameboard and ships before each test
beforeEach(() => {
    gb = new Gameboard();
    aircraftCarrier = new Ship('Aircraft Carrier', 5);
    battleship = new Ship('Battleship', 4);
    destroyer = new Ship('Destroyer', 3);
    submarine = new Ship('Submarine', 3)
    cruiser = new Ship('Cruiser', 2);
});

//teardown: reset gameboard and ships data
afterEach(() => {
    gb = null;
    aircraftCarrier = null;
    battleship = null;
    destroyer = null;
    submarine = null;
    cruiser = null;
});
    
//valid ship placement
test('Places ship on the board correctly', () => {
    const result = gb.placeShip(battleship, [2, 3], 'horizontal', 'B');
    expect(result).toBeUndefined(); //no error message returned
    expect(gb.board[2][2]).toBe(null);
    expect(gb.board[2][3]).toBe('B');
    expect(gb.board[2][4]).toBe('B');
    expect(gb.board[2][5]).toBe('B');
    expect(gb.board[2][6]).toBe('B');
    expect(gb.board[2][7]).toBe(null);
});

//invalid starting position
test('Returns error message for selection off the board', () => {
    const resultOne = gb.placeShip(battleship, [1, 13], 'vertical', 'B');
    const resultTwo = gb.placeShip(battleship, [-1, 6], 'vertical', 'B');
    expect(resultOne).toBe('Invalid position');
    expect(resultTwo).toBe('Invalid position');
});

//overlap with existing ship
test('Returns error message for overlapping position', () => {
    const firstPlacement = gb.placeShip(battleship, [5, 4], 'horizontal', 'B');
    const secondPlacement = gb.placeShip(destroyer, [4, 5], 'vertical', 'D');
    expect(firstPlacement).toBeUndefined();
    expect(secondPlacement).toBe('That spot is taken');
});

//attacking a ship returns a 'hit'
test('Returns "Hit" message, updates the board to reflect that hit', () => {
    gb.placeShip(battleship, [5, 4], 'horizontal', 'B');
    const hit = gb.receiveAttack([5, 4]);
    expect(hit).toBe('Hit!');
    expect(gb.board[5][4]).toBe('x');
});

//attacking an empty spot returns a 'miss'
test('Returns "Miss", updates the board to reflect that missed shot', () => {
    gb.placeShip(battleship, [5, 4], 'horizontal', 'B'); //ship spans [5, 4], [5, 5], [5, 6], [5, 7] 
    const miss = gb.receiveAttack([5, 3]);
    expect(miss).toBe('Miss');
    expect(gb.board[5][3]).toBe('o');
});

//attacking the same spot twice => both hit and miss cases
test('Returns error message when firing on the same spot again', () => {
    gb.placeShip(battleship, [5, 4], 'horizontal', 'B');
    const firstShotHit = gb.receiveAttack([5, 5]);
    const secondShotHit = gb.receiveAttack([5, 5]);
    expect(firstShotHit).toBe('Hit!');
    expect(secondShotHit).toBe('You already shot there');

    const firstShotMiss = gb.receiveAttack([1, 5]);
    const secondShotMiss = gb.receiveAttack([1, 5]);
    expect(firstShotMiss).toBe('Miss');
    expect(secondShotMiss).toBe('You already shot there');
});

//all ships have been sunk
test('Returns true if all ships have been sunk', () => {

    //place all ships
    gb.placeShip(aircraftCarrier, [0, 0], 'horizontal', 'AC');
    gb.placeShip(battleship, [1, 0], 'horizontal', 'B');
    gb.placeShip(destroyer, [2, 0], 'horizontal', 'D');
    gb.placeShip(submarine, [3, 0], 'horizontal', 'SUB');
    gb.placeShip(cruiser, [4, 0], 'horizontal', 'C');

    //sink all ships
    //carrier
    gb.receiveAttack([0, 0]);
    gb.receiveAttack([0, 1]);
    gb.receiveAttack([0, 2]);
    gb.receiveAttack([0, 3]);
    gb.receiveAttack([0, 4]);//sunk
    //battleship
    gb.receiveAttack([1, 0]);
    gb.receiveAttack([1, 1]);
    gb.receiveAttack([1, 2]);
    gb.receiveAttack([1, 3]);//sunk
    //destroyer
    gb.receiveAttack([2, 0]);   
    gb.receiveAttack([2, 1]);
    gb.receiveAttack([2, 2]);//sunk
    //sub
    gb.receiveAttack([3, 0]);
    gb.receiveAttack([3, 1]);
    gb.receiveAttack([3, 2]);//sunk
    //cruiser
    gb.receiveAttack([4, 0]);

    expect(gb.allShipsSunk()).toBe(false);

    gb.receiveAttack([4, 1]);//sunk

    expect(gb.allShipsSunk()).toBe(true);
});