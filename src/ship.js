class Ship {
    constructor(name, length) {
        this.name = name;
        this.length = length;
        this.hitPoints = 0;
        this.isSunk = false;
    }

    getHit() {
        if (this.hitPoints !== this.length) this.hitPoints++;
        if (this.hitPoints === this.length) this.isSunk = true;
    }

    checkIfSunk() {
        return this.isSunk;
    }
}

module.exports = Ship;