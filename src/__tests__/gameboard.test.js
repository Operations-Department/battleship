const Gameboard = require('../gameboard');
const Ship = require('../ship');

const gb = new Gameboard();
const battleship = new Ship('Battleship', 4);
const destroyer = new Ship('Destroyer', 3);

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