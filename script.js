let Rounds = [];

class Round {
    constructor(Array) {
        this.array = Array;
    }
}

// class GameObject {
//     constructor(hull, firePower, accuracy) {
//         this.hull = hull;
//         this.firePower = firePower;
//         this.accuracy = accuracy;
//     }
// }

class Ship {
    hull = 20;
    firePower = 5;
    accuracy = 0.7; 

    displayName () {
        console.log("I'm a Ship");
    }
    attack(alien) {
        alien.hull-=this.firePower;
    }
    getProperties () {
        return "Ship: ", {
            "hull": this.hull,
            "firePower": this.firePower,
            "accuracy": this.accuracy
        }
    }
}

class Alien {
    hull = Math.floor(Math.random() * (6 - 3) + 3);
    firePower = Math.floor(Math.random() * (4 - 2) + 2);
    accuracy = Math.random() * (0.8 - 0.6) + 0.6;

    displayName () {
        console.log("I'm an Alien");
    }
    getProperties () {
        return "Alien: ", {
            "hull": this.hull,
            "firePower": this.firePower,
            "accuracy": this.accuracy
        }
    }
}

let ship1 = new Ship()
// console.log(ship1);
let alien1 = new Alien();
// console.log(alien1);
let firstRound = new Round([ship1.getProperties(), alien1.getProperties()]);

// console.log(firstRound);
ship1.attack(alien1);

// console.log(firstRound);