const Ship = require('../ship');

const ship = new Ship('Battleship', 4);

test('Ship has correct length', () => {
    expect(ship.length).toBe(4);
});

test('Ship can get hit', () => {
    ship.getHit();
    expect(ship.hitPoints).toBe(1);
});

test('Ship can sink', () => {
    ship.getHit();
    ship.getHit();
    ship.getHit();
    ship.getHit();
    expect(ship.isSunk).toBe(true);
});