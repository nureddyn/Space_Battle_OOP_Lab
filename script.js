let Rounds = [];

// General actions and results is going to be made here
class Round {
    constructor(Array) {
        this.array = Array;
    }
}

class Character {
    constructor(type, hull, firePower, accuracy) {
        this.type = type;
        this.hull = hull;
        this.firePower = firePower;
        this.accuracy = accuracy;
    }
    attack(target) {
        // This depends on accuracy
        if (Math.random() < this.accuracy) {
            target.hull-=this.firePower;
    }
    }
    getProperties () {
        return {
            'type': this.type,
            "hull": this.hull,
            "firePower": this.firePower,
            "accuracy": this.accuracy
        }
    }
    move() {
        return 'I am moving';
    }
    displayName () {
        return `I am a ${this.type}`;
    }
}

class Ship extends Character {
    constructor(type, hull, firePower, accuracy) {
        super(type, hull, firePower, accuracy)
        this.type = 'Ship';
        this.hull = 20;
        this.firePower = 5;
        this.accuracy = 0.7;
    }
}

class Alien extends Character {
    constructor(type, hull, firePower, accuracy) {
        super(type, hull, firePower, accuracy)
        this.type = 'Alien';
        this.hull = Math.floor(Math.random() * (6 - 3) + 3);
        this.firePower = Math.floor(Math.random() * (4 - 2) + 2);
        this.accuracy = Number((Math.random() * (0.8 - 0.6) + 0.6).toFixed(2));
    }
}

let ship1 = new Ship()
// console.log(ship1);
let alien1 = new Alien();
console.log(alien1.displayName());
console.log(ship1.displayName());
let firstRound = new Round([ship1.getProperties(), alien1.getProperties()]);

// ship1.attack(alien1);
