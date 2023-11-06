// List of rounds
let Rounds = [];

// Round class to create each round
class Round {
    constructor(characters) {
        this.characters = characters;
        this.continue = true;
    }
    // Show in screen each character value
    showData () {
        this.characters.forEach((character) => {
            let type = document.createElement('h2');
            let hull = document.createElement('h2');
            let firePower = document.createElement('h2');
            let accuracy = document.createElement('h2');

            type.innerHTML = character.type;
            hull.innerHTML = character.hull;
            firePower.innerHTML = character.firePower;
            accuracy.innerHTML = character.accuracy;
            document.querySelector(`.${character.type}-round`).replaceChildren(type, hull, firePower, accuracy);

        });
    }
    // Update round values
    updateData (character1, character2) {
        this.characters[0] = character1.getAttributes();
        this.characters[1] = character2.getAttributes();
    }
}

// Character Base class
class Character {
    constructor(type, hull, firePower, accuracy) {
        this.type = type;
        this.hull = hull;
        this.firePower = firePower;
        this.accuracy = accuracy;
    }
    showInScreen() {
        let image;
        if (this.type === 'ship') {
            image = "https://giffiles.alphacoders.com/164/16462.gif";
        } else image = "https://i.gifer.com/origin/24/2432cf5ff737ad7d1794a29d042eb02e_w200.gif";

        const body = document.createElement('img');
        body.classList.add(`${this.type}`);
        body.setAttribute('src', image);
        // body.innerHTML = this.hull;

        if (document.querySelector(`.${this.type}`)) {
            document.querySelector('.space-grid')
            .removeChild(document.querySelector(`.${this.type}`));
        }
        document.querySelector('.space-grid').append(body);

    }
    removeFromScreen() {
        if (document.querySelector(`.${this.type}`)) {
            document.querySelector(`.${this.type}`).remove();
        }
    }
    attack(target) {
        // This depends on accuracy
        // TODO: Check if hull change or not
        const sleep = (delay) => new Promise((resolve) => setTimeout(resolve, delay));
        if (Math.random() < this.accuracy) {
            target.hull-=this.firePower;
            if (target.hull > 0) {
                // document.querySelector('alert1').innerHTML = `${target.type} was shot`;
                // document.querySelector('alert1').removeAttribute('hidden);
                async function received () {
                    await sleep(500);
                    // alert(`${target.type} was shot`);
                    document.querySelector('.alert1').innerHTML = `${target.type} was shot`;
                    document.querySelector('.alert1').removeAttribute('hidden');
                    // document.querySelector('.alert1').setAttribute('hidden', 'true');
                }
                received();
            }
            else {
                async function shot () {
                    await sleep(500);
                    // alert(`${target.type} destroyed`);
                    document.querySelector('.alert1').innerHTML = `${target.type} destroyed`;
                    document.querySelector('.alert1').removeAttribute('hidden');
                    // document.querySelector('.alert1').setAttribute('hidden', 'true');
                }
                shot();
            };
        }
    }
    getAttributes () {
        return {
            'type': this.type,
            "hull": this.hull,
            "firePower": this.firePower,
            "accuracy": this.accuracy
        }
    }
    move() {
        document.querySelector(`.${this.type}`).classList.toggle(`${this.type}2`);
    }
    displayName () {
        return this.type;
    }
}

// Ship subclass
class Ship extends Character {
    constructor(type, hull, firePower, accuracy) {
        super(type, hull, firePower, accuracy)
        this.type = 'ship';
        this.hull = 20;
        this.firePower = 5;
        this.accuracy = 0.7;
    }
}

// Alien subclass
class Alien extends Character {
    constructor(type, hull, firePower, accuracy) {
        super(type, hull, firePower, accuracy)
        this.type = 'alien';
        this.hull = Math.floor(Math.random() * (6 - 3) + 3);
        this.firePower = Math.floor(Math.random() * (4 - 2) + 2);
        this.accuracy = Number((Math.random() * (0.8 - 0.6) + 0.6).toFixed(2));
    }
}

// Round instances and character actions here:
// TODO: Create 6 aliens with a loop, and iterate over each one (to go on each round)
let round;
let alienNumber = 6;
// Alien List
let alienList = [];

// Function to populate alien List
function createHorde() {
    for (let i = 0; i < alienNumber; i ++) {
        let alien = new Alien();
        alienList.push(alien);
    }
    return alienList;
}

function confirmation() {
    let response = confirm('Do you want to continue?');
    return response;
}

let ship;
let aliens;
let currentAlien;
let alienIndex = 0;
// Button to start round
document.querySelector('#start').onclick = () => {
    document.querySelector('#start').setAttribute('disabled', 'true');
    document.querySelector('#ship-attack').removeAttribute('disabled');

    // Create player ship
    ship = new Ship();
    // Populate alienList
    aliens = createHorde();
    // let alienIndex = 0;
    
    // Show ship in screen
    ship.showInScreen();
    // Show current alien on screen
    currentAlien = aliens[alienIndex];
    currentAlien.showInScreen();

    // Round instance
    round = new Round([ship.getAttributes(), currentAlien.getAttributes()]);
    // Display round data
    round.showData();
}

    
    document.querySelector('#ship-attack').onclick = () => {
        // Attack result
        ship.move();
        ship.attack(currentAlien);
        document.querySelector('.alert1').setAttribute('hidden', 'true');

        // Check if player won round
        if (currentAlien.hull <= 0) {
            // Destroy currentAlien
            currentAlien.removeFromScreen();
            // Update round chart
            round.updateData(ship, currentAlien);
            round.showData();
            // Substract currentAlien counter
            alienNumber-=1;

            if (alienNumber > 0) {
                // Next round or retreat
                let promise = new Promise(resolve => setTimeout(resolve, 1000));
        
                
                promise.then(() => {
                    let response = confirmation();
                    if (response === false) {
                        alert('Game finished');
                        return;
                    }
                    else {
                        alienIndex+=1;
                        currentAlien = aliens[alienIndex];
                        currentAlien.showInScreen();
                        round.updateData(ship, currentAlien);
                        round.showData();
                    }
                });
            } else {
                alert("You win");
                document.querySelector('#ship-attack').setAttribute('disabled', 'true');
                document.querySelector('#start').removeAttribute('disabled');
                return;
            }

        } else {
            // Alien atack
            currentAlien.move();
            currentAlien.attack(ship);
            document.querySelector('.alert1').setAttribute('hidden', 'true');
            // Update round data
            round.updateData(ship, currentAlien);
            // ship.showInScreen()
            round.showData();

            // Player lose game
            if (ship.hull <= 0) {
                alert("Alien wins");
                document.querySelector('#ship-attack').setAttribute('disabled', 'true');
                document.querySelector('#start').removeAttribute('disabled');
            }
        }
        Rounds.push(round);
    };
