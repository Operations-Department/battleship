const Ship = require('../ship');

let playerShip;
let computerShip;

beforeEach(() => {
    playerShip = new Ship('Battleship', 4);
    computerShip = new Ship('Battleship', 4);
});

afterEach(() => {
    playerShip = null;
    computerShip = null;
});

test('Ships have correct length', () => {
    expect(playerShip.length).toBe(4);
    expect(computerShip.length).toBe(4);
});

test('Ships can get hit', () => {
    expect(playerShip.hitPoints).toBe(0);
    expect(computerShip.hitPoints).toBe(0);

    playerShip.getHit();
    computerShip.getHit();

    expect(playerShip.hitPoints).toBe(1);
    expect(computerShip.hitPoints).toBe(1);
});

test('Hitting one battleship does not hit the other', () => {
    playerShip.getHit();

    expect(playerShip.hitPoints).toBe(1);
    expect(computerShip.hitPoints).toBe(0);

    computerShip.getHit();

    expect(playerShip.hitPoints).toBe(1);
    expect(computerShip.hitPoints).toBe(1);
});

test('Ships can sink', () => {
    expect(playerShip.isSunk).toBe(false);
    expect(computerShip.isSunk).toBe(false);

    playerShip.getHit();
    playerShip.getHit();
    playerShip.getHit();
    playerShip.getHit();

    expect(playerShip.isSunk).toBe(true);
    expect(computerShip.isSunk).toBe(false);

    computerShip.getHit();
    computerShip.getHit();
    computerShip.getHit();
    computerShip.getHit();

    expect(playerShip.isSunk).toBe(true);
    expect(computerShip.isSunk).toBe(true);
});